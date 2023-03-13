import { defineStore } from 'pinia'

//defining a store
export const useLoggedInUserStore = defineStore({
  // id is only required for devtools with the Pinia store
  id: 'loggedInUser',
  //central part of the store
  state: () => {
    return {
      name: "",
      isLoggedIn: false,
      isViewer: false,
      isEditor: false,
    }
  },
  // equivalent to methods in components, perfect to define business logic
  actions: {
    async login(username, password) {
      try {
        const response = await apiLogin(username, password);
        this.$patch({
          isLoggedIn: response.isAllowed,
          name: response.name,
        })
        this.$router.push("/");
      } catch(error) {
        console.log(error)
      }
    },
    logout() {
      this.patch({
        name: "",
        isLoggedIn: false
      });

      // we could do other stuff like redirecting the user
    }
  }
});

//simulate a login - we will later use our backend to handle authentication
function apiLogin(u, p) {
  if (u === "admin" && p === "admin") return Promise.resolve({ isAllowed: true, name: "user" });
  if (p === "admin") return Promise.resolve({ isAllowed: false });
  return Promise.reject(new Error("invalid credentials"));
}

