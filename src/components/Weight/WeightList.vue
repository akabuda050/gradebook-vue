<template>
  <div class="border border-sky-600 rounded-md mb-2 p-4 overflow-y-hidden bg-white shadow-lg">
    <div class="flex items-center justify-between pb-4 border-b border-sky-600">
      <h2 class="text-xl font-bold">Weights</h2>
      <button
        @click="() => (isFormActive = true)"
        class="bg-sky-100 hover:bg-blue-400 border border-sky-700 text-sm font-bold py-1 px-2 rounded"
      >
        <FontAwesomeIcon :icon="faPlusCircle" />
      </button>
    </div>
    <div class="overflow-y-auto h-full max-h-[350px]">
      <div class="p-2 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
        <WeightCard
          v-for="(weight, index) in [...props.weights].sort((a, b) => a.value - b.value)"
          :key="index"
          :weight="weight"
        />
      </div>
    </div>
    <Modal v-if="isFormActive" @close="() => (isFormActive = false)">
      <template v-slot:title>Create Weight</template>
      <WeightForm @submit="onFormSubmit" />
    </Modal>
  </div>
</template>
<script setup lang="ts">
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import type { IWeight } from 'gradebook-base';
import { ref, type PropType } from 'vue';
import Modal from '../Base/BaseModal.vue';
import WeightCard from './WeightCard.vue';
import WeightForm from './WeightForm.vue';

const emit = defineEmits(['create']);
const props = defineProps({
  weights: {
    type: Array as PropType<IWeight[]>,
    default: () => [],
  },
});

const isFormActive = ref(false);
const onFormSubmit = (weight: IWeight) => {
  emit('create', weight);

  isFormActive.value = false;
};
</script>
