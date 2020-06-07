<template>
  <div class="container col-md-6 mt-5">
    <div class="alert alert-danger" role="alert" v-if="success">
      make sure that you write Your data correctly
    </div>
    <h2 class="text-primary">Create new topic</h2>
    <br>

    <form v-on:submit.prevent="create">
      <div class="form-group">
        <label ><strong>Topic Title :</strong></label>
        <input type="text" class="form-control"  aria-describedby="emailHelp" v-model.trim.lazy="form.title" placeholder="Enter Topic Title"  autofocus>
        <small  class="form-text text-danger" v-if="errors.title">{{ errors.title[0]}}</small>
      </div>
      <div class="form-group">
        <label ><strong>Topic Body :</strong></label>
        <textarea class="form-control" rows="5" v-model.lazy="form.body"></textarea>
        <small  class="form-text text-danger" v-if="errors.body">{{ errors.body[0]}}</small>
      </div>
      <button type="submit" class="btn btn-primary">Create</button>
    </form>
  </div>
</template>

<script>
    export default {
      middleware : ['auth'] ,
      data(){
        return {
          form : {
            title : '' ,
            body : ''
          },
          success : false
        }
      },

      methods : {

        async create(){
            await  this.$axios.$post('/topics',this.form).then((response)=>{


              this.$router.push('/')
            }).catch((error)=>{
              this.success = true
            }) ;


        }
      }

    }
</script>

<style scoped>

</style>
