<template>
    <router-view></router-view>
</template>

<script lang="ts">
import { defineComponent, onBeforeMount } from "vue";
import { Http } from './api/http'
export default defineComponent({
    name: "App",
    setup() {
        onBeforeMount(() => {
            Http.getCode()
        })
    }
});
</script>

<style>
</style>
