<template>
<div class="hello">
  <div >
    <h2>{{title}}</h2>
  </div>
  <h2 v-if="loading">Loading...</h2>
  <ConsolidatedWeather v-for="(weather, index) in weatherArray" :weather=weather :key="index" :loading='loading'/>
</div>
</template>

<script>
  import ConsolidatedWeather from './ConsolidatedWeather.vue';
  import axios from 'axios';
  export default {
    props: ['woeid'],
    name: 'Location',
    title: 'Getting location details...',
    data () {
      return {
        weatherArray: [],
        loading: true,
        search_param: ''
      }
    },
    components: {
      ConsolidatedWeather
    },
    methods: {
            searchUrl: function () {
                return "search/" + this.search_param
            }
    },
    mounted(){
    axios.get('http://localhost/weather.php', {params: {command: 'location', woeid: this.woeid}})
      .then((response) => {
        this.title = response.data.title
        response.data.consolidated_weather.map((weather) => {
          this.weatherArray.push(weather);
          this.loading = false
        })
      })
      .catch((error) => {
        console.log(error)
      })
    }


  }
</script>
