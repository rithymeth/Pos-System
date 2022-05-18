<template>
  <div>
    <div class="full-width">
      <center>
        <img src="../img/logo.png" alt="logo" />
      </center>
    </div>
    <div class="row justify-center">
      <div class="col-2 q-ma-xl" v-for="(menu, index) in menus" :key="index">
        <q-btn :color="menu.color" size="xl" @click="handleClick(menu.name)">
          <div class="full-width">
            <q-icon :name="menu.icon" size="10rem" />
          </div>
          <div class="text-gray-8 text-center">{{ menu.label }}</div>
        </q-btn>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      menus: [
        {
          label: "User",
          icon: "person",
          name: "user",
          color: "primary",
        },
        {
          label: "Customer",
          icon: "groups",
          name: "customer",
          color: "deep-orange",
        },
        {
          label: "Supplier",
          icon: "shop_2",
          name: "supplier",
          color: "amber",
        },
        {
          label: "Category",
          icon: "category",
          name: "category",
          color: "secondary",
        },
        {
          label: "Item",
          icon: "view_agenda",
          name: "item",
          color: "primary",
        },
        {
          label: "Purchase",
          icon: "inventory_2",
          name: "purchase",
          color: "deep-orange",
        },
        {
          label: "Quick Sale",
          icon: "add_shopping_cart",
          name: "import",
          color: "amber",
        },
        {
          label: "Export",
          icon: "import_export",
          name: "export",
          color: "secondary",
        },
        {
          label: "Print",
          icon: "print",
          name: "print",
          color: "secondary",
        },
      ],
    };
  },
  methods: {
    handleClick(name) {
      this.$router.push({ name: name });
    },
  },
};
</script>

<style>
</style>