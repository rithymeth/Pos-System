<template>
  <div>
    First Name: <input type="text" v-model="frname"/>
    <br />
    Last Name: <input type="text" v-model="lsname">
    <br />
    
    Full name: {{fullname}}
  </div>
</template>

<script>
export default {
data(){
  return{
    frname: null,
    lsname: null,
    fullname: null,
  };
},
watch:{
frname(val){
  this.fullname = `${val} ${this.lsname}`;
},
 lsname(val){
    this.fullname = `${this.frname} ${val}`;
 }
}
};
</script>

<style>

</style>