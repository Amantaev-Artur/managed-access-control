<template>
  <MDBDropdown class="type-dropdown" btnGroup v-model="typeDropdown">
    <MDBDropdownToggle outline="primary" @click="typeDropdown = !typeDropdown">
      {{ selectedOption }}
    </MDBDropdownToggle>
    <MDBDropdownMenu class="type-dropdown-menu">
      <MDBDropdownItem class="text-center" href="#" @click="selectOption(option)" v-for="option in options"
        :key="option">
        {{ option }}
      </MDBDropdownItem>
    </MDBDropdownMenu>
  </MDBDropdown>

  <div>
    <form v-if="selectedOption == 'login'" novalidate @submit.prevent="createAccess" class="mt-4 gy-5">
      <MDBInput inputGroup aria-label="Service name" aria-describedby="basic-addon1" placeholder="google.com"
        v-model="serviceNameInput" :invalidFeedback="$t('card.serviceName.invalid')"
        :validFeedback="$t('card.serviceName.valid')" required wrapperClass="mb-4">
      </MDBInput>

      <div class="mb-4 p-3">
        <MDBInput :label="$t('card.login.label')" v-model="loginInput" :invalidFeedback="$t('card.login.invalid')"
          :validFeedback="$t('card.login.valid')" required wrapperClass="mb-4" />
        <MDBInput :label="$t('card.password.label')" v-model="passwordInput"
          :invalidFeedback="$t('card.password.invalid')" :validFeedback="$t('card.password.valid')" required />
      </div>

      <p class="fs-5">{{ $t('card.size.title') }}</p>
      <MDBBtnGroup class="mb-4">
        <MDBRadio :btnCheck="true" :wrap="false" labelClass="btn btn-secondary" :label="$t('card.size.small')"
          name="options" value="small" v-model="size" />
        <MDBRadio :btnCheck="true" :wrap="false" labelClass="btn btn-secondary" :label="$t('card.size.big')"
          name="options" value="big" v-model="size" />
      </MDBBtnGroup>

      <p class="fs-5">{{ $t('card.color.title') }}</p>
      <div>
        <MDBBtn v-for="color in colors" :key="color.id" :color="color.id == selectColor?.id ? color.outline : null"
          :outline="color.id == selectColor?.id ? null : color.outline" rounded @click="changeColor(color)">{{
    color.outline }}</MDBBtn>
      </div>

      <p class="fs-5 mt-3">{{ $t('card.groups.title') }}</p>
      <MDBListGroup light>
        <MDBListGroupItem v-for="(group, index) in groups" :key="index" tag="a" href="#" ripple noBorder spacing action
          :class="{ 'nested': isNested(group) }" class="d-flex justify-content-between align-items-start"
          @click="toggleCheckbox(group)"
          :style="{ marginLeft: calculateMargin(group, groups), width: `calc(100% - ${calculateMargin(group, groups)})` }">
          <div :class="{ 'ms-2': isNested(group), 'me-auto': true }">
            <div class="fw-bold">{{ group.name }}</div>
            {{ group.description }}
          </div>
          <MDBBadge class="badge-primary" pill>{{ group.usersCount }}</MDBBadge>
          <div class="">
            <MDBCheckbox :id="'checkbox_' + group.id" v-model="group.selected" />
          </div>
        </MDBListGroupItem>
      </MDBListGroup>

      <MDBBtn class="w-100 mb-5" color="primary" type="submit">Save</MDBBtn>
      <DeleteModal :text="'Удалить карточку'" :deleteFunction="() => console.log('abc')" :modal="deleteModal"
        @updateModal="(m) => { deleteModal = m }" />
    </form>
  </div>
  <MDBBtn color="dark" class="delete-group-btn btn-lg" floating @click="deleteModal = true">
    <MDBIcon icon="fas fa-trash" fw class="bg-dark"></MDBIcon>
  </MDBBtn>
</template>

<script>
import { MDBInput, MDBCheckbox, MDBBtn, MDBDropdown, MDBDropdownToggle, MDBDropdownMenu, MDBDropdownItem, MDBListGroup, MDBListGroupItem, MDBBadge, MDBRadio, MDBBtnGroup, MDBIcon } from "mdb-vue-ui-kit";
import DeleteModal from '../DeleteModal.vue'
import { ref } from "vue";
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import { decryptData, encryptData } from '../../utils/encryption';
import { calculateMargin, isNested } from '../../utils/treeCalculator';
import { defaultColors, defaultTypes } from '../../constants/card';

