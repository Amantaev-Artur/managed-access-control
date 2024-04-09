<template>
  <div class="cards-container">
    <div v-for="access in accesses" :key="access.id" :class="{ 'double-width': access.size === 'big' }"
      class="card-container">
      <Card :cardHeader=access.data.serviceName :login=access.data.login :password=access.data.password
        :cardFooter="moment(access.lastUpdate).format('DD.MM.YYYY HH:mm:ss')" :id=access.id />
    </div>
  </div>
</template>

<script>
import Card from './Card.vue';
import { useStore } from 'vuex';
import { computed } from 'vue';
import moment from 'moment';

export default {
  components: {
    Card
  },
  setup() {
    const store = useStore();
    const accesses = computed(() => store.getters.getAccesses);

    return { accesses, moment };
  },
  async mounted() {
    const store = useStore();
    await store.dispatch('fetchAccesses');
  }
};
</script>


<style>
.cards-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 40px;
  align-items: center;
  margin-top: 40px;
}

.card-container {
  width: calc(33.33% - 60px);
  box-sizing: border-box;
}

.double-width {
  width: calc(66.66% - 80px);
  box-sizing: border-box;
}

@media screen and (max-width: 767px) {
  .card-container {
    width: calc(85%);
    box-sizing: border-box;
  }

  .double-width {
    width: calc(85%);
    box-sizing: border-box;
  }
}

@media screen and (min-width: 768px) and (max-width: 1023px) {
  .card-container {
    width: calc(40% - 20px);
    box-sizing: border-box;
  }

  .double-width {
    width: calc(80%);
    box-sizing: border-box;
  }
}
</style>