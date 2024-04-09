<template>
  <div class="access-create">
    <CardEdit></CardEdit>
  </div>
</template>

<script>
import CardEdit from '../components/CardEdit.vue';

export default {
  components: {
    CardEdit
  }
};</script>

<style>
.access-create {
  margin: 50px 30%;
}

@media screen and (max-width: 1024px) {
  .access-create {
    margin: 30px;
  }
}
</style>