export default {
  components: {
    DeleteModal,
    MDBInput,
    MDBCheckbox,
    MDBDropdown,
    MDBDropdownToggle,
    MDBDropdownMenu,
    MDBDropdownItem,
    MDBBtn,
    MDBListGroup,
    MDBListGroupItem,
    MDBBadge,
    MDBRadio,
    MDBBtnGroup,
    MDBIcon
  },
  setup() {
    const store = useStore();
    const router = useRouter();

    let serviceNameInput = ref("");
    let loginInput = ref("");
    let passwordInput = ref("");
    let size = ref("small");
    const typeDropdown = ref(false);
    const options = defaultTypes;
    const colors = ref(defaultColors)
    const selectColor = ref(null);
    const deleteModal = ref(false);
    const selectedOption = ref("Select a type");

    const access = ref(null);
    const groups = ref(null);

    const updateGroupsFromSaved = () => {
      if (access.value && groups.value) {
        const accessGroupIds = access.value.groups.map((el) => el.id)
        groups.value.forEach((group) => {
          if (accessGroupIds.includes(group.id)) group.selected = true
        })
        groups.value.forEach(parentG => {
          let child_group = groups.value.find((childG) => childG.parentId == parentG.id)
          if (child_group && parentG.selected) child_group.selected = parentG.selected
        });
      }
    }

    store.watch(
      () => store.getters.getAccess,
      (newValue) => {
        access.value = newValue;
        serviceNameInput.value = ref(newValue?.data.serviceName).value
        loginInput.value = ref(newValue.data?.login).value
        passwordInput.value = decryptData(ref(newValue.data?.password).value)
        size.value = ref(newValue.size).value
        selectedOption.value = ref(newValue.accessType.slug).value
        updateGroupsFromSaved()
      });

    store.watch(
      () => store.getters.getGroups,
      (newValue) => {
        groups.value = newValue;
        updateGroupsFromSaved()
      }
    );

    const selectOption = (option) => {
      selectedOption.value = option;
    };

    const changeColor = (color) => {
      selectColor.value = color
    }

    const createAccess = async (e) => {
      e.target.classList.add("was-validated");
      const isValidForm = [...e.target.elements].every(element => element.checkValidity());
      if (isValidForm) {
        const groupIds = groups.value.filter(group => group.selected).map(group => group.id);

        if (access.value != null) {
          await store.dispatch('updateAccess', {
            type: selectedOption.value,
            id: access.value.id,
            data: {
              serviceName: serviceNameInput.value,
              login: loginInput.value,
              password: encryptData(passwordInput.value),
              color: selectColor.value?.outline
            },
            size: size.value,
            groupIds: groupIds
          });
        } else {
          await store.dispatch('createAccess', {
            type: selectedOption.value,
            data: {
              serviceName: serviceNameInput.value,
              login: loginInput.value,
              password: passwordInput.value,
              color: selectColor.value?.outline
            },
            size: size.value,
            groupIds: groupIds
          });
        }
        router.push({ name: 'home' })
      };
    }

    return {
      serviceNameInput,
      loginInput,
      passwordInput,
      typeDropdown,
      options,
      selectOption,
      selectedOption,
      size,
      groups,
      isNested,
      calculateMargin,
      colors,
      changeColor,
      selectColor,
      createAccess,
      deleteModal
    };
  },
  async mounted() {
    const store = useStore();
    await store.dispatch('fetchGroups');
  },
  methods: {
    toggleCheckbox(group) {
      group.selected = !group.selected;
      this.groups.forEach(parentG => {
        let child_group = this.groups.find((childG) => childG.parentId == parentG.id)
        if (child_group && parentG.selected) child_group.selected = parentG.selected
      });
    }
  }
};
</script>

<style scoped>
.type-dropdown,
.type-dropdown-menu {
  width: 160px;
}

.delete-group-btn {
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 9999;
}

@media screen and (max-width: 1024px) {

  .type-dropdown,
  .type-dropdown-menu {
    width: 100%;
  }
}
</style>
