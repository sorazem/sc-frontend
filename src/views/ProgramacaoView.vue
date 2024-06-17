<template>
    <div class="container">
      <header class="jumbotron">
        <h3>
          <strong>{{userName}}</strong> Profile
        </h3>
        <ul>
            <li v-for="palestra in palestras" :key="palestra.title">
                {{ palestra.title }}
            </li>
        </ul>
      </header>
    </div>
  </template>
  
  <script>
  import EventService from '../services/event.service.js';
  export default {
    name: 'ProgramacaoView',
    data(){
        return{
            palestras: null
        }
    },
    computed: {
      currentUser() {
        return this.$store.state.auth.user;
      },
      userName(){
        return JSON.parse(this.currentUser.user).name
      }
    },
    mounted(){
        EventService.getEventSchedule(this.$route.params.slug).then(
            (response) =>{
                this.palestras = response.talks;
            }
        )
        // console.log(this.palestras)
    }
  };
  </script>