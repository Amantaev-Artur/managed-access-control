<template>
  <div>
    <form @submit.prevent="updateUser">
      <MDBInput type="text" label="Name" id="form7updateUserName" v-model="form7updateUserName" wrapperClass="mb-4" />

      <MDBInput type="text" label="Username" id="form7updateUserUsername" v-model="form7updateUserUsername"
        wrapperClass="mb-4" />

      <MDBInput type="email" label="Email" id="form7updateUserEmail" v-model="form7updateUserEmail"
        wrapperClass="mb-4" />

      <MDBInput type="password" label="Password" id="form7updateUserPassword" v-model="form7updateUserPassword"
        wrapperClass="mb-4" />

      <MDBInput type="password" label="Repeat password" id="form7updateUserPasswordRepeat"
        v-model="form7updateUserPasswordRepeat" wrapperClass="mb-4"
        :class="{ 'is-invalid': formValidationErrors.passwordMismatch }" />
      <small v-if="formValidationErrors.passwordMismatch" class="text-danger">
        Passwords do not match.
      </small>

      <MDBBtn color="primary" block class="mb-3" type="submit">
        Sign in
      </MDBBtn>

      <!-- TODO: накинуть стилей -->
      <MDBAlert v-if="formValidationErrors.serverError" color="danger" dismissible class="my-3"
        style="font-weight: bold; text-align: center;">
        {{ formValidationErrors.serverError }}
      </MDBAlert>
    </form>
  </div>
</template>

<script>
import {
  MDBInput,
  MDBCheckbox,
  MDBBtn,
  MDBTabs,
  MDBTabNav,
  MDBTabContent,
  MDBTabItem,
  MDBTabPane,
  MDBIcon
} from "mdb-vue-ui-kit";
import { ref } from "vue";
import axios from "axios"; // Import axios library
import { useRouter } from 'vue-router';

export default {
  components: {
    MDBInput,
    MDBCheckbox,
    MDBBtn,
    MDBTabs,
    MDBTabNav,
    MDBTabContent,
    MDBTabItem,
    MDBTabPane,
    MDBIcon
  },
  setup() {
    const userData = JSON.parse(localStorage.getItem('userData'))


    const form7updateUserName = ref(userData.name);
    const form7updateUserUsername = ref(userData.username);
    const form7updateUserEmail = ref(userData.email);
    const form7updateUserPassword = ref("");
    const form7updateUserPasswordRepeat = ref("");
    const formValidationErrors = ref({
      passwordMismatch: false,
      serverError: null
    });

    const router = useRouter();

    const updateUser = async () => {
      try {
        const response = await axios.put("/users", {
          name: form7updateUserName.value,
          username: form7updateUserUsername.value,
          email: form7updateUserEmail.value,
          password: form7updateUserPassword.value
        });

        localStorage.setItem("jwtToken", response.data.jwtToken);
        localStorage.setItem("userData", JSON.stringify(response.data.userData));
        router.push({ name: 'home' })
      } catch (error) {
        console.error("Registration failed", error);

        if (error.response && error.response.status === 422) {
          formValidationErrors.value.serverError = "Invalid registration data. Please check your inputs.";
        } else {
          formValidationErrors.value.serverError = "An unexpected error occurred. Please try again later.";
        }
      }
    };

    return {
      form7updateUserName,
      form7updateUserUsername,
      form7updateUserEmail,
      form7updateUserPassword,
      form7updateUserPasswordRepeat,
      formValidationErrors,
      updateUser
    };
  },
};
</script>
