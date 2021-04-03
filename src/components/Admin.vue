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
          v-for="topic in topics"
          >{{ topic.name }} ({{ topic.count }}/{{ 5 }})</span
        >
      </div>
    </section>
  </div>
</template>
<script>
import lazyAxios from "../utils/axios";
export default {
  data: () => {
    return {
      topics: []
    };
  },
  created() {
    lazyAxios()
      .then(axios => axios.get(`/admin/work`))
      .then(response => (this.topics = response.data));
  }
};
</script>
