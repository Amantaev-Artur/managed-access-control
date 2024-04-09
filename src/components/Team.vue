<template>
  <div class="row" v-if="users.length > 0">
    <div class="col-xl-4 col-lg-6 mb-4" v-for="(user, index) in users" :key="index">
      <MDBCard>
        <MDBCardBody>
          <div class="d-flex align-items-center">
            <img :src="user.avatar" alt="" style="width: 45px; height: 45px" class="rounded-circle" />
            <div class="ms-3">
              <p class="fw-bold mb-1">{{ user.name }}</p>
              <p class="text-muted mb-0">{{ user.email }}</p>
            </div>
          </div>
        </MDBCardBody>
      </MDBCard>
    </div>
  </div>
  <h4 class="text-center" v-else>Извините, но у вас нет прав на эту группу</h4>
</template>

<script>
import { MDBCard, MDBCardBody } from "mdb-vue-ui-kit";

export default {
  components: {
    MDBCard,
    MDBCardBody
  },
  props: {
    users: {
      type: Array,
      default: []
    }
  }
};
</script>
