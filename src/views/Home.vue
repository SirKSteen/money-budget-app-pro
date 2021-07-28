<template>
  <div class="homeContainer">
    <div class="homeContainer-Inner">
      <div class="homeContainer-Header">
        <div class="header-Box-One">
          <h3>
            Expenses Tracker
            <fa icon="edit" class="icon-Edit" />
          </h3>
        </div>
        <div class="header-Box-Two">
          <Button
            :name="!showAddExpense ? 'Add Expense' : 'Close'"
            class="btn"
            :color="showAddExpense ? 'brown' : 'rgb(129, 187, 36)'"
            @btn-click="addExpenseHandler"
          />
        </div>
      </div>
      <div class="homeContainer-Expenses">
        <AddExpense
          v-show="showAddExpense"
          @add-expense="addExpense"
          :expenseObj="editExpenseObj"
          :editFlag="editFlagStatus"
        />
        <div
          class="expenses-Display"
          name="expensesDisplay"
          :style="!showAddExpense ? { height: '100%' } : null"
        >
          <Expenses
            :expenses="expenses"
            :dispHeight="showAddExpense"
            @delete-expense="deleteExpense"
            @edit-expense="editExpense"
          />
        </div>
      </div>
      <div class="homeContainer-Addz">
        <div class="addz-BoxOne">
          <h5>Number of Expenses: {{ expensesNum }}</h5>
        </div>
        <div class="addz-BoxTwo">
          <h5>Expenses Total: ${{ expensesTotal }}</h5>
        </div>
      </div>
    </div>
  </div>
</template>

// ******************************************

<script>
import Button from "../components/Button.vue";
import AddExpense from "../components/AddExpense.vue";
import Expenses from "../components/Expenses.vue";
import AuthServices from "../authentication/AuthenticationServices.vue";
import ExpensesDataServices from "../API/ExpensesDataServices.vue";

const expensesAPIs = ExpensesDataServices.methods;
const authMethods = AuthServices.methods;

export default {
  name: "Home",
  components: {
    Button,
    AddExpense,
    Expenses,
    AuthServices,
    ExpensesDataServices,
  },
  data() {
    return {
      expenses: [],
      showAddExpense: false,
      expensesTotal: 0,
      expensesNum: 0,
      editExpenseObj: {},
      editFlagStatus: false,
    };
  },
  methods: {
    addExpenseHandler() {
      console.log("Add Expenses clicked");
      // console.log("Before: " + this.showAddExpense);
      this.showAddExpense = !this.showAddExpense;
    },

    expensesTotalFunc() {
      console.log("Expenses Total Func");

      for (let i = 0; i < this.expenses.length; i++) {
        console.log(this.expenses[i].amount);
        this.expensesTotal += this.expenses[i].amount;
      }

      this.expensesTotal = parseFloat(this.expensesTotal).toFixed(2);
      console.log("Expenses Total: $" + this.expensesTotal);
    },

    expensesNumFunc() {
      console.log("Expenses Num Func");
      this.expensesNum = this.expenses.length;
      console.log("Expenses Num: " + this.expensesNum);
    },

    deleteExpense(id) {
      console.log("Delete expense||ID: [" + id + "]");
      let username = authMethods.GetLoggedInUsername();
      expensesAPIs
        .DeleteExpense(username, id)
        .then((response) => {
          console.log(response);
          alert(response.data);
          this.refreshExpenses();
        })
        .catch(() => {
          console.log("Promise caught [deleteExpenses]");
        });
    },

    addExpense(expenseItem) {
      console.log(expenseItem);
      let username = authMethods.GetLoggedInUsername();

      expensesAPIs
        .CreateExpense(username, expenseItem)
        .then((response) => {
          console.log(response.data);
          alert(response.data);
          this.refreshExpenses();
        })
        .catch(() => {
          console.log("Promise caught [addExpenses]");
        });
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
          console.log("Promise caught [refreshExpenses]");
        });
    },

    editExpense(expense) {
      console.log(expense);
      console.log("Edit Flag: " + this.editFlagStatus);
      
      this.editExpenseObj = { ...expense };
      this.editFlagStatus = true;
      
      console.log("Edit Expense");
      console.log(this.editExpenseObj);
      console.log(this.editFlagStatus);
      
      this.showAddExpense = true;
    },
  },
  created() {
    console.log("Main page");

    let username = authMethods.GetLoggedInUsername();
    console.log("Username: " + username);
    expensesAPIs
      .RetrieveAllExpenses(username)
      .then((response) => {
        console.log(response.data);
        this.expenses = response.data;
        this.expensesTotalFunc();
        this.expensesNumFunc();
      })
      .catch(() => {
        console.log("Promise catched [created()]");
      });
  },
};
</script>

// ******************************************

<style scoped>
.homeContainer {
  width: 100%;
  height: 77.1vh;
  background-color: rgba(64, 122, 177, 0.432);
  position: relative;
  padding: 5px 0 5px 0;
}

.homeContainer-Inner {
  border: 1px solid rgba(97, 97, 97, 0.32);
  width: 475px;
  height: 96.5%;
  margin: 0px auto;
  position: relative;
  padding: 5px;
  border-radius: 2px;
  box-shadow: rgba(17, 17, 26, 0.05) 0px 1px 0px, rgba(17, 17, 26, 0.1) 0px 0px 8px;
}

.homeContainer-Header {
  background-color: rgba(245, 26, 117, 0.63);
  width: 100%;
  height: 7%;
  display: flex;
}

.header-Box-One {
  width: 50%;
  height: 100%;
  background-color: rgb(212, 212, 212);
  box-shadow: rgba(17, 17, 26, 0.05) 0px 1px 0px, rgba(17, 17, 26, 0.1) 0px 0px 8px;
}

.header-Box-One h3 {
  color: rgb(32, 32, 32);
  font-size: 18px;
  margin-top: 6px;
  margin-left: 13px;
}

.icon-Edit {
  margin-left: 4px;
  font-size: 19px;
}

.btn {
  margin-left: 25px;
  margin-top: 3px;
}

.header-Box-Two {
  width: 50%;
  height: 100%;
  background-color: rgba(56, 56, 56, 0.842);
}

.homeContainer-Expenses {
  background-color: rgba(19, 126, 158, 0);
  width: 100%;
  height: 86%;
}

.expenses-Display {
  background-color: rgba(92, 90, 90, 0.616);
  height: 65%;
  width: 100%;
}

.homeContainer-Addz {
  background-color: rgba(255, 153, 0, 0.726);
  width: 100%;
  height: 7%;
  display: flex;
}

.addz-BoxOne {
  background-color: cadetblue;
  width: 50%;
  height: 100%;
}

.addz-BoxTwo {
  background-color: darkseagreen;
  width: 50%;
  height: 100%;
}

h5 {
  font-size: 16.4px;
  font-family: "Times New Roman", Times, serif;
  margin-top: 7px;
  margin-left: 11px;
}
</style>
