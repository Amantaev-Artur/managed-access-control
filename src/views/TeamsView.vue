<template>
  <div class="team">
    <teams></teams>
  </div>
</template>

<script>
import Teams from '../components/Teams.vue';

export default {
  components: {
    Teams
  }
}
</script>

<style scoped>
.team {
  margin: 40px 30%;
}

@media screen and (max-width: 1024px) {
  .team {
    margin: 8px;
  }
}
</style>
