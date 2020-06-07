<template>
    <div class="container">
      <h2 class="text-primary">latest topics</h2>
      <div v-for="(topic , index) in topics" :key="index" class="bg-light mt-5 mb-5" style="padding: 20px">


          <h2 v-text="topic.title"></h2>
        <p class="text-muted">{{topic.created_at}} created by : {{topic.user.name}}</p>

        <div v-for="(post , index) in topic.posts" :key="index" class="ml-5 content">
            {{post.body}}
          <p class="text-muted">{{post.created_at}} created by : {{post.user.name}}</p>
        </div>
        <nuxt-link class="btn btn-outline-primary fa fa-clipboard  " :to="{name : 'topics-id' , params : {id : topic.id} }"> show</nuxt-link>
        <nuxt-link class="btn btn-outline-success fa fa-edit  pull-right" style="margin-left: 50px" v-if="authenticated && topic.user.id === user.id" :to="{name : 'topics-edit' , params : {id : topic.id} }">Edit </nuxt-link>
        <button v-if="authenticated && user.id === topic.user.id" v-on:click="deleteTopic(topic.id)" class="btn btn-outline-danger fa fa-trash" style="margin-left: 50px"> Delete</button>
      </div>
      <nav>
        <ul class="pagination justify-content-center">
          <li v-for="(key , value) in links" class="page-item">
            <a v-on:click="loadMore(key)" class="page-link">{{value }}</a>
          </li>
        </ul>
      </nav>
    </div>
</template>

<script>
    export default {
        data(){
          return {
            topics : [],

            links : []
          }
        },
        async asyncData(context){
            let {data , links} = await context.$axios.$get('/topics') ;

            // console.log(data)
          return  {
            topics : data,
            links
          }
        },
        methods : {

          async loadMore(key){
            if (key !== null){

              let {data}=  await this.$axios.$get(key) ;

              return  this.topics = {...this.topics ,...data}
            }
          },
          async deleteTopic(id){
            await this.$axios.delete('/topics/'+ id)

            this.$router.push('/')
          }
        }
    }
</script>

<style >
  .content{
    border-left: 10px solid white;

    padding: 0 10px 0 10px;
  }
</style>
