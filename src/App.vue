<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import Header from './components/Header.vue';

const router = useRouter();
const isLoginPage = ref(false);

router.beforeEach((to, from, next) => {
  isLoginPage.value = to.name === 'login';
  next();
});
</script>

<template>
  <div>
    <Header v-if="!isLoginPage" />
    <RouterView />
  </div>
</template>
