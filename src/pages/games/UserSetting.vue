<template>
    <div claas="flex flex-col justify-start items-start w-full p-2 gap-2">
<div class="w-full h-10 px-4 text-white bg-cyan-600 hover:bg-cyan-900 rounded shadow-md" @click="store.logout">
    sair
</div>
    </div>
</template>

<script>
    import {useApi} from "@/store/index.js"
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
