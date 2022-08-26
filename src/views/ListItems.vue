<template>
  <div class="p-2">
    <h4>BASE DE PRODUCTOS PARA COMPRAR</h4>
  </div>

  <div class="p-2">
    <button class="btn btn-info" @click="onBack">REGRESAR</button>
  </div>

  <div class="p-2">
    <input
      v-model="textSearch"
      class="form-control"
      type="text"
      placeholder="busca elemento"
      autocomplete="off"
    />
  </div>

  <div class="p-2">
    <div
      v-for="(item, index) in itemList"
      :key="index"
      :value="item"
      class="form-check"
    >
      <input
        :id="item._id"
        v-model="selected"
        class="form-check-input"
        type="radio"
        name="flexRadioDefault"
        :value="item"
      />
      <label class="form-check-label" :for="item._id">
        {{ item.name }}
      </label>
    </div>
  </div>

  <div class="p-2 input-group mb-3">
    <span class="input-group-text">NUEVO PRODUCTO</span>
    <input
      v-model="newItemName"
      class="form-control"
      type="text"
      placeholder="producto nuevo a añadir"
    />
  </div>
  <div
    class="p-2 d-flex justify-content-between"
    role="group"
    aria-label="Basic mixed styles example"
  >
    <button class="btn btn-success" @click="onAccept">
      AÑADIR NUEVO PRODUCTO
    </button>
  </div>
</template>

<script>
import { ref, watch } from 'vue';
import { useRouter } from 'vue-router';
import { itemStore } from '../store/itemStore';

export default {
  setup() {
    const item = itemStore();
    const router = useRouter();

    const itemList = ref([]);
    const selected = ref({});
    const textSearch = ref('');
    const newItemName = ref('');
    let itemFilter = [];

    const getItems = async function () {
      await item.getItems();
      itemFilter = item.items;
      itemList.value = itemFilter;
    };

    getItems();

    const findMatches = function (search, options) {
      return options.filter((option) => {
        const regex = new RegExp(search, 'gi');
        return option.name.match(regex);
      });
    };

    const filterOptions = function () {
      itemList.value = itemFilter;

      const matchArray = findMatches(textSearch.value, itemList.value);
      itemList.value = [...matchArray];
    };

    const onAccept = async function () {
      if (newItemName.value != '') {
        await item.postItem(newItemName.value);
      }
      getItems();
      newItemName.value = '';
    };

    /*     const onDelete = async function () {
      if (selected.value._id != null) {
        await item.deleteItem(selected.value._id);
      }
      getItems();
    }; */

    const onBack = async function () {
      router.push({ name: 'CurrentOrder' });
    };

    watch(textSearch, () => {
      filterOptions();
    });

    return {
      filterOptions,
      onAccept,
      onBack,
      itemList,
      selected,
      textSearch,
      newItemName,
    };
  },
};
</script>

<style></style>
