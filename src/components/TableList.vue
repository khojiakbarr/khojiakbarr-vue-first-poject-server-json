<script setup>
import store from "@/store/store";
import { onMounted } from "vue";
import { ref } from "vue";
const props = defineProps(["todo"]);
const newTask = ref("");
const isEdit = ref(false);

const { task, _id, completed } = props.todo;

onMounted(() => {
  newTask.value = task;
});

const deleteTask = () => {
  store.dispatch("deleteTodoAsync", _id);
};

const saveTask = () => {
  store.dispatch("updateTodoAsync", {
    id: _id,
    todo: { ...task, task: newTask.value },
  });

  isEdit.value = false;
};

const setIsEdit = () => {
  isEdit.value = true;
};

const handelIsComplate = () => {
  store.dispatch("isComplateAsync", _id);
};
</script>

<template>
  <tr class="bg-white dark:bg-gray-800 border-b border-slate-500">
    <th
      scope="row"
      class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
    >
      <input
        v-if="isEdit"
        type="text"
        class="p-1 bg-gray-700 rounded-md outline-none"
        placeholder="My task"
        v-model="newTask"
        @keypress.enter="saveTask"
      />
      <span v-else>
        {{ task }}
      </span>
    </th>
    <td class="px-6 py-4">
      <button class="w-[20px] flex justify-center" @click="handelIsComplate">
        <svg
          v-if="completed"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 448 512"
        >
          <path
            fill="#ffffff"
            d="M64 80c-8.8 0-16 7.2-16 16l0 320c0 8.8 7.2 16 16 16l320 0c8.8 0 16-7.2 16-16l0-320c0-8.8-7.2-16-16-16L64 80zM0 96C0 60.7 28.7 32 64 32l320 0c35.3 0 64 28.7 64 64l0 320c0 35.3-28.7 64-64 64L64 480c-35.3 0-64-28.7-64-64L0 96zM337 209L209 337c-9.4 9.4-24.6 9.4-33.9 0l-64-64c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l47 47L303 175c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9z"
          />
        </svg>
        <svg v-else xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
          <path
            fill="#ffffff"
            d="M384 80c8.8 0 16 7.2 16 16l0 320c0 8.8-7.2 16-16 16L64 432c-8.8 0-16-7.2-16-16L48 96c0-8.8 7.2-16 16-16l320 0zM64 32C28.7 32 0 60.7 0 96L0 416c0 35.3 28.7 64 64 64l320 0c35.3 0 64-28.7 64-64l0-320c0-35.3-28.7-64-64-64L64 32z"
          />
        </svg>
      </button>
    </td>
    <td class="px-6 py-4">
      <div class="flex gap-2">
        <button
          v-if="isEdit"
          class="bg-gray-700 px-2 py-1 rounded-md"
          @click="saveTask"
        >
          Save
        </button>
        <button
          v-else
          class="bg-gray-700 px-2 py-1 rounded-md"
          @click="setIsEdit"
        >
          Edit
        </button>
        <button class="bg-gray-700 px-2 py-1 rounded-md" @click="deleteTask">
          Delete
        </button>
      </div>
    </td>
  </tr>
</template>
