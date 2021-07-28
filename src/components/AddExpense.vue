<template>
  <div class="addExpenseContainer">
    <form @submit="submitHandler">
      <div class="formContainer-Title">
        <label>Expense Title</label>
        <input
          type="text"
          name="title"
          v-if="editFlag === true"
          v-model="expenseObj.description"
          required
        />
        <input
          type="text"
          v-model="expenseItem.description"
          name="title"
          v-else
          placeholder="Enter description here"
          required
        />
      </div>
      <div class="formContainer-Amount">
        <label>Expense Amount $</label>
        <input
          type="text"
          v-model="expenseItem.amount"
          name="amount"
          placeholder="0.00"
          required
        />
      </div>
      <div class="formContainer-Save">
        <div>
          <input type="submit" value="Save Expense" class="btn-Save" />
        </div>
        <div @click="resetHandler">
          <Button name="Reset" color="rgb(196, 118, 29)" />
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import AuthServices from "../authentication/AuthenticationServices.vue";
import Button from "../components/Button.vue";

let authMethods = AuthServices.methods;

export default {
  name: "AddExpense",
  data() {
    return {
      expenseItem: {
        id: null,
        description: "",
        amount: "",
        username: "",
      },
      highlight: "",
      showSample: false,
      // editFlag: false,
    };
  },
  components: {
    Button,
  },
  props: {
    expenseObj: Object,
    editFlag: Boolean,
  },
  methods: {
    submitHandler(e) {
      e.preventDefault();
      let user = authMethods.GetLoggedInUsername();

      console.log("Save Expense clicked");
      console.log("Entered Title: " + this.expenseItem.title);
      console.log("Entered Amount: " + this.expenseItem.amount);
      this.expenseItem.username = user;

      this.$emit("add-expense", this.expenseItem);
    },

    refreshExpenses() {
      let username = authMethods.GetLoggedInUsername();
      console.log("Username: " + username);
      expensesAPIs
        .RetrieveAllExpenses(username)
        .then((response) => {
          console.log(response.data);
          this.expenses = response.data;
          this.expensesTotalFunc();
          this.expensesNumFunc();
          this.$router.push({ path: "/home" });
        })
        .catch(() => {
          console.log("Promise catched");
        });
    },

    resetHandler() {
      console.log("Reset button clicked");
      this.expenseItem.description = "";
      this.expenseItem.amount = "wow";
    },
  },
};
</script>

<style scoped>
.addExpenseContainer {
  background-color: rgba(45, 112, 129, 0.685);
  height: 35%;
  width: 100%;
}

.addExpenseContainer div {
  margin-left: 5%;
  margin-bottom: 2%;
  margin-right: 0%;
}

.addExpenseContainer label {
  color: rgb(240, 240, 240);
}

.formContainer-Title {
  padding-top: 2%;
}

.formContainer-Title label {
  padding-right: 43px;
}

.formContainer-Highlight label {
  padding-right: 76px;
}

.btn-Save {
  padding: 5px 10px;
  border: none;
  border-radius: 3px;
  background-color: rgb(42, 179, 53);
  font-size: 15px;
  margin-left: 75px;
  margin-right: -80px;
  color: #ffff;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
}

.btn-Save:hover {
  cursor: pointer;
  background-color: rgb(43, 187, 55);
}

.formContainer-Title input,
.formContainer-Amount input,
.formContainer-Highlight input {
  margin-left: 5%;
  margin-right: 0%;
  background-color: rgba(0, 0, 0, 0);
  color: #ffff;
  height: 22px;
  border: 1.5px solid rgba(56, 56, 56, 0.726);
  border-radius: 3px;
}

.formContainer-Title input,
.formContainer-Amount input {
  padding-left: 2%;
  font-size: 15px;
}

.formContainer-Title input::placeholder,
.formContainer-Amount input::placeholder {
  color: #ffff;
}

.formContainer-Save div {
  display: inline-flex;
  margin-left: 100px;
}
</style>
