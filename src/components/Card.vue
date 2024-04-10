<template>
  <MDBCard :bg="color" text="white center">
    <MDBCardHeader class="card-header">
      {{ cardHeader }}
      <MDBDropdown v-model="dropdown1">
        <MDBDropdownToggle size="sm" :color="color" @click="dropdown1 = !dropdown1">Action</MDBDropdownToggle>
        <MDBDropdownMenu aria-labelledby="dropdownMenuButton">
          <li v-if="canEdit">
            <router-link :to="`/accesses/${id}/edit`" class="dropdown-item">Edit</router-link>
          </li>
          <li>
            <router-link :to="`/accesses/${id}`" class="dropdown-item">Show</router-link>
          </li>
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
    <MDBCardFooter class="font-monospace" style="font-size: var(--subtitle-text-font-size)">{{ cardFooter }}
    </MDBCardFooter>
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
    canEdit: {
      type: Boolean
    },
    color: {
      type: String,
      default: 'dark'
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
    id: {
      type: Number
    }
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
    deleteAccess(id) {
      console.log(id)
    }
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
  background-color: #191b1d;
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
