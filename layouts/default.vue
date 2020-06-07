<template>
  <div>

      <app-nav></app-nav>

      <nuxt />

  </div>
</template>

<script>

  import Navbar from "../components/Navbar";
    export default {
      components : {
        'app-nav': Navbar
      }

    }
</script>

