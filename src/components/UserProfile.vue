<template>
  <div class="text-center">
    <form novalidate @submit.prevent="updateUser" class="mt-4 gy-5">
      <MDBInput type="text" label="Name" id="form7updateUserName" v-model="form7updateUserName" wrapperClass="mb-4"
        invalidFeedback="Обязательное поле" required />

      <MDBInput type="text" label="Username" id="form7updateUserUsername" v-model="form7updateUserUsername"
        wrapperClass="mb-4" invalidFeedback="Обязательное поле" required />

      <MDBCol md="4">
        <MDBInput inputGroup aria-describedby="basic-addon3" aria-label="Username" placeholder="Username"
          v-model="form7updateUserEmail" invalidFeedback="Please choose a unique and valid username."
          validFeedback="Looks good!" :isValid="false" :isValidated="false" required wrapperClass="mb-4">
          <template v-slot:prepend>
            <span class="input-group-text" id="basic-addon3">@</span>
          </template>
        </MDBInput>
      </MDBCol>

      <MDBInput type="password" label="Password" aria-describedby="basic-addon1" id="form7updateUserPassword"
        v-model="form7updateUserPassword" wrapperClass="mb-4" invalidFeedback="Please write correct password"
        required />
      <MDBInput type="password" label="Password Repeat" aria-describedby="basic-addon1"
        id="form7updateUserPasswordRepeat" v-model="form7updateUserPasswordRepeat" wrapperClass="mb-4" :isValid="false"
        :isValidated="checkPassword()" invalidFeedback="Пароли не совпадают" required />

      <MDBBtn color="primary" block class="mb-4" type="submit">
        Sign in
      </MDBBtn>
    </form>

    <MDBBtn color="dark mt-5" floating @click="signOut()">
      <MDBIcon icon="sign-out-alt"></MDBIcon>
    </MDBBtn>
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
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';

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
    const store = useStore();
    const router = useRouter();

    const form7updateUserName = ref("");
    const form7updateUserUsername = ref("");
    const form7updateUserEmail = ref("");
    const form7updateUserPassword = ref("");
    const form7updateUserPasswordRepeat = ref("");
    const formValidationErrors = ref({
      passwordMismatch: false,
      serverError: null
    });

    const userInfo = ref(null);
    store.watch(
      () => store.getters.getUserInfo,
      (newValue) => {
        userInfo.value = newValue;
        form7updateUserName.value = ref(newValue.name).value;
        form7updateUserUsername.value = ref(newValue.nickname).value;
        form7updateUserEmail.value = ref(newValue.email).value;
      }
    );

    const updateUser = async (e) => {
      e.target.classList.add("was-validated");

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
      }
    };

    const checkPassword = () => {
      return form7updateUserPasswordRepeat.value != '' && form7updateUserPassword.value != form7updateUserPasswordRepeat.value
    }

    const signOut = () => {
      localStorage.clear();
      router.push({ name: 'home' })
    }

    return {
      form7updateUserName,
      form7updateUserUsername,
      form7updateUserEmail,
      form7updateUserPassword,
      form7updateUserPasswordRepeat,
      formValidationErrors,
      checkPassword,
      signOut,
      updateUser
    };
  },
  async mounted() {
    const store = useStore();
    await store.dispatch('userInfo');
  }
};
</script>
