<template>
  <div class="city" v-on:click="moreInfo(city.woeid)">
    <div>
    <h3>{{city.title}}</h3>
    <p>Temperature: {{city.consolidated_weather[0].the_temp.toFixed(2)}}</p>
    <p>Minimum temperature: {{city.consolidated_weather[0].min_temp}}</p>
    <p>Maximum temperature: {{city.consolidated_weather[0].max_temp}}</p>
    <p>Weather: {{city.consolidated_weather[0].weather_state_name}}</p>
    <p>View more info</p>
    </div>
    <div style='text-align: right;'>
      <img v-bind:src="imgUrl()"/>
    </div>
  </div>
</template>
<script>

  export default {
    name: 'weather',
    data () {
      return {
      }
    },
    props:[
      'city'
    ],
    methods:{
      imgUrl: function () {
        return "https://www.metaweather.com/static/img/weather/ico/" + this.city.consolidated_weather[0].weather_state_abbr + ".ico"
      },
      moreInfo: function(woeid){
        this.$router.push({ path: "/weather/" + woeid })
      }
    }


  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .city {
    margin: 20px;
    width: 40%;
    border: 1px solid #ededed;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif !important;
    display: inline-block;
    font-weight: 300;
    text-align: left;
    padding: 15px;
    box-sizing: border-box;
    box-shadow: 0.5px 0.5px 9px 1px #ededed;
    vertical-align: top;
  }
</style>
