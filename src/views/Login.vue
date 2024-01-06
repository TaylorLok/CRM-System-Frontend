<template>
    <div class="container mt-5">
        <div class="text-center mb-3">
            <h1 class="text-black">Welcome!</h1>
            <p class="text-lead text-black">Login to view your clients</p>
        </div>
        <div class="card mx-auto mt-3" style="max-width: 400px;">
            <div class="card-body">
                <ul v-if="Object.keys(this.errorList).length > 0" class="alert alert-warning">
                    <li class="mb-0 ms-3" v-for="(error, index) in errorList" :key="index">
                        {{ error[0] }}
                    </li>
                </ul>
                <div class="mb-3">
                    <label for="email" class="form-label">Email address</label>
                    <input type="email" v-model="user.email" id="email" class="form-control" prepend-icon="ni ni-email-83"
                        placeholder="Enter your email">
                </div>
                <div class="mb-3">
                    <label for="password" class="form-label">Password</label>
                    <input type="password" v-model="user.password" id="password" class="form-control"
                        placeholder="Enter your password">
                </div>

                <div class="text-center">
                    <button type="submit" @click="loginUser" class="btn btn-primary">Login</button>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import axios from 'axios';
export default {
    data() {
        return {
            errorList: [],
            user: {
                email: '',
                password: '',
            },
        };
    },
    methods: {
        async loginUser() {

        },
    },
};
</script>
  

<style>
body {
    background-color: #F6C7B0;
}
</style>