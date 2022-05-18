<template>
  <div>
    <q-layout view="hHh lpR fFf">
      <q-header elevated class="bg-primary text-white">
        <q-toolbar>
          <q-btn dense flat round icon="menu" @click="left = !left" />

          <q-toolbar-title class="absolute-center">
            {{ title }}
          </q-toolbar-title>
        </q-toolbar>
      </q-header>

      <q-drawer show-if-above v-model="left" side="left" bordered>
        <!-- drawer content -->
        <q-list bordered class="menu">
          <q-item class="item" clickable v-ripple @click="handleGo('home')">
            <q-item-section avatar>
              <q-icon color="primary" name="home" />
            </q-item-section>

            <q-item-section>Home</q-item-section>
          </q-item>

          <q-item class="item" clickable v-ripple @click="handleGo('user')">
            <q-item-section avatar>
              <q-icon color="primary" name="person" />
            </q-item-section>

            <q-item-section>User</q-item-section>
          </q-item>

          <q-item class="item" clickable v-ripple @click="handleGo('customer')">
            <q-item-section avatar>
              <q-icon color="primary" name="group" />
            </q-item-section>

            <q-item-section>Customer</q-item-section>
          </q-item>

          <q-item class="item" clickable v-ripple @click="handleGo('category')">
            <q-item-section avatar>
              <q-icon color="primary" name="category" />
            </q-item-section>

            <q-item-section>Category</q-item-section>
          </q-item>

          <q-item class="item" clickable v-ripple @click="handleGo('item')">
            <q-item-section avatar>
              <q-icon color="primary" name="category" />
            </q-item-section>

            <q-item-section>Item</q-item-section>
          </q-item>
          <q-item class="item" clickable v-ripple @click="handleGo('supplier')">
            <q-item-section avatar>
              <q-icon color="primary" name="inventory_2" />
            </q-item-section>

            <q-item-section>Supplier</q-item-section>
          </q-item>
          <q-item class="item" clickable v-ripple @click="handleGo('purchase')">
            <q-item-section avatar>
              <q-icon color="primary" name="shop_2" />
            </q-item-section>

            <q-item-section>Purchase</q-item-section>
          </q-item>
          <q-separator />
          <q-item class="item" clickable v-ripple @click="handleGo('sale')">
            <q-item-section avatar>
              <q-icon color="primary" name="chrome_reader_mode" />
            </q-item-section>

            <q-item-section>Sale</q-item-section>
          </q-item>
          <q-separator />
          <q-item class="item" clickable v-ripple @click="handleGo('import')">
            <q-item-section avatar>
              <q-icon color="primary" name="import_export" />
            </q-item-section>

            <q-item-section>Import</q-item-section>
          </q-item>
          <q-item class="item" clickable v-ripple @click="handleGo('export')">
            <q-item-section avatar>
              <q-icon color="primary" name="import_export" />
            </q-item-section>

            <q-item-section>Export</q-item-section>
          </q-item>
          <q-item class="item" clickable vripple @click="handleLogout">
            <q-item-section avatar>
              <q-icon color="primary" name="logout" />
            </q-item-section>
            <q-item-section> Logout </q-item-section>
          </q-item>
        </q-list>
      </q-drawer>

      <q-page-container>
        <router-view />
      </q-page-container>
    </q-layout>
  </div>
</template>

<script>
export default {
  data() {
    return {
      left: true,
    };
  },
  computed: {
    title() {
      console.log(this.$route);
      let currentPath = this.$route.fullPath;
      if (currentPath == "/") return "Home";
      else if (currentPath == "/user") return "User";
      else if (currentPath == "/category") return "Category";
      else if (currentPath == "/customer") return "Customer";
      else if (currentPath == "/home") return "Home";
      else if (currentPath == "/login") return "Login";
      else if (currentPath == "/item") return "Item";
      else if (currentPath == "/supplier") return "Supplier";
      else if (currentPath == "/purchase") return "Purchase";
      else if (currentPath == "/sale") return "Sale";
      else if (currentPath == "/import") return "Import";
      else if (currentPath == "/export") return "Export";
    },
  },
  methods: {
    handleGo(name) {
      this.$router.push({ name: name });
      this.left = false;
    },
    handleLogout() {
      Meteor.logout(() => {
        this.$router.push({ name: "login" });
      });
    },
  },
};
</script>
<style>
.menu :hover.item {
  transform: scale(1.15);
  transition: transform 0.2s;
  background: rgb(245, 245, 245);
  margin-left: 20px;
  color: rgb(1, 98, 255);
}
.menu .item {
  transform: scale(1);
  transition: transform 1s;
}
</style>
