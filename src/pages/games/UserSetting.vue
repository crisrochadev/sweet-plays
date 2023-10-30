<template>
    <div>
<div class="w-full h-10 px-4 text-cyan-600 hover:text-cyan-900" @click="store.logout">
    sair
</div>
    </div>
</template>

<script>
    import {useApi} from "@/stores/index.js"
    export default {
      data(){
          const store = useApi()
          return{
              store
          }
      }  
    }
</script>

<style lang="scss" scoped>

</style>
