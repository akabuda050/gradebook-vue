<template>
  <form class="w-full mx-auto mb-4" @submit.prevent="submitCandidateAssessment">
    <div class="mb-4">
      <label class="block font-bold text-gray-700 text-sm" for="assessment"> Asessments </label>
      <select
        id="assessment"
        v-model="assessment"
        class="w-full px-3 py-2 mb-2 leading-tight text-gray-700 border rounded shadow focus:outline-none focus:shadow-outline"
      >
        <option
          v-for="(a, index) in props.assessments"
          :key="`${a.name}-${index}`"
          :value="{ ...a }"
        >
          {{ a.name }}
        </option>
      </select>
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
import type { IAssessment } from 'gradebook-base';
import { ref, type PropType } from 'vue';
const emit = defineEmits(['submit']);

const props = defineProps({
  assessments: {
    type: Array as PropType<IAssessment[]>,
    required: true,
  },
});
const assessment = ref<IAssessment | null>(null);

const submitCandidateAssessment = () => {
  if (!assessment.value) return;

  emit('submit', assessment.value);
};
</script>
