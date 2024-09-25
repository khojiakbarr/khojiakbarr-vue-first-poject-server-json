<template>
  <main>
    <h1 class="text-[20px] text-center font-semibold text-green-800">
      Hello Vue
    </h1>
    <h2 class="text-[20px] text-center font-semibold text-green-500">
      Simple todo application with json-server in Vue.js
    </h2>
    <div class="flex justify-center mt-[10px]">
      <!--! form -->
      <form class="flex items-center gap-2">
        <input
          type="text"
          class="border border-green-900 bg-black outline-none text-green-600 rounded-md p-1"
        />
        <button
          class="px-[10px] py-[5px] bg-green-600 rounded-md text-[15px] inline-block"
        >
          Submit
        </button>
      </form>
    </div>
    <div class="flex justify-center mt-[10px]">
      <table class="border border-green-900 text-green-500 w-[500px]">
        <thead>
          <tr>
            <th class="p-2">ID</th>
            <th class="p-2">Task</th>
            <th class="p-2">isComplate</th>
          </tr>
        </thead>
        <tbody>
          <tr
            class="border-2"
            v-for="(item, index) in todos._rawValue"
            :key="index"
          >
            <td class="p-2 text-green-600">{{ item.id }}</td>
            <td class="p-2 text-green-600">{{ item.task }}</td>
            <td class="p-2 text-green-600">{{ item.isComplate }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </main>
</template>

<script>
import { onMounted } from "vue";
import useAxios from "./hooks/useAxios";
import { ref } from "vue";

export default {
  setup() {
    const todos = ref([]);
    const { getTodos } = useAxios();

    const fetchTodos = async () => {
      todos.value = await getTodos();
    };

    onMounted(fetchTodos);
    console.log(todos);

    return {
      todos,
    };
  },
};
</script>
