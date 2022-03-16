<template>
<select2 v-model="myValue"  :options="options"/>
</template>

<script>
export default {
  name: "z-select",
  props: [/*'modelValue','placeholder',*/'options',/*'label_id', 'label'*/],
  data() {
    return {
      myValue: '',
      myOptions: ['op1', 'op2', 'op3'] // or [{id: key, text: value}, {id: key, text: value}]
    }
  },
}
</script>

<style scoped>

</style>