<template>
  <div class="team">
    <header>
      <!-- Jumbotron -->
      <div class="p-5 text-center bg-light">
        <h4 class="mb-3">Your team number {{ id }}</h4>
      </div>
      <!-- Jumbotron -->
    </header>
    <team></team>
  </div>
</template>

<script>
import Team from '../components/Team.vue';

export default {
  components: {
    Team
  },
  props: ['id'], // Принимаем параметр id через пропс
}
</script>

<style scoped></style>
