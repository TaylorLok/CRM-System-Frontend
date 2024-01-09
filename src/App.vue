<script setup>
import { onMounted } from 'vue';
import { RouterLink, RouterView } from 'vue-router';
import { mapState, mapActions } from 'vuex';
import Footer from '@/components/Footer.vue';

onMounted(() => {
  let script = document.createElement('script');
  script.src = 'https://stackpath.bootstrapcdn.com/bootstrap/5.0.0-beta1/js/bootstrap.min.js';
  script.integrity = 'sha384-pzjw8f+ua7Kw1TIq0v8FqFjcJ6pajs/rfdfs3SO+kD4Ck5BdPtF+to8xM6B5z6W5';
  script.crossOrigin = 'anonymous';
  // document.head.append(script);
});
</script>
<template>
  <div>
    <header v-if="isLoggedIn">
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <div class="wrapper">
        <nav class="navbar navbar-expand-lg bg-body-tertiary">
          <div class="container-fluid">
            <RouterLink to="#" class="navbar-brand">LOGO</RouterLink>
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
                  <RouterLink to="/clients" class="nav-link">Client</RouterLink>
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
      <Footer />
    </div>
  </div>
</template>

<script>

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


    


