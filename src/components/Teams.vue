<template>
  <MDBListGroup light style="">
    <MDBListGroupItem v-for="(group, index) in groups" :key="index" tag="router-link" :to="`/team/${group.id}`" ripple noBorder
      spacing action :class="{ 'nested': isNested(group) }" class="d-flex justify-content-between align-items-start"
      :style="{ marginLeft: calculateMargin(group), width: `calc(100% - ${calculateMargin(group)})` }">
      <div :class="{ 'ms-2': isNested(group), 'me-auto': !isNested(group) }">
        <div class="fw-bold">{{ group.name }}</div>
        {{ group.description }}
      </div>
      <MDBBadge class="badge-primary" pill>{{ group.usersCount }}</MDBBadge>
    </MDBListGroupItem>
  </MDBListGroup>
</template>

<script>
import { MDBListGroup, MDBListGroupItem, MDBBadge } from "mdb-vue-ui-kit";
import { computed } from 'vue';
import { useStore } from 'vuex';

export default {
  components: {
    MDBListGroup,
    MDBListGroupItem,
    MDBBadge,
  },
  setup() {
    const store = useStore();

    const groups = computed(() => store.getters.getGroups);

    const isNested = (group) => group.parentId !== null;

    const calculateMargin = (group) => {
      const depth = calculateDepth(group.id);
      return `${depth * 20}px`; // Adjust the margin for nesting
    };

    const calculateDepth = (groupId) => {
      let depth = 0;
      let currentGroup = groups.value.find(group => group.id === groupId);

      while (currentGroup && currentGroup.parentId !== null) {
        depth++;
        currentGroup = groups.value.find(group => group.id === currentGroup.parentId);
      }

      return depth;
    };

    return { groups, isNested, calculateMargin };
  },
  async mounted() {
    const store = useStore();
    await store.dispatch('fetchGroups');
  }
};
</script>
