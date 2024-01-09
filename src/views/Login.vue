<template>
    <div class="account-pages my-5 pt-sm-5">
        <div class="container">
            <div class="row align-items-center justify-content-center">
                <div class="col-md-8 col-lg-6 col-xl-5">
                    <div class="card">
                        <div class="card-body p-4">
                            <div class="text-center mt-2">
                                <h5 class="text-primary">Welcome !</h5>
                                <p class="text-muted">Sign in to continue CRM.</p>
                            </div>
                            <div class="p-2 mt-4">
                                <div class="card-body">
                                    <form @submit.prevent="loginUser">
                                        <div class="form-group mb-3">
                                            <label for="email">Email Address</label>
                                            <div class="input-group">
                                                <span class="input-group-text"><font-awesome-icon
                                                        :icon="['fas', 'envelope']" /></span>
                                                <input type="email" v-model="user.email" id="email" class="form-control"
                                                    name="email" placeholder="Enter Email address">
                                            </div>
                                            <small class="text-danger" v-if="submitted && !user.email.required">
                                                Email is required and must be a valid email address.
                                            </small>
                                            <small class="text-danger" v-if="!user.email.valid">
                                                {{ error.email }}
                                            </small>

                                        </div>

                                        <div class="form-group mb-3">
                                            <label for="password">Password</label>
                                            <div class="input-group">
                                                <span class="input-group-text">
                                                    <font-awesome-icon :icon="['fas', 'lock']" />
                                                </span>
                                                <input :type="showPassword ? 'text' : 'password'" class="form-control"
                                                    name="password" id="password" placeholder="Enter Password"
                                                    v-model="user.password" />

                                                <button type="button" class="btn btn-light"
                                                    @click="togglePasswordVisibility">
                                                    <font-awesome-icon :icon="showPassword ? 'eye-slash' : 'eye'" />
                                                </button>
                                            </div>
                                            <small class="text-danger" v-if="submitted && !user.password.required">
                                                Password is required must be at least 8 characters.
                                            </small>
                                            <small class="text-danger" v-if="!user.password.valid">
                                                {{ error.password }}
                                            </small>
                                        </div>

                                        <div class="custom-control custom-checkbox">
                                            <input type="checkbox" class="custom-control-input" id="remember"
                                                name="remember">
                                            <label class="custom-control-label" for="remember"
                                                style="margin-left: 5px;">Remember
                                                me</label>
                                        </div>


                                        <div class="mt-3 text-right">
                                            <button class="btn btn-primary w-sm waves-effect waves-light" type="submit">Log
                                                In</button>
                                        </div>

                                        <div class="mt-4 text-center">
                                            <p class="mb-0">Don't have an account ? <a href=""
                                                    class="font-weight-medium text-primary"> Signup now </a> </p>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import { required, email, minLength } from '@vuelidate/validators';

export default {
    data() {
        return {
            user: {
                email: '',
                password: '',
            },
            showPassword: false,
            currentYear: new Date().getFullYear(),
            submitted: false,
            error: {
                password: '',
                email: '',
            },
        };
    },
    validations: {
        user: {
            email: {
                required,
                email,
            },
            password: {
                required,
                minLength: minLength(8),
            },
        },
    },
    methods: {
        togglePasswordVisibility() {
            this.showPassword = !this.showPassword;
        },
        async loginUser() {

            this.submitted = false;
            this.error = [];
            if (this.$v) {
                this.$v.$touch();
                if (this.$v.$invalid) {
                    return;
                }
            }

            try {
                const response = await axios.post('http://localhost:8000/api/login', this.user);
                console.log(response);
                //managing user state
                if(response.data && response.data.user){
                    const userName  = response.data.user.name;
                    localStorage.setItem('user', userName);
                    console.log('User saved in Local storage :', localStorage.getItem('user'));
                    this.$store.commit('LOGIN', response.data.user);
                    console.log('User info saved in vuex store:', this.$store.state.user);
                    this.$router.push({ name: 'dashboard' });
                }
                else{
                    console.log('Unexpected response data :', response.data);
                }
               
            }
            catch (error) {
                console.log('Error during login:', error);
                this.submitted = true;
                if (this.$v) {
                    this.$v.$touch();
                }
                if (error.response) {
                    console.log(error.response);

                    if (error.response.status === 422) {
                        error.response.data.error;

                    } else if (error.response.status === 401) {

                        this.submitted = false;
                        if (this.user.password) {
                            this.error.password = error.response.data.error;
                        } else if (this.user.email) {
                            this.error.email = error.response.data.error;
                        }
                    }
                } else if (error.request) {
                    console.log('Error in request:', error.request);
                }
            }
        },
    },
};
</script>
  

<style>
body {
    background-color: #F6C7B0;
}

.text-primary {
    color: #04ABC1 !important;
}

.btn-primary {
    background-color: #04ABC1;
    border-color: #04ABC1;
}

.btn-primary:hover {
    background-color: #04ABC1 !important;
    border-color: #04ABC1 !important;
}

.text-light {
    color: #04ABC1;
}

.text-light:hover {
    text-decoration: underline;
}

.custom-control-label {
    margin-left: 10px;
}
</style>