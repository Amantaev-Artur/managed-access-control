<template>
  <form v-if="group == null || group.users.length > 0" novalidate @submit.prevent="updateTeam"
    class="mt-4 gy-5 group-text-form">
    <MDBInput label="Name" aria-describedby="basic-addon1" v-model="nameInput" invalidFeedback="Please write a name"
      validFeedback="Looks good!" required wrapperClass="mb-4 mt-4" @input="inputChanged()">
    </MDBInput>

    <div class="mb-4 p-3">
      <MDBTextarea label="Description" rows="2" v-model="descriptionInput"
        invalidFeedback="Please whire some description" validFeedback="Looks good!" required wrapperClass="mb-4"
        @input="inputChanged()" />
    </div>

    <MDBBtn class="w-100" :color="buttonData.color" :outline="buttonData.outline" type="submit"
      :disabled="buttonData.outline">{{ buttonData.text }}</MDBBtn>
  </form>

  <div class="row users-list" v-if="group?.users.length > 0">
    <div class="col-xl-4 col-lg-6 mb-4" v-for="(user, index) in group.users" :key="index">
      <MDBCard>
        <MDBCardBody>
          <div class="d-flex align-items-center">
            <img :src="user.avatar" alt="" style="width: 45px; height: 45px" class="rounded-circle" />
            <div class="ms-3">
              <p class="fw-bold mb-1">{{ user.name }}</p>
              <p class="text-muted mb-0">{{ user.email }}</p>
            </div>
            <div v-if="user.id != group.author.id" class="ms-auto">
              <MDBBtn color="dark" size="sm" floating @click="removeUser(user)">
                <MDBIcon icon="fas fa-user-times"></MDBIcon>
              </MDBBtn>
            </div>
          </div>
        </MDBCardBody>
      </MDBCard>
    </div>
  </div>
  <h4 class="text-center" v-else-if="group">Извините, но у вас нет прав на эту группу</h4>

  <div class="groups-list">
    <MDBListGroup light>
      <MDBListGroupItem v-for="(group, index) in groups" :key="index" tag="a" href="#" ripple noBorder spacing action
        :class="{ 'nested': isNested(group) }" class="d-flex justify-content-between align-items-start"
        @click="toggleCheckbox(group)"
        :style="{ marginLeft: calculateMargin(group), width: `calc(100% - ${calculateMargin(group)})` }">
        <div :class="{ 'ms-2': isNested(group), 'me-auto': true }">
          <div class="fw-bold">{{ group.name }}</div>
          {{ group.description }}
        </div>
        <div class="">
          <MDBRadio :id="'checkbox_' + group.id" name="groupRadio" :formCheck="false" value=""
            :v-model="console.log(group.selected) || group.selected" />
        </div>
      </MDBListGroupItem>
    </MDBListGroup>
  </div>

  <MDBModal id="exampleModal" tabindex="-1" labelledby="exampleModalLabel" v-model="exampleModal" scrollable>
    <MDBModalHeader>
      <MDBModalTitle id="exampleModalLabel"> Добавить в группу </MDBModalTitle>
    </MDBModalHeader>
    <MDBModalBody>
      <MDBTable class="align-middle mb-0 bg-white users-table">
        <thead class="bg-light">
          <tr>
            <th>Имя</th>
            <th>Действия</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(user, index) in (allUsers.filter(u => !group?.users?.some(usr => usr.id === u.id)))" :key="index">
            <td>
              <div class="d-flex align-items-center">
                <img :src="user.avatar" class="rounded-circle" alt="" style="width: 45px; height: 45px" />
                <div class="ms-3">
                  <p class="fw-bold mb-1">{{ user.name }}</p>
                  <p class="text-muted mb-0">{{ user.email }}</p>
                </div>
              </div>
            </td>
            <td>
              <MDBBtn color="link" size="sm" rounded class="fw-bold" :ripple="{ color: 'dark' }"
                @click="addUserToGroup(user)">
                Добавить
              </MDBBtn>
            </td>
          </tr>
        </tbody>
      </MDBTable>
    </MDBModalBody>
    <MDBModalFooter>
      <MDBBtn color="secondary" @click="exampleModal = false">Close</MDBBtn>
    </MDBModalFooter>
  </MDBModal>

  <MDBBtn v-if="group?.users.length > 0" color="dark" class="mt-4 add-group-btn btn-lg" floating
    @click="exampleModal = true">
    <MDBIcon icon="fas fa-plus"></MDBIcon>
  </MDBBtn>
</template>

<script>
import { MDBCard, MDBInput, MDBRadio, MDBTextarea, MDBCardBody, MDBBtn, MDBIcon, MDBTable, MDBBadge, MDBModal, MDBModalHeader, MDBModalTitle, MDBModalBody, MDBModalFooter } from "mdb-vue-ui-kit";
import { useStore } from 'vuex';
import { ref, computed, watch } from 'vue';

export default {
  components: {
    MDBCard,
    MDBInput,
    MDBTextarea,
    MDBCardBody,
    MDBBtn,
    MDBIcon,
    MDBTable,
    MDBBadge,
    MDBModal,
    MDBModalHeader,
    MDBModalTitle,
    MDBModalBody,
    MDBModalFooter,
    MDBRadio
  },
  props: {
    group: {
      type: Object
    },
    onUsersUpdate: {
      type: Function
    }
  },
  setup(props) {
    const store = useStore();
    const nameInput = ref(props.group?.name);
    const descriptionInput = ref(props.group?.description);

    const isTableVisible = ref(false);
    const exampleModal = ref(false);
    const buttonData = ref({ color: 'primary', text: 'Save name and desciption' });
    const allUsers = computed(() => store.getters.getUsers);
    const groups = computed(() => store.getters.getGroups);
    const toggleTable = () => {
      isTableVisible.value = !isTableVisible.value;
    };

    const inputChanged = () => {
      buttonData.value.outline = null
      buttonData.value.text = 'Save name and desciption'
    }

    watch(() => props.group, (newValue, _oldValue) => {
      nameInput.value = newValue.name;
      descriptionInput.value = newValue.description;
    });

    const removeUser = async (user) => {
      await store.dispatch('removeUserFromGroup', {
        userId: user.id,
        groupId: props.group.id
      });

      if (props.onUsersUpdate) props.onUsersUpdate();

    }

    const addUserToGroup = async (user) => {
      await store.dispatch('addUserToGroup', {
        userId: user.id,
        groupId: props.group.id
      });

      if (props.onUsersUpdate) props.onUsersUpdate();
    }

    const updateTeam = async () => {
      await store.dispatch('updateGroup', {
        name: nameInput.value,
        description: descriptionInput.value,
        groupId: props.group.id
      });

      buttonData.value.outline = 'success'
      buttonData.value.text = 'success'
    }

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

    return {
      addUserToGroup,
      allUsers,
      buttonData,
      exampleModal,
      inputChanged,
      isTableVisible,
      toggleTable,
      removeUser,
      updateTeam,
      nameInput,
      descriptionInput,
      isNested,
      calculateMargin,
      groups
    }
  },
  async mounted() {
    const store = useStore();
    await store.dispatch('fetchUsers');
    await store.dispatch('fetchGroups');
  }
};
</script>

<style scoped>
.add-group-btn {
  position: fixed;
  bottom: 20px;
  right: 20px;
}

.users-list {
  margin: 10px 10%
}

.group-text-form,
.groups-list {
  margin: 50px 30%;
}

@media screen and (max-width: 1024px) {

  .group-text-form,
  .groups-list {
    margin: 24px;
  }

  .users-list {
    margin: 0
  }
}
</style>