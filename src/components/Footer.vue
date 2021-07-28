<template>
  <div class="footerContainer">
    <h3>{{ footerInfo }}</h3>
  </div>
</template>

<script>
export default {
  name: "Footer",
  props: {
    footerInfo: String,
  },
};
</script>

<style scoped>
.footerContainer {
  text-align: center;
  position: absolute;
  bottom: 0;
  height: 35px;
  width: 100%;
  background-color: rgb(75, 75, 75);
  color: #ffff;
}
h3 {
  padding-top: 10px;
  font-size: 14px;
}
</style>
