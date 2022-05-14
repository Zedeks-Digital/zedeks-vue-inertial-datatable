<script>
import {defineComponent} from 'vue';
import {/*pickBy, */throttle,/* isEqual*/} from "lodash";
import ZPagination from "@/z-pagination";
import ZTableFooterCount from "@/z-table-footer-count";
import ZTableActions from "@/z-table-actions";
import ZTableFilterButtons from "@/z-table-filter-buttons";
import ZTableTh from "@/z-table-th";

export default /*#__PURE__*/defineComponent({
  name: "z-table",
  props: {
    backend: {
      type: Object,
      required: true
    }
  },
  components: {ZTableTh, ZTableFilterButtons, ZTableActions, ZTableFooterCount, ZPagination},
  mounted() {
    if (this.contains(this.getPageLength,'activeLength')){
    this.table.pageLength = this.getPageLength.activeLength
    }
  },
  methods: {
    contains(data, key) {
      return Object.keys(data).includes(key)
    },
    checkForMeta() {
      return Object.keys(this.backend.data).includes("meta")
    },
    isHeaderSortable(header) {
      if (Object.keys(header).includes("sortable"))
        return header.sortable
      return false
    },
    //table loader
    startTableIsLoading() {
      this.table.loading = true
    },
    stopTableIsLoading() {
      this.table.loading = false
    },

    doAutoSearch() {
      // let query=this.table.search
      this.startTableIsLoading()
      let searchables=this.getHeaders.filter(h=> h.searchable===true)
      this.$emit('autoSearch', {searchables,autoSearch: this.table.autoSearch})
      this.stopTableIsLoading()

    },
    doSearch() {
      // let query=this.table.search
      console.log(this.table.search)
    },

    // using inertia
    refreshTableData(query) {
      // this.$inertia.get(route(route().current()),query,{
      //   only: ['backend'],
      // })
    },

    //settings
    getSettings() {
      if (this.contains(this.backend, 'settings')) {
        return this.backend.settings
      }
      return this.defaultSettings
    },

    processActionRouteParams(params, data) {
      let processedParams = {};
      params.forEach((param, index) => {
        processedParams[param.key] = data[param.value]
      });
      return processedParams;
    },
    actionRouting(route, params, type) {
      this.$emit('tableActionCalled', {route, params, type})
    },
    showAction(index) {
      this.activeAction = index;
    },
    changeSortOrder(header) {
      if (this.isHeaderSortable(header)) {
        let key=header.sortKey??header.key
        if (Object.keys(this.sortOrder).length && this.sortOrder.key === key) {
          if (this.sortOrder.direction === "ASC") {
            this.sortOrder.direction = "DESC"
            this.$emit('sortOrder', this.sortOrder)
            return;
          }
          if (this.sortOrder.direction === "DESC") {
            this.sortOrder = {}
            this.$emit('sortOrder', this.sortOrder)
            return;
          }
        } else {
          this.sortOrder = {
            key: key,
            direction: "ASC"
          }
        }
        this.$emit('sortOrder', this.sortOrder)
      }
    },
    doPageLengthChange() {
      this.$emit('changePageLength', {pageLength: this.table.pageLength})
    },
    inExportActions(action) {
      return this.getExports?.actions.includes(action)
    },
    doExport(action) {
      this.$emit('exports', {type: action, data: this.getContents})
    }
  },
  watch: {
    // filter_data(val, oldVal) {
    //   this.setFilter()
    // },
    'table.autoSearch': {
      handler: throttle(function () {
        this.doAutoSearch();
      }, 500),
      deep: true,
    }
  },
  computed: {
    getPagination() {
      if (this.checkForMeta()) {
        this.table.pageLength =this.backend.data.meta.per_page
        return this.backend.data.meta.links
      } else if (this.contains(this.backend.data, 'links')) {
        this.table.pageLength =this.backend.data.per_page
        return this.backend.data.links
      }
      return [];
    },
    getTableCount() {
      let meta;
      if (this.checkForMeta()) {
        meta = this.backend.data.meta
        return ` ${meta.from} to ${meta.to} of ${meta.total}`
      } else if (this.contains(this.backend.data, 'links')) {
        meta = this.backend.data
        return ` ${meta.from} to ${meta.to} of ${meta.total}`
      }
      return ` 1 to ${this.backend.data.data.length} of ${this.backend.data.data.length}`
    },
    getHeaders() {
      return this.backend.headers
    },
    getContents() {
      return this.backend.data ? this.backend.data.data : {}
    },

    //settings


    getTableTitle() {
      let custom = this.getSettings()
      if (this.contains(custom, "tableTitle")) {
        return custom.tableTitle
      }
      return this.defaultSettings["tableTitle"];
    },
    getCreateSection() {
      let custom = this.getSettings()
      if (this.contains(custom, "createSection")) {
        return custom.createSection
      }
      return this.defaultSettings["createSection"];
    },
    getFilterSection() {
      let custom = this.getSettings()
      if (this.contains(custom, "tableFilter")) {
        return custom.tableFilter
      }
      return this.defaultSettings["tableFilter"];
    },
    getPageLength() {
      let custom = this.getSettings()
      if (this.contains(custom, "pageLength")) {
        return custom.pageLength
      }
      return this.defaultSettings["pageLength"];
    },
    getSearch() {
      let custom = this.getSettings()
      if (this.contains(custom, "search")) {
        return custom.search
      }
      return this.defaultSettings["search"];
    },
    getActions() {
      let custom = this.getSettings()
      if (this.contains(custom, "actions")) {
        return custom.actions
      }
      return this.defaultSettings["actions"];
    },
    getBulkActions() {
      let custom = this.getSettings()
      if (this.contains(custom, "bulkActions")) {
        return custom.bulkActions
      }
      return this.defaultSettings["bulkActions"];
    },
    getExports() {
      let custom = this.getSettings()
      if (this.contains(custom, "exports")) {
        return custom.exports
      }
      return this.defaultSettings["exports"];
    },
    getCheckBox() {
      let custom = this.getSettings()
      if (this.contains(custom, "checkbox")) {
        return custom.checkbox
      }
      return this.defaultSettings["checkbox"];
    },

  },
  data() {
    return {
      sortOrder: {},
      tableSearch: "",
      activeAction: null,
      table: {
        loading: false,
        search: "",
        autoSearch: "",
        pageLength: "10"
      },
      tableType: "sever-side",
      defaultSettings: {
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
        checkbox:{
          state: false,
        }
      },
    }
  }
});
</script>

