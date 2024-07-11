<template>
  <div class="flex flex-col gap-4">
    <h2 class="text-xl uppercase font-semibold">Filters</h2>
    <div>
      <label for="priority">Priority:</label>
      <select
        class="border border-neutral-400 rounded-sm px-2 mx-2"
        v-model="priority"
        id="priority"
      >
        <option value="">All</option>
        <option value="High">High</option>
        <option value="Medium">Medium</option>
        <option value="Low">Low</option>
      </select>
    </div>
    <div>
      <label for="assignee">Assignee:</label>
      <select
        class="border border-neutral-400 rounded-sm px-2 mx-2"
        v-model="assignee"
        id="assignee"
      >
        <option value="">All</option>
        <option v-for="user in users" :key="user.id" :value="user.id">
          {{ user.email }}
        </option>
      </select>
    </div>
    <div>
      <label for="dateRange">Date Range:</label>
      <input
        class="border border-neutral-400 rounded-sm px-2 mx-2"
        type="date"
        v-model="startDate"
        id="startDate"
      />
      <input
        class="border border-neutral-400 rounded-sm px-2 mx-2"
        type="date"
        v-model="endDate"
        id="endDate"
      />
    </div>
  </div>
  <button class="my-2 border px-4 bg-slate-300" @click="applyFilters">
    Apply Filters
  </button>
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
    assignee: assignee.value,
    dateRange: [startDate.value, endDate.value],
  });
};
</script>
