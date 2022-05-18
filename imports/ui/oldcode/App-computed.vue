<template>
  <div>
    First Name: <input type="text" v-model="frname"/>
    <br />
    Last Name: <input type="text" v-model="lsname"><br />
    
    Fullname: {{fullname}}
  </div>
</template>

<script>
export default {
data(){
  return{
    frname: null,
    lsname: null,
  };
},
computed:{
fullname(){
  return this.frname + ' ' + this.lsname;
}
}
};
</script>

<style>

</style>