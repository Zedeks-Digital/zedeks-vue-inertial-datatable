<script>
import { defineComponent } from 'vue';
import {/*pickBy, */throttle,/* isEqual*/} from "lodash";
import ZPagination from "@/z-pagination";
import ZTableFooterCount from "@/z-table-footer-count";

export default /*#__PURE__*/defineComponent({
  name: "z-table",
  props:{
    backend:{
      type: Object,
      required: true
    }
  },
  components: {ZTableFooterCount, ZPagination},
  methods: {
    checkForMeta() {
      return Object.keys(this.backend.data).includes("meta")
    },
    isHeaderSortable(header) {
      if (Object.keys(header).includes("sortable"))
        return header.sortable
      return false
    },
    contains(data, key) {
      return Object.keys(data).includes(key)
    },
    //table loader
    startTableIsLoading(){
      this.table.loading=true
    },
    stopTableIsLoading(){
      this.table.loading=false
    },

    doAutoSearch() {
      // let query=this.table.search
      this.startTableIsLoading()
      console.log(this.table.autoSearch)
      this.stopTableIsLoading()

    },
    doSearch() {
      // let query=this.table.search
      console.log(this.table.search)
    },

    // using inertia
    refreshTableData(query){
      // this.$inertia.get(route(route().current()),query,{
      //   only: ['backend'],
      // })
    },

    //settings
    getSettings() {
      if (this.contains(this.backend,'settings')){
        return this.backend.settings
      }
      return this.defaultSettings
    },
  },
  watch: {
    // filter_data(val, oldVal) {
    //   this.setFilter()
    // },
    'table.autoSearch': {
      handler: throttle(function () {
        this.doAutoSearch();
      }, 2000),
      deep: true,
    }
  },
  computed: {
    getPagination() {
      if (this.checkForMeta()) {
        return this.backend.data.meta.links
      } else {
        return this.backend.data.links
      }
    },
    getTableCount() {
      let meta;
      if (this.checkForMeta()) {
        meta = this.backend.data.meta
        return ` ${meta.from} to ${meta.to} of ${meta.total}`
      }
      meta = this.backend.data.links
      return ` ${meta.from} to ${meta.to} of ${meta.total}`
    },
    getHeaders() {
      return this.backend.headers
    },
    getContents() {
      return this.backend.data.data
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
    getpageLength() {
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
    }

  },
  data() {
    return {
      tableSearch: "",
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
          state: true,
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
          state: true,
          placeholder: "Search",
          useButton: true,
          buttonLabel: "Search",
          // custom_buttom:false, Todo
          autoSearch: true,
          debounce: 2000
        },
      },
    }
  }
});
</script>

