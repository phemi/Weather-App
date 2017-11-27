<template>
  <div class="hello">
    <h2 v-if="loading">Loading...</h2>
    <weather v-for="(city, index) in weatherArray" :city="city" :key="index" :loading='loading'/>
  </div>
</template>

<script>
  import weather from './Weather.vue';
  import axios from 'axios';
  export default {
    name: 'Home',
    data () {
      return {
        msg: 'Welcome to Your Vue.js App',
        cityList: [
          "Istanbul",
          "Berlin",
          "London",
          "Helsinki",
          "Dublin",
          "Vancouver",
        ],
        weatherArray: [],
        loading: true
      }
    },
    components: {
      weather
    },
    mounted(){
      this.cityList.map((city) => {
        axios.get('http://localhost/weather.php', {params: {command: 'search', keyword: city}})
          .then((resp) => {
            axios.get('http://localhost/weather.php', {params: {command: 'location', woeid: resp.data[0].woeid}})
              .then((response) => {
                this.weatherArray.push(response.data);
                this.loading = false
              })
              .catch((error) => {
                console.log(error)
              })
          })
          .catch((error) => {
            console.log(error)
          })
      })
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  h1, h2 {
    font-weight: normal;
  }

  ul {
    list-style-type: none;
    padding: 0;
  }

  li {
    display: inline-block;
    margin: 0 10px;
  }

  a {
    color: #42b983;
  }
</style>
