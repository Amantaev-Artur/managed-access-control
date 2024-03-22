<template>
  <div>
    <MDBTabs v-model="form7ActiveTab">
      <MDBTabNav pills justify tabsClasses="mb-3">
        <MDBTabItem tabId="form7-login" href="form7-login">Login</MDBTabItem>
        <MDBTabItem tabId="form7-register" href="form7-register">Register</MDBTabItem>
      </MDBTabNav>

      <MDBTabContent>
        <MDBTabPane tabId="form7-login">
          <form @submit.prevent="login">
            <MDBInput type="email" label="Email address" id="form7LoginEmail" v-model="form7LoginEmail"
              wrapperClass="mb-4" />

            <MDBInput type="password" label="Password" id="form7LoginPassword" v-model="form7LoginPassword"
              wrapperClass="mb-4" />

            <MDBRow class="mb-4">
              <MDBCol class="d-flex justify-content-center">
                <MDBCheckbox label="Remember me" id="form7LoginCheck" v-model="form7LoginCheck"
                  wrapperClass="mb-3 mb-md-0" />
              </MDBCol>

              <MDBCol>
                <a href="#!">Forgot password?</a>
              </MDBCol>
            </MDBRow>

            <MDBBtn color="primary" block class="mb-4" type="submit"> Sign in </MDBBtn>

            <!-- TODO: накинуть стилей -->
            <MDBAlert v-if="formValidationErrors.serverError" color="danger" dismissible class="my-3"
              style="font-weight: bold; text-align: center;">
              {{ formValidationErrors.serverError }}
            </MDBAlert>

            <div class="text-center">
              <p>Not a member? <a href="#!">Register</a></p>
            </div>
          </form>
        </MDBTabPane>
        <MDBTabPane tabId="form7-register">
          <form @submit.prevent="register">
            <MDBInput type="text" label="Name" id="form7RegisterName" v-model="form7RegisterName" wrapperClass="mb-4" />

            <MDBInput type="text" label="Username" id="form7RegisterUsername" v-model="form7RegisterUsername"
              wrapperClass="mb-4" />

            <MDBInput type="email" label="Email" id="form7RegisterEmail" v-model="form7RegisterEmail"
              wrapperClass="mb-4" />

            <MDBInput type="password" label="Password" id="form7RegisterPassword" v-model="form7RegisterPassword"
              wrapperClass="mb-4" />

            <MDBInput type="password" label="Repeat password" id="form7RegisterPasswordRepeat"
              v-model="form7RegisterPasswordRepeat" wrapperClass="mb-4"
              :class="{ 'is-invalid': formValidationErrors.passwordMismatch }" />
            <small v-if="formValidationErrors.passwordMismatch" class="text-danger">
              Passwords do not match.
            </small>
            <MDBCheckbox label="I have read and agree to the terms" id="form7RegsiterTermsCheck"
              v-model="form7RegsiterTermsCheck" wrapperClass="d-flex justify-content-center mb-4" />

            <MDBBtn color="primary" block class="mb-3" type="submit">
              Sign in
            </MDBBtn>

            <!-- TODO: накинуть стилей -->
            <MDBAlert v-if="formValidationErrors.serverError" color="danger" dismissible class="my-3"
              style="font-weight: bold; text-align: center;">
              {{ formValidationErrors.serverError }}
            </MDBAlert>
          </form>
        </MDBTabPane>
      </MDBTabContent>
    </MDBTabs>
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
    const form7ActiveTab = ref("form7-login");
    const form7LoginEmail = ref("");
    const form7LoginPassword = ref("");
    const form7LoginCheck = ref(true);
    const form7RegisterName = ref("");
    const form7RegisterUsername = ref("");
    const form7RegisterEmail = ref("");
    const form7RegisterPassword = ref("");
    const form7RegisterPasswordRepeat = ref("");
    const form7RegsiterTermsCheck = ref(true);
    const formValidationErrors = ref({
      passwordMismatch: false,
      serverError: null
    });

    const router = useRouter();

    const login = async () => {
      try {
        // const response = await axios.post("/login", {
        //   email: form7LoginEmail.value,
        //   password: form7LoginPassword.value
        // });

        // Save the token and user data to localStorage or Vuex store
        // localStorage.setItem("jwtToken", response.data.jwtToken);
        // localStorage.setItem("userData", JSON.stringify(response.data.userData));
        localStorage.setItem("jwtToken", 'abc');
        localStorage.setItem("userData", JSON.stringify({ name: 'Artur A', username: 'archi' }));
        router.push({ name: 'home' })
      } catch (error) {
        console.error("Login failed", error);

        if (error.response && error.response.status === 422) {
          formValidationErrors.value.serverError = "Invalid credentials. Please check your email and password.";
        } else {
          formValidationErrors.value.serverError = "An unexpected error occurred. Please try again later.";
        }
      }
    };

    const register = async () => {
      try {
        const response = await axios.post("/registration", {
          name: form7RegisterName.value,
          username: form7RegisterUsername.value,
          email: form7RegisterEmail.value,
          password: form7RegisterPassword.value
        });

        localStorage.setItem("jwtToken", response.data.jwtToken);
        localStorage.setItem("userData", JSON.stringify(response.data.userData));
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
      form7ActiveTab,
      form7LoginEmail,
      form7LoginPassword,
      form7LoginCheck,
      form7RegisterName,
      form7RegisterUsername,
      form7RegisterEmail,
      form7RegisterPassword,
      form7RegisterPasswordRepeat,
      form7RegsiterTermsCheck,
      formValidationErrors,
      login,
      register
    };
  },
};
</script>
