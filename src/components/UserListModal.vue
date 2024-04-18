<template>
  <MDBModal id="userModal" tabindex="-1" labelledby="userModalLabel" v-model="userModal" scrollable centered>
    <MDBModalHeader>
      <MDBModalTitle id="userModalLabel">{{ $t('userList.title') }}</MDBModalTitle>
    </MDBModalHeader>
    <MDBModalBody>
      <MDBTable class="align-middle mb-0 bg-white users-table">
        <thead class="bg-light">
          <tr>
            <th>{{ $t('userList.name') }}</th>
            <th>{{ $t('userList.action') }}</th>
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
                {{ $t('userList.add') }}
              </MDBBtn>
            </td>
          </tr>
        </tbody>
      </MDBTable>
    </MDBModalBody>
    <MDBModalFooter>
      <MDBBtn color="secondary" @click="userModal = false">{{ $t('userList.close') }}</MDBBtn>
    </MDBModalFooter>
  </MDBModal>
</template>

<script>
import { MDBBtn, MDBTable, MDBModal, MDBModalHeader, MDBModalTitle, MDBModalBody, MDBModalFooter } from "mdb-vue-ui-kit";
import { useStore } from 'vuex';
import { ref, computed, watch } from 'vue';

export default {
  components: {
    MDBBtn,
    MDBTable,
    MDBModal,
    MDBModalHeader,
    MDBModalTitle,
    MDBModalBody,
    MDBModalFooter
  },
  props: {
    group: {
      type: Object
    },
    modal: {
      type: Boolean
    }
  },
  emits: ['updateModal'],
  setup(props, context) {
    const store = useStore();
    const userModal = ref(props.modal);
    const group = ref(props.group);
    const allUsers = computed(() => store.getters.getUsers);

    watch(() => props.modal, (newValue) => {
      userModal.value = newValue;
    });

    watch(() => props.group, (newValue) => {
      group.value = newValue;
    });

    watch(() => userModal.value, (newValue) => {
      context.emit('updateModal', newValue)
    })

    const addUserToGroup = async (user) => {
      await store.dispatch('addUserToGroup', {
        userId: user.id,
        groupId: group.value.id
      });
      await store.dispatch('fetchGroupById', group.value.id);
    }

    return {
      userModal,
      allUsers,
      group, // eslint-disable-line
      addUserToGroup
    }
  },
  async mounted() {
    const store = useStore();
    await store.dispatch('fetchUsers');
  }
};
</script>

<style scoped></style>