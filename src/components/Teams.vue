<template>
  <MDBListGroup light style="min-width: 22rem">
    <MDBListGroupItem v-for="(team, index) in teams" :key="index" tag="a"
      :href="`/team/${team.id}`" ripple noBorder spacing action
      :class="{ 'nested': isNested(team) }" class="d-flex justify-content-between align-items-start"
      :style="{ marginLeft: calculateMargin(team), width: `calc(100% - ${calculateMargin(team)})` }">
      <div :class="{ 'ms-2': isNested(team), 'me-auto': !isNested(team) }">
        <div class="fw-bold">{{ team.name }}</div>
        {{ team.description }}
      </div>
      <MDBBadge class="badge-primary" pill>{{ team.count }}</MDBBadge>
    </MDBListGroupItem>
  </MDBListGroup>
</template>

<script>
import { MDBListGroup, MDBListGroupItem, MDBBadge } from "mdb-vue-ui-kit";

export default {
  components: {
    MDBListGroup,
    MDBListGroupItem,
    MDBBadge,
  },
  data() {
    return {
      teams: [
        { id: 1, name: "Your main team", description: "This is base team", count: 14, parentId: null },
        { id: 2, name: "Backend team", description: "", count: 4, parentId: 1 },
        { id: 2.1, name: "Middle team", description: "Subgroup within Backend", count: 2, parentId: 2 },
        { id: 3, name: "Team with access to prod", description: "You can get access to production secrets and other data", count: 14, parentId: null },
        { id: 4, name: "Team with access to stage", description: "You can get access to stage page and other data", count: 14, parentId: null },
        { id: 5, name: "Subteam 1", description: "Nested team", count: 6, parentId: null },
        { id: 6, name: "Subteam 2", description: "Another nested team", count: 8, parentId: null },
      ],
    };
  },
  methods: {
    isNested(team) {
      return team.parentId !== null;
    },
    calculateMargin(team) {
      const depth = this.calculateDepth(team.id);
      return `${depth * 20}px`; // Adjust the margin for nesting
    },
    calculateDepth(teamId) {
      let depth = 0;
      let currentTeam = this.teams.find(team => team.id === teamId);

      while (currentTeam && currentTeam.parentId !== null) {
        depth++;
        currentTeam = this.teams.find(team => team.id === currentTeam.parentId);
      }

      return depth;
    },
  },
};
</script>
