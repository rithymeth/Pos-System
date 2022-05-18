<template>
  <div>
    <h1>Active: {{ active }}</h1>
    <h4 class="static-class">This is a static class</h4>
    <h4 :class="{ 'binding-class': active }">This is a Dynamic class</h4>
    <button @click="changeActive">Change Active</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      active: true,
    };
  },
  methods: {
    changeActive() {
      this.active = !this.active;
    },
  },
};
</script>

<style>
.static-class {
  text-align: center;
  color: rebeccapurple;
  font-size: 30px;
}
.binding-class {
  text-align: center;
  color: blue;
}
</style>
