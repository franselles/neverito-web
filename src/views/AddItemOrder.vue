<template>
  <div class="p-2">
    <h4>AÑADIR PRODUCTO A LA LISTA PARA COMPRAR</h4>
  </div>
  <div class="p-2">
    <button class="btn btn-info" @click="onBack">REGRESAR</button>
  </div>

  <div class="p-2">
    <input
      v-model="textSearch"
      type="text"
      placeholder="busca elemento"
      autocomplete="off"
      class="form-control"
    />
  </div>

  <div class="p-2">
    <div v-for="(item, index) in options" :key="index" :value="item">
      <div class="form-check">
        <input
          :id="item._id"
          v-model="selected"
          :value="item"
          class="form-check-input"
          type="radio"
          name="flexRadioDefault"
        />
        <label class="form-check-label" :for="item._id">
          {{ item.name }}
        </label>
      </div>

      <div v-if="selected._id == item._id">
        <div class="input-group mb-3">
          <span class="input-group-text">Modelo</span>
          <input
            v-model="newItem.model"
            type="text"
            placeholder="modelo o tipo del producto"
            class="form-control"
          />
        </div>
        <div class="input-group mb-3">
          <span class="input-group-text">Cantidad</span>
          <input
            v-model="newItem.quantity"
            type="number"
            class="form-control"
          />
        </div>

        <div class="input-group mb-3">
          <input
            class="btn btn-success"
            type="button"
            value="AÑADIR"
            @click="onSubmit"
          />
        </div>
      </div>
    </div>
  </div>
  <div
    class="p-2 d-flex justify-content-between"
    role="group"
    aria-label="Basic mixed styles example"
  >
    <!-- <input
      class="btn btn-success"
      type="button"
      value="AÑADIR"
      @click="onSubmit"
    /> -->
    <input
      class="btn btn-primary"
      type="button"
      value="CREAR"
      @click="createItem"
    />
  </div>
</template>

<script>
import { ref, watch } from 'vue';
import { useRouter } from 'vue-router';
import { itemStore } from '../store/itemStore';
import { userStore } from '../store/userStore';
import { orderStore } from '../store/orderStore';

export default {
  setup() {
    const item = itemStore();
    const user = userStore();
    const order = orderStore();

    const router = useRouter();

    let itemsList = [];

    const newItem = ref({
      familyId: user.user.familyId,
      itemId: '',
      userId: user.user._id,
      model: '',
      quantity: 1,
      buyed: false,
    });
    const options = ref([]);
    const textSearch = ref('');
    const selected = ref({});

    const getItemsLocal = async function () {
      await item.getItems();
      itemsList = item.items;
      options.value = itemsList;
    };

    getItemsLocal();

    const findMatches = function (search, options) {
      return options.filter((option) => {
        const regex = new RegExp(search, 'gi');
        return option.name.match(regex);
      });
    };

    const filterOptions = function () {
      options.value = itemsList;

      const matchArray = findMatches(textSearch.value, options.value);
      options.value = [...matchArray];
    };

    const onSubmit = async function () {
      if (selected.value._id != null && newItem.value.quantity > 0) {
        newItem.value.itemId = selected.value._id;
        await order.postOrder(newItem.value);
        router.push({ name: 'CurrentOrder' });
      }
    };

    const createItem = function () {
      router.push({ name: 'ListItems' });
    };

    const onBack = async function () {
      router.push({ name: 'CurrentOrder' });
    };

    watch(textSearch, () => {
      filterOptions();
    });

    return {
      options,
      filterOptions,
      textSearch,
      selected,
      newItem,
      createItem,
      onSubmit,
      onBack,
    };
  },
};
</script>

<style></style>
