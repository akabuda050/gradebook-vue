<template>
  <div class="bg-white rounded-lg shadow-lg overflow-hidden px-6 py-4">
    <div class="flex flex-col justify-between h-full">
      <div class="flex items-center justify-between mb-4">
        <h2 class="font-bold text-xl mb-2 truncate">
          {{ props.assessment.name }}
        </h2>
        <div class="flex items-center justify-between">
          <button
            title="Edit"
            @click="() => (isEditFormOpen = true)"
            class="text-sm bg-sky-100 hover:bg-blue-400 border border-sky-700 text-sm font-bold py-1 px-2 mr-2 rounded"
          >
            <FontAwesomeIcon :icon="faPenRuler" />
          </button>
          <button
            title="Delete assessment"
            @click="() => emit('delete')"
            class="text-sm bg-sky-100 hover:bg-blue-400 border border-sky-700 text-sm font-bold py-1 px-2 rounded"
          >
            <FontAwesomeIcon :icon="faTrash" />
          </button>
        </div>
      </div>
      <div class="flex flex-col justify-between">
        <div class="w-full grid grid-cols-2 gap-1 text-gray-700 text-sm mb-2">
          <span
            :title="`${gms.grade.name}: ${gms.score}`"
            v-for="(gms, index) in score.sort((a, b) => a.grade.order - b.grade.order)"
            :key="index"
            class="text-gray-700 text-sm truncate font-bold"
            >{{ `${gms.grade.name}: ${gms.score}` }}</span
          >
        </div>
      </div>
    </div>
    <Modal v-if="isEditFormOpen" @close="() => (isEditFormOpen = false)">
      <template v-slot:title>{{ props.assessment.name }}</template>
      <AssessmentEdit :assessment="props.assessment" />
    </Modal>
  </div>
</template>
<script setup lang="ts">
import { calculateGradeMasteryScore, type IAssessment } from 'gradebook-base';
import { ref, computed, type PropType } from 'vue';
import Modal from '../Base/BaseModal.vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faPenRuler, faTrash } from '@fortawesome/free-solid-svg-icons';
import AssessmentEdit from './AssessmentEdit.vue';

const emit = defineEmits(['delete']);

const props = defineProps({
  assessment: {
    type: Object as PropType<IAssessment>,
    required: true,
  },
});

const isEditFormOpen = ref(false);

const score = computed(() => calculateGradeMasteryScore(props.assessment.skillConfig));
</script>
