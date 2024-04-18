<template>
  <div class="text-center">
    <form novalidate @submit.prevent="updateUser" class="mt-4 gy-5">
      <MDBInput type="text" :label="$t('cabinet.name.label')" id="formUpdateName" v-model="formUpdateName"
        wrapperClass="mb-4" invalidFeedback="Обязательное поле" required />

      <MDBInput type="text" :label="$t('cabinet.username.label')" id="formUpdateUsername" v-model="formUpdateUsername"
        wrapperClass="mb-4" invalidFeedback="Обязательное поле" required />

      <MDBCol md="4">
        <MDBInput type="email" inputGroup aria-describedby="basic-addon3" v-model="formUpdateEmail"
          :invalidFeedback="$t('cabinet.email.invalid')" required wrapperClass="mb-4">
          <template v-slot:prepend>
            <span class="input-group-text" id="basic-addon3">@</span>
          </template>
        </MDBInput>
      </MDBCol>


      <div class="mb-4 p-3 border border-1 rounded-5">
        <MDBInput type="password" :label="$t('cabinet.oldPassword.label')" aria-describedby="basic-addon1"
          id="formUpdateOldPassword" v-model="formUpdateOldPassword" wrapperClass="mb-5" :isValid="false"
          :isValidated="checkValid()" :invalidFeedback="$t('cabinet.oldPassword.invalid')" />

        <MDBInput type="password" :label="$t('cabinet.password.label')" aria-describedby="basic-addon1"
          id="formUpdatePassword" v-model="formUpdatePassword" wrapperClass="mb-4"
          :invalidFeedback="$t('cabinet.password.invalid')" />
        <MDBInput type="password" :label="$t('cabinet.passwordRepeat.label')" aria-describedby="basic-addon1"
          id="formUpdatePasswordRepeat" v-model="formUpdatePasswordRepeat" wrapperClass="mb-2" :isValid="false"
          :isValidated="checkPassword()" :invalidFeedback="$t('cabinet.passwordRepeat.invalid')" />
      </div>

      <MDBFile class="mb-4" v-model="image" :label="$t('cabinet.imageInput')" accept="image/png,image/jpeg" required />

      <p class="fs-5">{{ $t('card.size.title') }}</p>
      <MDBBtnGroup v-for="lang in languages" class="mb-4">
        <MDBRadio @click="changeLanguage(lang)" :btnCheck="true" :wrap="false" labelClass="btn btn-secondary"
          :label="$t(`cabinet.language.${lang}`)" name="options" :value="lang" v-model="language" />
      </MDBBtnGroup>

      <MDBBtn color="primary" block class="mb-4" type="submit">
        {{ $t('cabinet.save') }}
      </MDBBtn>
    </form>

    <MDBBtn color="dark mt-4" floating @click="signOut()">
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
  MDBIcon,
  MDBFile,
  MDBBtnGroup,
  MDBRadio
} from "mdb-vue-ui-kit";
import { watch } from "vue";
import { ref, computed } from "vue";
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import config from '@/config';
import i18n from '../locales'

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
    MDBIcon,
    MDBFile,
    MDBBtnGroup,
    MDBRadio
  },
  setup() {
    const store = useStore();
    const router = useRouter();

    const formUpdateName = ref("");
    const formUpdateUsername = ref("");
    const formUpdateEmail = ref("");
    const formUpdatePassword = ref("");
    const formUpdateOldPassword = ref("");
    const formUpdatePasswordRepeat = ref("");
    const isResponseValid = ref(true);
    const image = ref(null);
    const userInfo = ref(null);
    const language = ref(localStorage.getItem('language'));
    const img = ref(null);

    store.watch(
      () => store.getters.getUserInfo,
      (newValue) => {
        userInfo.value = newValue;
        formUpdateName.value = ref(newValue.name).value;
        formUpdateUsername.value = ref(newValue.nickname).value;
        formUpdateEmail.value = ref(newValue.email).value;
      }
    );
    watch(image, async (newValue, oldValue) => {
      if (newValue != oldValue) {

        await store.dispatch('uploadImage', image.value[0])
        img.value = computed(() => store.getters.getImage).value;
      }
    })

    const changeLanguage = (language) => {
      localStorage.setItem('language', language)
      i18n.global.locale.value = language
    }

    const checkValid = () => {
      return !isResponseValid.value;
    }

    const updateUser = async (e) => {
      e.target.classList.add("was-validated");
      const isValidForm = [...e.target.elements].every(element => element.checkValidity());

      if (isValidForm) {
        await store.dispatch('updateUser', {
          name: formUpdateName.value,
          username: formUpdateUsername.value,
          email: formUpdateEmail.value,
          password: formUpdatePassword.value,
          oldPassword: formUpdateOldPassword.value,
          image: img.value.link
        });

        if (store.getters.getErrorByAction('updateUser')) {
          isResponseValid.value = false
          await store.dispatch('clearError', 'updateUser')
        } else {
          router.push({ name: 'home' }).then(() => {
            router.go();
          });
        }
      }
    };

    const checkPassword = () => {
      return formUpdatePasswordRepeat.value != '' && formUpdatePassword.value != formUpdatePasswordRepeat.value
    }

    const signOut = () => {
      localStorage.clear();
      window.location.reload();
    }

    return {
      image,
      checkValid,
      formUpdateName,
      formUpdateUsername,
      formUpdateOldPassword,
      formUpdateEmail,
      formUpdatePassword,
      formUpdatePasswordRepeat,
      checkPassword,
      signOut,
      updateUser,
      language,
      languages: config.languages,
      changeLanguage
    };
  },
  async mounted() {
    const store = useStore();
    await store.dispatch('userInfo');
  }
};
</script>
