<template>
  <div class="border border-sky-600 rounded-md mb-2 p-4 overflow-y-hidden bg-white shadow-lg">
    <div class="flex items-center justify-between pb-4 border-b border-sky-600">
      <h2 class="text-xl font-bold">Assessments</h2>
      <button
        title="Create assessment"
        @click="() => (isFormActive = true)"
        class="bg-sky-100 hover:bg-blue-400 border border-sky-700 text-sm font-bold py-1 px-2 rounded"
      >
        <FontAwesomeIcon :icon="faPlusCircle" />
      </button>
    </div>
    <div class="overflow-y-auto h-full max-h-[350px]">
      <div class="p-2 grid grid-cols-1 gap-4">
        <AssessmentCard
          v-for="(assessment, index) in props.assessments"
          :key="`${assessment.name}-${index}`"
          :assessment="assessment"
          @delete="() => emit('delete', assessment)"
        />
      </div>
    </div>
    <Modal v-if="isFormActive" @close="() => (isFormActive = false)">
      <template v-slot:title>Create Assessment</template>
      <AssessmentForm @submit="onFormSubmit" />
    </Modal>
  </div>
</template>
<script setup lang="ts">
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import type { IAssessment } from 'gradebook-base';
import { ref, type PropType } from 'vue';
import Modal from '../Base/BaseModal.vue';
import AssessmentCard from './AssessmentCard.vue';
import AssessmentForm from './AssessmentForm.vue';

const emit = defineEmits(['create', 'delete']);
const props = defineProps({
  assessments: {
    type: Array as PropType<IAssessment[]>,
  },
});

const isFormActive = ref(false);
const onFormSubmit = (assessment: IAssessment) => {
  emit('create', assessment);

  isFormActive.value = false;
};
</script>
