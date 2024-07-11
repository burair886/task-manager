import { createStore } from "vuex";
import axios from "axios";

export default createStore({
  state: {
    user: null,
    tasks: [],
    users: [],
    filters: {
      priority: "",
      dateRange: [],
      assignee: null,
    },
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
    },
    setTasks(state, tasks) {
      state.tasks = tasks;
    },
    setUsers(state, users) {
      state.users = users;
    },
    setFilters(state, filters) {
      state.filters = filters;
    },
  },
  actions: {
    async login({ commit }, { username, password }) {
      const response = await axios.get(
        `http://localhost:3000/users?username=${username}&password=${password}`
      );
      const user = response.data[0];
      if (user) {
        commit("setUser", user);
      } else {
        throw new Error("Invalid credentials");
      }
    },
    async fetchTasks({ commit }) {
      const response = await axios.get("http://localhost:3000/tasks");
      commit("setTasks", response.data);
    },
    async fetchUsers({ commit }) {
      const response = await axios.get("http://localhost:3000/users");
      commit("setUsers", response.data);
    },
    async addTask({ dispatch }, task) {
      await axios.post("http://localhost:3000/tasks", task);
      dispatch("fetchTasks");
    },
    setFilters({ commit }, filters) {
      commit("setFilters", filters);
    },
  },
  getters: {
    filteredTasks: (state) => {
      console.log("State:", state); // Log the entire state for debugging

      return state.tasks.filter((task) => {
        // const taskDueDate = new Date(task.dueDate);
        // const startDate = state.filters.dateRange[0]
        //   ? new Date(state.filters.dateRange[0])
        //   : null;
        // const endDate = state.filters.dateRange[1]
        //   ? new Date(state.filters.dateRange[1])
        //   : null;

        const isPriorityMatch =
          !state.filters.priority || task.priority === state.filters.priority;
        // const isAssigneeMatch =
        //   !state.filters.assignee || task.assignee === state.filters.assignee;
        // const isDateRangeMatch =
        //   !startDate ||
        //   !endDate ||
        //   (taskDueDate >= startDate && taskDueDate <= endDate);

        // return isPriorityMatch && isAssigneeMatch && isDateRangeMatch;
        return isPriorityMatch
      });
    },
  },
});
