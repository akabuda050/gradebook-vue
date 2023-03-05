<template>
  <div class="border border-sky-600 rounded-md mb-2 p-4 overflow-y-hidden bg-white shadow-lg">
    <div class="flex items-center justify-between pb-4 border-b border-sky-600">
      <h2 class="text-xl font-bold">Masteries</h2>
      <button
        @click="() => (isFormActive = true)"
        class="bg-sky-100 hover:bg-blue-400 border border-sky-700 text-sm font-bold py-1 px-2 rounded"
      >
        <FontAwesomeIcon :icon="faPlusCircle" />
      </button>
    </div>
    <div class="overflow-y-auto h-full max-h-[350px]">
      <div class="p-2 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
        <MasteryCard
          v-for="(mastery, index) in [...props.masteries].sort((a, b) => a.level - b.level)"
          :key="index"
          :mastery="mastery"
        />
      </div>
    </div>
    <Modal v-if="isFormActive" @close="() => (isFormActive = false)">
      <template v-slot:title>Create Mastery</template>
      <MasteryForm @submit="onFormSubmit" />
    </Modal>
  </div>
</template>
<script setup lang="ts">
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import type { IMastery } from 'gradebook-base';
import { ref, type PropType } from 'vue';
import Modal from '../Base/BaseModal.vue';
import MasteryCard from './MasteryCard.vue';
import MasteryForm from './MasteryForm.vue';

const emit = defineEmits(['create']);
const props = defineProps({
  masteries: {
    type: Array as PropType<IMastery[]>,
    default: () => [],
  },
});

const isFormActive = ref(false);
const onFormSubmit = (mastery: IMastery) => {
  emit('create', mastery);

  isFormActive.value = false;
};
</script>
