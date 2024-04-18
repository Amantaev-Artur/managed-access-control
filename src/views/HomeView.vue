<template>
  <main>
    <Cards></Cards>
    <div class="d-grid gap-2 col-3 mx-auto new-access-btn">
        <router-link to="/accesses/create" class="btn btn-primary"><MDBIcon icon="fas fa-plus"/></router-link>
    </div>
  </main>
</template>

<script>
import Cards from '../components/Cards.vue'
import { MDBIcon } from "mdb-vue-ui-kit";

export default {
  components: {
    Cards,
    MDBIcon
  }
}
</script>

<style>
.new-access-btn {
  margin: 40px 0 20px 0;
}
</style>