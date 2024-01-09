<template>
    <div class="container mt-5">
        <div class="card my-card md-8">
            <div class="card-header">
            <h4>Clients
                <RouterLink class="btn btn-primary float-end" to="/clients/save">Add Client</RouterLink>
            </h4>
            <br>
                <form @submit.prevent="searchClients">
                    <div class="input-group mb-3">
                        <input type="text" v-model="searchTerm" class="form-control" placeholder="Search clients">
                        <div class="input-group-append">
                            <button class="btn btn-primary" type="submit">Search</button>
                        </div>
                    </div>
                </form>
            </div>
            <div class="card-body md-8">
                <div class="table-responsive">
                    <table class="table table-bordered table-striped">
                        <thead>
                            <tr  style="white-space: nowrap; color:#000000">
                                <th style="font-weight: bold; color: #000000;">ID</th>
                                <th style="font-weight: bold; color: #000000;">uuid</th>
                                <th style="font-weight: bold; color: #000000;">FirstName</th>
                                <th style="font-weight: bold; color: #000000;">LastName</th>
                                <th style="font-weight: bold; color: #000000;">ID Number</th>
                                <th style="font-weight: bold; color: #000000;">Date of Birth</th>
                                <th style="font-weight: bold; color: #000000;">Telephone</th>
                                <th style="font-weight: bold; color: #000000;">Email</th>
                                <th style="font-weight: bold; color: #000000;">Status</th>
                                <th style="font-weight: bold; color: #000000;">Created At</th>
                                <th style="font-weight: bold; color: #000000;">Actions</th>
                            </tr>
                        </thead>
                        <tbody v-if="this.clients.length > 0">
                            <tr v-for="client in clients" :key="client.id">
                                <td>{{ client.id }}</td>
                                <td>{{ client.uuid }}</td>
                                <td>{{ client.first_name }}</td>
                                <td>{{ client.last_name }}</td>
                                <td>{{ client.id_number }}</td>
                                <td>{{ client.dob }}</td>
                                <td>{{ client.telephone }}</td>
                                <td>{{ client.email_address }}</td>
                                <td :style="{ color: client.status === 1 ? '#04ABC1' : '#712011' }">
                                    {{ client.status === 1 ? 'Active' : 'Inactive' }}
                                </td>
                                <td>{{ formatDate(client.created_at) }}</td>
                                <td>
                                    <div class="d-flex">
                                        <RouterLink :to="{ path: '/client/'+client.id+'/update'}" class="btn btn-success mr-2">
                                            Edit
                                        </RouterLink>
                                        <button type="button" @click="deleteClient(client.id)" class="btn btn-danger">
                                            Delete
                                        </button>
                                    </div> 
                                </td>
                            </tr>
                        </tbody>
                        <tbody v-else>
                            <tr>
                                <td colspan="11" class="text-center">Loading...</td>
                            </tr>
                        </tbody>          
                    </table>
                </div>
            </div>
        </div>
    </div>
</template>
    
<script>
    import axios from 'axios'

    export default {
        name: 'clients',
        data() {
            return {
                searchTerm:'',
                clients: []
            }
        },
        mounted(){
            this.getClients();
        },
        watch: {
            searchTerm(newVal) {
                if (newVal === '') {
                    this.getClients();
                }
            }
        },
        methods:{
           async getClients()
           {
                try {
                    const response = await axios.get(`http://localhost:8000/api/clients`);

                    this.clients = response.data
                } 
                catch (error) {
                    alert(error.response.data.message)
                }
                
            },

            formatDate(dateTime) {
            const date = new Date(dateTime);
            return `${date.toISOString().slice(0, 19).replace("T", " ")}`;
            },

            async searchClients() {
                // Implement your search logic here
                try {
                    const response = await axios.get(`http://localhost:8000/api/clients/filter/${this.searchTerm}`);

                    this.clients = response.data
                    console.log(this.clients);
                    
                } 
                catch (error) {
                    if (error.response.status == 404) {
                        alert(error.response.data.message);
                    } else {
                        alert('An error occurred');
                    }
                }
            },

            async deleteClient(clientId){

                if(confirm("Are you sure want to delete this client?")){
                    try {
                        const response = await axios.delete(`http://localhost:8000/api/delete/client/${clientId}`);
                        console.log(response.data);
                        this.getClients()
                        
                    } catch (error) {
                        console.log(error.response)
                        if (error.response) 
                        {
                            if(error.response.status == 404){
                                alert(error.response.data.message)
                            }
                        }
                    }
                }
            }
        }
    }
</script>
<style>
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
.my-card {
    margin-top: 20px; /* Adjust this value as needed */
}
</style>