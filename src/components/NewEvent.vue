<template>
  <div>
    <section class="container section" role="main">
      <h1 class="title is-1">
        {{ newEvent.name || "New " }} {{ newEvent.category }}
      </h1>
      <article class="message is-danger" v-if="globalError">
        <div class="message-body">{{ globalError }}</div>
      </article>

      <div class="box">
        <div class="field is-horizontal">
          <div class="field-label is-normal">
            <label class="label">Type</label>
          </div>
          <div class="field-body">
            <div class="field">
              <div class="control">
                <div class="buttons has-addons">
                  <button
                    class="button is-capitalized"
                    v-bind:key="type"
                    v-for="type in types"
                    @click="newEvent.category = type"
                    v-bind:class="{
                      'is-success is-selected': newEvent.category == type
                    }"
                  >
                    {{ type }}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="field is-horizontal">
          <div class="field-label is-normal">
            <label class="label">Specialization</label>
          </div>
          <div class="field-body">
            <div class="field">
              <div class="control">
                <v-select
                  filterable
                  :options="allTopicsOrdered"
                  v-model="newEvent.topic"
                  label="name"
                  :class="{ 'is-danger': validationErrors.topic }"
                  :reduce="item => item.code"
                >
                  <template #search="{ attributes, events }">
                    <input
                      class="vs__search"
                      v-bind="attributes"
                      v-on="events"
                    />
                  </template>
                  <template v-slot:option="option">
                    <div class="columns is-mobile">
                      <div class="column is-narrow">
                        <img
                          :src="'/icons/topics/' + option.code + '.png'"
                          :alt="option.code"
                          class="icon"
                        />
                      </div>
                      <div class="column">
                        {{ option.name }}
                      </div>
                    </div>
                  </template>
                </v-select>
              </div>
            </div>
          </div>
        </div>

        <div class="field is-horizontal">
          <div class="field-label is-normal">
            <label class="label" for="conferenceName">Name</label>
          </div>
          <div class="field-body">
            <div class="field">
              <div class="control">
                <input
                  class="input is-shadowless"
                  id="conferenceName"
                  v-model="newEvent.name"
                  :class="{ 'is-danger': validationErrors.name }"
                />
              </div>
            </div>
          </div>
        </div>

        <div class="field is-horizontal">
          <div class="field-label is-normal">
            <label class="label" for="websiteUrl">Website</label>
          </div>
          <div class="field-body">
            <div class="field">
              <div class="control">
                <input
                  id="websiteUrl"
                  class="input is-shadowless"
                  placeholder="URL"
                  v-model="newEvent.url"
                  :class="{ 'is-danger': validationErrors.url }"
                />
              </div>
            </div>
          </div>
        </div>

        <div class="field is-horizontal">
          <div class="field-label is-normal">
            <label class="label" for="twitterHandle">Twitter</label>
          </div>
          <div class="field-body">
            <div class="field">
              <div class="control has-icons-left">
                <input
                  id="twitterHandle"
                  placeholder="Can be a handle, @handle or a link"
                  class="input is-shadowless"
                  v-model="newEvent.twitter"
                  :class="{ 'is-danger': validationErrors.twitter }"
                />
                <span class="icon is-left">
                  <font-awesome-icon :icon="['fab', 'twitter']" />
                </span>
              </div>
            </div>
          </div>
        </div>

        <hr />
        <div class="field is-horizontal">
          <div class="field-label is-normal">
            <label class="label" for="country">Location</label>
          </div>
          <div class="field-body">
            <div class="field">
              <p class="control">
                <span
                  class="select is-fullwidth"
                  :class="{ 'is-danger': validationErrors.countryCode }"
                >
                  <select
                    id="country"
                    v-model="newEvent.countryCode"
                    @change="countrySelected()"
                  >
                    <option
                      v-for="country in countries"
                      :key="country.code"
                      :value="country.code"
                      >{{ country.name }}</option
                    >
                  </select>
                </span>
              </p>
            </div>
          </div>
        </div>

        <div class="field is-horizontal" v-if="isUSA">
          <div class="field-label is-normal">
            <label class="label" for="state">State</label>
          </div>
          <div class="field-body">
            <div class="field">
              <p class="control">
                <span
                  class="select is-fullwidth"
                  :class="{ 'is-danger': validationErrors.stateCode }"
                >
                  <select v-model="newEvent.stateCode" class="is-shadowless">
                    <option
                      id="state"
                      v-for="(stateName, stateCode) in states"
                      :key="stateCode"
                      :value="stateCode"
                      >{{ stateName }}</option
                    >
                  </select>
                </span>
              </p>
            </div>
          </div>
        </div>

        <div class="field is-horizontal" v-if="!isOnline">
          <div class="field-label is-normal">
            <label class="label" for="city">City</label>
          </div>
          <div class="field-body">
            <div class="field">
              <div class="field">
                <div class="field">
                  <p class="control">
                    <input
                      id="city"
                      class="input is-shadowless"
                      :disabled="isOnline"
                      v-model="newEvent.city"
                      :class="{ 'is-danger': validationErrors.city }"
                    />
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="field is-horizontal">
          <div class="field-label is-normal">
            <label class="label" for="dateFrom">Date (from)</label>
          </div>
          <div class="field-body">
            <div class="field">
              <p class="control">
                <DatePicker
                  v-model="datePickerStartDate"
                  color="green"
                  :popover="{ visibility: 'click' }"
                  :masks="{ input: ['D MMM YYYY'] }"
                  :input-props="{
                    placeholder: 'From'
                  }"
                  :min-date="tomorrow()"
                >
                  <input
                    id="dateFrom"
                    slot-scope="{ inputProps, inputEvents, isDragging }"
                    :class="[
                      'input is-shadowless',
                      { 'has-text-grey-lighter': isDragging },
                      { 'is-danger': validationErrors.dates }
                    ]"
                    v-bind="inputProps"
                    v-on="inputEvents"
                  />
                </DatePicker>
              </p>
            </div>
            <div class="field-label is-normal">
              <label class="label" for="dateTo">Date (to)</label>
            </div>
            <div class="field">
              <p class="control">
                <DatePicker
                  v-model="datePickerEndDate"
                  color="green"
                  :popover="{ visibility: 'click' }"
                  :masks="{ input: ['D MMM YYYY'] }"
                  :input-props="{
                    placeholder: 'To'
                  }"
                  :min-date="newEvent.dates.start"
                >
                  <input
                    id="dateTo"
                    slot-scope="{ inputProps, inputEvents, isDragging }"
                    :class="[
                      'input is-shadowless',
                      { 'has-text-grey-lighter': isDragging },
                      { 'is-danger': validationErrors.dates }
                    ]"
                    v-bind="inputProps"
                    v-on="inputEvents"
                  />
                </DatePicker>
              </p>
            </div>
          </div>
        </div>
        <div class="field is-horizontal">
          <div class="field-label">
            <label class="label">&nbsp;</label>
          </div>
          <div class="field-body">
            <div class="field">
              <div class="control">
                <div class="buttons has-addons">
                  <button
                    class="button"
                    @click="newEvent.price.free = true"
                    v-bind:class="{
                      'is-success is-selected': newEvent.price.free
                    }"
                  >
                    Free {{ newEvent.category }}
                  </button>
                  <button
                    class="button"
                    @click="newEvent.price.free = false"
                    v-bind:class="{
                      'is-danger is-selected': !newEvent.price.free
                    }"
                  >
                    Paid {{ newEvent.category }}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <hr />
        <div class="columns">
          <div class="column">
            <div class="buttons is-pulled-right">
              <button class="button is-capitalized" @click="close()">
                close
              </button>
              <button
                class="button is-success is-capitalized"
                @click="submitForm()"
              >
                submit
              </button>
            </div>
            <button
              @click="close()"
              class="modal-close is-large"
              aria-label="close"
            ></button>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
