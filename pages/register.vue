<template>
  <div class="container col-md-6 mt-5">
    <div class="alert alert-danger" role="alert" v-if="wrong">
      make sure that you write email and password
    </div>
    <h2 class="text-primary">Register</h2>
    <br>
    <form v-on:submit.prevent="submit">
      <div class="form-group">
        <label >Name</label>
        <input type="text" class="form-control"  placeholder="enter your name " autofocus v-model.lazy="form.name">
        <small  class="form-text text-danger" v-if="errors.name">{{ errors.name[0] }}</small>
      </div>
      <div class="form-group">
        <label >Email address</label>
        <input type="email" class="form-control"  placeholder="enter your email " v-model.lazy.trim="form.email" aria-describedby="emailHelp">
        <small  class="form-text text-danger" v-if="errors.email">{{ errors.email[0] }}</small>
      </div>
      <div class="form-group">
        <label >Password</label>
        <input type="password" class="form-control"  placeholder="enter your password " v-model.lazy="form.password">
        <small  class="form-text text-danger" v-if="errors.password">{{ errors.password[0] }}</small>
      </div>
      <button type="submit" class="btn btn-primary fa fa-user-plus">Register</button>
    </form>
    <p>Do you have an account ? <nuxt-link to="/login">Login</nuxt-link></p>
  </div>
</template>

<script>
    export default {
      middleware : ['guest'],
      data(){
        return {
          form : {
            name : '' ,

            email : '',

            password : ''
          },
          wrong : false
        }
      },

      methods : {
        async submit(){
          await this.$axios.$post('register',this.form).then((response)=>{
            this.wrong = false
          }).catch((error)=>{

            setTimeout(()=>{
              return  this.wrong = true ;
            },3)
            this.wrong = false
          })
          await this.$auth.loginWith('local',{
           data : {
             email : this.form.email ,
             password : this.form.password
           }
          }).then((response)=>{

            this.$router.push({
              path : this.$route.query.redirect || '/dashboard'
            }) ;
          }).catch((error)=>{
            console.log(error)
          })




        }
      }

    }
</script>

<style scoped>

</style>
