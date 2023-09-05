<template>
    <div class="">
        <div class="flex justify-start items-center space-x-2" v-if="actionType==='iconButtons'">
            <template v-for="(action,actionIndex) in actionList" :key="actionIndex">
                <a href="#" @click.prevent="handleEmit(processRoute(action,content))"
                   v-if="!hasCondition(action)"
                   v-html="action.icon"
                   class="rounded-full w-6 h-6 flex justify-center items-center bg-gray-200 p-1">
                </a>
                <a href="#" @click.prevent="handleEmit(processRoute(action,content))"
                   v-if="hasCondition(action)"
                   v-html="handleConditions(action, content).icon"
                   class="rounded-full w-6 h-6 flex justify-center items-center bg-gray-200 p-1">
                </a>
            </template>
        </div>
        <div class="flex justify-start items-center space-x-2" v-if="actionType==='textButtons'">
            <template v-for="(action,actionIndex) in actionList" :key="actionIndex">
                <a href="#" @click.prevent="handleEmit(processRoute(action,content))"
                   v-if="!hasCondition(action)"
                   class="rounded w-fit flex justify-center items-center bg-gray-200 text-xs px-2 py-1"
                >
                <span>
                    {{ action.label }}
                </span>
                </a>
                <a href="#" @click.prevent="handleEmit(processRoute(action,content))"
                   v-if="hasCondition(action)"
                   class="rounded w-fit flex justify-center items-center bg-gray-200 text-xs px-2 py-1"
                >
                    <span>{{ handleConditions(action, content).label }}</span>
                </a>
            </template>

        </div>
    </div>
</template>

<script setup>

import {useObj} from "@/Composable/useObj.js";
import {useStatics} from "@/Composable/useStatics.js";

const props = defineProps({
    options: {
        type: Object,
        default: {}
    },
    content: {
        type: Object,
        required: true
    }
})
const emit = defineEmits(['table-action'])
const {hasKey, length} = useObj()
const {actionTypes, actionReturnTypes} = useStatics();
const actionType = hasKey(props.options, 'type') && actionTypes.includes(props.options.type) ? props.options.type : "dropDown"
const actionList = hasKey(props.options, 'data') ? props.options.data : {}
const actionReturnType = hasKey(props.options, 'return') ? props.options.return : "object"

const processRoute = (action, data) => {
    if (!actionReturnTypes.includes(actionReturnType)) {
        return ""
    }
    if (actionReturnType === 'object') {
        let processedParams = {};
        for (const key in action.params) {
            processedParams[key] = data[action.params[key]]
        }
        let newActions = handleConditions(action, data)
        return {route: newActions.route, params: processedParams, method: newActions.method}
    }
    if (actionReturnType === 'string') {
        let newActions = handleConditions(action, data)
        let processedRoute = newActions.route.trim()
        for (const key in action.params) {
            const regex = new RegExp(`:${key}`, 'g')
            processedRoute = processedRoute.replace(regex, data[action.params[key]])
        }
        return processedRoute;
    }
}
const hasCondition = (action) => {
    return hasKey(action, 'condition')
}
const handleConditions = (action, content) => {
    let defaults = {
        label: action.label,
        route: action.route,
        icon: action.icon,
    }
    if (hasCondition(action) && hasKey(action.condition, 'check')) {
        if (action.condition.check.is === 'eq') {
            return hasKey(action.condition.then, content[action.condition.check.if].toString()) ?
                action.condition.then[content[action.condition.check.if].toString()] : defaults

        }
    }
    return defaults
}
const handleEmit = (data) => {
    emit('table-action', data)
}
</script>

<style scoped>

</style>