## Welcome to Zedeks Vue Inertia Datatable!

This is a package to help you build applications **VILT (Vue, Inertia, Laravel Tailwind css)** fast without having to worry about things like
* Re-creating tables and styling them
* Dealing with paginations
* Table search
* Table Exports [print, csv, xlxs, pdf]
* Table filters
* create links / route on tables
* and more .

## Installation
install using NPM

```shell
npm i zedeks-vue-inertial-datatable
```

import into your vue 3 "resources/js/app.js"

```javascript
import ZTable from 'zedeks-vue-inertial-datatable'
```
use as component 
```javascript
 .component('ZTable',ZTable)
```

full code for vue 3 "resources/js/app.js" should look like this.
```javascript
import {createApp, h} from 'vue'
import {createInertiaApp} from '@inertiajs/inertia-vue3'

import ZTable from 'zedeks-vue-inertial-datatable'
import store from "./store/index"

createInertiaApp({
    resolve: name => import(`./Pages/${name}`),
    setup({el, App, props, plugin}) {
        createApp({render: () => h(App, props)})
            .mixin({
                methods: {
                    route,
                }
            })
            .use(plugin)
            .use(store)
            .component('ZTable',ZTable)
            .mount(el)
    },
})
```



### CSS
add the following tailwind css classes to you main css file
```css

.z-btn{
    @apply bg-blue-600 text-white text-sm font-medium py-3 px-4 rounded-sm ml-1
}
.z-btn-sm{
    @apply bg-blue-600 text-white text-xs font-medium py-1 px-2 rounded-sm ml-1
}
.z-btn-pg{
    @apply bg-blue-600 text-white text-xs font-medium py-1 px-2 ml-0.5
}
.z-input{
    @apply rounded-sm w-full p-2 focus:ring-blue-600 focus:outline-none focus:ring focus:ring-opacity-25 bg-gray-50 ring ring-opacity-25 ring-gray-300
}
.z-select{
    @apply rounded-sm  p-2 focus:ring-blue-600 focus:outline-none focus:ring focus:ring-opacity-25 bg-gray-50 ring ring-opacity-25 ring-gray-300
}
```