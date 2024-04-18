<template>
  <div class="group">
    <teamComponent :groupId="id"></teamComponent>
  </div>
</template>

<script setup>
import teamComponent from '../components/Team.vue'
import { onMounted } from 'vue';
import { useStore } from 'vuex';
import { useRoute } from 'vue-router';

const route = useRoute();

const store = useStore();

const id = route.params.id;

onMounted(async () => {
  await store.dispatch('fetchGroupById', id);
});
</script>

<style scoped>
.group {
  margin: 10px 40px;
}
</style>
