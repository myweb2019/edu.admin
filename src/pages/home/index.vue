<template>
    <div></div>
</template>
<script lang="ts">
import { defineComponent, reactive, ref, toRefs, onMounted } from "vue";
import { Http } from '../../api/http'
export default defineComponent({
    name: "Login",
    setup() {
        onMounted(() => {
            Http.getUserlist().then(res => {
                console.log(res);
            })
        })
    }
})
</script>
<style lang="">
</style>