<template>
  <div class="dropdown is-hoverable">
    <button
      class="button is-small is-outlined"
      aria-haspopup="true"
      aria-controls="share-buttons-menu"
    >
      <span class="icon"><font-awesome-icon :icon="['fas', 'share']"/></span>
      <span>Share</span>
    </button>
    <div
      class="dropdown-menu share-buttons-menu"
      id="share-buttons-menu"
      role="menu"
    >
      <div class="dropdown-content">
        <ShareNetwork
          class="dropdown-item"
          network="facebook"
          :title="event.name"
          :url="url()"
        >
          Share on Facebook
        </ShareNetwork>
        <ShareNetwork
          class="dropdown-item"
          network="twitter"
          twitter-user="dev_events"
          :title="twitterText()"
          :url="url()"
        >
          Share on Twitter
        </ShareNetwork>
        <ShareNetwork
          class="dropdown-item"
          network="linkedin"
          :title="event.name"
          :url="url()"
        >
          Share on LinkedIn
        </ShareNetwork>
        <ShareNetwork
          class="dropdown-item"
          network="reddit"
          :title="event.name"
          :url="url()"
        >
          Share on Reddit
        </ShareNetwork>
        <ShareNetwork
          class="dropdown-item"
          network="pocket"
          :title="event.name"
          :url="url()"
        >
          Send to Pocket
        </ShareNetwork>
        <ShareNetwork
          class="dropdown-item"
          network="telegram"
          :description="`Check out this ${topicName()} ${category()}`"
          :title="event.name"
          :url="url()"
        >
          Send to Telegram
        </ShareNetwork>
        <ShareNetwork
          class="dropdown-item"
          network="email"
          :title="`Check out this ${topicName()} ${category()}: ` + event.name"
          :url="url()"
        >
          Send to Email
        </ShareNetwork>
      </div>
    </div>
  </div>
</template>
<script>
import { formatRange } from "@/utils/dates";
import dayjs from "dayjs";
import { mapState } from "vuex";
export default {
  props: {
    event: {
      type: Object,
      required: true
    }
  },
  computed: {
    ...mapState(["allTopics"])
  },
  methods: {
    twitterText() {
      const {
        name,
        city,
        countryCode,
        country,
        startDate,
        endDate
      } = this.event;
      const what = `${this.topicName()} ${this.category()} ${name} is coming`;
      const when = `${formatRange(startDate, endDate)}, ${dayjs(
        startDate
      ).year()}`;
      const where = countryCode === "ON" ? "🌍 Online" : `${city}, ${country}`;
      return [
        `${what}.`,
        ``,
        `=> ${when}. ${where}`,
        ``,
        `❤️ Retweet to support!` +
          (this.event.twitter ? ` @${this.event.twitter}` : ""),
        ``,
        `More information:`
      ].join("\n");
    },
    url() {
      return `https://dev.events/conferences/${this.event.id}`;
    },
    category() {
      return this.event.category;
    },
    topicName() {
      const [firstTopicCode] = this.event.topics;
      const topic = this.allTopics[firstTopicCode];
      return topic.name;
    }
  }
};
</script>
