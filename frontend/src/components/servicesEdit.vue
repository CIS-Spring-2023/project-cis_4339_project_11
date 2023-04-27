<script>
import axios from 'axios'
const apiURL = import.meta.env.VITE_ROOT_API

export default {
  data() {
    return {
      // Here is dummy data for the purpose of testing. This should get overwritten once a real connection to a DB is made.
      services: [
        {
          id: 0,
          name: 'default',
          status: 'Active',
          description: 'If you see this, the API connection was unsuccesful'
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
    // This removes a service based on the provided ID.
    disableService(serviceID) {
      this.services.splice(serviceID, 1)
    },
    // This adds a service and provides defualt values should they be missing.
    addService(newName = 'N/A', newStatus = 'N/A', newDescription = '') {
      var newID = this.services.length + 1
      this.services.push({
        id: newID,
        name: newName,
        status: newStatus,
        description: newDescription
      })
    },
    // This updates a service with new information.
    updateService(
      updateID,
      newName = 'N/A',
      newStatus = 'N/A',
      newDescription = ''
    ) {
      this.services.forEach(function (service) {
        if (service.id == updateID) {
          service.name = newName
          service.status = newStatus
          service.description = newDescription
        }
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
        <h2 class="text-2xl font-bold">List of Services</h2>
        <h3 class="italic">Click table row to edit/display an entry</h3>
      </div>
      <div class="flex flex-col col-span-2">
        <table class="min-w-full shadow-md rounded">
          <thead class="bg-gray-50 text-xl">
            <tr>
              <th class="p-4 text-left">Service Name</th>
              <th class="p-4 text-left">Service Status</th>
              <th class="p-4 text-left">Description</th>
              <th class="p-4 text-left">Disable</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-300">
            <tr
              @click="editService(service._id)"
              v-for="service in services"
              :key="service._id"
            >
              <td class="p-2 text-left">{{ service.name }}</td>
              <td class="p-2 text-left">{{ service.status }}</td>
              <td class="p-2 text-left">{{ service.description }}</td>
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

    <!-- This is the form for updating an existing service. -->
    <div class="ml-10">
      <h2 class="text-2xl font-bold">Update Service</h2>
      <form>
        <label for="updateID" class="block">Service ID to Update</label>
        <input
          type="text"
          id="updateID"
          name="updateID"
          v-model="updateID"
          required
        />
        <label for="newServiceName" class="block">New Service Name</label>
        <input
          type="text"
          id="newServiceName"
          name="newServiceName"
          v-model="newServiceName"
          required
        />

        <label for="newServiceStatus" class="block">New Service Status</label>
        <input
          type="text"
          id="newServiceStatus"
          name="newServiceStatus"
          v-model="newServiceStatus"
          required
        />

        <label for="newServiceDescription" class="block"
          >New Service Description</label
        >
        <textarea
          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          rows="2"
          id="newServiceDescription"
          name="newServiceDescription"
          v-model="newServiceDescription"
        ></textarea>

        <button
          type="submit"
          value="Submit"
          @click.prevent="submitForm"
          @click="
            updateService(
              updateID,
              newServiceName,
              newServiceStatus,
              newServiceDescription
            )
          "
          class="bg-red-700 text-white rounded"
        >
          Update Service
        </button>
      </form>
    </div>
  </main>
</template>
