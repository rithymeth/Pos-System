<template>
  <div>
    Name: <input v-model="users.name" /><br />
    Phone: <input v-model="users.phone" /><br />
    Email: <input v-model="users.email" /><br />
    <br />
    <button @click="adduser()">Add item</button>
    <table>
      <thead>
        <th>Name</th>
        <th>Phone</th>
        <th>Email</th>
      </thead>
      <tbody>
        <tr v-for="user in users" :key="user">
          <td>{{ user.name }}</td>
          <td>{{ user.phone }}</td>
          <td>{{ user.email }}</td>
          <td><button @click="deluser()">X</button></td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: null,
      phone: null,
      email: null,
      users: [
        {
          name: "Rithy",
          phone: "070411981",
          email: "pilotrithy@gmail.com",
        },
      ],
    };
  },
  methods: {
    adduser() {
      this.users.push({
        name: this.users.name,
        phone: this.users.phone,
        email: this.users.email,
      });
    },
     deluser (index){
        this.users.splice(index, 1);
        
      }
  },
};
</script>

<style></style>
