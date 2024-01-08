<template>
    <div class="container mt-5">
        <div class="card">
            <div class="card-header text-center">
                <h4>Add client</h4>
            </div>
            <div class="card-body">
                 <!-- 'uuid','first_name','last_name','id_number','dob','telephone','email_address','status' -->
                <form @submit.prevent="saveClient">
                    <div class="form-group mb-3">
                        <label for="first_name" class="form-label">FirstName</label>
                        <div class="input-group">
                            <input type="text" v-model="model.client.first_name" class="form-control" placeholder="Enter Client FirstName">
                        </div>
                        
                        <small class="text-danger" v-if="submitted && !model.client.first_name">
                            Firstname is required.
                        </small>
                    </div>

                    <div class="form-group mb-3">
                        <label for="last_name" class="form-label">LastName</label>
                        <div class="input-group>">
                            <input type="text" v-model="model.client.last_name" class="form-control" placeholder="Enter Client LastName">
                        </div>

                        <small class="text-danger" v-if="submitted && !model.client.last_name">
                            Lastname is required.
                        </small>
                    </div>

                    <div class="form-group mb-3">
                        <label for="id_number" class="form-label">ID Number</label>
                        <div class="input-group">
                            <input type="text" v-model="model.client.id_number" class="form-control" placeholder="Enter Client ID Number">
                        </div>
                        
                        <small class="text-danger" v-if="submitted && !model.client.id_number">
                            ID Number is required.
                        </small>
                        <small class="text-danger" v-if="submitted && model.client.id_number && model.client.id_number.length !== 13">
                            ID Number must be exactly 13 digits.
                        </small>
                        <small class="text-danger" v-if="submitted && model.client.id_number && isNaN(Number(model.client.id_number))">
                            ID Number must be numeric.
                        </small>
                        <small class="text-danger" v-if="submitted && error.email_address">
                            {{ error.id_number[0] }}
                        </small>
                    </div>

                    <div class="form-group mb-3">
                        <label for="dob" class="form-label">Date of Birth</label>
                        <div class="input-group">
                            <input type="date" v-model="model.client.dob" class="form-control" placeholder="Enter Client Date of Birth">
                        </div>
                        <small class="text-danger" v-if="submitted && !model.client.dob">
                            Date of Birth is required.
                        </small> 
                    </div>

                    <div class="form-group mb-3">
                        <label for="telephone" class="form-label">Telephone</label>
                        <div class="input-group">
                            <input type="text" v-model="model.client.telephone" class="form-control" placeholder="Enter Client Telephone">
                        </div>
                        <small class="text-danger" v-if="submitted && !model.client.telephone">
                            Telephone is required.
                        </small>
                        <small class="text-danger" v-if="submitted && model.client.telephone && model.client.telephone.length !== 10">
                            ID Number must be exactly 10 digits start with 0.
                        </small>
                        <small class="text-danger" v-if="submitted && model.client.telephone && isNaN(Number(model.client.telephone))">
                            Telephone must be numeric.
                        </small>
                        <small class="text-danger" v-if="submitted && error.telephone">
                            {{ error.telephone[0] }}
                        </small>
                    </div>

                    <div class="form-group mb-3">
                        <label for="email_address" class="form-label">Email</label>
                        <div class="email_address">
                            <input type="text" v-model="model.client.email_address" class="form-control" placeholder="Enter Client Email">
                        </div>

                        <small class="text-danger" v-if="submitted && !model.client.email_address">
                            Email is required.
                        </small>
                        <small class="text-danger" v-if="submitted && model.client.email_address && !model.client.email_address.includes('@')">
                            Email must contain an "@" symbol.
                        </small>
                        <small class="text-danger" v-if="submitted && error.email_address">
                            {{ error.email_address[0] }}
                        </small>
                    </div>
                    
                    <button type="submit" class="btn btn-primary" style="margin-right: 10px;">Save</button>

                    <RouterLink to="/clients" class="btn btn-secondary">Back</RouterLink>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
    import axios from 'axios';
    import { required } from '@vuelidate/validators';
    export default {
        name: 'addClient',
        data(){
            return{
               // 'first_name','last_name','id_number','dob','telephone','email_address'
                model:{
                    client:{
                        first_name:'',
                        last_name:'',
                        id_number:'',
                        dob:'',
                        email_address:'',
                        telephone:'',
                    }
                },
                submitted: false,
                error: {
                    first_name: '',
                    last_name: '',
                    id_number: '',
                    dob: '',
                    email_address: '',
                    telephone: '',
                },
            }
        },
        validations: {
            model: {
                client: {
                    first_name: { required },
                    last_name: { required },
                    id_number: { required },
                    dob: { required },
                    email_address: { required },
                    telephone: { required },
                }
            }
        },
        methods:{
            async saveClient(){

                this.submitted = false;
                this.error = [];
                if (this.$v) {
                    this.$v.$touch();
                    if (this.$v.$invalid) {
                        return;
                    }
                }

                try {
                    const response = await axios.post('http://localhost:8000/api/create/client', this.model.client);

                    console.log(response);

                    alert(response.data.message);

                    this.$router.push({ name: 'clients' });
                    
                } 
                catch (error) 
                {

                    console.log('Error when adding a client:', error);

                    this.submitted = true;
                    if (this.$v) {
                        this.$v.$touch();
                    }

                    if(error.response){
                        console.log(error.response);

                        if(error.response && error.response.status === 422){
                            this.error = error.response.data.errors;
                        }
                    }
                    else if(error.response.status === 401)
                    {
                        //console.log("Not authorized");
                        this.submitted = false;
                        if(this.model.client.first_name){
                            this.error.first_name = error.response.data.errors;
                        }
                        else if(this.model.client.last_name){
                            this.error.last_name = error.response.data.errors;
                        }
                        else if(this.model.client.id_number){
                            this.error.id_number = error.response.data.errors;
                        }
                        else if(this.model.client.dob){
                            this.error.dob = error.response.data.errors;
                        }
                        else if(this.model.client.email_address){
                            this.error.email_address = error.response.data.errors;
                        }
                        else if(this.model.client.telephone){
                            this.error.telephone = error.response.data.errors;
                        }
                    }
                    else{
                        console.log("Error when adding a client:", error);
                    }
                }
                
            }
        }
    }

</script>

<style>

</style>