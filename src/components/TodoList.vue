<script setup>
import { onMounted, computed } from "vue";
import TableList from "./TableList.vue";
import store from "@/store/store";
import TableSkleton from "./TableSkleton.vue";
onMounted(() => {
  store.dispatch("getTodosAsync");
});

const todos = computed(() => store.state.todos);
const loader = computed(() => store.state.isLoader);
</script>

<template>
  <div class="relative overflow-x-auto">
    <table
      class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400"
    >
      <thead
        class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
      >
        <tr>
          <th scope="col" class="px-6 py-3">Task name</th>
          <th scope="col" class="px-6 py-3">IsComplated</th>
          <th scope="col" class="px-6 py-3">Action</th>
        </tr>
      </thead>
      <tbody v-for="todo in todos">
        <TableList :todo="todo" />
      </tbody>
    </table>
    <div v-if="loader"><TableSkleton /></div>
    <div v-else>
      <div v-if="!todos.length">
        <h2 class="text-center text-2xl mt-[20px] font-semibold text-slate-100">
          Not Fount
        </h2>
      </div>
    </div>
  </div>
</template>
