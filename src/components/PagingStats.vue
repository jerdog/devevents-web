<template>
  <span>
    {{ count }}
  </span>
</template>
<script>
import { mapState } from "vuex";
import mixins from "@/mixins/filtering";
export default {
  mixins,
  computed: {
    count() {
      const stats = this.stats;
      if (stats.total == 1) return "showing one available event";
      if (stats.shown == stats.total)
        return `showing all ${stats.shown} events`;
      else return `showing ${stats.shown} out of ${stats.total} events`;
    },
    ...mapState(["stats"])
  }
};
</script>
<style scoped lang="scss">
img {
  height: 0.7em;
  margin-left: 5px;
  margin-right: 2px;
}
</style>
