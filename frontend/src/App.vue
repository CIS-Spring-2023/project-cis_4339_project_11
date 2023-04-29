<script>
import axios from 'axios'

import { useLoggedInUserStore } from '@/store/loggedInUser'
export default {
  name: 'App',
  data() {
    return {
      orgName: 'Dataplatform'
    }
  },
  setup() {
    const user = useLoggedInUserStore()
    return { user }
  },
  created() {
  const rootApi = import.meta.env.VITE_ROOT_API || 'http://localhost:3000'

  axios.get(`${rootApi}/org`)
    .then((res) => {
      // If the API call was successful, log the response data to the console and update the component state with the organization name.
      console.log(res);
      if (res.data) {
        this.orgName = res.data.name;
      } else {
        this.errorMessage = 'No organization data was found. Please try again later.'
      }
      
    })
    .catch((error) => {
      // If there was an error with the API call, log the error and show a user-friendly message to the user.
      console.error(error);
      this.errorMessage = 'There was an error loading the organization data. Please try again later.';
    });
  }
}
</script>
<template>
  <main class="flex flex-row">
    <div id="_container" class="h-screen">
      <header class="w-full">
        <section class="text-center">
          <img class="m-auto" src="@\assets\DanPersona.svg" />
        </section>
        <nav class="mt-10">
          <ul class="flex flex-col gap-4">
            <!-- <li>
              <router-link to="/login">
                <span
                  style="position: relative; top:6px"
                  class="material-icons"
                  >login</span
                >
                login
              </router-link>
            </li> -->
            <li>
              <router-link to="/">
                <span
                  style="position: relative; top: 6px"
                  class="material-icons"
                  >dashboard</span
                >
                Dashboard
              </router-link>
            </li>
            <li v-if="user.isEditor">
              <router-link to="/intakeform">
                <span
                  style="position: relative; top: 6px"
                  class="material-icons"
                  >people</span
                >
                Client Intake Form
              </router-link>
            </li>
            <li v-if="user.isEditor">
              <router-link to="/eventform">
                <span
                  style="position: relative; top: 6px"
                  class="material-icons"
                  >event</span
                >
                Create Event
              </router-link>
            </li>
            <li v-if="user.isViewer">
              <router-link to="/findclient">
                <span
                  style="position: relative; top: 6px"
                  class="material-icons"
                  >search</span
                >
                Find Client
              </router-link>
            </li>
            <li v-if="user.isViewer">
              <router-link to="/findevents">
                <span
                  style="position: relative; top: 6px"
                  class="material-icons"
                  >search</span
                >
                Find Event
              </router-link>
            </li>
            <li v-if="user.isViewer">
              <router-link to="/services">
                <span
                  style="position: relative; top: 6px"
                  class="material-icons"
                  >list</span
                >
                Services
              </router-link>
            </li>
            <li v-if="user.isEditor">
              <router-link to="/servicesedit">
                <span
                  style="position: relative; top: 6px"
                  class="material-icons"
                  >list</span
                >
                Edit Services
              </router-link>
            </li>
            <li v-if="user.isEditor">
              <router-link to="/servicesCreate">
                <span
                  style="position: relative; top: 6px"
                  class="material-icons"
                  >list</span
                >
                Create Services
              </router-link>
            </li>
            <li class="nav-item" v-if="!user.isLoggedIn">
              <router-link class="nav-link" to="/login">
                <span
                  style="position: relative; top: 6px"
                  class="material-icons"
                  >login</span
                >
                login</router-link
              >
            </li>
            <li class="nav-item dropdown" v-if="user.isLoggedIn">
              <a
                class="nav-link dropdown-toggle"
                href="#"
                id="navbarUserMenuLink"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <i
                  class="bi bi-person-fill"
                  style="font-size: 1rem; color: hsla(160, 100%, 37%, 1)"
                ></i>
                Welcome, {{ user.name }}
              </a>
              <ul class="dropdown-menu" aria-labelledby="navbarUserMenuLink">
                <li class="nav-item">
                  <a href="">
                    <span @click="store.logout()" class="nav-link"
                      ><i class="bi bi-box-arrow-left"></i> Logout</span
                    >
                  </a>
                </li>
              </ul>
            </li>
          </ul>
        </nav>
      </header>
    </div>
    <div class="grow w-4/5">
      <section
        class="justify-end items-center h-24 flex"
        style="background: linear-gradient(250deg, #c8102e 70%, #efecec 50.6%)"
      >
        <h1 class="mr-20 text-3xl text-white">{{ this.orgName }}</h1>
      </section>
      <div>
        <router-view></router-view>
      </div>
    </div>
  </main>
</template>
<style>
#_container {
  background-color: #c8102e;
  color: white;
  padding: 18px;
}
</style>
