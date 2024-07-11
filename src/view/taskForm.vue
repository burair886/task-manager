<template>
  <div>
    <h1>Create Task</h1>
    <form @submit.prevent="createTask">
      <div>
        <label for="title">Title:</label>
        <input v-model="title" id="title" required />
      </div>
      <div>
        <label for="description">Description:</label>
        <input v-model="description" id="description" required />
      </div>
      <div>
        <label for="priority">Priority:</label>
        <select v-model="priority" id="priority" required>
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>
      </div>
      <div>
        <label for="assignee">Assignee:</label>
        <select v-model="assignee" id="assignee" required>
          <option v-for="user in users" :key="user.id" :value="user.id">
            {{ user.username }}
          </option>
        </select>
      </div>
      <div>
        <label for="dueDate">Due Date:</label>
        <input type="date" v-model="dueDate" id="dueDate" required />
      </div>
      <button type="submit">Create Task</button>
    </form>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

const store = useStore();
const router = useRouter();

const title = ref("");
const description = ref("");
const priority = ref("Medium");
const assignee = ref(null);
const dueDate = ref("");

const users = ref([]);

onMounted(async () => {
  await store.dispatch("fetchUsers");
  users.value = store.state.users;
});

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
