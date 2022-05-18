<template>
  <div>
    <h1>Active: {{ objectClass }}</h1>
    <h4 class="static-class">This is a static class</h4>
    <h4 :class="objectClass">this is a Dynamic class</h4>
    <button @click="changeActive">Change Active</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      objectClass: {
        "binding-class": true,
        font: true,
      },
    };
  },
  methods: {
    changeActive() {
      this.objectClass.font = !this.objectClass.font;
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
.font {
  font-size: 24px;
}
</style>