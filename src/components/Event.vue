<template>
  <div class="columns is-mobile" v-bind:class="{ featured: event.featured }">
    <JsonLd :event="event" />
    <div class="column is-one-quarter">
      <span class="has-text-grey is-size-7">
        <span v-if="event.featured">
          <font-awesome-icon :icon="['far', 'heart']" class="has-text-danger" />
          Best seller
        </span>
        <span v-else-if="$store.state.sorting === 'newestFirst'">
          added
          {{ formatRelative(event.creationDate) }}
        </span>
        <br />
      </span>
      <time class="has-text-weight-bold is-size-7-mobile">
        {{ formatRange(event.startDate, event.endDate) }}
        <span
          class="has-text-grey-darker is-size-7 is-relative"
          style="top: -5px"
        >
          {{ year(event.startDate) }}
        </span>
      </time>
      <br />
    </div>
    <div class="column is-narrow">
      <figure class="image is-48x48" v-if="event.featured">
        <a :href="event.url" target="_blank">
          <img
            :src="'https://dossier.glitch.me/avatar/' + event.twitter"
            :alt="'Twitter icon for ' + event.name"
            class="is-rounded"
          />
        </a>
      </figure>
      <figure v-else class="image is-32x32">
        <img
          :src="'/icons/topics/' + event.topics[0] + '.png'"
          :alt="event.topics[0]"
          class="icon"
        />
      </figure>
    </div>
    <div class="column">
      <h2 class="title is-5">
        <a
          :href="event.url"
          target="_blank"
          v-if="event.featured"
          class="has-text-dark is-uppercase"
        >
          {{ event.name }}
        </a>
        <router-link
          v-else
          class="has-text-dark is-uppercase"
          :to="{ name: 'conf', params: { id: event.id } }"
          >{{ event.name }}</router-link
        >

        <span v-if="isAdmin">
          <router-link
            class="tag is-borderless"
            :to="{ name: 'edit', params: { id: event.id } }"
          >
            <font-awesome-icon icon="edit" title="Edit event" />
          </router-link>
          <a class="tag is-borderless" @click="deleteEvent(event.id)">
            <font-awesome-icon icon="times" class="has-text-danger" />
          </a>
        </span>
      </h2>
      <h3 class="subtitle is-6">
        <ManyTopics
          classes="has-text-grey-dark has-text-weight-bold"
          :topics="event.topics"
        />
        {{ event.category
        }}<span v-if="event.countryCode === 'ON'"
          >,<router-link
            class="has-text-grey-dark has-text-weight-bold"
            :to="
              route('confs', {
                country: undefined,
                continent: event.continentCode
              })
            "
          >
            {{ event.country }}
          </router-link>
        </span>
        <span v-else>
          in
          {{ event.city + (event.stateCode ? `, ${event.stateCode}` : "") }},
          <router-link
            class="has-text-grey-dark has-text-weight-bold"
            :to="
              route('confs', {
                country: event.countryCode,
                continent: event.continentCode
              })
            "
          >
            {{ event.country }}
          </router-link>
        </span>
      </h3>
      <h3 class="title is-7 has-text-grey-light" v-if="event.free">
        <span>
          FREE
        </span>
      </h3>
    </div>
  </div>
</template>
<script>
import { formatRange, formatRelative } from "@/utils/dates";
import navigationMixins from "@/mixins/navigation";
import { mapGetters, mapActions } from "vuex";
import JsonLd from "./JsonLd";
import ManyTopics from "./ManyTopics";
import dayjs from "dayjs";
export default {
  components: {
    JsonLd,
    ManyTopics
  },
  mixins: [...navigationMixins],
  props: {
    event: {
      type: Object,
      required: true
    }
  },
  computed: {
    ...mapGetters("auth", ["isAdmin"])
  },
  methods: {
    formatRange,
    formatRelative,
    year(date) {
      return dayjs(date).year();
    },
    ...mapActions(["deleteEvent"])
  }
};
</script>

<style scoped lang="scss">
.columns:not(.featured) {
  opacity: 0.75;
}

.columns.featured + .columns:not(.featured) {
  margin-top: 100px;
}

.tag {
  position: relative;
  top: -1px;
  svg {
    margin-right: 0.3em;
  }
  background-color: #fff;
}
</style>
