const mixin = {
  methods: {
    route(route, params) {
      const newParams = { ...this.$route.params, ...params };
      return { params: newParams };
    }
  }
};

export default [mixin];
