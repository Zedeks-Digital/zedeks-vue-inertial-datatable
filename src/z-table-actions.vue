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
      <a v-for="(action, action_index) in data" :key="action_index"
         href=""
         @click.prevent="childActionRouting(action.route_name,action.params,action.request_type)"
         class="">
        {{ action.label }}
      </a>
    </div>
  </td>
</template>

<script>
export default {
  name: "z-table-actions",
  props: ['position', 'data'],
  data() {
    return {
      actionDropdownState: false,
    }
  },
  methods:{
    childActionRouting(route, params, type) {
      this.$emit('childActionRouting', {route, params, type})
    }
  }
}
</script>

<style scoped>

</style>