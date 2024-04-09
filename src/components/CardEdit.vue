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
        v-model="serviceNameInput" invalidFeedback="Please choose a service name" validFeedback="Looks good!" required
        wrapperClass="mb-4">
      </MDBInput>

      <div class="mb-4 p-3">
        <MDBInput label="Login" v-model="loginInput" invalidFeedback="Please provide login" validFeedback="Looks good!"
          required wrapperClass="mb-4" />
        <MDBInput label="Password" v-model="passwordInput" invalidFeedback="Please provide password"
          validFeedback="Looks good!" required wrapperClass="mb-4" />
      </div>

      <p class="fs-5">Выберите размер карточки</p>
      <MDBBtnGroup class="mb-4">
        <MDBRadio :btnCheck="true" :wrap="false" labelClass="btn btn-secondary" label="Small" name="options"
          value="small" v-model="size" />
        <MDBRadio :btnCheck="true" :wrap="false" labelClass="btn btn-secondary" label="Big" name="options" value="big"
          v-model="size" />
      </MDBBtnGroup>

      <p class="fs-5">Выберите группы</p>
      <MDBListGroup light>
        <MDBListGroupItem v-for="(group, index) in groups" :key="index" tag="a" href="#" ripple noBorder spacing action
          :class="{ 'nested': isNested(group) }" class="d-flex justify-content-between align-items-start"
          @click="toggleCheckbox(group)"
          :style="{ marginLeft: calculateMargin(group), width: `calc(100% - ${calculateMargin(group)})` }">
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
      <MDBBtn class="w-100" color="primary" type="submit">Save</MDBBtn>
    </form>
  </div>
</template>

<script>
import { MDBRow, MDBInput, MDBCheckbox, MDBBtn, MDBDropdown, MDBDropdownToggle, MDBDropdownMenu, MDBDropdownItem, MDBListGroup, MDBListGroupItem, MDBBadge, MDBRadio, MDBBtnGroup } from "mdb-vue-ui-kit";
import { ref, computed, watchEffect } from "vue";
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';

export default {
  components: {
    MDBRow,
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
    MDBBtnGroup
  },
  setup() {
    const store = useStore();
    const router = useRouter();

    let serviceNameInput = ref("");
    let loginInput = ref("");
    let passwordInput = ref("");
    let size = ref("small");
    const typeDropdown = ref(false);
    const options = ["login", "link", "text"];
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
        passwordInput.value = ref(newValue.data?.password).value
        size.value = ref(newValue.size).value
        selectedOption.value = ref(newValue.accessType.slug).value
        updateGroupsFromSaved()
      });

    store.watch(
      () => store.getters.getGroups,
      (newValue) => {
        groups.value = newValue;
        updateGroupsFromSaved()
        // Обновление других переменных или выполнение логики
        // в зависимости от полученных данных groups
      }
    );
    const isNested = (group) => group.parentId !== null;

    const calculateMargin = (group) => {
      const depth = calculateDepth(group.id);
      return `${depth * 20}px`;
    };

    const calculateDepth = (groupId) => {
      let depth = 0;
      let currentGroup = groups.value.find(group => group.id === groupId);

      while (currentGroup && currentGroup.parentId !== null) {
        depth++;
        currentGroup = groups.value.find(group => group.id === currentGroup.parentId);
      }

      return depth;
    };

    const selectOption = (option) => {
      selectedOption.value = option;
    };

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
              password: passwordInput.value
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
              password: passwordInput.value
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
      createAccess
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

@media screen and (max-width: 1024px) {

  .type-dropdown,
  .type-dropdown-menu {
    width: 100%;
  }
}
</style>
