<template>
  <div>
    <Header />
    <aside class="container">
      <section class="section">
        <div class="columns is-multiline is-mobile">
          <div
            class="column is-half-desktop is-full-mobile has-text-centered-mobile"
          ></div>
          <div class="column is-half-desktop is-full-mobile">
            <Continents />
            <div class="is-pulled-right">
              <div class="select is-small" @change="sortingChanged()">
                <select
                  aria-label="Sorting"
                  v-model="$store.state.sorting"
                  class="is-borderless has-background-white"
                >
                  <option value="newestFirst">Newest first</option>
                  <option value="cheapestFirst">Free first</option>
                  <option value="startDate">Sort by date</option>
                </select>
              </div>
            </div>
            <div class="is-pulled-left">
              <div class="is-hidden-tablet is-size-7">
                <a
                  class="has-text-grey-dark"
                  @click="toggleCategories()"
                  v-if="categoriesVisible"
                >
                  <font-awesome-icon icon="eye-slash" />
                  Hide categories
                </a>
              </div>
              <div class="is-hidden-tablet is-size-7">
                <a
                  class="has-text-grey-dark"
                  @click="toggleCategories()"
                  v-if="!categoriesVisible"
                  ><font-awesome-icon icon="eye" /> Show categories
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </aside>
    <div class="container" role="main">
      <section
        class="section is-size-1 is-size-5-mobile has-text-grey has-text-centered"
        v-if="noEvents"
      >
        ¯\_(ツ)_/¯ <br />There are no events matching your criteria. Try
        <router-link
          :to="{
            params: {
              continent: $route.params.continent,
              country: undefined,
              topic: undefined
            }
          }"
          >resetting</router-link
        >
        your search criteria.
      </section>
      <div class="columns" v-else>
        <div class="column is-one-third">
          <section
            class="section"
            :class="{ 'is-hidden-mobile': !forceShowCategories }"
            v-observe-visibility="categoryVisibilityChanged"
          >
            <Topics />
            <Countries v-if="!isOnline" />
          </section>
        </div>
        <div class="column is-two-thirds">
          <section class="section">
            <div class="block">
              <h3 class="title is-4">
                <font-awesome-icon
                  :icon="['far', 'heart']"
                  class="has-text-danger"
                />
                Best sellers
              </h3>
            </div>
            <Event v-for="event in events" :event="event" :key="event.id">
            </Event>
          </section>
          <section class="section">
            <nav class="has-text-centered">
              <div class="columns">
                <div class="column is-size-7">
                  <div class="has-text-left">
                    <PagingStats v-if="doneFetching" class="is-pulled-right" />
                    <a v-if="more" class="button is-small" @click="moreEvents()"
                      >Show more</a
                    >
                  </div>
                </div>
              </div>
            </nav>
          </section>
        </div>
      </div>
      <PlusButton />
    </div>
    <Footer v-if="doneFetching" />
  </div>
</template>

<script>
import { years } from "@/utils/dates";
import filteringMixins from "@/mixins/filtering";

import { mapState, mapActions } from "vuex";
import Event from "./Event";
import Topics from "./Topics";
import Continents from "./Continents";
import Countries from "./Countries";
import Header from "./Header";
import PlusButton from "./PlusButton";
import PagingStats from "./PagingStats";
import Footer from "./Footer";

export default {
  components: {
    Event,
    Header,
    Continents,
    Countries,
    Topics,
    PagingStats,
    PlusButton,
    Footer
  },
  mixins: [...filteringMixins],
  created() {
    this.fetchEvents().then(() => this.$emit("updateHead"));
  },
  data: () => {
    return {
      categoriesVisible: true,
      forceShowCategories: false
    };
  },
  watch: {
    $route() {
      this.fetchEvents().then(() => this.$emit("updateHead"));
    }
  },
  head: {
    meta: function() {
      return [{ name: "description", content: this.title(), id: "desc" }];
    },
    title: function() {
      return {
        separator: " ",
        complement: " ",
        inner: this.title()
      };
    }
  },
  methods: {
    title() {
      return !this.isOnline
        ? (this.topicName() ? this.topicName() : "Developer") +
            " conferences in " +
            this.locationName() +
            ` ${years()}`
        : "Online " +
            (this.topicName() ? this.topicName() : "developer") +
            " conferences" +
            ` ${years()}`;
    },
    sortingChanged() {
      this.fetchEvents();
    },
    categoryVisibilityChanged(categoriesVisible) {
      this.categoriesVisible = categoriesVisible;
    },
    toggleCategories() {
      this.forceShowCategories = !this.forceShowCategories;
    },
    ...mapActions(["fetchEvents", "moreEvents"])
  },
  computed: {
    ...mapState([
      "isOnline",
      "events",
      "topics",
      "more",
      "noEvents",
      "doneFetching"
    ])
  }
};
</script>
