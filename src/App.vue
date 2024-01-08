<script setup>
import { RouterLink, RouterView } from 'vue-router';
import { mapState, mapActions } from 'vuex';
</script>
<template>
  <div>
    <header>
      <div class="wrapper">
        <nav class="navbar navbar-expand-lg bg-body-tertiary">
          <div class="container-fluid">
            <RouterLink class="navbar-brand" to="#">LOGO</RouterLink>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
              <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
                <li class="nav-item">
                  <RouterLink class="nav-link active" aria-current="page" to="/dashboard">Home</RouterLink>
                </li>
                <li class="nav-item">
                  <RouterLink class="nav-link" to="/clients">Client</RouterLink>
                </li>
                <li class="nav-item">
                  <RouterLink class="nav-link" to="/">Login</RouterLink>
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

</script>

<style>

</style>


    


