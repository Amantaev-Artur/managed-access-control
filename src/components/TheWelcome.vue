<template>
  <MDBCard bg="dark" text="white center" style="height: 18rem">
    <MDBCardHeader>{{ cardHeader }}</MDBCardHeader>
    <MDBCardBody>
      <div class="credential-container">
        <div class="credential">
          <strong>Login:</strong>
          <span class="credential-text">
            {{ login }}
            <MDBBtn size="sm" @click="copyToClipboard(login)" color="success">Copy</MDBBtn>
          </span>
        </div>
        <div class="credential">
          <strong>Password:</strong>
          <span class="credential-text">
            <span @click="togglePasswordVisibility">
              {{ isHidden ? '************' : password }}
            </span>
            <MDBBtn size="sm" @click="copyToClipboard(password)" color="success">Copy</MDBBtn>
          </span>
        </div>
      </div>
    </MDBCardBody>
    <MDBCardFooter class="text-muted" style="font-size: var(--subtitle-text-font-size)">{{ cardFooter }}</MDBCardFooter>
  </MDBCard>
</template>

<script>
import { MDBCard, MDBCardHeader, MDBCardBody, MDBBtn, MDBCardFooter } from "mdb-vue-ui-kit";

export default {
  components: {
    MDBCard,
    MDBCardHeader,
    MDBCardBody,
    MDBBtn,
    MDBCardFooter,
  },
  props: {
    cardHeader: {
      type: String,
      default: "Featured",
    },
    login: {
      type: String,
      default: "your_login",
    },
    password: {
      type: String,
      default: "your_password",
    },
    buttonText: {
      type: String,
      default: "Button",
    },
    cardFooter: {
      type: String,
      default: "2 days ago",
    },
  },
  data() {
    return {
      isHidden: true,
    };
  },
  methods: {
    togglePasswordVisibility() {
      this.isHidden = !this.isHidden;
    },
    copyToClipboard(text) {
      const textarea = document.createElement("textarea");
      textarea.value = text;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
    },
  },
};
</script>

<style scoped>
.credential-container {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.credential {
  display: flex;
  justify-content: space-between;
  background-color: #282c34;
  padding: 10px;
  border-radius: 5px;
}

.credential-text {
  display: flex;
  gap: 10px;
  align-items: center;
}

.credential-text>span {
  flex: 1;
}

.success {
  background-color: green;
  border-color: green;
}

.credential-text span:hover {
  cursor: pointer;
}

.credential-text span:hover::before {
  margin-right: 5px;
}
</style>
