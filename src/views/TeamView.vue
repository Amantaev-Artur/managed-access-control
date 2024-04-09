<template>
  <div class="team">
    <!-- Jumbotron -->
    <div class="p-5 text-center">
      <h1 class="mb-3">{{ team.name }}</h1>
    <h4 class="mb-3">{{ team.description }}</h4>
    </div>
    <!-- Jumbotron -->
    <teamComponent :users=team.users></teamComponent>
  </div>
</template>

<script setup>
import teamComponent from '../components/Team.vue'
import { ref, onMounted } from 'vue';
import { useStore } from 'vuex';
import { useRoute } from 'vue-router';

const route = useRoute(); // Получаем маршрут с помощью useRoute()

const store = useStore();

const id = ref(null);
const team = ref({
  users: [],
  name: '',
  description: ''
});

onMounted(async () => {
  id.value = route.params.id; // Получаем id из параметров маршрута

  try {
    await store.dispatch('fetchGroupById', id.value); // Выполняем действие fetchTeamData с передачей id
    team.value = store.getters.getSelectedGroup;
  } catch (error) {
    console.error('Ошибка при загрузке данных о команде:', error);
  }
});
</script>

<style scoped></style>
