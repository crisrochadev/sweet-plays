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
    const user = authUser()
    return {
      store,
      user
    };
  },
 async mounted() {
    console.log(this.store.db);
    const data = await this.store.get
    console.log(data);
   if(this.user.success){
     setTimeout(()=>{
       this.$router.push({name:"play",params:{uid:this.user.uid})
     },1000)
   }
  },
};
</script>

<style lang="scss" scoped></style>
