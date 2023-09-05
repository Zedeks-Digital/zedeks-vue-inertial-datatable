<script setup>
import CLinkBtn from "@/Components/Forms/c-link-btn.vue";
import CBtn from "@/Components/Forms/c-btn.vue";
import CInput from "@/Components/Forms/c-input.vue";
import CSelect from "@/Components/Forms/c-select.vue";
import CLoadingModal from "@/Components/modals/c-loading-modal.vue";
import CContentCounter from "@/Components/Table/c-content-counter.vue";
import CPagination from "@/Components/Table/c-pagination.vue";
import {computed, onBeforeMount, onMounted, reactive, ref, watch} from "vue";
import CTableHeader from "@/Components/Table/c-table-header.vue";
import {useObj} from "@/Composable/useObj.js";
import {useDataTable} from "@/Composable/useDataTable.js";
import _ from "lodash";
import CTableActions from "@/Components/Table/c-table-actions.vue";
import {useStatics} from "@/Composable/useStatics.js";

const props = defineProps({
    data: {
        type: Object,
        required: true,
        validator(value) {
            const {hasKey} = useObj()
            return hasKey(value, ['content', 'settings', 'headers']);
            /*new Error("data prop must have the follow ['headers','content','settings']")*/
        }
    }
})
// onBeforeMount(()=>isLoading.value=!isLoading.value)
// onMounted(()=>isLoading.value=!isLoading.value)
const {hasKey, length} = useObj()
const {getContentByKey, slotName, computeHeaders, computeLinkTemplate, computeHtmlTemplate} = useDataTable()

const pickHeaders = computed(() => props.data.headers)
const pickSettings = computed(() => props.data.settings)
const pickContent = computed(() => props.data.content)

const defaultSettings = reactive({
    tableTitle: {
        state: false,
        label: "Table"
    },
    createSection: {
        create: {
            state: true,
            url: "",
            label: "Create"
        },
        bulkCreate: {
            state: false,
            url: "",
            label: "Bulk Create"
        }
    },
    pageLength: {
        state: false,
        options: [
            {
                key: "10",
                value: "10",
            },
            {
                key: "30",
                value: "30",
            },
            {
                key: "50",
                value: "50",
            },
            {
                key: "100",
                value: "100",
            },
            {
                key: "-1",
                value: "All",
            },
        ]
    },
    search: {
        state: false,
        placeholder: "Search",
        useButton: false,
        buttonLabel: "Search",
        // custom_buttom:false, Todo
        autoSearch: true,
        debounce: 2000
    },
    pagination: {
        state: false
    },
    actions: {
        state: false,
        position: "row",// row / column-end /column-start
        data: []
    },
    tableFilter: {
        state: false,
        type: "button"
    },
    exports: {
        state: false,
        actions: ['pdf', 'xlsx', 'csv', 'print']
    },
    bulkActions: {
        state: false,
    },
    checkbox: {
        state: false,
    }
})
const {columnTypes} = useStatics();
// table title
const tableTitle = hasKey(pickSettings.value, 'tableTitle') ? pickSettings.value.tableTitle : ""
const addNew = hasKey(pickSettings.value, 'addNew') ? pickSettings.value.addNew : {}
const addBulk = hasKey(pickSettings.value, 'addBulk') ? pickSettings.value.addBulk : {}
const limits = hasKey(pickSettings.value, 'limits') ? pickSettings.value.limits : {}
const search = hasKey(pickSettings.value, 'search') ? pickSettings.value.search : {}
const exports = hasKey(pickSettings.value, 'exports') ? pickSettings.value.exports : []
const actions = hasKey(pickSettings.value, 'actions') ? pickSettings.value.actions : {}
const checkBox = ref([])
// functions
const selectAllCheckBoxes = (value) => {
    if (value) {
        const key = pickSettings.value.header.checkbox?.key || 'id'
        checkBox.value = _.map(pickContent.value.data, key)
    } else {
        _.remove(checkBox.value)
    }
}
const isLoading = ref(false)
const payLoad = ref({
    head: {
        search: {
            text: "",
            fields: []
        },
        limit: "",
        exports: {},
    },
    body: {
        sort: [],
        actions: {},
    },
    footer: {}
})
const emit = defineEmits(['coordy-payload'])
const searchTerm = ref("")
const selectedLimit = ref("")
const tableCounter = ref({})
watch(selectedLimit, (value, oldValue) => handleEmit('head.limit', selectedLimit.value))
const handleSearch = () => {
    handleEmit('head.search.text', searchTerm.value)
}
const debounceSearchField = _.debounce(handleSearch, 500)
const handleEmit = (section, data) => {
    // isLoading.value=!isLoading.value
    _.update(payLoad.value, section, value => data)
    emit('coordy-payload', payLoad.value)
    // isLoading.value=!isLoading.value
}
</script>

