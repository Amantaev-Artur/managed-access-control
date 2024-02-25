<script setup>
import TheWelcome from '../components/TheWelcome.vue'
</script>

<template>
  <main>
    <div class="cards-container">
      <div v-for="card in cards" :key="card.id" :class="{ 'double-width': card.type === 'double' }"
        class="card-container">
        <TheWelcome :cardHeader=card.content :login=card.login :password=card.password :cardFooter=card.last_update />
      </div>

    </div>
  </main>
</template>

<script>
export default {
  data() {
    return {
      cards: [
        { id: 1, type: 'single', content: 'Сервис 1', login: 'aa@aa.ru', password: '123', last_update: 'Сегодня' },
        { id: 2, type: 'double', content: 'Карточка 2' },
        { id: 2, type: 'single', content: 'Карточка 2' },
        { id: 2, type: 'single', content: 'Карточка 2' },
        { id: 2, type: 'single', content: 'Карточка 2' },
        { id: 2, type: 'double', content: 'Карточка 2' },
        // Добавьте другие карточки
      ],
    };
  },
};
</script>

<style>
.cards-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 40px;
  align-items: center;
  margin-top: 40px;
}

.card-container {
  width: calc(33.33% - 60px);
  box-sizing: border-box;
}

.double-width {
  width: calc(66.66% - 80px);
  box-sizing: border-box;
}
</style>