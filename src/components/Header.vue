<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-primary shadow mb-5">
    <a class="navbar-brand" href="#">{{ !this.$store.getters.isAuthenticated ? "Please Login" : "Welcome" }}</a>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav mr-auto">
        <router-link to="/" class="nav-item" tag="li">
          <a class="nav-link" href="#">Home</a>
        </router-link>
        <router-link to="/about" class="nav-item" tag="li">
          <a class="nav-link" href="#">About</a>
        </router-link>
      </ul>
      <ul class="navbar-nav my-2 my-lg-0" :class="logoutClass">
        <li class="nav-item">
          <a @click.prevent="logout" class="nav-link" href="#">Log out</a>
        </li>
      </ul>
    </div>
  </nav>
</template>
<script>
  export default {
    methods: {
      logout() {
          this.$store.dispatch("logout")
      }
    },
    computed: {
      logoutClass() {
        return {
          'd-none': !this.$store.getters.isAuthenticated
        }
      }
    }
  }
</script>
