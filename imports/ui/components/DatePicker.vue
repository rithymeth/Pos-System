<template>
  <div>
    <fieldset>
      <legend>Date Picker</legend>
      <div class="row justify-around">
        <div class="col-md-5 col-xs-11 q-ma-sm">
          <q-input v-model="form.fromDate" outlined dense mask="date">
            <template v-slot:append>
              <q-icon name="event">
                <q-popup-proxy
                  ref="qDateProxy"
                  transition-show="scale"
                  transition-hide="scale"
                >
                  <q-date v-model="form.fromDate">
                    <div class="row items-center justify-end">
                      <q-btn v-close-popup label="Close" color="primary" flat />
                    </div>
                  </q-date>
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>
        </div>
        <div class="col-md-5 col-xs-11 q-ma-sm">
          <q-input v-model="form.toDate" outlined dense mask="date">
            <template v-slot:append>
              <q-icon name="event">
                <q-popup-proxy
                  ref="qDateProxy"
                  transition-show="scale"
                  transition-hide="scale"
                >
                  <q-date v-model="form.toDate">
                    <div class="row items-center justify-end">
                      <q-btn v-close-popup label="Close" color="primary" flat />
                    </div>
                  </q-date>
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>
        </div>
        <div class="col-md-1 col-xs-11 q-ma-sm">
          <q-btn
            class="full-width"
            label="Search"
            color="primary"
            @click="handleSubmit"
          />
        </div>
      </div>
    </fieldset>
  </div>
</template>

<script>
import moment from "moment";
export default {
  data() {
    return {
      form: {
        fromDate: "",
        toDate: "",
      },
      items: [],
      imports: [],
    };
  },
  methods: {
    handleSubmit() {
      let doc = {
        fromDate: moment(this.form.fromDate, "YYYY/MM/DD").toDate(),
        toDate: moment(this.form.toDate, "YYYY/MM/DD").toDate(),
      };
      this.$emit("submit", doc);
    },
  },
};
</script>

<style>
</style>