<template>
  <main>
    <div class="cards-container">
      <div class="card-container" v-if="access.id">
        <Card :cardHeader=access?.data?.content :login=access?.data?.login :password="decryptData(access?.data?.password)"
          :cardFooter="moment(access?.last_update).format('DD.MM.YYYY HH:mm:ss')" :id=access?.id :canEdit="true"></Card>
      </div>
    </div>
  </main>
</template>

<script>
import Card from '../components/Card.vue';
import { useStore } from 'vuex';
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import moment from 'moment';
import { decryptData } from '../utils/encryption'

export default {
  components: {
    Card
  },
  setup() {
    const store = useStore();
    const access = computed(() => store.getters.getAccess);

    return { access, moment, decryptData };
  },
  async mounted() {
    const route = useRoute();
    const store = useStore();

    await store.dispatch('fetchAccess', route.params.id);
  }
};</script>

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

@media screen and (max-width: 767px) {
  .card-container {
    width: calc(85%);
    box-sizing: border-box;
  }
}

@media screen and (min-width: 768px) and (max-width: 1023px) {
  .card-container {
    width: calc(40% - 20px);
    box-sizing: border-box;
  }
}
</style>