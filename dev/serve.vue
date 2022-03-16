
<template>
  <div id="app">
    <z-table :backend="backend" />
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import ZTable from '@/zedeks-vue-inertial-datatable.vue';

export default defineComponent({
  name: 'ServeDev',
  components: {
    ZTable
  },
  data() {
    return {
      backend: {
        headers: [
          {
            label: "ID",
            key: "id",
            sortable: false,
            // searchable: false,
            // exportable: false,
            // printable: false,
          },
          {
            label: "Name",
            key: "name",
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
              "created_at": "2020-01-01T16:13:41.000000Z",
              "updated_at": "2020-01-01T16:13:41.000000Z",
              "region": 1,
              "name": "Ahanta West Municipal"
            },
            {
              "id": 2,
              "created_at": "2020-01-01T16:13:41.000000Z",
              "updated_at": "2020-01-01T16:13:41.000000Z",
              "region": 1,
              "name": "Amenfi Central District"
            },
            {
              "id": 3,
              "created_at": "2020-01-01T16:13:41.000000Z",
              "updated_at": "2020-01-01T16:13:41.000000Z",
              "region": 1,
              "name": "Wassa Amenfi East Municipal"
            },
            {
              "id": 4,
              "created_at": "2020-01-01T16:13:41.000000Z",
              "updated_at": "2020-01-01T16:13:41.000000Z",
              "region": 1,
              "name": "Amenfi West Municipal"
            },
            {
              "id": 5,
              "created_at": "2020-01-01T16:13:41.000000Z",
              "updated_at": "2020-01-01T16:13:41.000000Z",
              "region": 1,
              "name": "Ellembelle District"
            },
            {
              "id": 7,
              "created_at": "2020-01-01T16:13:41.000000Z",
              "updated_at": "2020-01-01T16:13:41.000000Z",
              "region": 1,
              "name": "Jomoro Municipal"
            },
          ],
          links: [
            {
              "url": null,
              "label": "&laquo; Previous",
              "active": false
            },
            {
              "url": "http://clockin.vbox/test?page=1",
              "label": "1",
              "active": true
            },
            {
              "url": "http://clockin.vbox/test?page=2",
              "label": "2",
              "active": false
            },
            {
              "url": "http://clockin.vbox/test?page=3",
              "label": "3",
              "active": false
            },
            {
              "url": "http://clockin.vbox/test?page=4",
              "label": "4",
              "active": false
            },
            {
              "url": "http://clockin.vbox/test?page=5",
              "label": "5",
              "active": false
            },
          ],
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
        // settings: {
        //   tableTitle: {
        //     state: true,
        //     label: "Table"
        //   },
        //   tableClasses: {},
        //   createSection: {
        //     create: {
        //       state: true,
        //       url: "",
        //       label: "MyCreate"
        //     },
        //     bulkCreate: {
        //       state: true,
        //       url: "",
        //       label: "mY Bulk Create"
        //     }
        //   },
        //   pageLength: {
        //     state: true,
        //     options: [{
        //       key: "10",
        //       value: "10",
        //     },
        //       {
        //         key: "30",
        //         value: "30",
        //       },
        //       {
        //         key: "50",
        //         value: "50",
        //       },
        //       {
        //         key: "100",
        //         value: "100",
        //       },
        //       {
        //         key: "-1",
        //         value: "All",
        //       },]
        //   },
        //   search: {
        //     state: true,
        //     placeholder: "Search",
        //     useButton: true,
        //     buttonLabel: "Search",
        //     // custom_buttom:false, Todo
        //     autoSearch: true,
        //     debounce: 2000
        //   },
        //   // filters: [],
        //   // exports: [],
        //   // bulkActions: [],
        //   // checkbox: [],
        //   // pagination: {
        //   //   state:true
        //   // },
        // }
      }
    }
  }
});
</script>

