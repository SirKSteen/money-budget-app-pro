<template>
  <div class="dateTimeContainer">
    <div>
      <h4>Date: {{ currentDate() }}</h4>
    </div>
    <div>
      <h4>Time: {{ dateTime.hours }}:{{ dateTime.minutes }}:{{ dateTime.seconds }}</h4>
    </div>
  </div>
</template>

// *****************************************

<script>
const time = new Date();

export default {
  name: "DateTime",
  data() {
    return {
      dateTime: {
        hours: time.getHours(),
        minutes: time.getMinutes(),
        seconds: time.getSeconds(),
      },
      timer: undefined,
    };
  },
  methods: {
    currentDate() {
      const current = new Date();
      const date = `${current.getDate()}/${
        current.getMonth() + 1
      }/${current.getFullYear()}`;
      return date;
    },
    setDateTime() {
      const dateT = new Date();
      this.dateTime = {
        hours: dateT.getHours(),
        minutes: dateT.getMinutes(),
        seconds: dateT.getSeconds(),
      };
    },
  },
  beforeMount() {
    this.timer = setInterval(this.setDateTime, 1000);
  },
  beforeUnmount() {
    clearInterval(this.timer);
  },
};
</script>

// ***************************************

<style scoped>
h4 {
  padding-top: 5px;
}

.dateTimeContainer {
  display: inline-flex;
  gap: 20px;
}
</style>
