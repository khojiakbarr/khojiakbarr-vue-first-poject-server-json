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
      <form @submit.prevent="handleAdd" class="flex items-center gap-2">
        <input
          type="text"
          class="border border-green-900 bg-black outline-none text-green-600 rounded-md p-1"
          v-model="newTask"
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
            <th class="p-2">action</th>
          </tr>
        </thead>
        <h2 v-if="isLoading" class="text-green-600 text-center">Loading...</h2>
        <tbody v-else>
          <tr
            class="border border-green-900"
            v-for="(item, index) in todos && todos"
            :key="index"
          >
            <td class="p-2 text-green-600 text-center">{{ ++index }}</td>
            <td class="" v-if="isEdit">
              <input
                type="text"
                class="border border-green-900 bg-black outline-none text-green-600"
              />
            </td>
            <td v-else class="p-2 text-green-600 text-center">
              {{ item?.task }}
            </td>
            <td class="p-2 text-green-600 text-center">
              {{ item?.isComplate ? "true" : "false" }}
            </td>
            <td class="p-2 text-green-600 text-center" v-if="isEdit">
              <button class="border border-green-900 px-2 rounded-md">
                Save
              </button>
            </td>
            <td class="p-2 text-green-600 text-center" v-else>
              <!-- <button
                @click="changeIsEdit"
                class="border border-green-900 px-2 rounded-md"
              >
                Edit
              </button> -->
              <button
                @click="handleDelete(item?.id)"
                class="border border-green-900 px-2 rounded-md ml-2"
              >
                Del
              </button>
            </td>
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
    const newTask = ref("");
    const updateTask = ref[""];
    const isLoading = ref(true);
    const isEdit = ref(false);
    const { getTodos, addTodo, editTodo, deleteTodo } = useAxios();

    const fetchTodos = async () => {
      todos.value = await getTodos();
      isLoading.value = false;
    };

    onMounted(fetchTodos);

    const handleDelete = async (id) => {
      await deleteTodo(id);
      todos.value = todos.value.filter((todo) => todo.id !== id);
    };

    const handleEdit = async ({ id, body }) => {
      await editTodo(id, body);
      fetchTodos();
    };

    const handleAdd = async () => {
      isLoading.value = true;
      if (newTask.value.trim() === "") return;
      const newTodo = {
        task: newTask.value,
        completed: false,
      };

      const addedTodo = await addTodo(newTodo);
      todos.value.push(addedTodo);
      newTask.value = "";
      isLoading.value = false;
    };
    const changeIsEdit = () => {
      isEdit.value = !isEdit.value;
    };

    return {
      handleEdit,
      handleDelete,
      handleAdd,
      todos,
      newTask,
      isLoading,
      updateTask,
      isEdit,
      changeIsEdit,
    };
  },
};
</script>
