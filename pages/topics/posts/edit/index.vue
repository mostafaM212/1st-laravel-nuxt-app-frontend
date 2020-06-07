<template>
  <div class="container">
    <h2 class="text-primary">Update Your Post</h2>
    <form v-on:submit.prevent="update">
      <div class="form-group">
        <label>New Post Body</label>
        <textarea class="form-control" rows="5" v-model.lazy="form.body" >{{form.body}}</textarea>
        <small class="text-danger form-text" v-if="errors.body">{{errors.body[0]}}</small>
      </div>
      <button class="btn btn-outline-success fa fa-plus" type="submit">Update Post</button>
    </form>
    <br>
    <p><nuxt-link to="/topics">back to topics</nuxt-link></p>
  </div>
</template>

<script>
    export default {
      data(){
        return {
          post : {},
          form : {
            body : ''
          }
        }
      },

      async asyncData(context){

        let {data} =  await context.$axios.$get('/topics/'+ context.params.topic_id +'/posts/'+ context.params.id) ;
        return {
          form : {
            body : data.body
          },
          post : data
        };
      },

      methods : {
        async update(){
          await this.$axios.$put('/topics/'+this.post.topic_id + '/posts/'+this.post.id,this.form)
          .then((response)=>{
            // this.$router.push('/topics')

          }).catch((error)=>{
            console.log(error)
            })
          this.$router.push('/topics/'+this.post.topic_id)
        }
      }
    }
</script>

<style scoped>

</style>
