<template>
  <nav class="navbar navbar-light" style="background-color: #e3f2fd">
    <ul class="nav">
      <li class="nav-item">
        <router-link :to="{ name: 'CurrentOrder' }" class="nav-link"
          >COMPRA</router-link
        >
      </li>
      <li class="nav-item">
        <router-link :to="{ name: 'ListItems' }" class="nav-link"
          >CREAR NUEVO</router-link
        >
      </li>
      <li class="nav-item">
        <router-link :to="{ name: 'ViewBuyed' }" class="nav-link"
          >COMPRADA</router-link
        >
      </li>
      <li class="nav-item">
        <a class="nav-link" href="#" @click="onExit">SALIR</a>
      </li>
    </ul>
  </nav>
  <router-view />
</template>

<script>
import { useRouter } from 'vue-router';
import { userStore } from '../store/userStore';

export default {
  setup() {
    const router = useRouter();
    const users = userStore();

    const onExit = function () {
      users.statusLogin.logded = false;
      router.push({ name: 'Login' });
    };

    return {
      onExit,
    };
  },
};
</script>

<style></style>
