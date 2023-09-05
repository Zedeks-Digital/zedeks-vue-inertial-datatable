<template>
    <select class="z-select" :value="modelValue" @input="(e)=>$emit('update:modelValue', e.target.value)">
        <option disabled value="">Select</option>
        <option :value="item.key" v-for="(item, index) in options" :selected="defaultValue===item.key"
                :key="index">
            {{ item.label }}
        </option>
    </select>
</template>

<script setup>
const props = defineProps({
    modelValue:String,
    options:{
        type:Object,
        default:{}
    },
    defaultValue:{
        type:String,
        default:""
    }
})
const emit = defineEmits(['update:modelValue'])
</script>

<style scoped>

</style>