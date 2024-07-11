<template>
  <div class="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
    <h1 class="text-2xl font-semibold mb-6">Create Task</h1>
    <form @submit.prevent="createTask">
      <div class="mb-4">
        <label for="title" class="block text-sm font-medium text-gray-700">Title:</label>
        <input v-model="title" id="title" required class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm p-2" />
      </div>
      <div class="mb-4">
        <label for="description" class="block text-sm font-medium text-gray-700">Description:</label>
        <input v-model="description" id="description" required class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm p-2" />
      </div>
      <div class="mb-4">
        <label for="priority" class="block text-sm font-medium text-gray-700">Priority:</label>
        <select v-model="priority" id="priority" required class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm p-2">
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>
      </div>
      <div class="mb-4">
        <label for="assignee" class="block text-sm font-medium text-gray-700">Assignee:</label>
        <select v-model="assignee" id="assignee" required class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm p-2">
          <option v-for="user in users" :key="user.id" :value="user.id">
            {{ user.email }}
          </option>
        </select>
      </div>
      <div class="mb-4">
        <label for="dueDate" class="block text-sm font-medium text-gray-700">Due Date:</label>
        <input type="date" v-model="dueDate" id="dueDate" required class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm p-2" />
      </div>
      <button type="submit" class="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600">Create Task</button>
    </form>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

const store = useStore();
const router = useRouter();

const title = ref("");
const description = ref("");
const priority = ref("Medium");
const assignee = ref(null);
const dueDate = ref("");

const users = computed(() => store.state.users);

const createTask = async () => {
  await store.dispatch("addTask", {
    title: title.value,
    description: description.value,
    priority: priority.value,
    assignee: assignee.value,
    dueDate: dueDate.value,
  });
  router.push("/tasks");
};
</script>
