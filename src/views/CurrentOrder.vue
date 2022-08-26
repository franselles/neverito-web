<template>
  <div class="p-2">
    <h2>HOLA {{ users.user.name }}</h2>
  </div>
  <div class="p-2">
    <h4>LISTA DE COMPRA ACTUAL</h4>
  </div>

  <div class="p-2">
    <ol class="list-group list-group-numbered">
      <li
        v-for="(order, index) in orders.orders"
        :key="index"
        class="list-group-item d-flex justify-content-between align-items-start"
      >
        <div class="ms-2 me-auto">
          <div class="form-check form-switch">
            <input
              id="order._id"
              v-model="order.buyed"
              class="form-check-input"
              type="checkbox"
              :disabled="active"
            />
          </div>
          <div class="fw-bold">{{ order.itemId.name }}</div>
          {{ order.model }}
        </div>
        <span class="badge bg-primary rounded-pill">{{ order.quantity }} </span>
        <button class="btn btn-primary" @click="onEdit(order._id)">
          EDITAR
        </button>
      </li>
    </ol>
  </div>
  <div class="btn-toolbar justify-content-between p-2">
    <button class="btn btn-success" @click="onInsert">AÑADIR</button>
    <button class="btn btn-warning" @click="onActive">{{ textButton }}</button>
  </div>
</template>

<script>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { orderStore } from '../store/orderStore';
import { userStore } from '../store/userStore';

export default {
  setup() {
    const router = useRouter();
    const orders = orderStore();
    const users = userStore();

    const active = ref(true);

    let textButton = ref('DESBLOQUEA COMPRA');

    const carga = async function () {
      await orders.getOrderOpen();
    };

    carga();

    const onInsert = function () {
      router.push({ name: 'AddItemOrder' });
    };

    const onActive = async function () {
      if (active.value) {
        active.value = false;
        textButton.value = 'COMPRAR';
      } else {
        await orders.putOrders();
        await carga();
        active.value = true;
        textButton.value = 'DESBLOQUEA COMPRA';
      }
    };

    const onEdit = function (id) {
      orders.id = id;
      router.push({ name: 'Editorder' });
    };

    const onExit = function () {
      users.statusLogin.logded = false;
      router.push({ name: 'Login' });
    };

    return {
      onExit,
      onInsert,
      onActive,
      onEdit,
      orders,
      users,
      active,
      textButton,
    };
  },
};
</script>

<style></style>
