<template>
  <div class="max-w-3xl mx-auto px-4 py-8">
    <h1 class="text-3xl font-bold text-gray-800 mb-4">Tasks</h1>
    <TaskFilters class="mb-4" />

    <div class="bg-white shadow-md rounded-lg overflow-hidden">
      <router-link
      to="/new-task"
      class="mt-4 inline-block bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md transition duration-300"
      >Create New Task</router-link
    >
      <ul>
        <li
          v-for="task in filteredTasks"
          :key="task.id"
          class="border-b border-gray-200 px-6 py-4 flex items-center justify-between hover:bg-gray-50"
        >
          <div>
            <p class="text-lg font-semibold text-gray-800">{{ task.title }}</p>
            <p class="text-sm text-gray-600">
              {{ task.priority }} - {{ task.dueDate }}
            </p>
          </div>
         
        </li>
      </ul>
    </div>
 
  </div>
</template>

<script setup>
import { computed, onMounted } from "vue";
import { useStore } from "vuex";
import TaskFilters from "../components/taskFilter.vue";

const store = useStore();

onMounted(async () => {
  await store.dispatch("fetchTasks");
});

const filteredTasks = computed(() => store.getters.filteredTasks);

</script>

<style scoped>
.input-field {
  border: 1px solid #e2e8f0;
}

.input-field:focus {
  outline: none;
  border-color: #667eea;
  box-shadow: 0 0 0 2px rgba(102, 126, 234, 0.5);
}
</style>
