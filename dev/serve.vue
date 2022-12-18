<template>
  <div id="app">
    <div class="flex justify-center items-center h-screen w-full">

      <z-table :backend="backend"
               @table-action-called="(e)=> testEvent(e)"
               @sort-order="(e)=> testEvent(e)"
               @selected-button-filter="(e)=> filtering(e)"
               @auto-search="(e)=> testEvent(e)"
               @change-page-length="(e)=> pageLength(e)"
               @pagination="(e)=> paginate(e)"
               @exports="(e)=> testEvent(e)"

      >
        <template #country="{content}">
          {{ content['country']?.name }}
        </template>
        <template #region="{content}">
          <div class="relative h-6 w-6"><img :src="content.avatar" class="rounded-full h-6" alt="user"><span
              class=""> </span></div>

        </template>
      </z-table>

    </div>
  </div>
</template>

<script>
import {defineComponent} from 'vue';
import axios from 'axios'
import ZTable from '@/zedeks-vue-inertia-datatable.vue';

export default defineComponent({
  name: 'ServeDev',
  components: {
    ZTable
  },
  mounted() {
    // this.getData()
  },
  methods: {
    getData() {
      axios.get('http://saprfacility.vbox/api/all-users')
          .then(response => (console.log(response.data)/*this.backend.data = response.data*/))
    },
    doSomething(data) {
      return data + " mel"
    },
    testEvent(e) {
      console.log(e)
    },
    search(e) {
      axios.get('http://saprfacility.vbox/api/all-users?search=' + e.autoSearch)
          .then(response => (this.backend.data = response.data))
    },
    paginate(e) {
      axios.get('http://saprfacility.vbox/api/all-users?page=' + e.label)
          .then(response => (this.backend.data = response.data))
    },
    pageLength(e) {
      axios.get('http://saprfacility.vbox/api/all-users?pageLength=' + e.pageLength)
          .then(response => (this.backend.data = response.data))
    },
    filtering(e) {
      axios.get('http://saprfacility.vbox/api/all-users?filter_term=' + e.columnName + '&filter_value=' + e.key)
          .then(response => (this.backend.data = response.data))
    },
    sorting(e) {
      if (e.key && e.direction) {
        axios.get('http://saprfacility.vbox/api/all-users?sortKey=' + e.key + '&sortDirection=' + e.direction)
            .then(response => (this.backend.data = response.data))
      } else {
        this.getData()
      }
    }
  },
  data() {
    return {
      backend: {
        headers: [
          {
            label: "ID",
            key: "id",
            sortable: true,
            sortKey: "id",
            searchable: true,
            searchableKey: "id",
            // exportable: false,
            // printable: false,
          },
          {
            label: "Name",
            key: "full_name",
            sortable: true,
            sortKey: "first_name",
          },
          {
            label: "Country",
            key: "country",
            type: 'html',
            slot: true
          },
          {
            label: "Region",
            key: "region",
            slot: true,
            searchable: true,
            searchableKey: "region",
          },
          // {
          //   label: "Email",
          //   key: "email",
          // }
        ],
        data: {
          data: [
            {
              "id": 1,
              "status": true,
              "created_at": "2020-01-01T16:13:41.000000Z",
              "updated_at": "2020-01-01T16:13:41.000000Z",
              "region": 1,
              "name": "Ahanta West Municipal"
            },
            {
              "id": 2,
              "status": true,
              "created_at": "2020-01-01T16:13:41.000000Z",
              "updated_at": "2020-01-01T16:13:41.000000Z",
              "region": 1,
              "name": "Amenfi Central District"
            },
            {
              "id": 3,
              "status": false,
              "created_at": "2020-01-01T16:13:41.000000Z",
              "updated_at": "2020-01-01T16:13:41.000000Z",
              "region": 1,
              "name": "Wassa Amenfi East Municipal"
            },
            //   {
            //     "id": 4,
            //     "created_at": "2020-01-01T16:13:41.000000Z",
            //     "updated_at": "2020-01-01T16:13:41.000000Z",
            //     "region": 1,
            //     "name": "Amenfi West Municipal"
            //   },
            //   {
            //     "id": 5,
            //     "created_at": "2020-01-01T16:13:41.000000Z",
            //     "updated_at": "2020-01-01T16:13:41.000000Z",
            //     "region": 1,
            //     "name": "Ellembelle District"
            //   },
            //   {
            //     "id": 7,
            //     "created_at": "2020-01-01T16:13:41.000000Z",
            //     "updated_at": "2020-01-01T16:13:41.000000Z",
            //     "region": 1,
            //     "name": "Jomoro Municipal"
            //   },
          ],
          // links: [
          //   {
          //     "url": null,
          //     "label": "&laquo; Previous",
          //     "active": false
          //   },
          //   {
          //     "url": "http://clockin.vbox/test?page=1",
          //     "label": "1",
          //     "active": true
          //   },
          //   {
          //     "url": "http://clockin.vbox/test?page=2",
          //     "label": "2",
          //     "active": false
          //   },
          //   {
          //     "url": "http://clockin.vbox/test?page=3",
          //     "label": "3",
          //     "active": false
          //   },
          //   {
          //     "url": "http://clockin.vbox/test?page=4",
          //     "label": "4",
          //     "active": false
          //   },
          //   {
          //     "url": "http://clockin.vbox/test?page=5",
          //     "label": "5",
          //     "active": false
          //   },
          // ],
          // meta: {
          //   "current_page": 1,
          //   "from": 31,
          //   "last_page": 1,
          //   "links": [
          //     {
          //       "url": null,
          //       "label": "&laquo; Previous",
          //       "active": false
          //     },
          //     {
          //       "url": "http://127.0.0.1:8000/api/receiver?page=1",
          //       "label": "1",
          //       "active": true
          //     },
          //     {
          //       "url": null,
          //       "label": "Next &raquo;",
          //       "active": false
          //     }
          //   ],
          //   "path": "http://127.0.0.1:8000/api/receiver",
          //   "per_page": 30,
          //   "to": 60,
          //   "total": 258
          // }
        },
        settings: {
          tableTitle: {
            state: true,
            label: "Table"
          },
          //   tableClasses: {},
          createSection: {
            create: {
              state: true,
              url: "",
              label: "MyCreate"
            },
            //     bulkCreate: {
            //       state: true,
            //       url: "",
            //       label: "mY Bulk Create"
            //     }
          },
          tableFilter: {
            state: true,
            type: "button",
            activeFilter: 'all',
            data: [
              {
                label: "All",
                columnName: "role",
                key: "all"
              },
              {
                label: "Org. Admin",
                columnName: "role",
                key: "Org. Admin"
              },
              {
                label: "Super Admin",
                columnName: "role",
                key: "Super Admin"
              },
              {
                label: "Regional Admin",
                columnName: "role",
                key: "Regional Admin"
              },
              {
                label: "National Admin",
                columnName: "role",
                key: "National Admin"
              },
              {
                label: "Active",
                columnName: "status",
                key: 1
              },
              {
                label: "Inactive",
                columnName: "status",
                key: 0
              }
            ],
          },
          actions: {
            state: true,
            position: "column-end",
            rowIndex: 1,
            data: [
              {
                label: "View",
                route_name: "user.show",
                params: [
                  {
                    key: "user",
                    value: "id"
                  }
                ],
                condition: {
                  'check': 'status',
                  'if': true,
                  'then': {
                    label: 'Deactivate',
                    route: "user.show"
                  },
                  'else': {
                    'label': 'Activate',
                    route: "user.show"
                  },
                }
                ,
                request_type: "get"
              },
              {
                label: "Edit",
                route_name: "user.show",
                params: [
                  {
                    key: "user",
                    value: "id"
                  }
                ],
                request_type: "get"
              }
            ]
          },
          pageLength: {
            state: true,
            activeLength: "30",
            options: [{
              key: "10",
              label: "10",
            },
              {
                key: "30",
                label: "30",
              },
              {
                key: "50",
                label: "50",
              },
              {
                key: "100",
                label: "100",
              },
              {
                key: "-1",
                label: "All",
              },]
          },
          search: {
            state: true,
            placeholder: "Search",
            useButton: false,
            buttonLabel: "Search",
            // custom_buttom:false, Todo
            autoSearch: true,
            debounce: 500
          },
          //   // filters: [],
          exports: {
            state: true,
            actions: ['pdf', 'xlsx', 'csv']
          },
          bulkActions: {
            state: false,
          },
          // checkbox: {
          //   state: true,
          // },
          //   // pagination: {
          //   //   state:true
          //   // },
        }
      }
    }
  }
});
</script>

