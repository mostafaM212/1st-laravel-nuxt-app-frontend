<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light mb-5">
    <nuxt-link class="navbar-brand" to="/">Frontend</nuxt-link>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNav">
      <ul class="navbar-nav">
        <li class="nav-item active">
          <nuxt-link class="nav-link" to="/">Home <span class="sr-only">(current)</span></nuxt-link>
        </li>
        <li class="nav-item">
          <nuxt-link class="nav-link" to="/topics">Topics</nuxt-link>
        </li>
        <li class="nav-item">
          <nuxt-link class="nav-link" to="/dashboard">Create</nuxt-link>
        </li>
      </ul>
      <ul class="navbar-nav ml-auto" v-if="!authenticated">
        <li class="nav-item">
          <nuxt-link class="nav-link fa fa-user" to="/login"> Login</nuxt-link>
        </li>
        <li class="nav-item">
          <nuxt-link class="nav-link fa fa-user-plus " to="/register" > Register</nuxt-link>
        </li>
      </ul>
      <ul class="navbar-nav ml-auto " style="margin-right: 100px" v-if="authenticated">
        <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle text-success fa fa-user " href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            {{user.name}}
          </a>
          <div class="dropdown-menu" aria-labelledby="navbarDropdown">
            <nuxt-link class="dropdown-item" to="profile">Profile</nuxt-link>
            <a class="dropdown-item" href="#">Another action</a>
            <div class="dropdown-divider"></div>
            <a class="dropdown-item text-danger fa fa-door-closed" v-on:click.prevent="logout">Logout</a>
          </div>
        </li>
      </ul>
    </div>

  </nav>
</template>

<script>
    export default {

      data(){
          return {

          }
      },
      methods : {
          logout(){
            this.$auth.logout()
          }
      },
    }
</script>

<style scoped>

</style>
