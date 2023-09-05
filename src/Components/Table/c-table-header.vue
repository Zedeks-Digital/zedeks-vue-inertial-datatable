<template>
    <thead>
    <tr class="">

        <th class="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left"
            v-for="(header, header_index) in getHeaders" :key="header_index"
            @click.prevent="handleSort(header)">
            <div class="flex justify-between items-center w-full space-x-2" v-if="columnTypes.includes(header.type)">
                <span>
                {{ header.label }}
                </span>
                <span class="h-4">
                  <span class="flex justify-end items-center w-full h-4">
                       <svg xmlns="http://www.w3.org/2000/svg" class="h-2"
                            :class="{'opacity-none':isSorted(header.key)==='ASC','opacity-50':isSorted(header.key)!=='ASC'}" fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor" stroke-width="3"
                       >
                        <path stroke-linecap="round" stroke-linejoin="round" d="M8 7l4-4m0 0l4 4m-4-4v18"/>
                      </svg>
                       <svg xmlns="http://www.w3.org/2000/svg" class="h-2"
                            :class="{'opacity-none':isSorted(header.key)==='DESC','opacity-50':isSorted(header.key)!=='DESC'}" fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor" stroke-width="3"
                       >
                      <path stroke-linecap="round" stroke-linejoin="round" d="M16 17l-4 4m0 0l-4-4m4 4V3"/>
                    </svg>
                  </span>
              </span>
            </div>
            <span v-if="header.type==='action'">{{header.label}}</span>
            <input v-if="enableCheckbox && header.type==='checkbox'" type="checkbox" class="" v-model="isChecked" @input="(e)=> $emit('select-all', !isChecked )"/>
        </th>
    </tr>
    </thead>
</template>

<script setup>
import {computed, onMounted, ref} from "vue";
import {useStr} from "@/Composable/useStr.js";
import {useObj} from "@/Composable/useObj.js";
import {useDataTable} from "@/Composable/useDataTable.js";
import _ from "lodash";
import {useStatics} from "@/Composable/useStatics.js";

const emit = defineEmits(['select-all', 'sort-headers'])
const props = defineProps({
    headers: {
        type: Array
    },
    options: {
        type: Object,
        default: {}
    },
    tableActions:{
        type:Object,
        default:{}
    }
})
const {hasKey, length} = useObj()
const {toTitle, toSlug, removeSlug} = useStr()
const {computeHeaders} = useDataTable()
const {columnTypes} = useStatics();
const isChecked = ref(false);
const enableCheckbox = hasKey(props.options, 'checkbox')
const checkboxOptions = enableCheckbox ? props.options.checkbox : {} //Todo
const getHeaders = computed(() => computeHeaders(props.headers,props.tableActions,enableCheckbox));

const sortOrder = ref([])

const isSorted = (key) => {
    const sortedHeaders = _.map(sortOrder.value, 'header')
    const index = _.indexOf(sortedHeaders, key)
    if(index === -1){
        return null
    }
    return _.result(sortOrder.value, `${index}.direction`)
}
const handleSort = (header) => {
    const sortedHeaders = _.map(sortOrder.value, 'header')
    if (sortedHeaders.includes(header.key)) {
        const index = _.indexOf(sortedHeaders, header.key)
        if (sortOrder.value[index].direction !== "DESC") {
            _.update(sortOrder.value, `${[index]}.direction`, value => "DESC")
        } else {
            _.pullAt(sortOrder.value, [index])
        }
    } else {
        sortOrder.value.push({
            header: header.key,
            direction: "ASC"
        })
    }

    emit('sort-headers',sortOrder)
}

</script>

<style scoped>

</style>