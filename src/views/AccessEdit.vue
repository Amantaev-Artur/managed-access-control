<template>
  <div class="access-edit">
    <CardEdit :size="access.size", :login="access.data?.login"></CardEdit>
  </div>
</template>

<script>
import CardEdit from '../components/CardEdit.vue';
import { useStore } from 'vuex';
import { computed, ref } from 'vue';
import { useRoute } from 'vue-router';
import moment from 'moment';

export default {
  components: {
    CardEdit
  },
  setup() {
    const store = useStore();
    const access = computed(() => store.getters.getAccess);

    return { access, moment };
  },
  async mounted() {
    const route = useRoute();
    const store = useStore();

    await store.dispatch('fetchAccess', route.params.id);
  }
};</script>

<style>
.access-edit {
  margin: 50px 30%;
}

@media screen and (max-width: 1024px) {
  .access-edit {
    margin: 30px;
  }
}
</style>