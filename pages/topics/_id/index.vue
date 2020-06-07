<template>
  <div class="container">

    <div  class="bg-light mt-5 mb-5" style="padding: 20px">
      <h2 class="text-primary display-3" v-text="topic.title"></h2>
      <br>
      <p class="text-muted">{{topic.created_at}} created by : {{topic.user.name}}</p>

      <div v-for="(post , index) in topic.posts" :key="index" class="ml-5 content">
        <p>{{post.body}}</p>
        <div v-if="authenticated">
          <div v-if="user.id === post.user.id " class="pull-right" >
            <button class="btn btn-outline-danger fa fa-trash pull-right" v-on:click="deletePost(post)"></button>
            <nuxt-link class="btn btn-outline-success fa fa-edit pull-right"  :to="{name : 'topics-posts-edit', params : {id : post.id ,topic_id : post.topic_id}}"></nuxt-link>
          </div>
        </div>
        <p class="text-muted">{{post.created_at}} created by : {{post.user.name}}</p>
        <br>
      </div>
    </div>
    <div class="mt-5 ml-5 mb-5" v-if="authenticated">
      <h3 class="text-success">Add New Post To This Topic</h3>
      <form v-on:submit.prevent="create">
        <div class="form-group">
          <label >Add New Post :</label>
          <textarea class="form-control" rows="5" v-model.lazy="body" placeholder="write something....."></textarea>
          <small class="text-danger form-text" v-if="errors.body">{{errors.body[0]}}</small>
        </div>
        <button class="btn btn-outline-success fa fa-plus" type="submit">Add Post</button>
      </form>
    </div>
  </div>
</template>

<script>
    export default {
        data(){
          return {
            topic : [],
            body : ''
          }
        },

      async asyncData(context){
          let {data} = await context.$axios.$get('/topics/'+context.params.id) ;

          return {
            topic : data
          }
      },

      methods : {
          async create(){
            await this.$axios.$post('/topics/'+this.topic.id +'/posts', { body : this.body })
              .then((response)=>{
                this.$router.push('/topics') ;
              })
              .catch((error)=>{
                  console.log(error)
              }) ;
          },
        async deletePost( post){
            await this.$axios.$delete('/topics/'+post.topic_id+'/posts/'+post.id).then((res)=>{
              this.$router.push('/topics') ;
          })
         }
      }
    }
</script>

<style scoped>

</style>
