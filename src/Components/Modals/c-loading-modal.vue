<template>
    <div class="absolute w-full h-full bg-gray-300/50 min-h-12 flex justify-center items-center z-50">
        <p class="flex justify-center items-center space-x-4"><c-circle-spinner></c-circle-spinner><span>Loading...</span></p>
    </div>
</template>

<script setup>

import CCircleSpinner from "@/Components/loaders/c-circle-spinner.vue";
</script>

<style scoped>

</style>