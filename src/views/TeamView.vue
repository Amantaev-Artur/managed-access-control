<template>
  <div class="group">
    <teamComponent :group="group" :onUsersUpdate="handleUserUpdate"></teamComponent>
  </div>
</template>

<script setup>
import teamComponent from '../components/Team.vue'
import { ref, onMounted } from 'vue';
import { useStore } from 'vuex';
import { useRoute } from 'vue-router';

const route = useRoute();

const store = useStore();

const id = ref(null);
const group = ref({
  users: [],
  name: '',
  description: ''
});

const handleUserUpdate = async () => {
  await store.dispatch('fetchGroupById', id.value);
  group.value = store.getters.getSelectedGroup;
}

onMounted(async () => {
  id.value = route.params.id;

  await store.dispatch('fetchGroupById', id.value);
  group.value = store.getters.getSelectedGroup;

});
</script>

<style scoped>
.group {
  margin: 10px 40px;
}
</style>
