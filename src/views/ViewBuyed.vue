<template>
  <div class="p-2">
    <h4>LISTA DE COMPRADA (view buyed)</h4>
  </div>
  <div class="p-2">
    <button class="btn btn-info" @click="onBack">REGRESAR</button>
  </div>
  <div class="p-2">
    <label>FECHA COMPRA</label>
  </div>
  <div class="p-2">
    <ul class="list-group">
      <li
        v-for="(order, index) in ordersDate"
        :key="index"
        class="list-group-item"
      >
        <a href="#" @click="setDate(order._id)">{{ order._id }}</a>
      </li>
    </ul>
    <ol class="list-group list-group-numbered">
      <li
        v-for="(order, index) in ordersBuyed"
        :key="index"
        class="list-group-item d-flex justify-content-between align-items-start"
      >
        <div class="ms-2 me-auto">
          <div class="fw-bold">{{ order.itemId.name }}</div>
          {{ order.model }}
        </div>
        <span class="badge bg-primary rounded-pill">{{ order.quantity }}</span>
      </li>
    </ol>
  </div>
</template>
<script>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { orderStore } from '../store/orderStore';

export default {
  setup() {
    const orders = orderStore();
    const router = useRouter();

    const ordersBuyed = ref([]);
    const ordersDate = ref([]);
    let datePurchased = ref('');

    const load = async function () {
      await orders.getOrderDate();
      ordersDate.value = orders.dates;
      if (ordersDate.value[0] != null) {
        datePurchased.value = ordersDate.value[0]._id;
        await orders.getOrderBuyed(datePurchased.value);
        ordersBuyed.value = orders.orders;
      }
    };

    load();

    const updateView = async function () {
      await orders.getOrderBuyed(datePurchased.value);
      ordersBuyed.value = orders.orders;
    };

    const setDate = function (params) {
      datePurchased.value = params;
      updateView();
    };

    const onBack = function () {
      router.push({ name: 'CurrentOrder' });
    };

    return {
      onBack,
      setDate,
      ordersBuyed,
      datePurchased,
      ordersDate,
    };
  },
};
</script>
<style></style>
