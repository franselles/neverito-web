<template>
  <div class="p-2">
    <h4>EDITAR LA LISTA PARA COMPRAR</h4>
  </div>
  <div class="p-2">
    <button class="btn btn-info" @click="onBack">REGRESAR</button>
  </div>
  <div class="p-2">
    <form @submit.prevent="onSubmit">
      <div class="input-group mb-3">
        <span class="input-group-text">Elemento</span>
        <select v-model="currentOrder.itemId._id" class="form-select">
          <option v-for="option in items" :key="option._id" :value="option._id">
            {{ option.name }}
          </option>
        </select>
      </div>

      <div class="input-group mb-3">
        <span class="input-group-text">Modelo</span>
        <input
          v-model="currentOrder.model"
          type="text"
          placeholder="modelo o tipo del producto"
          class="form-control"
        />
      </div>

      <div class="input-group mb-3">
        <span class="input-group-text">Cantidad</span>
        <input
          v-model="currentOrder.quantity"
          type="number"
          class="form-control"
        />
      </div>
      <div
        class="d-flex justify-content-between"
        role="group"
        aria-label="Basic mixed styles example"
      >
        <input class="btn btn-success" type="submit" value="CAMBIAR" />
        <button class="btn btn-danger" @click="onDelete">BORRAR</button>
      </div>
    </form>
  </div>
</template>

<script>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { orderStore } from '../store/orderStore';
import { itemStore } from '../store/itemStore';

export default {
  setup() {
    const router = useRouter();
    const order = orderStore();
    const item = itemStore();

    const currentOrder = ref({
      familyId: Object,
      itemId: Object,
      userId: Object,
      model: '',
      quantity: 0,
      buyed: false,
      dateOrder: '',
      datePurchase: '',
    });
    const items = ref([]);

    const find = async function () {
      await item.getItems();
      items.value = item.items;

      await order.findOrder();
      currentOrder.value = order.currentOrder;
    };

    find();

    const onSubmit = async function () {
      order.currentOrder = currentOrder.value;
      await order.putOrders();
      router.push({ name: 'CurrentOrder' });
    };

    const onDelete = async function () {
      if (currentOrder.value._id != null) {
        await order.deleteOrder(currentOrder.value);
      }
      router.push({ name: 'CurrentOrder' });
    };

    const onBack = async function () {
      router.push({ name: 'CurrentOrder' });
    };

    return {
      onSubmit,
      onDelete,
      onBack,
      currentOrder,
      items,
    };
  },
};
</script>

<style></style>
