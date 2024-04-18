<template>
  <MDBNavbar expand="lg" bg="light" class="d-flex justify-content-between" container>
    <!-- <MDBNavbarBrand>
      <MDBIcon icon="mdb" iconStyle="fab" size="2x" />
    </MDBNavbarBrand> -->
    <MDBNavbarToggler target="#navbarColor01" @click="collapse = !collapse"></MDBNavbarToggler>
    <MDBCollapse id="navbarColor01" v-model="collapse">
      <MDBNavbarNav class="mb-2 mb-lg-0">
        <router-link :to="{ path: '/' }" class="nav-link" active-class="active">{{ $t('header.dashboard')
          }}</router-link>
        <router-link :to="{ path: '/teams' }" class="nav-link" active-class="active">{{ $t('header.teams')
          }}</router-link>
        <router-link :to="{ path: '/project' }" class="nav-link" active-class="active">{{ $t('header.project')
          }}</router-link>
      </MDBNavbarNav>
    </MDBCollapse>

    <MDBNavbarNav class="mb-2 mb-lg-0 d-flex flex-row user-img">
      <router-link :to="{ path: '/cabinet' }" class="nav-link me-lg-0">
        <img :src="img" class="rounded-circle border border-primary" width="40" height="40" alt="" loading="lazy" />
      </router-link>
    </MDBNavbarNav>

  </MDBNavbar>
</template>

<script>
import {
  MDBNavbar,
  MDBNavbarNav,
  MDBNavbarToggler,
  MDBCollapse
} from 'mdb-vue-ui-kit';
import { ref } from "vue";

export default {
  components: {
    MDBNavbar,
    MDBNavbarNav,
    MDBNavbarToggler,
    MDBCollapse
  },
  setup() {
    const collapse = ref(false);
    const img = JSON.parse(localStorage.getItem('userData')).image || '/public/user.svg';

    return {
      img,
      collapse
    }
  }
};
</script>

<style scoped>
@media screen and (max-width: 1024px) {

  .navbar-brand {
    display: none;
  }

  .user-img {
    margin-right: 0 !important;
    margin-bottom: 0 !important;
  }
}
</style>