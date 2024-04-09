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

// import forge from 'node-forge';

// var rsa = forge.pki.rsa;

// // generate an RSA key pair synchronously
// // *NOT RECOMMENDED*: Can be significantly slower than async and may block
// // JavaScript execution. Will use native Node.js 10.12.0+ API if possible.
// var keypair = rsa.generateKeyPair({ bits: 2048, e: 0x10001 });
// const priv = keypair.privateKey;
// const pub = keypair.publicKey;

// console.log(forge.pki.privateKeyToPem(priv))
// const pemPriv = `
// -----BEGIN RSA PRIVATE KEY-----
// MIIEogIBAAKCAQEAnaYtAGpLLQj3x5vOCuR8K+RtUDeapRSrFTwdKjrrR06oRHDH
// +a+kl3eBE/lNeOwsa+Lu18jNuLEixQEUKdoWO7QgZuQLg8HOKs6Us0wUJmCnIG6b
// GjYRZN5H/VTSTawfa52EclIjMw/9i+gD8GqTdEeEjyksbrEoJvF7zR8KcShTreY9
// 7U16D7pY7fmq/FjNV7RADS2c801STCbmJDEt5XmS+Eh7+K0gOPsqea3/g7VAdvvP
// Cr+ofnEI+iAR1rULeEB7zCoREpU9qdt3FXsFnp5xALdFbfjc842zHy5Zj5k4im1d
// wgBIm1pF2rX6yhHoeKOny6w5PEwC1YX0o5wD4QIDAQABAoIBAA+CugrAaoUTzM0m
// 1y7bLBxlbRvnXJ/BWNPOBlCRW3S4mHWjYwl97oO4jkqYzLaJBhXXTgiNCTCSvQkF
// Aibb/jQBlO6KoVdlShOMH7VEVvcvq0HVoA0EJNH3zL1wCwD5Xl4IMW/OBQiRGjEZ
// ssmEst1N7Azp0CVT6M9sEvIri6t2VHSCvV/uiTKwvDhy4rrDPj3Sw5a6PgoyVoux
// J0tSWmVozlpKX6V78X98MkLIxhB+Hm5kDFtfpoZvIP+zEg/kknntfybljujTrOJV
// gys6k4ij8Su2cLK+LPsycSVQSHZCjwaoYOaIMyNDhz7QNqj5FAegX1aPXT0709j9
// JhpwBAECgYEA4nupwz2/7R9DmIUwqxcjQb5aKOK1E7LaRDFkEg1k0pPZz8txjVgG
// 94UDRpBJA8tSUeP+5w2HqbjA+79zyNdin1owJSTsn7XGv0l17aE8B4pqRsnsGM/a
// /BNzj34KmFRjKXJYvt4sDcDVgy/ax3220pEd4cehUm8Tvj+mQcg6m/kCgYEAsjHz
// Wi7DLuAwSJ7Q0FiVvmAkChWYG9CiCHczJYoHNOWBwcggOZdLraYVrVJnzuLH+iWh
// AWvog+4eSZ+Dj2QPoObMpJzjpOF33/baM6r3Qo6B6MxoOFKRgJUqzO3yS3Px4P29
// 7bPTNfOp0nSQqRZfBBb9jnmc2t4C3Xxswc0pkSkCgYBdMHD7qu7LzK9tlHAgFdcl
// +AL1C8NiJZd1s7TvUJ+JndhjjdxdQjkro4ljgX7plsF6fIun2oNVrHWLoI0tuKIV
// 23Av+G98j7kFgF6LtmoS2Ds+gVsqImyCiCZmhoApiZ97sFcfwh7yUcQIxKoKp4mQ
// PrHC8vdICfhfsaThMFgdUQKBgD44uuSul3Dyz2lMK1XU2NTU9UCgMbDktO+Hz9A3
// 1jReP2TO4JG7hq1n5QHUWHMhNPrf0MySRWpr5x+GF4YmRl7EuIhyT/ruz9DgfWi1
// NgmDgVEsruebzTq822kbXRODtN3/PCaYOBQKtS3Ljge8zAi9jmQFiwPRqeZ03/T8
// EpuhAoGAW321IGFmQ+7XjJYk+vuqt8Ev22kHIv/PS1AVJ88wiEXaFKwzqG/INWEb
// DVPgS/ry8jg6qZ7oi/AbhqVMuqSqQGln/JoupQyeP8s75ZzXxA05gvo/CUqQnHTv
// KWZVLwKGSEfXnPoqpTouQ6FYXW4SJ8VfXVV1K3K8t13soHAgusU=
// -----END RSA PRIVATE KEY-----`

// console.log(forge.pki.publicKeyToPem(pub))
// const pemPub = `
// -----BEGIN PUBLIC KEY-----
// MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAnaYtAGpLLQj3x5vOCuR8
// K+RtUDeapRSrFTwdKjrrR06oRHDH+a+kl3eBE/lNeOwsa+Lu18jNuLEixQEUKdoW
// O7QgZuQLg8HOKs6Us0wUJmCnIG6bGjYRZN5H/VTSTawfa52EclIjMw/9i+gD8GqT
// dEeEjyksbrEoJvF7zR8KcShTreY97U16D7pY7fmq/FjNV7RADS2c801STCbmJDEt
// 5XmS+Eh7+K0gOPsqea3/g7VAdvvPCr+ofnEI+iAR1rULeEB7zCoREpU9qdt3FXsF
// np5xALdFbfjc842zHy5Zj5k4im1dwgBIm1pF2rX6yhHoeKOny6w5PEwC1YX0o5wD
// 4QIDAQAB
// -----END PUBLIC KEY-----
// `
// var privateKey = forge.pki.privateKeyFromPem(pemPriv);
// // console.log(privateKey)

// const publicKey = forge.pki.publicKeyFromPem(pemPub);
// const encrypted = publicKey.encrypt("Your sensitive data here");
// console.log("encrypted:", forge.util.encode64(encrypted));

// const decrypted = privateKey.decrypt("Y6/1M4/yYRoQmwwZSxQK+dOrTg/1l8cHHVQAncJZXiV+ZcBeljLfg88CeLd1om6x+GBVsaStdQw5vIyndZVB275rxTdP1umSm3RgopjGVaLmXSlA1+C3ocRMT2lsYZRgq9y95qfdAfwHx4SN65eFJTp95rUYn/G9DAr0/dsim3dIiUnKClPF/y6DODzT7bS+Z43hxiGwaV7IYdqzsz5voxmeE5X8HjmLHUrH4Dm3Tg5tQteDYDQH0py3BChR3vucfoh2bTUhEatsVm7beKEJZpfpVWMXrewzGswCrNK9heMq33sPqN60gSPF2xi5kr6pytUXFxi5UXgt3NRpJhLEqg==");
// console.log("decrypted:", decrypted);
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
    const userData = localStorage.getItem('userData') != 'undefined' ? JSON.parse(localStorage.getItem('userData')) : null


    const form7updateUserName = ref(userData?.name);
    const form7updateUserUsername = ref(userData?.username);
    const form7updateUserEmail = ref(userData?.email);
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
