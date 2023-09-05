<template>
    <a  :href="uri">
           <span>
            {{ label }}
           </span>

    </a>
</template>

<script setup>
const props =defineProps({
    label:{
        type: String,
        default:""
    },
    uri:{
        type: String,
        default:""
    }
})
</script>

<style scoped>

</style>