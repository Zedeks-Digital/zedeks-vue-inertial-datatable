<template>
  <div class="group-btn-wrapper">
    <template v-for="(link , link_index) in links" :key="link_index">
      <button @click="goToPage(link)" class="" v-if="link_index===0">
        <span>
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-6" fill="none" viewBox="0 0 24 24"
               stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M11 19l-7-7 7-7m8 14l-7-7 7-7"/>
          </svg>
        </span>
      </button>
      <button @click="goToPage(link)" class="" v-else-if="link_index===links.length-1">
        <span>
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-6" fill="none" viewBox="0 0 24 24"
               stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M13 5l7 7-7 7M5 5l7 7-7 7"/>
          </svg>
        </span>
      </button>
      <button @click="goToPage(link)" :class="{'pagination-active':link.active}" v-else>
           <span>
           {{ link.label }}
           </span>
        <!--            <i>I</i>-->
      </button>
    </template>
  </div>
</template>

<script>
export default {
  name: "z-pagination",
  props: ['links'],
  methods: {
    goToPage(link) {
      if (link.active) {
      }
      else {
        this.$emit('pagination',link)
      }
    }
  }
}
</script>

<style scoped>

</style>