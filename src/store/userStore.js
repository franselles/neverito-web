import { defineStore } from 'pinia';
import axios from 'axios';
import { urlServer } from './config';

export const userStore = defineStore('userStore', {
  state: () => {
    return {
      user: {
        _id: '',
        familyId: '',
        name: '',
        active: true,
        email: '',
        rol: 0,
        dateSignup: '',
      },
      statusLogin: {
        logded: false,
      },
    };
  },
  actions: {
    async loginUser(pin) {
      try {
        const { data } = await axios({
          url: urlServer + 'login',
          method: 'POST',
          data: { pin },
        });

        if (data.active) {
          this.user._id = data._id;
          this.user.familyId = data.familyId;
          this.user.name = data.name;
          this.user.active = data.active;
          this.user.email = data.email;
          this.user.rol = data.rol;
          this.user.dateSignup = data.dateSignup;
          this.statusLogin.logded = true;
        }
      } catch (error) {
        console.log(error);
      }
    },
  },
});
