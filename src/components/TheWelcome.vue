<template>
  <MDBCard bg="dark" text="white center" style="height: 18rem">
    <MDBCardHeader class="card-header">
      {{ cardHeader }}
      <MDBDropdown v-model="dropdown1">
        <MDBDropdownToggle size="sm" color="dark" @click="dropdown1 = !dropdown1">edit</MDBDropdownToggle>
        <MDBDropdownMenu aria-labelledby="dropdownMenuButton">
          <MDBDropdownItem href="#">Action</MDBDropdownItem>
          <MDBDropdownItem href="#">Another Action</MDBDropdownItem>
          <MDBDropdownItem href="#">Something else here</MDBDropdownItem>
        </MDBDropdownMenu>
      </MDBDropdown>
    </MDBCardHeader>
    <MDBCardBody>
      <div class="credential-container">
        <div class="credential">
          <strong>Login:</strong>
          <span class="credential-text">
            <span @click="copyToClipboard(login)">{{ login }}</span>
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
import { MDBCard, MDBCardHeader, MDBCardBody, MDBBtn, MDBCardFooter, MDBDropdown, MDBDropdownToggle, MDBDropdownMenu, MDBDropdownItem } from "mdb-vue-ui-kit";
import { ref } from 'vue';

export default {
  components: {
    MDBCard,
    MDBCardHeader,
    MDBCardBody,
    MDBBtn,
    MDBCardFooter,
    MDBDropdown,
    MDBDropdownToggle,
    MDBDropdownMenu,
    MDBDropdownItem
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
  setup() {
    const dropdown1 = ref(false);
    return {
      dropdown1
    }
  },
  methods: {
    togglePasswordVisibility() {
      this.isHidden = false;
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
.card-header {
  display: flex;
  justify-content: space-between;
}

.credential-container {
  display: grid;
  gap: 10px;
}

.credential {
  display: grid;
  grid-template-columns: 1fr auto;
  /* Две колонки: одна занимает всю доступную ширину, вторая под кнопку */
  gap: 10px;
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

@media screen and (max-width: 767px) {
  .credential {
    grid-template-columns: 1fr;
    /* Одна колонка на узких экранах */
  }
}

@media screen and (min-width: 1024px) and (max-width: 1200px) {
  .credential {
    grid-template-columns: 1fr;
    /* Одна колонка на узких экранах */
  }
}
</style>
