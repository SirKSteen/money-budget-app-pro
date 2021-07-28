<template>
  <div class="headerContainer">
    <h2>{{title}}</h2>
  </div>
</template>

<script>
    export default {
        name: "Header",
        props:{
          title: String,
        }
    }
</script>

<style scoped>
.headerContainer {
  background-color: rgba(28, 80, 110, 0.692); 
  width: 100%;
  height: 45px;
  text-align: center;
}

h2 {
  padding-top: 7px;
  color: rgb(245, 245, 245);
}

</style>