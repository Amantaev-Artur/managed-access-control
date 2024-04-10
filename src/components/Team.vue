<template>
  <form v-if="group == null || group.users?.length > 0" novalidate @submit.prevent="updateTeam"
    class="mt-5 gy-5 group-form">
    <MDBInput :label="$t('group.name.label')" aria-describedby="basic-addon1" v-model="nameInput"
      :invalidFeedback="$t('group.name.invalid')" :validFeedback="$t('group.name.valid')" required
      wrapperClass="mb-4 mt-4" @input="inputChanged()">
    </MDBInput>

    <div class="mb-3 p-3">
      <MDBTextarea :label="$t('group.name.label')" rows="2" v-model="descriptionInput"
        :invalidFeedback="$t('group.name.invalid')" :validFeedback="$t('group.name.valid')" required wrapperClass="mb-4"
        @input="inputChanged()" />
    </div>

    <MDBListGroup light>
      <MDBListGroupItem v-for="(g, index) in groups" :key="index" tag="a" href="#" ripple noBorder spacing action
        :class="{ 'nested': isNested(g) }" class="d-flex justify-content-between align-items-start"
        @click="toggleCheckbox(g)"
        :style="{ marginLeft: calculateMargin(g, groups), width: `calc(100% - ${calculateMargin(g, groups)})` }">
        <div :class="{ 'ms-2': isNested(g), 'me-auto': true }">
          <div class="fw-bold">{{ g.name }}</div>
          {{ g.description }}
        </div>
        <MDBRadio :id="'checkbox_' + g.id" name="groupRadio" :formCheck="false" :value="true"
          :checked="checkActiveRadio(g)" />
      </MDBListGroupItem>
    </MDBListGroup>

    <MDBBtn class="w-100 mt-4" :color="buttonData.color" :outline="buttonData.outline" type="submit"
      :disabled="buttonData.outline">{{ $t(`group.saveBtn.${buttonData.state}`) }}</MDBBtn>
  </form>

  <div class="row users-list" v-if="group?.users?.length > 0">
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
                <MDBIcon icon="fas fa-user-times" class="bg-danger"></MDBIcon>
              </MDBBtn>
            </div>
          </div>
        </MDBCardBody>
      </MDBCard>
    </div>
  </div>
  <div v-if="group?.users?.length > 0" class="text-center align-items-center">
    <MDBBtn color="dark" class="btn-lg" floating @click="userModal = true">
      <MDBIcon icon="fas fa-user-plus" fw class="bg-success"></MDBIcon>
    </MDBBtn>
  </div>
  <h4 class="text-center" v-else-if="group">{{ $t('group.not_avaliable') }}</h4>

  <MDBBtn color="dark" class="delete-group-btn btn-lg" floating @click="deleteModal = true">
    <MDBIcon icon="fas fa-trash" fw class="bg-dark"></MDBIcon>
  </MDBBtn>

  <UserListModal :allUsers="allUsers" :group="group" :modal="userModal"
    @updateModal="(modal) => { userModal = modal }" />
  <DeleteModal :text="$t('group.delete')" :textBody="$t('group.deleteBody')" :modal="deleteModal" :deleteFunction="deleteGroup"
    @updateModal="(modal) => { deleteModal = modal }" />
</template>

<script>
import { MDBCard, MDBInput, MDBRadio, MDBTextarea, MDBCardBody, MDBBtn, MDBIcon, MDBListGroup, MDBListGroupItem } from "mdb-vue-ui-kit";
import DeleteModal from './DeleteModal.vue'
import UserListModal from './UserListModal.vue'
import { calculateMargin, isNested } from '../utils/treeCalculator';
import { useStore } from 'vuex';
import { ref, computed } from 'vue';
import router from "@/router";

export default {
  components: {
    DeleteModal,
    UserListModal,
    MDBCard,
    MDBInput,
    MDBTextarea,
    MDBCardBody,
    MDBBtn,
    MDBIcon,
    MDBListGroup,
    MDBListGroupItem,
    MDBRadio
  },
  props: {
    groupId: {
      type: Number
    }
  },
  setup(props) {
    const store = useStore();
    const nameInput = ref('');
    const descriptionInput = ref('');
    const group = ref(null);

    const isTableVisible = ref(false);
    const userModal = ref(false);
    const deleteModal = ref(false);
    const selectedParentGroup = ref(null);
    const buttonData = ref({ color: 'primary', state: 'default' });
    const allUsers = computed(() => store.getters.getUsers);
    const groups = computed(() => store.getters.getGroups);
    const toggleTable = () => {
      isTableVisible.value = !isTableVisible.value;
    };

    const inputChanged = () => {
      buttonData.value.outline = null
      buttonData.value.state = 'default'
    }

    store.watch(
      () => store.getters.getSelectedGroup,
      (newValue) => {
        group.value = newValue;
        nameInput.value = newValue.name;
        descriptionInput.value = newValue.description;
        store.dispatch('fetchGroups', props.groupId);
      });

    const removeUser = async (user) => {
      await store.dispatch('removeUserFromGroup', {
        userId: user.id,
        groupId: props.groupId
      });
      await store.dispatch('fetchGroupById', props.groupId);
    }

    const addUserToGroup = async (user) => {
      await store.dispatch('addUserToGroup', {
        userId: user.id,
        groupId: props.groupId
      });
      await store.dispatch('fetchGroupById', props.groupId);
    }

    const updateTeam = async () => {
      if (props.groupId) {
        await store.dispatch('updateGroup', {
          name: nameInput.value,
          description: descriptionInput.value,
          groupId: props.groupId,
          parentId: selectedParentGroup.value?.id
        });
      } else {
        await store.dispatch('createGroup', {
          name: nameInput.value,
          description: descriptionInput.value,
          parentId: selectedParentGroup.value?.id
        });
        router.push({ name: 'teams' })
      }

      buttonData.value.outline = 'success'
      buttonData.value.state = 'success'
    }

    const toggleCheckbox = (g) => {
      selectedParentGroup.value = g
    }

    const checkActiveRadio = (g) => {
      return selectedParentGroup.value?.id == g.id || group.value?.parentId == g.id
    }

    const deleteGroup = async () => {
      await store.dispatch('deleteGroup', {
        groupId: props.groupId
      });
      router.push({ name: 'teams' })
    }

    return {
      addUserToGroup,
      allUsers,
      buttonData,
      userModal,
      deleteModal,
      inputChanged,
      isTableVisible,
      toggleTable,
      removeUser,
      updateTeam,
      nameInput,
      descriptionInput,
      isNested,
      calculateMargin,
      groups,
      group,
      toggleCheckbox,
      deleteGroup,
      checkActiveRadio
    }
  },
};
</script>

<style scoped>
.delete-group-btn {
  position: fixed;
  bottom: 20px;
  right: 20px;
}

.users-list {
  margin: 10px 10%
}

.group-form {
  margin: 50px 30%;
}

@media screen and (max-width: 1024px) {

  .group-form {
    margin: 24px;
  }

  .users-list {
    margin: 0
  }
}
</style>