<template>
  <div class="login">
    <login></login>
  </div>
</template>

<script>
import Login from '../components/Login.vue';

export default {
  components: {
    Login
  }
}
</script>

<style scoped>
.login {
  margin: 50px 30%;
}

@media screen and (max-width: 1024px) {
  .login {
    margin: 50px;
  }
}
</style>
