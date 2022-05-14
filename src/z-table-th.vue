<template>
  <div class=" " @click="$emit('changeSortOrder')">
             <span>
              {{ header.label }}
            </span>
    <div class="" v-if="isHeaderSortable">
      <svg xmlns="http://www.w3.org/2000/svg" class="" fill="none" viewBox="0 0 24 24"
           stroke="currentColor" stroke-width="2"
           v-if="(sortOrder?.key===header.key || sortOrder?.key===header.sortKey) && sortOrder?.direction==='ASC'">
        <path stroke-linecap="round" stroke-linejoin="round" d="M8 7l4-4m0 0l4 4m-4-4v18"/>
      </svg>
      <svg xmlns="http://www.w3.org/2000/svg" class="" fill="none" viewBox="0 0 24 24"
           stroke="currentColor" stroke-width="2"
           v-if="(sortOrder?.key===header.key || sortOrder?.key===header.sortKey) && sortOrder?.direction==='DESC'">
        <path stroke-linecap="round" stroke-linejoin="round" d="M16 17l-4 4m0 0l-4-4m4 4V3"/>
      </svg>
    </div>
  </div>
</template>

<script>
export default {
  name: "z-table-th",
  props:['sortOrder','header','isHeaderSortable'],
  computed:{

  }

}
</script>

<style scoped>

</style>