<template>
  <div class="z-table-wrapper">
    <!--      title and create button section-->
    <section class="mb-4 flex justify-between items-center">
      <!--        title of table-->
      <div><span class="z-table-title" v-if="getTableTitle.state">{{ getTableTitle.label }}</span></div>
      <!--        button for create-->
      <div class="flex justify-end items-center">
        <a class="z-btn" v-if="getCreateSection.create.state" :href="getCreateSection.create.url">
           <span>
            {{ getCreateSection.create.label }}
           </span>
          <!--            <i>I</i>-->
        </a>
        <template v-if="contains(getCreateSection,'bulkCreate')">
          <a class="z-btn" v-if="getCreateSection.bulkCreate.state" :href="getCreateSection.bulkCreate.url">
           <span>
              {{ getCreateSection.bulkCreate.label }}
           </span>
            <!--            <i>I</i>-->
          </a>
        </template>

      </div>
    </section>

    <!--exports and bulk actions-->
    <section class="mb-4 flex justify-between items-center">
      <div>
        <select class="z-select" v-if="getBulkActions.state">
          <option value="" selected>
            Select Action
          </option>
          <option value="100">
            something
          </option>
          <option value="100">
            Delete
          </option>
        </select>
      </div>
      <!--        exports-->
      <div>
        <div class="flex justify-end items-center" v-if="getExports.state">
          <span class="text-sm">Export To: </span>
          <div class="group-btn-wrapper">
          <button @click.prevent="doExport('pdf')" class="" v-show="inExportActions('pdf')">
               <span>
                 PDF
               </span>
            <!--            <i>I</i>-->
          </button>
          <button @click.prevent="doExport('xlsx')" class="" v-show="inExportActions('xlsx')">
               <span>
                 Excel
               </span>
            <!--            <i>I</i>-->
          </button>
          <button @click.prevent="doExport('csv')" class="" v-show="inExportActions('csv')">
               <span>
                 CSV
               </span>
            <!--            <i>I</i>-->
          </button>
          <button @click.prevent="doExport('print')" class="" v-show="inExportActions('print')">
               <span>
                 Print
               </span>
            <!--            <i>I</i>-->
          </button>
          </div>
        </div>
      </div>
    </section>

    <!--      page length and search section-->
    <section class="mb-4 flex justify-between items-center">
      <div class="w-1/3">
        <select v-if="getPageLength.state" v-model="table.pageLength" class="z-select w-32"
                @change="doPageLengthChange">
          <option :value="pageLength.key" v-for="(pageLength, pageLength_index) in getPageLength.options"
                  :key="pageLength_index">
            {{ pageLength.label }}
          </option>
        </select>
      </div>
      <div class=" w-1/3 flex justify-end items-center">
        <template v-if="getSearch.state">
          <div class="flex-grow mr-2">
            <input class="z-input" v-if="getSearch.autoSearch" :placeholder="getSearch.placeholder"
                   v-model="table.autoSearch"/>
            <input class="z-input" v-else :placeholder="getSearch.placeholder" v-model="table.search"/>
          </div>
          <div class="">
            <button @click="doSearch" class="z-btn" v-if="getSearch.useButton">{{ getSearch.buttonLabel }}</button>
          </div>
        </template>
      </div>
    </section>

    <!--filter section-->
    <section v-if="getFilterSection.state" class="mb-4">
      <z-table-filter-buttons v-if="getFilterSection.type==='button'" :filters="getFilterSection.data"
                              :active-filter="getFilterSection.activeFilter"
                              @do-filter="(e)=> $emit('selectedButtonFilter', e)"/>

    </section>
    <!--      <section class="mb-4 flex justify-between items-center">-->
    <!--        <div>-->

    <!--        </div>-->
    <!--        <div class="flex justify-end items-center space-x-2">-->
    <!--          <select class="z-select">-->
    <!--            <option value="" selected>-->
    <!--              Select Filter Type-->
    <!--            </option>-->
    <!--            <option value="100">-->
    <!--              status-->
    <!--            </option>-->
    <!--          </select>-->
    <!--          <select class="z-select">-->
    <!--            <option value="" selected>-->
    <!--              Select Filter-->
    <!--            </option>-->
    <!--            <option value="100">-->
    <!--              active-->
    <!--            </option>-->
    <!--            <option value="100">-->
    <!--              inactive-->
    <!--            </option>-->
    <!--          </select>-->
    <!--        </div>-->
    <!--      </section>-->

    <div class="relative">
      <div v-if="table.loading" class=" z-table-loader-wrapper">
        <p class="">Loading...</p>
      </div>
      <table class="z-table">
        <!--       table header section -->
        <thead class="z-table-header ">
        <tr class="z-table-header-tr">
          <th scope="col" class="z-table-header-tr-th" v-if="getActions.state && getActions.position==='column-start'">
            <div class="flex justify-between items-center">
              <span>
              Actions
            </span>
            </div>
          </th>
          <th v-if="getCheckBox.state">
            <div class="bg-gray-200 rounded-sm w-4 h-4 flex flex-shrink-0 justify-center items-center relative">
              <input type="checkbox" class="focus:opacity-100 checkbox opacity-0 absolute cursor-pointer w-full h-full">
              <div class="check-icon hidden bg-indigo-700 text-white rounded-sm">
                <svg class="icon icon-tabler icon-tabler-check" xmlns="http://www.w3.org/2000/svg" width="20"
                     height="20" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" fill="none"
                     stroke-linecap="round" stroke-linejoin="round">
                  <path stroke="none" d="M0 0h24v24H0z"></path>
                  <path d="M5 12l5 5l10 -10"></path>
                </svg>
              </div>
            </div>
          </th>
          <th scope="col" class="z-table-header-tr-th" :class="{'cursor-pointer':isHeaderSortable(header)}"
              v-for="(header, header_index) in getHeaders" :key="header_index">

            <z-table-th :header="header" :sort-order="sortOrder"
                        :is-header-sortable="isHeaderSortable(header)"
                        @change-sort-order="changeSortOrder(header)"/>
          </th>
          <th scope="col" class="z-table-header-tr-th" v-if="getActions.state && getActions.position==='column-end'">
            <div class="flex justify-between items-center">
              <span>
              Actions
            </span>
            </div>
          </th>
        </tr>
        </thead>
        <!--       table body section -->
        <tbody class="z-table-body">
        <template v-if="getContents" v-for="(content, content_index) in getContents" :key="content_index">
          <tr class="z-table-body-tr z-tr-hover " @mouseover="showAction(content_index)" @mouseleave="activeAction=null">
            <!--          <td class="py-4 px-6">-->
            <!--            <div class="bg-gray-200 rounded-sm w-4 h-4 flex flex-shrink-0 justify-center items-center relative">-->
            <!--              <input type="checkbox" class="focus:opacity-100 checkbox opacity-0 absolute cursor-pointer w-full h-full">-->
            <!--              <div class="check-icon hidden bg-indigo-700 text-white rounded-sm">-->
            <!--                <svg class="icon icon-tabler icon-tabler-check" xmlns="http://www.w3.org/2000/svg" width="20"-->
            <!--                     height="20" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" fill="none"-->
            <!--                     stroke-linecap="round" stroke-linejoin="round">-->
            <!--                  <path stroke="none" d="M0 0h24v24H0z"></path>-->
            <!--                  <path d="M5 12l5 5l10 -10"></path>-->
            <!--                </svg>-->
            <!--              </div>-->
            <!--            </div>-->
            <!--          </td>-->

            <z-table-actions
                @child-action-routing="(e)=>actionRouting(e.route,processActionRouteParams(e.params,content),e.type)"
                v-if="getActions.state && getActions.position==='column-start'" :position="getActions.position"
                :data="getActions.data"/>
            <td v-for="(header, header_index) in getHeaders" :key="header_index" class="z-table-body-tr-td ">
              <!--            <div v-if="badges && badges[header_index]">-->
              <!--              <x-badge v-if="badges[header_index][content[header_index]]"-->
              <!--                       :class="badges[header_index][content[header_index]].color + ' text-white '">-->
              <!--                {{badges[header_index][content[header_index]].label}}-->
              <!--              </x-badge>-->
              <!--            </div>-->

              <!--            <div v-else>-->
              <template v-if="header.slot">
                <slot :name="header.key" :content="content">
                </slot>
              </template>
              <template v-else>
                <div v-if="header.type==='html'" v-html="content[header.key]"></div>
                <div v-else v-text="content[header.key]"></div>
              </template>

              <template v-if="getActions.state">
                <div v-if="getActions.position==='row' && header_index===getActions.rowIndex" class="mt-2 mb-1 "
                     :class="{'block ':activeAction===content_index,'hidden':activeAction!==content_index}">
                  <div>
                    <ul class="flex justify-start items-center space-x-2 z-tr-actions">
                      <li v-for="(action, action_index) in getActions.data" :key="action_index">
                        <a href=""
                           @click.prevent="actionRouting(action.route_name,processActionRouteParams(action.params,content),action.request_type)">
                          {{ action.label }}
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </template>

              <!--            </div>-->
            </td>
            <z-table-actions
                @child-action-routing="(e)=>actionRouting(e.route,processActionRouteParams(e.params,content),e.type)"
                v-if="getActions.state && getActions.position==='column-end'" :position="getActions.position"
                :data="getActions.data"/>
          </tr>
          <tr class="h-3"></tr>
        </template>
        </tbody>
      </table>
      <div v-if="getContents.length===0" class="w-full text-center text-sm font-medium py-3">No Record Found</div>
    </div>

    <!--footer-->
    <section class="my-4 flex justify-between items-center">
      <!--        count-->
      <z-table-footer-count :count="getTableCount"/>
      <!--        pagination-->
      <z-pagination :links="getPagination" @pagination="(e)=> $emit('pagination',e)"/>
    </section>
  </div>
</template>

<style scoped>

</style>
