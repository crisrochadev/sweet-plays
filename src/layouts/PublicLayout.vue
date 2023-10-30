<template>
    <div class="w-screen h-screen overflow-hidden">
        <div>
            <router-link :to="{name:'login'}">Entrar</router-link>
        </div>
        <router-view :key="$route.path" />
    </div>
</template>

<script>
    export default {
        
    }
</script>

<style lang="scss" scoped>

</style>