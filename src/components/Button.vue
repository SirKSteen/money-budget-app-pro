<template>
  <button
  @click="clickHandler"
  :style="{background: color}"
  >{{ name }}</button>
</template>

// ******************************************

<script>
export default {
  name: "Button",
  props: {
    name: String,
    color: String,
  },
  methods: {
    clickHandler() {
      console.log("Button Click")
      this.$emit('btn-click')
    }
  }
};
</script>

// ******************************************

<style scoped>
button {
    border-radius: 5px;
    color: #fff;
    border: none;
    padding: 7px 6px;
    font-size: 15px;
    height: 30px;
}

button:hover {
    cursor: pointer;
}
</style>
