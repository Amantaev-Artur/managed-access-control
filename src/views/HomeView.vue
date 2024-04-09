<template>
  <main>
    <Cards></Cards>
    <div class="d-grid gap-2 col-3 mx-auto new-access-btn">
      <router-link to="/accesses/create" class="btn btn-primary">New Access</router-link>
    </div>
  </main>
</template>

<script>
import Cards from '../components/Cards.vue'
import { MDBBtn } from "mdb-vue-ui-kit";

export default {
  components: {
    Cards,
    MDBBtn
  }
}
</script>

<style>
.new-access-btn {
  margin-top: 40px;
}
</style>