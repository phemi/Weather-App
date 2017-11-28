<template>
  <div class="hello">
    <div >
      <h2>Search</h2>
      <input v-model='search_param' class='search_input' placeholder='Enter the location (e.g Dublin)'  type='text'/>
      <button class='search_button' v-on:click="newSearch()" > Search</button>
    </div>
    <h2 v-if="loading">Loading...</h2>
    <div v-if="empty">
      <p>No results were found</p>
    </div>
    <weather v-for="(city, index) in weatherArray" :city="city" :key="index" :loading='loading'/>
  </div>
</template>

<script>
  import weather from './Weather.vue';
  import axios from 'axios';
  export default {
    props: ['keyword'],
    name: 'Search',
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
        search_param: '',
        empty: false
      }
    },
    components: {
      weather
    },
    methods: {
            searchUrl: function () {
                return "/search/" + this.search_param
            },
            getSearchInput: function(){
              return this.keyword
            },
            search: function(){
              //clear current weather data
              this.weatherArray = [];
              this.loading = true;
              this.empty = false;
              axios.get('http://localhost/weather.php', {params: {command: 'search', keyword: this.search_param}})
                .then((resp) => {
                if( resp.data.length == 0 ){
                  this.empty = true;
                  this.loading = false;
                }
                  resp.data.map((city) => {
                    //loop through each city result
                    axios.get('http://localhost/weather.php', {params: {command: 'location', woeid: city.woeid}})
                      .then((response) => {
                        this.weatherArray.push(response.data);
                        this.loading = false
                      })
                      .catch((error) => {
                        console.log(error)
                      })
                  })
                })
                .catch((error) => {
                  console.log(error)
                })
            },
            newSearch: function(){
              this.search();
              this.$router.push({ path: "/search/" + this.search_param }) //change the path

            }
    },
    mounted(){
      this.search_param = this.keyword;
      this.search();
    }
  }
</script>

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
