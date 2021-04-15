<template>
  <div class="columns is-multiline is-gapless is-size-7-mobile">
    <div
      v-for="topic in topics"
      :key="topic.code"
      class="topic column is-full"
      :class="{ 'is-active': isActive(topic.code) }"
    >
      <router-link class="has-text-primary" :to="hover(topic.code)">
        {{ topic.name }}
      </router-link>
      &nbsp;
      <router-link
        :to="hover(topic.code)"
        class="has-text-danger"
        v-if="isActive(topic.code)"
      >
        <font-awesome-icon icon="times" />
      </router-link>
      <span v-else class="tag is-light">{{ topic.count }}</span>
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex";
import mixins from "@/mixins/navigation";
export default {
  mixins,
  methods: {
    isActive(topic) {
      return topic === this.$route.params.topic;
    },
    hover(topic) {
      if (this.isActive(topic)) {
        return this.route("confs", { topic: undefined });
      } else {
        return this.route("confs", { topic });
      }
    }
  },
  computed: {
    ...mapState({
      topics: state =>
        Object.keys(state.allTopics).length
          ? Object.entries(state.topics)
              .map(([code, count]) => ({
                code,
                count,
                name: state.allTopics[code].name
              }))
              .sort((it, that) => it.name.localeCompare(that.name))
          : []
    })
  }
};
</script>
<style scoped lang="scss">
.column {
  margin-bottom: 0.3em !important;
}

.topic {
  &.is-active {
    .icon {
      visibility: visible !important;
    }
    font-weight: bold;
  }
}
</style>
