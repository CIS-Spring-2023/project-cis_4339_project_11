<script>
import useVuelidate from "@vuelidate/core"
import { required } from "@vuelidate/validators" 
const apiURL = import.meta.env.VITE_ROOT_API
import axios from 'axios'

export default {
    setup() {
        return { v$: useVuelidate({ $autoDirty: true}) }
    },
    data() {
        return {
            username: ' ',
            password: ' '
        }
    },
    methods: {
        async loginSubmit() {
            axios.post('${apiURL}/users', { username: this.$data.username, password: this.$data.password })
                .then((res) => {
                    if (res.data) {
                        sessionStorage.setItem('user', JSON.stringify(res.data))
                        this.$router.push({ name: 'Home'}).then(location.reload())
                        console.log(res)
                }
                }) .catch ((err) => {
                    if (err.response.status === 400) {
                        alert(err.response.data.error);
                        this.username = ' ';
                        this.password = ' ';
                }
            })
        }
    },
    mounted() {
        let user = sessionStorage.getItem('user');
        if (user) {
            this.$router.push({ name: 'Home' });
        }
    },
    validations() {
        return {
            username: {required},
            password: {required}
        }
    }
}
</script>

<template>
    <main>
        <div class="login">
            <h1 clss="text-2xl font-bold">Login Page</h1>
            <form @submit.prevent="store.login(username, password)" novalidate="true"> 
                <div class="form-group">
                    <label>Username</label>
                    <input class="form-control" type="text" v-model="username" placeholder="username" required>
                </div>
                <div class="form-group">
                    <label>Password</label>
                    <input class="input-group" type="password" v-model="password" placeholder="password" required>
                </div>
                <button class="btn btn-danger mt-3">Submit</button>  
            </form>
        </div>

    </main>
</template>


