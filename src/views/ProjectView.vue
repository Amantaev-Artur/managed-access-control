<template>
  <main>
    <div class="container mt-4">
      <div class="row mx-5 justify-content-between">
        <div class="col-md-6">
          <MDBListGroup light style="min-width: 22rem" class="mb-3">
            <MDBListGroupItem>
              <h5 class="fw-bold">Our company starts its operations</h5>
              <p class="text-muted mb-2 fw-bold">11 March 2020</p>
              <p class="text-muted mb-0">
                Some placeholder content in a paragraph relating to "Our company starts its operations". And some more
                content, used here just to pad out and fill this tab panel. In production, you would obviously have more
                real content here. And not just text. It could be anything, really. Text, images, forms.
              </p>
            </MDBListGroupItem>
            <MDBListGroupItem>
              <h5 class="fw-bold">First customer</h5>
              <p class="text-muted mb-2 fw-bold">19 March 2020</p>
              <p class="text-muted mb-0">
                Some placeholder content in a paragraph relating to "First customer". And some more content, used here
                just to pad out and fill this tab panel. In production, you would obviously have more real content here.
                And not just text. It could be anything, really. Text, images, forms.
              </p>
            </MDBListGroupItem>
            <MDBListGroupItem>
              <h5 class="fw-bold">Our team exceeds 10 people</h5>
              <p class="text-muted mb-2 fw-bold">24 June 2020</p>
              <p class="text-muted mb-0">
                Some placeholder content in a paragraph relating to "Our team exceeds 10 people". And some more content,
                used here just to pad out and fill this tab panel. In production, you would obviously have more real
                content here. And not just text. It could be anything, really. Text, images, forms.
              </p>
            </MDBListGroupItem>
          </MDBListGroup>
        </div>
        <div class="col-md-4 ps-4 border-start">
          <MDBListGroup light>
            <MDBListGroupItem v-for="user in users" :key="user.id" class="d-flex justify-content-between align-items-center">
              <div class="d-flex align-items-center">
                <img :src="user.image || '/public/user.svg'" style="width: 45px; height: 45px"
                  class="rounded-circle" />
                <div class="ms-3">
                  <p class="fw-bold mb-1">{{ user.name }}</p>
                  <p class="text-muted mb-0">{{ user.email }}</p>
                </div>
              </div>
            </MDBListGroupItem>
          </MDBListGroup>
        </div>
      </div>
    </div>

  </main>
</template>

<script>
import { MDBListGroup, MDBListGroupItem } from "mdb-vue-ui-kit";
import { useStore } from 'vuex';
import { computed } from "vue";

export default {
  components: {
    MDBListGroup,
    MDBListGroupItem
  },
  setup() {
    const store = useStore();
    const users = computed(() => store.getters.getUsers);

    return {
      users
    }
  },
  async mounted() {
    const store = useStore();
    await store.dispatch('fetchUsers');
  }
};
</script>

<style></style>