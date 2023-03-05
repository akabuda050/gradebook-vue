<template>
  <div class="border border-sky-600 rounded-md mb-2 p-4 overflow-y-hidden bg-white shadow-lg">
    <div class="flex items-center justify-between pb-4 border-b border-sky-600">
      <h2 class="text-xl font-bold">Grades</h2>
      <button
        @click="() => (isFormActive = true)"
        class="bg-sky-100 hover:bg-blue-400 border border-sky-700 text-sm font-bold py-1 px-2 rounded"
      >
        <FontAwesomeIcon :icon="faPlusCircle" />
      </button>
    </div>
    <div class="overflow-y-auto h-full max-h-[350px]">
      <div class="p-2 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
        <GradeCard
          v-for="(grade, index) in [...props.grades].sort((a, b) => a.order - b.order)"
          :key="index"
          :grade="grade"
        />
      </div>
    </div>
    <Modal v-if="isFormActive" @close="() => (isFormActive = false)">
      <template v-slot:title>Create Grade</template>
      <GradeForm @submit="onFormSubmit" />
    </Modal>
  </div>
</template>
<script setup lang="ts">
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import type { IGrade } from 'gradebook-base';
import { ref, type PropType } from 'vue';
import Modal from '../Base/BaseModal.vue';
import GradeCard from './GradeCard.vue';
import GradeForm from './GradeForm.vue';

const emit = defineEmits(['create']);
const props = defineProps({
  grades: {
    type: Array as PropType<IGrade[]>,
    default: () => [],
  },
});

const isFormActive = ref(false);
const onFormSubmit = (grade: IGrade) => {
  emit('create', grade);

  isFormActive.value = false;
};
</script>
