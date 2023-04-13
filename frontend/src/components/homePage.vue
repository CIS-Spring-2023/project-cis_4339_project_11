<template>
  <main>
    <div>
      <h1
        class="font-bold text-4xl text-red-700 tracking-widest text-center mt-10"
      >
        Welcome
      </h1>
      <br />
      <div
        class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-10"
      >
        <div class="ml-10"></div>
        <div class="flex flex-col col-span-2">
          <table class="min-w-full shadow-md rounded">
            <thead class="bg-gray-50 text-xl">
              <tr class="p-4 text-left">
                <th class="p-4 text-left">Event Name</th>
                <th class="p-4 text-left">Event Date</th>
                <th class="p-4 text-left">Number of Attendees</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-300">
              <tr
                @click="editEvent(event._id)"
                v-for="event in recentEvents"
                :key="event._id"
              >
                <td class="p-2 text-left">{{ event.name }}</td>
                <td class="p-2 text-left">{{ formattedDate(event.date) }}</td>
                <td class="p-2 text-left">{{ event.attendees.length }}</td>
              </tr>
            </tbody>
          </table>
          <div>
            <OtherChart
              v-if="!loading && !error"
              :label="recentEvents"
              :chart-data="chartData"
            ></OtherChart>

            <!-- Start of loading animation -->
            <div class="mt-40" v-if="loading">
              <p
                class="text-6xl font-bold text-center text-gray-500 animate-pulse"
              >
                Loading...
              </p>
            </div>
            <!-- End of loading animation -->

            <!-- Start of error alert -->
            <div class="mt-12 bg-red-50" v-if="error">
              <h3 class="px-4 py-1 text-4xl font-bold text-white bg-red-800">
                {{ error.title }}
              </h3>
              <p class="p-4 text-lg font-bold text-red-900">
                {{ error.message }}
              </p>
            </div>
            <!-- End of error alert -->
          </div>
          <div>
            <AttendanceChart
              v-if="!loading && !error"
              :label="labels"
              :chart-data="chartData"
            ></AttendanceChart>

            <!-- Start of loading animation -->
            <div class="mt-40" v-if="loading">
              <p
                class="text-6xl font-bold text-center text-gray-500 animate-pulse"
              >
                Loading...
              </p>
            </div>
            <!-- End of loading animation -->

            <!-- Start of error alert -->
            <div class="mt-12 bg-red-50" v-if="error">
              <h3 class="px-4 py-1 text-4xl font-bold text-white bg-red-800">
                {{ error.title }}
              </h3>
              <p class="p-4 text-lg font-bold text-red-900">
                {{ error.message }}
              </p>
            </div>
            <!-- End of error alert -->
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import { DateTime } from 'luxon'
import axios from 'axios'
import AttendanceChart from './PieChart.vue'
import OtherChart from './BarChart.vue'
const apiURL = import.meta.env.VITE_ROOT_API

export default {
  components: {
    AttendanceChart,
    OtherChart
  },
  data() {
    return {
      //added some hardcoded data for testing purposes with help from chatgpt
      recentEvents: [
        {
          name: 'Event A',
          date: '2023-03-04T17:00:00.000Z',
          attendees: [
            { name: 'Alice', email: 'alice@example.com' },
            { name: 'Bob', email: 'bob@example.com' },
            { name: 'Charlie', email: 'charlie@example.com' }
          ]
        },
        {
          name: 'Event B',
          date: '2023-03-12T18:00:00.000Z',
          attendees: [
            { name: 'David', email: 'david@example.com' },
            { name: 'Emily', email: 'emily@example.com' }
          ]
        }
      ],

      labels: [],
      chartData: [
        // hard coded data for testing purposes, format help from chatgpt
        {
          zip_code: '10001',
          count: 20,
          date: '2023-03-04T17:00:00.000Z',
          attendees: '3'
        },
        {
          zip_code: '10002',
          count: 15,
          date: '2023-03-12T18:00:00.000Z',
          attendees: '3'
        }
      ],
      loading: false,
      error: null
    }
  },
  mounted() {
    this.getAttendanceData()
    this.getOtherData
  },
  methods: {
    async getAttendanceData() {
      try {
        this.error = null
        this.loading = true
        // const response = await axios.get(`${apiURL}/events/attendance`) // commented out axios for testing purposes
        // this.recentEvents = response.data
        this.labels = this.chartData.map((item) => `${item.zip_code}`) //takes the data from chart data and assigns zip code for the label, done with advice from chatgpt
        this.chartData = this.chartData.map((item) => item.count) // takes the data from chart data and assigns the count to the zip code, done with advice from chatgpt
      } catch (err) {
        if (err.response) {
          // client received an error response (5xx, 4xx)
          this.error = {
            title: 'Server Response',
            message: err.message
          }
        } else if (err.request) {
          // client never received a response, or request never left
          this.error = {
            title: 'Unable to Reach Server',
            message: err.message
          }
        } else {
          // There's probably an error in your code
          this.error = {
            title: 'Application Error',
            message: err.message
          }
        }
      }
      this.loading = false
    },
    async getOtherData() {
      try {
        this.error = null
        this.loading = true
        // const response = await axios.get(`${apiURL}/events/attendance`) // commented out axios for testing purposes
        // this.recentEvents = response.data
        this.labels = this.chartData.map(
          (item) => `${item.date} (${this.formattedDate(item.date)})`
        )
        this.chartData = this.chartData.map((item) => item.attendees.count)
      } catch (err) {
        if (err.response) {
          // client received an error response (5xx, 4xx)
          this.error = {
            title: 'Server Response',
            message: err.message
          }
        } else if (err.request) {
          // client never received a response, or request never left
          this.error = {
            title: 'Unable to Reach Server',
            message: err.message
          }
        } else {
          // There's probably an error in your code
          this.error = {
            title: 'Application Error',
            message: err.message
          }
        }
      }
      this.loading = false
    },
    formattedDate(datetimeDB) {
      const dt = DateTime.fromISO(datetimeDB, {
        zone: 'utc'
      })
      return dt
        .setZone(DateTime.now().zoneName, { keepLocalTime: true })
        .toLocaleString()
    },
    // method to allow click through table to event details
    editEvent(eventID) {
      this.$router.push({ name: 'eventdetails', params: { id: eventID } })
    }
  }
}
</script>
