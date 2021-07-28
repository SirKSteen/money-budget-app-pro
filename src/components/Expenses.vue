<template>
  <div class="expensesContainer">
    <div class="expensesContainer-Inner" :style="dispHeight ? { height: '265px' } : null">
      <Expense
        :key="expense.id"
        v-for="expense in expenses"
        :expense="expense"
        @delete-expense="$emit('delete-expense', expense.id)"
        @edit-expense="$emit('edit-expense', expense)"
      />
    </div>
  </div>
</template>

<script>
import Expense from "./Expense.vue";
export default {
  name: "Expenses",
  props: { dispHeight: Boolean, expenses: Array },
  components: {
    Expense,
  },
  emits: ["delete-expense", "edit-expense"],
};
</script>

<style scoped>
.expensesContainer {
  padding: 10px;
}

.expensesContainer-Inner {
  border: 1px solid rgba(75, 75, 75, 0.603);
  box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
  overflow-y: auto;
  overflow-x: hidden;
  height: 415px;
}

::-webkit-scrollbar {
  width: 15px;
}

::-webkit-scrollbar-track {
  box-shadow: inset 0 0 5px rgb(255, 255, 255);
  border-radius: 10px;
}

::-webkit-scrollbar-thumb {
  background-color: rgb(86, 144, 146);
  border-radius: 10px;
}

::-webkit-scrollbar-thumb:hover {
  background-color: rgb(89, 148, 150);
}
</style>
