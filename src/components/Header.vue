<script setup>
import 'mdb-vue-ui-kit/css/mdb.min.css';
import {
  MDBNavbar,
  MDBNavbarToggler,
  MDBNavbarNav,
  MDBNavbarItem,
  MDBCollapse,
  MDBDropdown,
  MDBDropdownToggle,
  MDBDropdownMenu,
  MDBDropdownItem
} from 'mdb-vue-ui-kit';
import { ref } from 'vue';

const collapse6 = ref(false);
const dropdown9 = ref(false);
// const toggleNavbar = () => {
//   collapse6.value = !collapse6.value;
// };
</script>

<template>
  <MDBNavbar expand="lg" light bg="light" container>
    <!-- Toggle button -->
    <MDBNavbarToggler target="#navbarCenterAlignExample" @click="collapse6 = !collapse6"></MDBNavbarToggler>
    <!-- Collapsible wrapper -->
    <MDBCollapse id="navbarCenterAlignExample" v-model="collapse6">
      <MDBNavbarNav center class="mb-2 mb-lg-0">
        <!-- Center links -->
        <MDBNavbarItem to="#" active>
          Home
        </MDBNavbarItem>
        <MDBNavbarItem href="#" active>
          Link
        </MDBNavbarItem>
        <!-- Navbar dropdown -->
        <MDBDropdown class="nav-item" v-model="dropdown9">
          <MDBDropdownToggle tag="a" class="nav-link" @click="dropdown9 = !dropdown9">Dropdown</MDBDropdownToggle>
          <MDBDropdownMenu>
            <MDBDropdownItem href="#">Action</MDBDropdownItem>
            <MDBDropdownItem href="#">Another Action</MDBDropdownItem>
            <MDBDropdownItem href="#">Something else here</MDBDropdownItem>
          </MDBDropdownMenu>
        </MDBDropdown>
        <MDBNavbarItem to="#" disabled tabindex="-1" aria-disabled="true">
          Disabled
        </MDBNavbarItem>
        <!-- Center links -->
      </MDBNavbarNav>
    </MDBCollapse>
    <!-- Collapsible wrapper -->
  </MDBNavbar>
</template>
