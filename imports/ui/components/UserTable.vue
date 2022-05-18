<template>
  <div>
    <q-markup-table>
      <thead>
        <tr>
          <th class="text-left">No</th>
          <th class="text-left">Username</th>
          <th class="text-left">Email</th>
          <th class="text-left">Phone</th>
          <th class="text-left">Role</th>
          <th class="text-center">Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(user, index) in items" :key="index">
          <td class="text-left">{{ index + 1 }}</td>
          <td class="text-left">{{ user.username }}</td>
          <td class="text-left">{{ user.email }}</td>
          <td class="text-left">{{ user.phone }}</td>
          <td class="text-left">{{ user.role }}</td>
          <td class="text-center">
            <q-btn
              icon="delete"
              dense
              color="red"
              @click="onDelete(user._id)"
            />
            <q-btn
              icon="edit"
              dense
              color="info"
              @click="onEdit(user, index)"
            />
          </td>
        </tr>
      </tbody>
    </q-markup-table>
  </div>
</template>

<script>
export default {
  props: {
    items: {
      type: Array,
    },
  },
  methods: {
    onDelete(id) {
      Meteor.call("removeUser", id, (error, result) => {
        if (result) {
          this.$emit("delete");
        } else {
          console.log("error", error);
        }
      });
    },
    onEdit(doc, index) {
      this.$emit("edit", { doc, index });
    },
  },
};
</script>

<style>
</style>