<template>
  <MDBNavbar container expand="lg" bg="light" class="d-flex justify-content-between">
    <MDBNavbarBrand>
      <MDBIcon icon="mdb" iconStyle="fab" size="2x" />
    </MDBNavbarBrand>
    <MDBNavbarToggler target="#navbarColor01" @click="collapse7 = !collapse7"></MDBNavbarToggler>
    <MDBCollapse id="navbarColor01" v-model="collapse7">
      <MDBNavbarNav class="mb-2 mb-lg-0">
        <router-link :to="{ path: '/' }" class="nav-link" active-class="active">Dashboard</router-link>
        <router-link :to="{ path: '/teams' }" class="nav-link" active-class="active">Teams</router-link>
        <router-link :to="{ path: '/projects' }" class="nav-link" active-class="active">Projects</router-link>
      </MDBNavbarNav>
    </MDBCollapse>

    <MDBNavbarNav class="mb-2 mb-lg-0 d-flex flex-row">
      <router-link :to="{ path: '/cabinet' }" class="nav-link me-3 me-lg-0">
        <img src="https://mdbootstrap.com/img/Photos/Avatars/img (31).jpg" class="rounded-circle" height="22" alt=""
          loading="lazy" />
      </router-link>
    </MDBNavbarNav>

  </MDBNavbar>
</template>

<script>
import {
  MDBNavbar,
  MDBNavbarItem,
  MDBNavbarBrand,
  MDBNavbarNav,
  MDBNavbarToggler,
  MDBBadge,
  MDBIcon,
  MDBCollapse
} from 'mdb-vue-ui-kit';
import { ref } from "vue";
import { useRouter } from 'vue-router';

export default {
  components: {
    MDBNavbar,
    MDBNavbarItem,
    MDBNavbarBrand,
    MDBNavbarNav,
    MDBNavbarToggler,
    MDBBadge,
    MDBIcon,
    MDBCollapse
  },
  setup() {
    const collapse7 = ref(false);
    const router = useRouter();

    const navigateTo = (endpoint) => {
      r = router.push({ name: 'teams' })
      console.log(r)
    }

    return {
      collapse7,
      navigateTo
    }
  }
};
</script>