<template>
  <div class="dropdown is-hoverable">
    <button
      class="button is-small is-outlined"
      aria-haspopup="true"
      aria-controls="add-to-calendar-menu"
    >
      <span class="icon"
        ><font-awesome-icon :icon="['far', 'calendar-plus']"
      /></span>
      <span>Add to calendar</span>
    </button>
    <div
      class="dropdown-menu add-to-calendar-menu"
      id="add-to-calendar-menu"
      role="menu"
    >
      <div class="dropdown-content">
        <a class="dropdown-item" @click="exportTo('google')">
          Google Calendar
        </a>
        <a class="dropdown-item" @click="exportTo('ical')">
          iCal
        </a>
        <a class="dropdown-item" @click="exportTo('outlook')">
          Outlook
        </a>
        <a class="dropdown-item" @click="exportTo('yahoo')">
          Yahoo
        </a>
      </div>
    </div>
  </div>
</template>
<script>
import * as Add2Calendar from "add2calendar";
import dayjs from "dayjs";

export default {
  props: {
    event: {
      type: Object,
      required: true
    }
  },
  methods: {
    title() {
      return this.event.name + " via dev.events";
    },
    description() {
      return (
        this.event.name + ": https://dev.events/conferences/" + this.event.id
      );
    },
    location() {
      return this.event.countryCode === "ON"
        ? "Online"
        : `${this.event.city}, ${this.event.country}`;
    },
    exportTo(service) {
      const calEvent = new Add2Calendar({
        title: this.title(),
        start: this.event.startDate,
        end: dayjs(this.event.endDate)
          .add(1, "day")
          .toDate(),
        location: this.location(),
        description: this.description(),
        isAllDay: true
      });

      if (service === "google") {
        window.open(calEvent.getGoogleUrl(), "_blank");
      }
      if (service === "ical") {
        window.open(calEvent.getICalUrl(), "_blank");
      }
      if (service === "outlook") {
        window.open(calEvent.getOutlookUrl(), "_blank");
      }
      if (service === "yahoo") {
        window.open(calEvent.getYahooUrl(), "_blank");
      }
    }
  }
};
</script>
