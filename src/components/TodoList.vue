<script setup lang="ts">
import TableList from "./TableList.vue";
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
      <tbody>
        <TableList />
      </tbody>
    </table>
  </div>
</template>
