<template>
  <span>
    <router-link :class="classes" :to="route('confs', { topic })">{{
      topicName()
    }}</router-link>
  </span>
</template>
<script>
import navigationMixins from "@/mixins/navigation";
import { mapState } from "vuex";
export default {
  mixins: navigationMixins,
  props: {
    classes: {
      default: () => "",
      type: String
    },
    topics: {
      default: () => [],
      type: Array
    },
    featured: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    topic() {
      if (this.featured) {
        return this.topics[0];
      } else {
        return this.$route.params.topic || this.topics[0];
      }
    },
    ...mapState(["allTopics"])
  },
  methods: {
    topicName() {
      const topic = this.allTopics[this.topic];
      return topic ? topic.name : "";
    }
  }
};
</script>
