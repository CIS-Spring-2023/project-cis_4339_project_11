import { defineStore } from 'pinia'
import axios from "axios"
//defining a store
export const useLoggedInUserStore = defineStore({
  // id is only required for devtools with the Pinia store
  id: 'loggedInUser',
  //central part of the store
  state: () => {
    return {
      name: '',
      role: '',
      isLoggedIn: false,
    }
  },
  // equivalent to methods in components, perfect to define business logic
  actions: {
    async login(username, password) {
      try {
        const response = await axios.post("http://localhost:3000/users", {username: username, password: password});

        if(response) {
          this.$patch({
            isLoggedIn: true,
            username: response.data.username,
            role: response.data.role
          })
          this.$router.push({ name: 'Home'})
        }

      } catch(error) {
        alert(error)
      }
    },
    logout() {
      if(window.confirm('Do you want to log out?')) {
          this.$patch({
            username:'',
            role:'',
            isLoggedIn: false
          });
        // name: "",
        // isLoggedIn: false
      };

      // we could do other stuff like redirecting the user
    }
  },
  persist: {
    storage: sessionStorage
  }
});

//simulate a login - we will later use our backend to handle authentication
// function apiLogin(u, p) {
//   if (u === "view" && p === "view") return Promise.resolve({ isAllowed: true, name: "user", isViewer: true });
//   if (u === "edit" && p === "edit") return Promise.resolve({ isAllowed: true, name: "user", isEditor: true, isViewer: true });
//   if (p === "admin") return Promise.resolve({ isAllowed: false });
//   return Promise.reject(new Error("invalid credentials"));
// }

