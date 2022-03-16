<template>
  <div class="flex justify-end items-center">
    <template v-for="(link , link_index) in links" :key="link_index">
      <a :href="link.url" class="z-btn-pg" v-if="link_index===0">
        <i>
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-6" fill="none" viewBox="0 0 24 24"
               stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M11 19l-7-7 7-7m8 14l-7-7 7-7"/>
          </svg>
        </i>
      </a>
      <a :href="link.url" class="z-btn-pg" v-else-if="link_index===links.length-1">
        <i>
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-6" fill="none" viewBox="0 0 24 24"
               stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M13 5l7 7-7 7M5 5l7 7-7 7"/>
          </svg>
        </i>
      </a>
      <a :href="!link.active?link.url:'#'" class="z-btn-pg" v-else>
           <span>
           {{ link.label }}
           </span>
        <!--            <i>I</i>-->
      </a>
    </template>
  </div>
</template>

<script>
export default {
  name: "z-pagination",
  props:['links']
}
</script>

<style scoped>

</style>