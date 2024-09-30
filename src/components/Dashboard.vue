<script setup>
import { ref, computed } from "vue";
import TodoList from "./TodoList.vue";
import ButtonSpiner from "./ButtonSpiner.vue";
import store from "@/store/store";
const task = ref("");
const loader = computed(() => store.state.loader);

const handeleSubmit = () => {};
</script>

<template>
  <div class="bg-gray-800 h-screen">
    <div class="w-full flex flex-col justify-center items-center">
      <h2 class="text-center text-white font-semibold text-2xl mt-3">
        Hello frend
      </h2>
      <form
        @click="handeleSubmit"
        class="flex flex-col gap-3 p-4 border rounded mt-[20px]"
      >
        <input
          type="text"
          placeholder="Enter Your Task "
          class="p-1 bg-slate-300"
          v-model="task"
        />
        <button class="px-3 py-1 bg-slate-300 rounded text-black font-semibold">
          <div v-if="loader"><ButtonSpiner /></div>
          <span v-else>Submit</span>
        </button>
      </form>
    </div>
    <div class="w-[80%] mx-auto"><TodoList class="mt-[20px] rounded-md" /></div>
  </div>
</template>
