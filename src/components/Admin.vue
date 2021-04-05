<template>
  <div class="container">
    <section class="section">
      <h1 class="title">Event stats</h1>
      <div class="tags are-medium">
        <span
          v-bind:class="{
            'is-success': topic.count >= 5,
            'is-danger': topic.count < 5
          }"
          class="tag"
          v-bind:key="topic.name"
          v-for="topic in topicStats"
          >{{ topic.name }} ({{ topic.count }}/{{ 5 }})</span
        >
      </div>
    </section>
    <section class="section">
      <h1 class="title">Expired events</h1>
      <table class="table is-fullwidth is-striped">
        <thead>
          <th>#</th>
          <th>Event</th>
          <th>Expired</th>
          <th>&nbsp;</th>
        </thead>
        <tbody>
          <tr v-bind:key="event.id" v-for="(event, index) in expiredEvents">
            <td>{{ index + 1 }}</td>
            <td>
              {{ event.name }}
            </td>
            <td>
              {{ formatRelative(event.endDate) }}
            </td>
            <td>
              <div class="buttons">
                <a
                  class="button is-small"
                  :href="linkToTweet(event)"
                  target="_blank"
                >
                  <span>
                    <font-awesome-icon :icon="['fab', 'twitter']" />
                    Tweet to organizers
                  </span>
                </a>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </section>
  </div>
</template>
<script>
import lazyAxios from "../utils/axios";
import { formatRelative } from "@/utils/dates";
import dayjs from "dayjs";
export default {
  data: () => {
    return {
      topicStats: [],
      expiredEvents: [],
      emojis: {}
    };
  },
  created() {
    lazyAxios()
      .then(axios => axios.get(`/admin/work`))
      .then(response => {
        this.topicStats = response.data.topicStats;
        this.expiredEvents = response.data.expiredEvents;
        this.emojis = response.data.emojis;
      });
  },
  methods: {
    formatRelative,
    linkToTweet({
      twitter,
      name,
      countryCode,
      city,
      endDate,
      category = "conference"
    }) {
      const organizer = `@${twitter}%0A%0A`;
      const endedOn = dayjs(endDate).format("MMM DD, YYYY");
      const expiredAgo = formatRelative(endDate);
      const emoji = this.emojis[countryCode].emoji;

      const location = countryCode === "ON" ? "🌍 Online" : `${emoji} ${city}`;
      const message = `Just wanted to let you know that your ${category} ${name} (${endedOn}. ${location}) has ended ${expiredAgo} and expired at dev.events.%0A%0A`;
      const callToAction = "❤️ Remember to add your next event to dev.events.";

      const text = organizer + message + callToAction;

      return `https://twitter.com/intent/tweet?text=${text}`;
    }
  }
};
</script>
