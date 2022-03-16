<template>
  <div>
    <span class=" text-xs text-gray-800 font-medium">Showing:</span> <span class=" text-xs text-gray-800 ">{{ count }}</span>
  </div>
</template>

<script>
export default {
  name: "z-table-footer-count",
  props:['count']
}
</script>

<style scoped>

</style>