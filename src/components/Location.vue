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
    data () {
      return {
        weatherArray: [],
        loading: true,
        title: 'Getting location details...',
        search_param: '',
        days: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        d: '',
        dayName: '',
        dayOftheWeek: ''
      }
    },
    components: {
      ConsolidatedWeather
    },
    methods: {
            searchUrl: function () {
                return "search/" + this.search_param
            },
            getDayName: function (applicable_date) {

            this.d = new Date(applicable_date);
            this.dayName = this.days[this.d.getDay()];

            return this.dayName;
            }
    },
    mounted(){
    axios.get('http://localhost/weather.php', {params: {command: 'location', woeid: this.woeid}})
      .then((response) => {
        this.title = response.data.title
        response.data.consolidated_weather.map((weather) => {
        this.dayOftheWeek = this.getDayName(weather.applicable_date)
        weather.applicable_date = this.dayOftheWeek+": "+weather.applicable_date

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
