<template>
  <div class="w-screen h-screen overflow-hidden flex justify-center items-center">
    <img src="/img/logo.svg" class="w-[200px] h-[200px]"/>
  </div>
</template>

<script>
import { useApi } from "@/store/index.js";
import authUser from "@/services/auth";
export default {
  data() {
    const store = useApi();

    return {
      store,
      
    };
  },
 async mounted() {
   
       const user = authUser()
    console.log(this.store.db);
    const data = await this.store.get
    console.log(data);
   if(user.success){
     setTimeout(()=>{
       this.$router.push({name:"play",params:{uid:user.uid}})
     },1000)
   }else{
     this.$router.push({name:"login"})
   }
  },
};
</script>

<style lang="scss" scoped></style>
