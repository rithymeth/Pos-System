<template>
  <div>
    <Item  v-if="isItem"/>
    <button @click="changeItem">ChandgeItem</button>
  </div>
</template>

<script>
export default {
data(){
return{

};
},
methods:{
changeItem() {
  this.isItem = !this.isItem;
},
},
beforeCreate(){
  console.log("before Create");
},
created(){
  console.log("Created");
},
beforeMount(){
  console.log("before Mount");
},
mounted(){
  console.log("mounted");
},
updated(){
  console.log("updated");
},
beforeUpdate(){
  console.log("before UPdated");
},
beforeDestroy(){
  console.log("before Destroy");
},
destroyed(){
  console.log("destroyed");
},
};
</script>

<style>

</style>