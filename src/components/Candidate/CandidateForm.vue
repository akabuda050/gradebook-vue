<template>
  <form class="w-full mx-auto mb-4" @submit.prevent="submitCandidate">
    <div class="mb-4">
      <label class="block mb-2 font-bold text-gray-700 text-sm" for="name"> Name </label>
      <input
        class="w-full px-3 py-2 mb-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
        id="name"
        type="text"
        placeholder="Enter name"
        v-model="name"
        required
      />
    </div>
    <button
      type="submit"
      class="bg-sky-100 hover:bg-blue-400 border border-sky-700 text-sm font-bold py-1 px-2 rounded"
    >
      Submit
    </button>
  </form>
</template>
<script setup lang="ts">
import { createCandidate } from 'gradebook-base';
import { ref } from 'vue';
const emit = defineEmits(['submit']);

const name = ref('');

const submitCandidate = () => {
  if (!name.value) return;

  emit('submit', createCandidate(name.value, []));
};
</script>
