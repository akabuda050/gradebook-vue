<template>
  <div class="border border-sky-600 rounded-md mb-2 p-4 overflow-y-hidden bg-white shadow-lg">
    <div class="flex items-center justify-between pb-4 border-b border-sky-600">
      <h2 class="text-xl font-bold">Candidates</h2>
      <button
        @click="() => (isFormActive = true)"
        class="bg-sky-100 hover:bg-blue-400 border border-sky-700 text-sm font-bold py-1 px-2 rounded"
      >
        <FontAwesomeIcon :icon="faPlusCircle" />
      </button>
    </div>
    <div class="overflow-y-auto h-full max-h-[350px]">
      <div class="p-2 grid grid-cols-1 gap-4">
        <CandidateCard
          v-for="(candidate, index) in props.candidates"
          :key="`${candidate.name}-${index}`"
          :candidate="candidate"
          @delete="() => emit('delete', candidate)"
        />
      </div>
    </div>
    <Modal v-if="isFormActive" @close="() => (isFormActive = false)">
      <template v-slot:title>Create Candidate</template>
      <CandidateForm @submit="onFormSubmit" />
    </Modal>
  </div>
</template>
<script setup lang="ts">
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import type { ICandidate } from 'gradebook-base';
import { ref, type PropType } from 'vue';
import Modal from '../Base/BaseModal.vue';
import CandidateCard from './CandidateCard.vue';
import CandidateForm from './CandidateForm.vue';

const emit = defineEmits(['create', 'delete']);
const props = defineProps({
  candidates: {
    type: Array as PropType<ICandidate[]>,
  },
});

const isFormActive = ref(false);
const onFormSubmit = (candidate: ICandidate) => {
  emit('create', candidate);

  isFormActive.value = false;
};
</script>
