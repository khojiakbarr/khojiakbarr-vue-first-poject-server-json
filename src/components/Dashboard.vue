<script setup>
import { ref, computed, onMounted } from "vue";
import TodoList from "./TodoList.vue";
import ButtonSpiner from "./ButtonSpiner.vue";
import store from "@/store/store";
import router from "@/routes";
const user = ref("");
const task = ref("");
const loader = computed(() => store.state.isLoader);
onMounted(() => {
  user.value = JSON.parse(localStorage.getItem("user"));
});

const handeleSubmit = () => {
  store.dispatch("addTodoAsync", { task: task.value });
  task.value = "";
};
const navigate = () => {
  router.push("/");
  localStorage.removeItem("token");
};
</script>

<template>
  <div class="bg-gray-800 h-screen">
    <div class="relative">
      <button
        @click="navigate"
        class="absolute top-0 ring-0 px-2 py-1 bg-slate-200 rounded-br-md font-semibold"
      >
        Log out
      </button>
    </div>
    <div class="w-full flex flex-col justify-center items-center">
      <h2 class="text-center text-white font-semibold text-2xl mt-3">
        What are your plans today {{ user }}
      </h2>
      <form
        @submit.prevent="handeleSubmit"
        class="flex flex-col gap-3 p-4 border rounded mt-[20px]"
      >
        <input
          type="text"
          placeholder="Enter Your Task "
          class="p-1 bg-slate-300 rounded-sm"
          v-model="task"
        />
        <button
          type="subimit"
          class="px-3 py-1 bg-slate-300 rounded text-black font-semibold"
        >
          <div v-if="loader"><ButtonSpiner /></div>
          <span v-else>Submit</span>
        </button>
      </form>
    </div>
    <div class="w-[80%] mx-auto"><TodoList class="mt-[20px] rounded-md" /></div>
  </div>
</template>
