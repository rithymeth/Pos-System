<template>
  <div class="q-pa-md">
    <q-dialog
      v-model="dialog"
      persistent
      :maximized="true"
      transition-show="slide-up"
      transition-hide="slide-down"
    >
      <q-card>
        <q-bar>
          <q-space />
          <q-btn dense icon="close" color="red" round @click="handleClose">
            <q-tooltip content-class="bg-white text-primary">Close</q-tooltip>
          </q-btn>
        </q-bar>
        <q-card-section>
          <user-form @submit="handleSubmit" :updateDoc="updateDoc" />
        </q-card-section>
      </q-card>
    </q-dialog>
    <q-btn
      icon="add"
      dense
      color="primary"
      class="q-mb-md"
      @click="dialog = true"
    />
    <user-table :items="users" @delete="handleDelete" @edit="handleEdit" />
  </div>
</template>
<script>
import UserForm from "../components/UserForm.vue";
import UserTable from "../components/UserTable.vue";
export default {
  components: {
    UserTable,

    UserForm,
  },
  data() {
    return {
      dialog: false,
      updateDoc: null,
      users: [],
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    handleClose() {
      this.updateDoc = null;
      this.dialog = false;
    },
    getData() {
      Meteor.call("findUser", (error, result) => {
        if (result) {
          this.users = result;
        } else {
          console.log("error", error);
        }
      });
    },
    handleSubmit() {
      this.getData();
      this.dialog = false;
    },
    handleDelete(id) {
      this.getData();
    },
    handleEdit(doc) {
      this.dialog = true;
      this.updateDoc = Object.assign({}, doc);
    },
  },
};
</script>
