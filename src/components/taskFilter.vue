<template>
  <div>
    <h2>Filters</h2>
    <div>
      <label for="priority">Priority:</label>
      <select v-model="priority" id="priority">
        <option value="">All</option>
        <option value="High">High</option>
        <option value="Medium">Medium</option>
        <option value="Low">Low</option>
      </select>
    </div>
    <div>
      <label for="assignee">Assignee:</label>
      <select v-model="assignee" id="assignee">
        <option value="">All</option>
        <option v-for="user in users" :key="user.id" :value="user.id">
          {{ user.username }}
        </option>
      </select>
    </div>
    <div>
      <label for="dateRange">Date Range:</label>
      <input type="date" v-model="startDate" id="startDate" />
      <input type="date" v-model="endDate" id="endDate" />
    </div>
    <button @click="applyFilters">Apply Filters</button>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useStore } from "vuex";

const store = useStore();

const priority = ref("");
const assignee = ref("");
const startDate = ref("");
const endDate = ref("");

const users = computed(() => store.state.users);

const applyFilters = () => {
  store.dispatch("setFilters", {
    priority: priority.value,
    // assignee: assignee.value,
    // dateRange: [startDate.value, endDate.value],
  });
  console.log('store.getters.filteredTasks()',store.getters.filteredTasks);
};
</script>
