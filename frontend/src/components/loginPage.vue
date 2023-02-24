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
            <form class="form-thing" @submit.prevent="loginSubmit">
                <h1 clss="text-2xl font-bold">Login Page</h1>
                <div class="form-input">
                    <input class="input-group" type="text" name="username" v-model="username" placeholder="username" />
                </div>
                <div class="form-input">
                    <input class="input-group" type="password" name="password" v-model="password" placeholder="Password" />
                </div>
                <div>
                    <button class="btn-grp" type="submit">Login</button>
                </div>
            </form>
        </div>

    </main>
</template>