<template>
    <div class="flex flex-wrap mt-4">
        <div class="w-full mb-12 px-4">
            <div
                    class="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded bg-white"
            >
                <section class="rounded-t mb-0 px-4 py-3 border-0">
                    <div class="flex justify-between items-center">
                        <div class="">
                            <span class="font-semibold text-lg text-slate-700">
                                {{ tableTitle }}
                                <!--                                table title-->
                            </span>
                        </div>
                        <div class="flex justify-end items-center space-x-2">
                            <c-link-btn class="z-btn" :label="addNew?.label" :uri="addNew?.uri"
                                        v-if="length(addNew)>0 && addNew.label"/>
                            <c-link-btn class="z-btn" :label="addBulk?.label" :uri="addBulk?.uri"
                                        v-if="length(addBulk)>0 && addBulk.label"/>
                        </div>
                    </div>
                </section>
                <section class=" mb-0 px-4 py-1 border-0">
                    <div class="flex justify-between items-center">
                        <div>
                            <!--                            mel-->
                        </div>
                        <div class="group-btn-wrapper">
                            <c-btn v-if="exports.length>0" v-for="(exprt,index) in exports" :key="index"
                                   @click.prevent="handleEmit('head.exports',{action:exprt,options:tableCounter})">
                                {{ exprt.toUpperCase() }}
                            </c-btn>
                        </div>
                    </div>
                </section>
                <section class=" mb-0 px-4 py-1 border-0">
                    <div class="flex justify-between items-center">
                        <div class="flex justify-start items-center space-x-2">
                            <c-select class=" w-18" v-if="length(limits) > 0 && limits.options"
                                      :default-value="limits.default" :options="limits?.options"
                                      v-model="selectedLimit"/>
                            <c-select class=" w-28 max-w-32"
                                      :options="[{key:'delete',label:'Delete'},{key:'edit',label:'Edit'}]"/>
                        </div>
                        <div class="w-48">
                            <c-input v-if="length(search)>0" :placeholder="search.placeholder"
                                     @input="debounceSearchField" v-model="searchTerm"/>
                        </div>
                    </div>
                </section>
                <div class="block relative w-full overflow-x-auto">
                    <!-- Projects table -->
                    <c-loading-modal v-if="isLoading"/>
                    <table class="items-center w-full bg-transparent border-collapse">
                        <c-table-header :headers="pickHeaders" :options="pickSettings.header" :table-actions="actions"
                                        @select-all="selectAllCheckBoxes"
                                        @sort-headers="(e)=>handleEmit('body.sort',e)"/>
                        <tbody>
                        <template v-if="hasKey(pickContent,'data')"
                                  v-for="(content, content_index) in pickContent?.data" :key="content_index">

                            <tr>

                                <template v-for="(header, header_index) in computeHeaders(pickHeaders,actions,hasKey(pickSettings.header,'checkbox'))"
                                          :key="header_index">
                                    <td class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                        <input type="checkbox" v-if="header.type ==='checkbox'"
                                               :value="content[pickSettings.header.checkbox.key || 'id']" class=""
                                               v-model="checkBox"/>
                                        <!--                                    <template v-else>-->
                                        <template v-if="columnTypes.includes(header.type)">
                                            <template v-if="header.type==='slot'">
                                                <slot :name="slotName(header.key)" :content="content">
                                                </slot>
                                            </template>
                                            <template v-if="header.type==='component'">
                                                m
                                                <!--                 Todo                               <component is=""/>-->
                                                <!--                                                <div v-html="getContentByKey(content,header.key)"></div>-->
                                            </template>
                                            <template v-if="header.type==='html'">
                                                <div v-html="computeHtmlTemplate(header,content)"></div>
                                            </template>
                                            <template v-if="header.type==='text'">
                                                <div v-text="getContentByKey(content,header.key)"></div>
                                            </template>
                                            <template v-if="header.type==='link'">

                                                <a v-if="!header.emit" :href="computeLinkTemplate(header,content)">{{
                                                    getContentByKey(content, header.key)
                                                    }}</a>
                                                <a v-else href="#"
                                                   @click.prevent="(e)=> alert(getContentByKey(content, header.key))">{{
                                                    getContentByKey(content, header.key)
                                                    }}</a>
                                            </template>
                                        </template>
                                        <!--                                    </template>-->
                                        <c-table-actions :content="content" v-if="header.type ==='action'" :options="actions" @table-action="(e)=>handleEmit('body.actions',e)"></c-table-actions>
                                    </td>
                                </template>
                            </tr>
                        </template>
                        </tbody>
                    </table>
                    <div v-if="!hasKey(pickContent,'data') || pickContent.data.length===0"
                         class="absolute w-full h-full  min-h-12 flex justify-center items-center z-50">
                        <p class="flex justify-center items-center space-x-4"><span>No Record Found</span></p>
                    </div>
                </div>
                <section class="mb-0 px-4 py-3 border-0 flex justify-between items-center">
                    <!--        count-->
                    <c-content-counter :content="pickContent" @counter="(e)=>tableCounter.value=e"/>
                    <!--        pagination-->
                    <c-pagination @pagination="" :content="pickContent"/>

                </section>

            </div>
        </div>
    </div>
</template>

<style scoped>

</style>
