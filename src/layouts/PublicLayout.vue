<template>
    <div class="w-screen h-screen overflow-hidden">
    
        <router-view :key="$route.path" />
    </div>
</template>

<script>
    export default {
        
    }
</script>

<style lang="scss" scoped>

</style>
