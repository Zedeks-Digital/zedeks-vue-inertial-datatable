<template>
  <td class="z-table-action-dropdown">
    <button @click="actionDropdownState = !actionDropdownState"
            class=""
            :class="{' ml-auto mr-0 ':position==='column-end',' ml-0 mr-auto ':position==='column-start'}">
      <svg xmlns="http://www.w3.org/2000/svg" class="" fill="none" viewBox="0 0 24 24" stroke="currentColor"
           stroke-width="2">
        <path stroke-linecap="round" stroke-linejoin="round"
              d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"/>
      </svg>
    </button>
    <div v-show="actionDropdownState" @click="actionDropdownState = false"
         class="z-table-action-dropdown-backdrop"></div>
    <div v-show="actionDropdownState" class="action-items-wrapper"
         :class="{' left-0 ':position==='column-end',' right-0 ':position==='column-start'}">

      <template v-for="(action, action_index) in data" :key="action_index">
        <template v-if="actionContains(action,'condition') && actionContains(tableContent,action.condition.check)">
          <template v-if="tableContent[action.condition.check]===action.condition['if']">
            <a href="" v-if="action.condition.then.label"
               @click.prevent="childActionRouting(action.condition.then.route,action.params,action.request_type)"
               class=" w-full">
              {{ action.condition.then.label }}
            </a>
          </template>
          <template v-else>
            <a href="" v-if="action.condition.else.label"
               @click.prevent="childActionRouting(action.condition.else.route,action.params,action.request_type)"
               class=" w-full">
              {{ action.condition.else.label }}
            </a>
          </template>
        </template>

        <a v-else href="" @click.prevent="childActionRouting(action.route_name,action.params,action.request_type)"
           class=" w-full">
          {{ action.label }}
        </a>
      </template>

    </div>
  </td>
</template>

<script>
export default {
  name: "z-table-actions",
  props: ['position', 'data', 'tableContent'],
  data() {
    return {
      actionDropdownState: false,
    }
  },
  methods: {
    childActionRouting(route, params, type) {
      this.$emit('childActionRouting', {route, params, type})
    },
    actionContains(data, key) {
      // console.log(data);
      // console.log(Object.keys(data).includes(key));
      // if (data){
        return Object.keys(data).includes(key)
      // }
     // return false
    },
  }
}
</script>

<style scoped>

</style>