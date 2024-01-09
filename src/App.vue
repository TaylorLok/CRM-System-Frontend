<script setup>
import { RouterLink, RouterView } from 'vue-router';
import { mapState, mapActions } from 'vuex';
</script>
<template>
  <div>
    <header>
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <div class="wrapper">
        <nav class="navbar navbar-expand-lg bg-body-tertiary">
          <div class="container-fluid">
            <RouterLink class="navbar-brand" to="#">LOGO</RouterLink>
            <button 
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
            >
            <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
              <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
                <li class="nav-item">
                  <RouterLink class="nav-link active" aria-current="page" to="/dashboard">Home</RouterLink>
                </li>
                <li class="nav-item">
                  <RouterLink class="nav-link active" aria-current="page" to="">About us</RouterLink>
                </li>
                <li class="nav-item">
                  <RouterLink class="nav-link" to="/clients">Client</RouterLink>
                </li>
                <li class="nav-item" v-if="isLoggedIn && $store.state.user">
                  <p class="nav-link">{{ $store.state.user.name }}</p>
                </li>
                <li class="nav-item" v-if="!isLoggedIn">
                  <RouterLink class="nav-link" to="/">Login</RouterLink>
                </li>
                <li class="nav-item" v-if="isLoggedIn">
                  <RouterLink class="nav-link" @click="logout" to="/">Logout</RouterLink>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </div>

    </header>

    <div class="container mt-5">
      <RouterView />
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
export default {
  computed: {
    ...mapState(['isLoggedIn'])
  },
  methods: {
    ...mapActions(['logout'])
  },
}
</script>

<style>
  .wrapper {
    padding: 15px;
  }

  .navbar-brand {
    font-size: 1.5rem;
  }

  .navbar-toggler {
    border: none; 
  }

  .navbar-nav {
    margin-top: 10px;
  }

  .nav-link {
    padding: 10px;
  }

  @media (max-width: 767px) {
    .navbar-toggler {
      margin-top: 5px;
    }

    .navbar-nav {
      margin-top: 0;
    }

    .nav-link {
      padding: 10px 15px;
    }
  }
</style>


    


