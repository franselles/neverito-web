import { defineStore } from 'pinia';
import axios from 'axios';
import { urlServer } from './config';

export const orderStore = defineStore('orderStore', {
  state: () => {
    return {
      orders: [],
      dates: [],
      id: '',
      currentOrder: {},
    };
  },
  actions: {
    orderOrders() {
      this.orders.sort((a, b) => {
        let fa = a.itemId.name;
        let fb = b.itemId.name;

        if (fa < fb) {
          return -1;
        }
        if (fa > fb) {
          return 1;
        }
        return 0;
      });
    },
    async getOrderOpen() {
      try {
        const { data } = await axios({
          url: urlServer + 'orders/open',
          method: 'GET',
        });

        this.orders = data;

        this.orderOrders();

        return;
      } catch (error) {
        console.log(error);
      }
    },
    async getOrderBuyed(datePurchased) {
      try {
        const { data } = await axios({
          url: urlServer + `orders/buyed/${datePurchased}`,
          method: 'GET',
        });

        this.orders = data;

        this.orderOrders();

        return;
      } catch (error) {
        console.log(error);
      }
    },
    async getOrderDate() {
      try {
        const { data } = await axios({
          url: urlServer + `orders/date`,
          method: 'GET',
        });

        this.dates = data;

        return;
      } catch (error) {
        console.log(error);
      }
    },
    async findOrder() {
      this.currentOrder = await this.orders.find((item) => {
        return item._id === this.id;
      });
    },
    async putOrders() {
      try {
        await axios({
          method: 'PUT',
          url: urlServer + 'orders',
          data: this.orders,
        });
        return;
      } catch (error) {
        console.log(error);
      }
    },
    async postOrder(order) {
      try {
        await axios({
          method: 'POST',
          url: urlServer + 'order',
          data: order,
        });
        return;
      } catch (error) {
        console.log(error);
      }
    },
    async deleteOrder(order) {
      try {
        await axios({
          method: 'DELETE',
          url: urlServer + `order/${order._id}`,
        });
      } catch (error) {
        console.log(error);
      }
    },
  },
});
