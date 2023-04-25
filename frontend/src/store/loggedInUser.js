import { defineStore } from 'pinia'
import axios from "axios"
// import { getCurrentInstance } from "vue";
import { useRouter } from "vue-router"
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
      isEditor: false,
      isViewer: false,
    };
  },
  setup() {
    const store = useLoggedInUserStore();
    const router = useRouter(); // Add this line
    return {
      // you can return the whole store instance to use it in the template
      v$: useVuelidate({ $autoDirty: true }),
      store,
      router, // Add this line
    };
  },
  // equivalent to methods in components, perfect to define business logic
  actions: {
    async login(username, password) {
      try {
        const response = await axios.post(`http://localhost:3000/users`, { username: username, password: password });

        if(response) {
          const isEditor = response.data.role === 'editor';
          const isViewer = response.data.role === 'viewer' || isEditor;

          this.$patch({
            isLoggedIn: true,
            username: response.data.username,
            role: response.data.role,
            isEditor: isEditor,
            isViewer: isViewer,
          });
          
          this.$router.push({ name: 'Home' });
          return true;
        }

      } catch(error) {
        alert(error)
      }
      
    },
    logout() {
      if(window.confirm('Do you want to log out?')) {
          this.$patch({
            name:'',
            role:'',
            isLoggedIn: false,
            isEditor: false,
            isViewer: false,

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

