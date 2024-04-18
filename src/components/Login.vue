<template>
  <div>
    <MDBTabs v-model="loginTab">
      <MDBTabNav pills justify tabsClasses="mb-3">
        <MDBTabItem tabId="form-login" href="form-login">{{ $t('login.signIn') }}</MDBTabItem>
        <MDBTabItem tabId="form-register" href="form-register">{{ $t('login.register') }}</MDBTabItem>
      </MDBTabNav>

      <MDBTabContent>
        <MDBTabPane tabId="form-login">
          <form @submit.prevent="login" novalidate>
            <MDBInput type="email" :label="$t('login.email.label')" id="formLoginEmail" v-model="formLoginEmail"
              wrapperClass="mb-5" :invalidFeedback="$t('login.email.invalid')" required />

            <MDBInput type="password" :label="$t('login.password.label')" id="formLoginPassword"
              v-model="formLoginPassword" wrapperClass="mb-3" :isValid="false" :isValidated="checkValid()" minLength="8"
              :invalidFeedback="$t('login.password.invalid')" required />

            <MDBBtn color="primary" block class="mt-3" type="submit">{{ $t('login.signIn') }}</MDBBtn>

            <MDBRow class="mb-4">
              <MDBCol>
                <a href="#!">{{ $t('login.forgotPassword') }}</a>
              </MDBCol>
            </MDBRow>
          </form>
        </MDBTabPane>
        <MDBTabPane tabId="form-register">
          <form @submit.prevent="register" novalidate>
            <MDBInput type="text" :label="$t('login.name.label')" id="formRegisterName" v-model="formRegisterName"
              wrapperClass="mb-4" :invalidFeedback="$t('login.name.invalid')" required />

            <MDBInput type="text" :label="$t('login.username.label')" id="formRegisterUsername"
              v-model="formRegisterUsername" wrapperClass="mb-4" :invalidFeedback="$t('login.username.invalid')"
              required />

            <MDBInput type="email" :label="$t('login.email.label')" id="formRegisterEmail" v-model="formRegisterEmail"
              wrapperClass="mb-4" :invalidFeedback="$t('login.email.invalid')" required />

            <MDBInput type="password" :label="$t('login.password.label')" id="formRegisterPassword"
              v-model="formRegisterPassword" wrapperClass="mb-4" :invalidFeedback="$t('login.password.invalid')"
              required minLength="8" />

            <MDBInput type="password" :label="$t('login.passwordRepeat.label')" id="formRegisterPasswordRepeat"
              v-model="formRegisterPasswordRepeat" wrapperClass="mb-4" :isValid="false"
              :isValidated="checkRepeatPassword()" :invalidFeedback="$t('login.passwordRepeat.invalid')" required />
            <MDBCheckbox :label="$t('login.agreeCheckbox')" id="formRegsiterTermsCheck"
              v-model="formRegsiterTermsCheck" wrapperClass="d-flex justify-content-center mb-4" required/>

            <MDBBtn color="primary" block class="mb-3" type="submit">
              {{ $t('login.register') }}
            </MDBBtn>
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
import { ref } from 'vue';
import { useStore } from 'vuex';
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
    const loginTab = ref("form-login");
    const formLoginEmail = ref("");
    const formLoginPassword = ref("");
    const formLoginCheck = ref(true);
    const formRegisterName = ref("");
    const formRegisterUsername = ref("");
    const formRegisterEmail = ref("");
    const formRegisterPassword = ref("");
    const formRegisterPasswordRepeat = ref("");
    const formRegsiterTermsCheck = ref(false);
    const isResponseValid = ref(true);

    const store = useStore();
    const router = useRouter();

    const login = async (e) => {
      e.target.classList.add("was-validated");
      const isValidForm = [...e.target.elements].every(element => element.checkValidity());

      if (isValidForm) {
        await store.dispatch('login', {
          email: formLoginEmail.value,
          password: formLoginPassword.value
        });
        if (store.getters.getErrorByAction('login')) {
          isResponseValid.value = false
          await store.dispatch('clearError', 'login')
        } else {
          router.push({ name: 'home' })
        }
      }
    };

    const register = async (e) => {
      e.target.classList.add("was-validated");
      const isValidForm = [...e.target.elements].every(element => element.checkValidity());

      if (isValidForm) {
        await store.dispatch('register', {
          name: formRegisterName.value,
          username: formRegisterUsername.value,
          email: formRegisterEmail.value,
          password: formRegisterPassword.value
        });
        if (store.getters.getErrorByAction('register')) {
          isResponseValid.value = false
          store.dispatch('clearError', 'register')
        } else {
          router.push({ name: 'home' })
        }
      }
    };

    const checkValid = () => {
      return !isResponseValid.value;
    }

    const checkRepeatPassword = () => {
      return formRegisterPasswordRepeat.value != '' && formRegisterPassword.value != formRegisterPasswordRepeat.value
    }

    return {
      checkValid,
      checkRepeatPassword,
      loginTab,
      formLoginEmail,
      formLoginPassword,
      formLoginCheck,
      formRegisterName,
      formRegisterUsername,
      formRegisterEmail,
      formRegisterPassword,
      formRegisterPasswordRepeat,
      formRegsiterTermsCheck,
      login,
      register
    };
  },
};
</script>
