<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
*{
  margin:0px;
  padding: 0px;
  box-sizing: border-box;
}
body{
  width: 600px;
}

*::-webkit-scrollbar{
    width: 2px;
}

*::-webkit-scrollbar-thumb {
    background: #ccc; 
    border-radius: 5px; 
}

* {
    scrollbar-width: 10px;
    scrollbar-base-color: green;
    scrollbar-track-color: red;
    scrollbar-arrow-color: blue;
}
</style>
