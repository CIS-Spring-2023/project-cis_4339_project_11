<script>
import { DateTime } from 'luxon'
import axios from 'axios'
const apiURL = import.meta.env.VITE_ROOT_API

export default {
  data() {
    return {
      events: [],
      // Parameter for search to occur
      searchBy: '',
      name: '',
      eventDate: ''
    }
  },
  mounted() {
    this.getEvents()
  },
  methods: {
    // better formattedDate
    formattedDate(datetimeDB) {
      const dt = DateTime.fromISO(datetimeDB, {
        zone: 'utc'
      })
      return dt
        .setZone(DateTime.now().zoneName, { keepLocalTime: true })
        .toLocaleString()
    },
    handleSubmitForm() {
      let endpoint = ''
      if (this.searchBy === 'Event Name') {
        endpoint = `events/search/?name=${this.name}&searchBy=name`
      } else if (this.searchBy === 'Event Date') {
        endpoint = `events/search/?eventDate=${this.eventDate}&searchBy=date`
      }
      axios.get(`${apiURL}/${endpoint}`).then((res) => {
        this.events = res.data
      })
    },
    // abstracted method to get events
    getEvents() {
      axios.get(`${apiURL}/events`).then((res) => {
        this.events = res.data
      })
      window.scrollTo(0, 0)
    },
    clearSearch() {
      // Resets all the variables
      this.searchBy = ''
      this.name = ''
      this.eventDate = ''

      this.getEvents()
    },
    editEvent(eventID) {
      this.$router.push({ name: 'eventdetails', params: { id: eventID } })
    }
  }
}
</script>

<template>
  <main>
    <div>
      <h1
        class="font-bold text-4xl text-red-700 tracking-widest text-center mt-10"
      >
        List of Services
      </h1>
    </div>
    <div class="px-10 pt-20">
      <div
        class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-10"
      >
        <div></div>
        <div></div>
      </div>
    </div>

    <hr class="mt-10 mb-10" />
    <!-- Display Found Data -->
    <div
      class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-10"
    >
      <div class="ml-10">
        <h2 class="text-2xl font-bold">List of Services</h2>
        <h3 class="italic">Click table row to edit/display an entry</h3>
      </div>
      <div class="flex flex-col col-span-2">
        <table class="min-w-full shadow-md rounded">
          <thead class="bg-gray-50 text-xl">
            <tr>
              <th class="p-4 text-left">Service Name</th>
              <th class="p-4 text-left">Service Status</th>
              <th class="p-4 text-left">Active Status</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-300">
            <tr
              @click="editEvent(event._id)"
              v-for="event in events"
              :key="event._id"
            >
              <td class="p-2 text-left">{{ event.name }}</td>
              <td class="p-2 text-left">{{ formattedDate(event.date) }}</td>
              <td class="p-2 text-left">{{ event.address.line1 }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </main>
</template>
