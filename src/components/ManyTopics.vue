<template>
  <span>
    <router-link :class="classes" :to="route('confs', { topic: topics[0] })">{{
      topicName(topics[0])
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
    }
  },
  computed: {
    ...mapState(["allTopics"])
  },
  methods: {
    topicName(code) {
      const topic = this.allTopics[code];
      return topic ? topic.name : "";
    }
  }
};
</script>
