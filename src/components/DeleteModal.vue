<template>
  <MDBModal id="deleteModal" tabindex="-1" labelledby="deleteModalLabel" v-model="deleteModal" scrollable>
    <MDBModalHeader>
      <MDBModalTitle id="deleteModalLabel">{{ text || $t('delete') }}</MDBModalTitle>
    </MDBModalHeader>
    <MDBModalBody>
      <p class="text-center">{{ textBody || $t('deleteBody') }}</p>
    </MDBModalBody>
    <MDBModalFooter>
      <MDBBtn color="secondary" @click="deleteModal = false">Close</MDBBtn>
      <MDBBtn color="danger" @click="deleteFunction()">Delete</MDBBtn>
    </MDBModalFooter>
  </MDBModal>
</template>

<script>
import { MDBBtn, MDBModal, MDBModalHeader, MDBModalTitle, MDBModalBody, MDBModalFooter } from "mdb-vue-ui-kit";
import { ref, watch } from 'vue';

export default {
  components: {
    MDBBtn,
    MDBModal,
    MDBModalHeader,
    MDBModalTitle,
    MDBModalBody,
    MDBModalFooter
  },
  props: {
    modal: {
      type: Boolean
    },
    text: {
      type: String
    },
    textBody: {
      type: String
    },
    deleteFunction: {
      type: Function
    }
  },
  emits: ['updateModal'],
  setup(props, context) {
    const deleteModal = ref(props.modal);

    watch(() => props.modal, (newValue) => {
      deleteModal.value = newValue;
    });

    watch(() => deleteModal.value, (newValue) => {
      context.emit('updateModal', newValue)
    })

    return {
      deleteModal
    }
  }
};
</script>
