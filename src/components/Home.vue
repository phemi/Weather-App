<template>
  <div class="hello">
    <div >
      <h2>Weather Forecast</h2>
      <input v-model='search_param' class='search_input' placeholder='Enter the location (e.g Dublin)' type='text'/>
      <router-link class='search_button' :to="searchUrl()" > Search</router-link>
    </div>
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
        loading: true,
        search_param: ''
      }
    },
    components: {
      weather
    },
    methods: {
            searchUrl: function () {
                return "search/" + this.search_param
            }
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

  .search_input{
    width: 60%;
    height: 30px;
    padding-left: 10px;
  }

  .search_button{
    padding: 10px;
    text-decoration: none;
    background-color: #36d40f;
    color: #ffffff;
  }

</style>
