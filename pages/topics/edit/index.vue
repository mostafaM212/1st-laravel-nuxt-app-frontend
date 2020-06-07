<template>
    <div class="container">
      <h2 class="text primary">Update Topic Title</h2>
      <div class="alert alert-success" role="alert" v-if="success">
        You have changed your title successfully
      </div>
      <form v-on:submit.prevent="submit">
        <div class="form-group mt-5">
          <input type="text" class="form-control" v-text="form.title"  v-model.lazy="form.title">
          <small v-if="errors.title" class="form-text text-danger">{{errors.title[0]}}</small>
        </div>
        <button class="btn btn-outline-success fa fa-edit" type="submit">Edit</button>
      </form>
      <p class="btn btn-outline warning mt-5">
        <nuxt-link to="/topics">Back to Topics</nuxt-link>
      </p>
    </div>
</template>

<script>
    export default {
        data(){
          return {
            success : false ,
            form : {
              title : ''
            }
          }
        },
      async asyncData(context){
          let {data} =await context.$axios.get('/topics/'+ context.params.id ) ;

          return {
            success : false ,
            form : {
              title : data.data.title
            }
          }
      },

      methods : {
          async submit(){
            await this.$axios.put('/topics/'+ this.$route.params.id ,this.form).then((response)=>{
              this.success = true ;


            })
          }
      }

    }
</script>

<style scoped>

</style>