<script>
import vSelect from "vue-select";
import DatePicker from "v-calendar/lib/components/date-picker.umd";
import { Locale } from "v-calendar";
import { mapState, mapActions } from "vuex";
import { tomorrow } from "../utils/dates";
import states from "../utils/states";
const locale = new Locale();
export default {
  data: () => {
    return {
      states: states,
      newEvent: {
        category: "conference",
        topic: undefined,
        price: {
          free: false
        },
        dates: {
          start: undefined,
          end: undefined
        },
        countryCode: "ON",
        city: "Online"
      }
    };
  },
  computed: {
    datePickerEndDate: {
      get() {
        return this.newEvent.dates.end
          ? locale.parse(this.newEvent.dates.end, "YYYY-MM-DD")
          : undefined;
      },
      set(endDate) {
        this.newEvent.dates.end = endDate
          ? locale.format(endDate, "YYYY-MM-DD")
          : undefined;
      }
    },
    datePickerStartDate: {
      get() {
        return this.newEvent.dates.start
          ? locale.parse(this.newEvent.dates.start, "YYYY-MM-DD")
          : undefined;
      },
      set(startDate) {
        this.newEvent.dates.start = startDate
          ? locale.format(startDate, "YYYY-MM-DD")
          : undefined;
      }
    },
    isOnline() {
      return this.newEvent.countryCode === "ON";
    },
    isUSA() {
      return this.newEvent.countryCode === "US";
    },
    ...mapState(["allTopicsOrdered"]),
    ...mapState("creation", [
      "validationErrors",
      "globalError",
      "types",
      "countries"
    ])
  },
  mounted() {
    this.fetchInfo();
  },
  head: {
    title: function() {
      return {
        separator: " ",
        complement: " ",
        inner: "Add an event"
      };
    }
  },
  methods: {
    tomorrow,
    countrySelected() {
      delete this.newEvent.stateCode;
      delete this.newEvent.city;

      if (this.isOnline) {
        this.newEvent.city = "Online";
      }
    },
    submitForm() {
      this.createNew(this.newEvent);
    },
    close() {
      this.$router.push({ name: "confs", params: this.$route.query });
    },
    ...mapActions("creation", ["createNew", "fetchInfo"])
  },
  components: { DatePicker, vSelect }
};
</script>
<style lang="scss" scoped>
.modal-close::before,
.modal-close::after {
  background-color: black !important;
}
</style>
