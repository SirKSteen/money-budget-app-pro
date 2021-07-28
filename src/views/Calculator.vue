<template>
  <div class="calcContainer">
    <div class="calcContainer-Inner">
      <div class="display">{{ current || "0" }}</div>

      <div @click="clear" class="btn">AC</div>
      <div @click="sign" class="btn">+/-</div>
      <div @click="percent" class="btn">%</div>

      <div @click="divide" class="btn operator">÷</div>

      <div @click="append('7')" class="btn">7</div>
      <div @click="append('8')" class="btn">8</div>
      <div @click="append('9')" class="btn">9</div>

      <div @click="multiply" class="btn operator">*</div>

      <div @click="append('4')" class="btn">4</div>
      <div @click="append('5')" class="btn">5</div>
      <div @click="append('6')" class="btn">6</div>

      <div @click="minus" class="btn operator">-</div>

      <div @click="append('1')" class="btn">1</div>
      <div @click="append('2')" class="btn">2</div>
      <div @click="append('3')" class="btn">3</div>

      <div @click="plus" class="btn operator">+</div>

      <div @click="append('0')" class="btn zero">0</div>

      <div @click="dot" class="btn">.</div>

      <div @click="equal" class="btn operator">=</div>
    </div>
  </div>
</template>

// ******************************************

<script>
import Header from "../components/Header.vue";

export default {
  name: "Calculator",
  components: {
    Header,
  },
  data() {
    return {
      current: "",
      previous: null,
      operator: null,
      operatorClicked: false,
    };
  },
  methods: {
    clear() {
      this.current = "";
    },
    sign() {
      if (this.current.charAt(0) === "") {
        this.current = "";
      } else {
        this.current =
          this.current.charAt(0) === "-" ? this.current.slice(1) : `-${this.current}`;
      }
    },
    percent() {
      if(this.current.charAt(0) === "" || this.current.charAt(0) === "."){
        this.current = "";
      } else {
        this.current = `${parseFloat(this.current) / 100}%`
      };
    },
    append(number) {
      if (this.operatorClicked) {
        this.current = "";
        this.operatorClicked = false;
      }
      this.current = `${this.current}${number}`;
    },
    dot() {
      if (this.current.indexOf(".") === -1) {
        this.append(".");
      }
    },
    setPrevious() {
      this.previous = this.current;
      this.operatorClicked = true;
    },
    divide() {
      this.operator = (a, b) => b / a;
      this.setPrevious();
    },
    multiply() {
      this.operator = (a, b) => a * b;
      this.setPrevious();
    },
    minus() {
      this.operator = (a, b) => b - a;
      this.setPrevious();
    },
    plus() {
      this.operator = (a, b) => b + a;
      this.setPrevious();
    },
    equal() {
      this.current = `${this.operator(
        parseFloat(this.current),
        parseFloat(this.previous)
      )}`;
      console.log(`Current: ${this.current}`);
      this.previous = null;
    },
  },
};
</script>

// ******************************************

<style scoped>
.calcContainer {
  width: 100%;
  height: 77.1vh;
  background-color: rgba(42, 165, 114, 0.322);
  position: relative;
  padding: 20px 0 15px 0;
}

.calcContainer-Inner {
  border: 1px solid rgba(97, 97, 97, 0.521);
  width: 340px;
  height: 81%;
  margin: 14px auto;
  position: relative;
  padding: 10px;
  box-shadow: rgba(0, 0, 0, 0.25) 0px 0.0625em 0.0625em,
    rgba(0, 0, 0, 0.25) 0px 0.125em 0.5em, rgba(255, 255, 255, 0.1) 0px 0px 0px 1px inset;
  border-radius: 2px;
  grid-template-columns: repeat(4, 1fr);
  grid-auto-rows: minmax(50px, auto);
  display: grid;
  font-size: 27px;
  color: rgb(56, 56, 56);
  text-align: center;
}

.display {
  grid-column: 1/5;
  background-color: rgb(53, 93, 116);
  color: #fff;
  height: 47px;
  text-align: right;
  margin-bottom: -10px;
  padding-top: 13px;
  padding-right: 10px;
  border-radius: 4px;
  padding-left: 5px;
  box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px,
    rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;
}

.zero {
  grid-column: 1/3;
}

.btn {
  background-color: #f2f2f2;
  border: 1px solid rgba(153, 153, 153, 0.603);
  border-radius: 4px;
  cursor: pointer;
  padding: 18px;
  font-size: 26px;
  box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px,
    rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;
}

.btn:hover {
  background: #e9e9e9;
}

.operator {
  background-color: rgba(255, 166, 0, 0.925);
  color: #fff;
}

.operator:hover {
  background-color: rgba(248, 176, 42, 0.877);
}
</style>
