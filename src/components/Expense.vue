<template>
  <div class="expenseContainer">
    <div class="title-Box">
      <h3>{{ expense.description }}</h3>
    </div>
    <div class="amount-Box">
      <h3>${{ expense_amt }}</h3>
    </div>
    <div class="edit-Box">
      <fa icon="pen" class="icon-Edit"
      @click="$emit('edit-expense', expense)"/>
    </div>
    <div class="delete-Box" @click="$emit('delete-expense', expense.id)">
      <fa icon="times" class="icon-Delete" />
    </div>
  </div>
</template>

<script>
export default {
  name: "Expense",
  props: {
    expense: Object,
  },
  data() {
    return {
      expense_amt: null,
    };
  },
  mounted() {
    this.expense_amt = parseFloat(this.expense.amount).toFixed(2);
    // console.log("Float amount: $"+this.expense_amt)
  },
  
};
</script>

<style scoped>
.expenseContainer {
  display: flex;
  background-color: rgb(230, 213, 139);
  padding: 7px 10px 7px 6px;
  margin-bottom: 4px;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
}

h3 {
  font-size: 16.9px;
  font-family: "Trebuchet MS", "Lucida Sans Unicode", "Lucida Grande", "Lucida Sans",
    Arial, sans-serif;
}

.expenseContainer:hover {
  background-color: rgb(216, 201, 135);
}

.title-Box {
  width: 77%;
  padding-right: 5px;
}

.amount-Box {
  width: 15%;
}

.delete-Box {
  width: 4%;
  padding-left: 17px;
  margin-right: -6px;
}

.edit-Box {
  width: 3%;
  padding-left: 49px;
}

.delete-Box:hover {
  cursor: pointer;
}

.icon-Edit {
  color: #272727;
}

.icon-Edit:hover {
  cursor: pointer;
}

.icon-Delete {
  color: rgb(177, 10, 10);
}
</style>
