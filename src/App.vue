<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script setup>
import { onMounted} from "vue"
import { useStore } from "vuex";
const store = useStore();

onMounted(async () => {
  await store.dispatch("fetchUsers");
});
</script>