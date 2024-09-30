<script setup>
import TodoList from "./TodoList.vue";
</script>

<template>
  <div class="bg-gray-800 h-screen">
    <div class="w-full flex flex-col justify-center items-center">
      <h2 class="text-center text-white font-semibold text-2xl mt-3">
        Hello frend
      </h2>
      <form class="flex flex-col gap-3 p-4 border rounded mt-[20px]">
        <input
          type="text"
          placeholder="Enter Your Task "
          class="p-1 bg-slate-300"
        />
        <button class="px-3 py-1 bg-slate-300 rounded text-black">
          Submit
        </button>
      </form>
    </div>
    <div class="w-[80%] mx-auto"><TodoList class="mt-[20px] rounded-md" /></div>
  </div>
</template>
