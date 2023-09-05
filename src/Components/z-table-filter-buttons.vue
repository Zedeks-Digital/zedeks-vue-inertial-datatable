<template>
  <div class="filter-wrapper" >
    <a v-for="(filter,index) in filters" :key="index" @click.prevent="doFilter(filter)"
       class="filter-btn" href="">
      <div class="" :class="{'selected-filter-btn':selectedFilter===filter.key,'unselected-filter-btn':selectedFilter!==filter.key}">
        <p class="text-sm">{{ filter.label }}</p>
      </div>
    </a>

  </div>
</template>

<script>
export default {
  name: "z-table-filter-buttons",
  props:['activeFilter','filters'],
  mounted() {
    this.selectedFilter=this.activeFilter
  },
  data(){
    return{
      selectedFilter:''
    }
  },
  methods:{
    doFilter(filter){
      this.selectedFilter=filter.key
      this.$emit('doFilter',filter)
    }
  }
}
</script>

<style scoped>

</style>