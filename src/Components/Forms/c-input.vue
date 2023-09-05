<template>
    <input class="z-input"  :value="modelValue" @input="$emit('update:modelValue', $event.target.value)"/>
</template>

<script setup>
const props=defineProps(['modelValue'])
const emit = defineEmits(['update:modelValue'])
</script>

<style scoped>

</style>