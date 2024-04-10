<template>
  <div class="team">
    <teams></teams>
  </div>
  <div class="d-grid gap-2 col-3 mx-auto new-access-btn">
    <router-link to="/teams/create" class="btn btn-primary">
      <MDBIcon icon="fas fa-plus" />
    </router-link>
  </div>
</template>

<script>
import Teams from '../components/Teams.vue';
import { MDBBtn, MDBIcon } from "mdb-vue-ui-kit";

export default {
  components: {
    Teams,
    MDBBtn,
    MDBIcon
  }
}
</script>

<style scoped>
.team {
  margin: 40px 30%;
}

@media screen and (max-width: 1024px) {
  .team {
    margin: 8px;
  }
}
</style>
