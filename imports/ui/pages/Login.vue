<template>
  <div>
    <div class="row justify-center">
      <div class="col-3 absolute-center">
        <div class="row justify-center full-width">
          <center>
            <q-icon name="person" color="primary" size="10rem" />
          </center>
        </div>
        <q-card>
          <q-card-section class="text-center text-h5 text-gray-8">
            Login
          </q-card-section>
          <q-card-section>
            <div class="q-ma-sm">
              <q-input v-model="users.username" label="User Name" outlined />
            </div>
            <div class="q-ma-sm">
              <q-input
                v-model="users.password"
                label="Password"
                type="password"
                outlined
              />
            </div>
            <div class="text-center">
              <q-btn @click="handleLogin()" label="Login" color="primary" />
            </div>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      users: [
        {
          username: "",
          password: "",
        },
      ],
    };
  },
  methods: {
    handleLogin() {
      Meteor.loginWithPassword(
        this.users.username,
        this.users.password,
        (error) => {
          if (!error) {
            console.log("userId", Meteor.userId());
            this.$router.push({ name: "home" });
          } else {
            console.log("error", error);
          }
        }
      );
    },
  },
};
</script>

<style>
</style>