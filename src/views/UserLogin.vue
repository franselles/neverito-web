<template>
  <div class="p-2">
    <h3>BIENVENIDO A NEVERITO</h3>
  </div>
  <div class="p-2">
    <form @submit.prevent="onSubmit">
      <div class="input-group mb-3">
        <span class="input-group-text">PIN</span>
        <input
          v-model="pin"
          type="password"
          maxlength="4"
          class="form-control"
        />
      </div>
      <div class="p-2">
        <input type="submit" class="btn btn-primary" value="ENTRAR" />
      </div>
    </form>
  </div>
  <div class="p-2 alert alert-warning" role="alert">
    Made with <span class="fw-bold">Vue + Vite + </span>❤️ by
    <span class="text-info">FRaN</span>. 2021
    <span class="text-info">v.0.1.35</span>
  </div>
  <div class="text-center">
    <img src="/pwa-192.png" class="rounded" alt="neverito" />
  </div>
</template>

<script>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { userStore } from '../store/userStore';

export default {
  setup() {
    const router = useRouter();
    const store = userStore();

    const pin = ref('');
    async function onSubmit() {
      await store.loginUser(pin.value);
      if (store.statusLogin.logded) {
        router.push({ name: 'CurrentOrder' });
      }
    }

    return {
      onSubmit,
      pin,
      store,
    };
  },
};
</script>

<style></style>
