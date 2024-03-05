<template>
  <div class="cabinet">
    <user-profile></user-profile>
  </div>
</template>

<script>
import UserProfile from '../components/UserProfile.vue';

export default {
  components: {
    UserProfile
  }
}
</script>

<style scoped>
.cabinet {
  margin: 50px 30%;
}

@media screen and (max-width: 1024px) {
  .cabinet {
    margin: 50px;
  }
}
</style>
