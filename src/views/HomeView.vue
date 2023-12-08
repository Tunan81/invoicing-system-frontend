<template>
  <div class="home">
    <a-calendar v-model="value" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { ref } from "vue";

export default defineComponent({
  name: "HomeView",
  setup() {
    const value = ref(new Date("2023-01-01"));
    return {
      value,
    };
  },
});
</script>
<style>
.home {
  height: 100%;
  margin: 10px 10px 10px 10px;
}
</style>
