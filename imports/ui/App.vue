<template>
  <component :is="currentLayout"></component>
</template> 
<script>
import AdminLayout from "./layouts/AdminLayout.vue";
import PublicLayout from "./layouts/PublicLayout.vue";
export default {
  data() {
    return {
      currentLayout: null,
    };
  },
  watch: {
    $route: {
      immediate: true,
      handler(newValue, oldValue) {
        console.log("new", newValue);
        if (newValue.meta.requiresAuth && newValue.name != "home") {
          this.currentLayout = AdminLayout;
        } else {
          this.currentLayout = PublicLayout;
        }
      },
    },
  },
};
</script> <style>
</style>