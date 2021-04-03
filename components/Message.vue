<template>
  <div>
    <div v-if="name === 'admin'" class="system">
      <p style="text-align: center">{{ text }}</p>
      <hr>
    </div>
    <div v-else class="wrap">
      <div class="message" :class="{owner}">
        <small>
          <strong>{{ name }}</strong>
        </small>
        <p>{{text}}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: { //название, текст, владелец сообщения (текущий пользователь или нет)
    name: String,
    text: String,
    owner: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style scoped>
.system {
  margin-bottom: 1rem;
}

.p {
  margin-bottom: 1rem;
}

.wrap {
  display: flex;
  flex-direction: column; /*сообщения друг под другом*/
}

.message {
  padding: 1rem;
  width: 60%;
  margin: 0 1rem;
  box-shadow: 0 1px 0 0 rgba(50, 50, 50, 0.3); /* смещение по x | по y | размытие (радиус) | радиус распределения | цвет */
  border-radius: 4px;
  background: #1976d2;
  position: relative;
  margin-bottom: 1rem;
}
.message p { /*vuetify по дефолту добавляем марджины*/
  margin-bottom: 0px;
}
.owner {
  background: #ffffff;
  color: #000000;
  align-self: flex-end; /*выравнивание самого элемента по flex - привязка к правому столбцу*/
}
</style>
