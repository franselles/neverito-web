import { defineStore } from 'pinia';
import axios from 'axios';
import { urlServer } from './config';

export const itemStore = defineStore('itemStore', {
  state: () => {
    return {
      items: [],
    };
  },
  actions: {
    async getItems() {
      try {
        const { data } = await axios({
          url: urlServer + 'items',
          method: 'GET',
        });

        this.items = data;
        return;
      } catch (error) {
        console.log(error);
      }
    },
    async postItem(item) {
      try {
        await axios({
          url: urlServer + 'item',
          method: 'POST',
          data: { name: item },
        });
        return;
      } catch (error) {
        console.log(error);
      }
    },
    async deleteItem(id) {
      try {
        await axios({
          url: urlServer + `item/${id}`,
          method: 'DELETE',
        });
        return;
      } catch (error) {
        console.log(error);
      }
    },
  },
});
