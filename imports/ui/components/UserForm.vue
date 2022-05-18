<template>
  <div>
    <div class="row justify-center">
      <div class="col-lg-3 col-md-5 col-sm-10 col-xs-11 q-ma-sm">
        <q-input outlined label="Usernname" v-model="form.username" />
      </div>
      <div class="col-lg-3 col-md-5 col-sm-10 col-xs-11 q-ma-sm">
        <q-input outlined label="Email" v-model="form.email" />
      </div>
      <div class="col-lg-3 col-md-5 col-sm-10 col-xs-11 q-ma-sm">
        <q-input outlined label="Phone" v-model="form.phone" />
      </div>
      <div class="col-lg-3 col-md-5 col-sm-10 col-xs-11 q-ma-sm">
        <q-select
          v-model="form.role"
          :options="options"
          label="Role"
          option-value="value"
          option-label="label"
          map-options
          emit-value
        />
      </div>
      <div
        class="col-lg-3 col-md-5 col-sm-10 col-xs-11 q-ma-sm"
        v-if="reset || !form._id"
      >
        <q-input
          outlined
          label="Password"
          type="password"
          v-model="form.password"
        />
      </div>
      <div
        class="col-lg-3 col-md-5 col-sm-10 col-xs-11 q-ma-sm"
        v-if="reset || !form._id"
      >
        <q-input
          outlined
          label="Confirm"
          type="password"
          v-model="form.confirmPassword"
        />
      </div>
      <div class="q-pa-md col-sm-10" v-if="form._id">
        <q-checkbox v-model="reset" label="Reset" />
      </div>
      <div class="col-12 q-ma-sm text-center">
        <q-btn label="Submit" color="primary" @click="handleSubmit" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    updateDoc: {
      type: Object,
    },
  },
  mounted() {
    if (this.updateDoc) {
      this.form = Object.assign({}, this.updateDoc.doc);
    }
  },
  data() {
    return {
      options: [
        {
          label: "Admin",
          value: "admin",
        },
        {
          label: "Sale",
          value: "sale",
        },
      ],
      reset: null,
      form: {
        username: null,
        email: null,
        phone: null,
        password: null,
        confirmPassword: null,
        role: null,
      },
    };
  },
  methods: {
    handleSubmit() {
      if (this.updateDoc) {
        this.form.reset = this.reset;
        //   code update
        Meteor.call("updateUser", this.form, (error, result) => {
          if (result) {
            this.$emit("submit");
          } else {
            console.log("error", error);
          }
        });
      } else {
        //   code insert
        Meteor.call("insertUser", this.form, (error, result) => {
          if (result) {
            this.$emit("submit", this.form);
          } else {
            console.log("error", error);
          }
        });
        this.$emit("submit", this.form);
      }
    },
  },
};
</script>

<style></style>
