<template>
  <div class="user-profile gap-3">
    <!-- <MDBInput label="Name input" type="text" v-model="name" class="mb-3" white /> -->
    <MDBInput label="Name input" type="text" v-model="name" class="mb-3" />
    <MDBInput label="Email input" type="email" v-model="email" class="mb-3" />
    <MDBInput label="Password input" type="password" v-model="password" class="mb-3" />
    <MDBBtn @click="submitForm" class="w-100" color="success" rounded>Submit</MDBBtn>
  </div>
</template>
<script setup>
import { ref } from 'vue';
import { MDBInput, MDBBtn } from 'mdb-vue-ui-kit';
import axios from 'axios';

const name = ref('');
const email = ref('');
const password = ref('');

const submitForm = () => {
  const formData = {
    name: name.value,
    email: email.value,
    password: password.value,
  };

  axios.post('yourBackendEndpoint', formData)
    .then(response => {
      console.log(response.data);
      // Add logic for handling a successful response
    })
    .catch(error => {
      console.error(error);
      // Add logic for handling errors
    });
};
</script>

<style scoped>
</style>
