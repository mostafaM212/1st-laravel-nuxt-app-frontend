<template>
    <div class="container col-md-6 mt-5">
      <div class="alert alert-danger" role="alert" v-if="wrong">
       make sure that you write email and password
      </div>
      <h2 class="text-primary">Login</h2>
      <br>
      <form v-on:submit.prevent="submit">
        <div class="form-group">
          <label >Email address</label>
          <input type="email" class="form-control"  aria-describedby="emailHelp" v-model.trim.lazy="form.email"  autofocus>
          <small  class="form-text text-danger" v-if="errors.email">{{ errors.email[0]}}</small>
        </div>
        <div class="form-group">
          <label >Password</label>
          <input type="password" class="form-control" v-model.trim.lazy="form.password">
          <small  class="form-text text-danger" v-if="errors.password">{{ errors.password[0] }}</small>
        </div>
        <button type="submit" class="btn btn-primary fa fa-unlock"> Login</button>
      </form>
      <p>Don't have an account ? <nuxt-link to="/register">create new account</nuxt-link></p>

    </div>
</template>

<script>
    import axios from "../.nuxt/axios";

    export default {
      middleware : ['guest'],
        data() {
          return {
              form : {
                email : '',
                password : '',
              },
            wrong : false
          }
        },
      methods : {
          async submit(context){
              await this.$auth.loginWith("local",{
                data : this.form
              }).then((response)=>{
                this.wrong = false
                this.$router.push({
                  path : this.$route.query.redirect || '/dashboard'
                }) ;
              }).catch((error)=>{

                setTimeout(()=>{
                  return  this.wrong = true ;
                },3)
                this.wrong = false
              })



            // await axios.post('http://127.0.0.1:8000/api/auth/login').then((response)=>{
            //   console.log(response.data)
            // })
          }
      }
    }
</script>

<style scoped>

</style>
