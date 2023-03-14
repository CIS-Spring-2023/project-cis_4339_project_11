<script>
import axios from 'axios'
const apiURL = import.meta.env.VITE_ROOT_API

export default {
  data() {
    return {
      services: [
        {
          id: 0,
          name: 'party',
          status: 'Active',
          description: 'fun time'
        },
        {
          id: 1,
          name: 'taxes',
          status: 'Active',
          description: 'boring time'
        },
        {
          id: 2,
          name: 'clean',
          status: 'Active',
          description: 'clean time'
        },
        {
          id: 3,
          name: 'party',
          status: 'Active',
          description: 'fun time'
        }
      ]
    }
  },
  mounted() {
    this.getServices()
  },
  methods: {
    // abstracted method to get events
    getServices() {
      axios.get(`${apiURL}/services`).then((res) => {
        this.services = res.data
      })
      window.scrollTo(0, 0)
    },
    editService(serviceID) {
      this.$router.push({ name: 'servicedetails', params: { id: serviceID } })
    },
    disableService(serviceID) {
      this.services.splice(serviceID, 1)
    },
    addService(
      newName = 'mystery',
      newStatus = 'Active',
      newDescription = 'new service appeared'
    ) {
      var newID = this.services.length + 1
      this.services.push({
        id: newID,
        name: newName,
        status: newStatus,
        description: newDescription
      })
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
        Edit Services
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
        <h2 class="text-2xl font-bold">Edit Services</h2>
      </div>
      <div class="flex flex-col col-span-2">
        <table class="min-w-full shadow-md rounded">
          <thead class="bg-gray-50 text-xl">
            <tr>
              <th class="p-4 text-left">Service Name</th>
              <th class="p-4 text-left">Service Status</th>
              <th class="p-4 text-left">Description</th>
              <th class="p-4 text-left">Edit</th>
              <th class="p-4 text-left">Disable</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-300">
            <tr v-for="service in services" :key="service._id">
              <td class="p-2 text-left">{{ service.name }}</td>
              <td class="p-2 text-left">{{ service.status }}</td>
              <td class="p-2 text-left">{{ service.description }}</td>
              <td class="p-2 text-left">
                <button class="bg-red-700 text-white rounded">Edit</button>
              </td>
              <td class="p-2 text-left">
                <button
                  @click="disableService(service.id)"
                  class="bg-red-700 text-white rounded"
                >
                  Disable
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <button @click="addService()">add mystery service</button>
  </main>
</template>