<template>
  <div class="flex justify-center items-center h-screen w-full">
    <div class="w-3/4 rounded-sm bg-white  p-6 shadow">
      <!--      title and create button section-->
      <section class="mb-4 flex justify-between items-center">
        <!--        title of table-->
        <div><span class="text-3xl font-bold" v-if="getTableTitle.state">{{ getTableTitle.label }}</span></div>
        <!--        button for create-->
        <div class="flex justify-end items-center">
          <a class="z-btn" v-if="getCreateSection.create.state" :href="getCreateSection.create.url">
           <span>
            {{ getCreateSection.create.label }}
           </span>
            <!--            <i>I</i>-->
          </a>
          <a class="z-btn" v-if="getCreateSection.bulkCreate.state" :href="getCreateSection.bulkCreate.url">
           <span>
              {{ getCreateSection.bulkCreate.label }}
           </span>
            <!--            <i>I</i>-->
          </a>

        </div>
      </section>
      <!--      page length and search section-->
      <section class="mb-4 flex justify-between items-center">
        <div class="w-1/3">
          <select v-if="getpageLength.state" v-model="table.pageLength" class="z-select w-32">
            <option :value="pageLenth.key" v-for="(pageLenth, pageLenth_index) in getpageLength.options"
                    :key="pageLenth_index">
              {{ pageLenth.value }}
            </option>
          </select>
        </div>
        <div class=" w-1/3 flex justify-end items-center">
          <template v-if="getSearch.state">
            <div class="flex-grow mr-2">
              <input class="z-input" v-if="getSearch.autoSearch" :placeholder="getSearch.placeholder" v-model="table.autoSearch"/>
              <input class="z-input" v-else :placeholder="getSearch.placeholder" v-model="table.search"/>
            </div>
            <div class="">
              <button @click="doSearch" class="z-btn" v-if="getSearch.useButton">{{ getSearch.buttonLabel }}</button>
            </div>
          </template>
        </div>
      </section>

      <!--filter section-->
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
      <!--exports and bulk actions-->
      <!--      <section class="mb-4 flex justify-between items-center">-->
      <!--        <div>-->
      <!--          <select class="z-select">-->
      <!--            <option value="" selected>-->
      <!--              Select Action-->
      <!--            </option>-->
      <!--            <option value="100">-->
      <!--              something-->
      <!--            </option>-->
      <!--            <option value="100">-->
      <!--              Delete-->
      <!--            </option>-->
      <!--          </select>-->
      <!--        </div>-->
      <!--        &lt;!&ndash;        exports&ndash;&gt;-->
      <!--        <div class="flex justify-end items-center">-->
      <!--          <span class="text-sm">Export To: </span>-->
      <!--          <button class="z-btn-sm">-->
      <!--           <span>-->
      <!--             PDF-->
      <!--           </span>-->
      <!--            &lt;!&ndash;            <i>I</i>&ndash;&gt;-->
      <!--          </button>-->
      <!--          <button class="z-btn-sm">-->
      <!--           <span>-->
      <!--             Excel-->
      <!--           </span>-->
      <!--            &lt;!&ndash;            <i>I</i>&ndash;&gt;-->
      <!--          </button>-->
      <!--          <button class="z-btn-sm">-->
      <!--           <span>-->
      <!--             CSV-->
      <!--           </span>-->
      <!--            &lt;!&ndash;            <i>I</i>&ndash;&gt;-->
      <!--          </button>-->
      <!--          <button class="z-btn-sm">-->
      <!--           <span>-->
      <!--             Print-->
      <!--           </span>-->
      <!--            &lt;!&ndash;            <i>I</i>&ndash;&gt;-->
      <!--          </button>-->
      <!--        </div>-->
      <!--      </section>-->
      <div class="relative">
        <div v-if="table.loading" class=" absolute w-full h-full bg-gray-50 bg-opacity-50 flex justify-center items-center">
          <p class="text-xl p-4 bg-gray-200 rounded-md">Loading...</p>
        </div>
        <table class="w-full bg-gray-50 ">
          <!--       table header section -->
          <thead class="bg-gray-400 text-base font-semibold text-gray-50 text-left ">
          <tr class="">
            <th class="py-4 px-6" v-for="(header, header_index) in getHeaders" :key="header_index">

              <div class="flex justify-between items-center">
             <span>
              {{ header.label }}
            </span>
                <div class="flex justify-end" v-if="isHeaderSortable(header)">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-6" fill="none" viewBox="0 0 24 24"
                       stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M8 7l4-4m0 0l4 4m-4-4v18"/>
                  </svg>
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-6" fill="none" viewBox="0 0 24 24"
                       stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M16 17l-4 4m0 0l-4-4m4 4V3"/>
                  </svg>
                </div>
              </div>
              <!--            <div class="bg-gray-200 rounded-sm w-4 h-4 flex flex-shrink-0 justify-center items-center relative">-->
              <!--              <input type="checkbox" class="focus:opacity-100 checkbox opacity-0 absolute cursor-pointer w-full h-full">-->
              <!--              <div class="check-icon hidden bg-indigo-700 text-white rounded-sm">-->
              <!--                <svg class="icon icon-tabler icon-tabler-check" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">-->
              <!--                  <path stroke="none" d="M0 0h24v24H0z"></path>-->
              <!--                  <path d="M5 12l5 5l10 -10"></path>-->
              <!--                </svg>-->
              <!--              </div>-->
              <!--            </div>-->
            </th>
          </tr>
          </thead>
          <!--       table body section -->
          <tbody>
          <tr class="border-b" v-for="(content, content_index) in getContents" :key="content_index">
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
            <td v-for="(header, header_index) in getHeaders" :key="header_index" class="py-4 px-6">
              <!--            <div v-if="badges && badges[header_index]">-->
              <!--              <x-badge v-if="badges[header_index][content[header_index]]"-->
              <!--                       :class="badges[header_index][content[header_index]].color + ' text-white '">-->
              <!--                {{badges[header_index][content[header_index]].label}}-->
              <!--              </x-badge>-->
              <!--            </div>-->

              <!--            <div v-else>-->
              <div v-html="content[header.key]"></div>
              <!--            </div>-->
            </td>

          </tr>

          </tbody>
        </table>
      </div>

      <!--footer-->
      <section class="my-4 flex justify-between items-center">
        <!--        count-->
        <z-table-footer-count :count="getTableCount"/>
        <!--        pagination-->
        <z-pagination :links="getPagination"/>
      </section>
    </div>
  </div>

</template>

<style scoped>

</style>
