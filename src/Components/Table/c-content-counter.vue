<template>
    <div class="flex justify-start items-center space-x-2">
        <span class=" text-xs text-gray-800 font-medium">Showing:</span>
        <span class=" text-xs text-gray-800 ">{{ counter.from }}</span>
        <span class="text-xs text-gray-800"> to {{ counter.to }}</span>
        <span class=" text-xs text-gray-800 font-medium"> of </span>
        <span class=" text-xs text-gray-800 ">{{ counter.total }}</span>
    </div>
</template>

<script setup>
import {computed, ref} from "vue";
import {useObj} from "@/Composable/useObj.js";

const props = defineProps({
    content: {
        type: Object,
        default: {}
    },
})

const {hasKey, length} = useObj()
const emit = defineEmits(['counter'])
const counter = computed(() => calculateCounter())


const calculateCounter=()=>{
    let counter={};
    if (hasKey(props.content,'meta') && length(props.content.meta) >1){
        const meta = props.content.meta;
        counter={
            from:meta.from || 0,
            to:meta.to || 0,
            total:meta.total || 0
        }
    }
    else {
        const count =props.content.data.length
        counter={
            from:1,
            to:count,
            total:count
        }
    }
    emit('counter',counter)
    return  counter
}


</script>

<style scoped>

</style>