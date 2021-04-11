const mixin = {
  methods: {
    topicName() {
      const topic = this.$store.state.allTopics[this.$route.params.topic];
      return topic ? topic.name : "";
    },
    locationName() {
      const country = this.$store.state.allCountries[
        this.$route.params.country
      ];
      const continent = this.$store.state.continents[
        this.$route.params.continent
      ];
      return country ? country.name : continent ? continent : "";
    }
  }
};

export default [mixin];
