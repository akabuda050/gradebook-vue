<template>
  <form
    class="w-full max-h-[400px] overflow-y-auto mx-auto mb-4 p-2"
    @submit.prevent="submitAssessment"
  >
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
      <label class="block mb-2 font-bold text-gray-700 text-sm" for="grade"> Grades </label>
      <select
        id="grade"
        v-model="grades"
        multiple
        class="w-full px-3 py-2 mb-2 leading-tight text-gray-700 border rounded shadow focus:outline-none focus:shadow-outline overflow-auto"
      >
        <option
          v-for="(g, index) in gradesStore.grades.sort((a, b) => a.order - b.order)"
          :key="index"
          :value="{ ...g }"
        >
          {{ g.name }}
        </option>
      </select>
      <label class="block mb-2 font-bold text-gray-700 text-sm" for="weight"> Weights </label>
      <select
        id="weight"
        v-model="weights"
        multiple
        class="w-full px-3 py-2 mb-2 leading-tight text-gray-700 border rounded shadow focus:outline-none focus:shadow-outline overflow-auto"
      >
        <option
          v-for="(w, index) in weightsStore.weights.sort((a, b) => a.value - b.value)"
          :key="index"
          :value="{ ...w }"
        >
          {{ `${w.name}: ${w.value}` }}
        </option>
      </select>
      <label class="block mb-2 font-bold text-gray-700 text-sm" for="mastery"> Masteries </label>
      <select
        id="mastery"
        v-model="masteries"
        multiple
        class="w-full px-3 py-2 mb-2 leading-tight text-gray-700 border rounded shadow focus:outline-none focus:shadow-outline overflow-auto"
      >
        <option
          v-for="(m, index) in masteriesStore.masteries.sort((a, b) => a.level - b.level)"
          :key="index"
          :value="{ ...m }"
        >
          {{ `${m.name}: ${m.level}` }}
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
import { useGradesStore } from '@/stores/grade';
import { useMasteriesStore } from '@/stores/mastery';
import { useWeightsStore } from '@/stores/weight';
import { createAssessment, type IGrade, type IMastery, type IWeight } from 'gradebook-base';
import { ref } from 'vue';
const emit = defineEmits(['submit']);

const gradesStore = useGradesStore();
const weightsStore = useWeightsStore();
const masteriesStore = useMasteriesStore();

const name = ref('');
const grades = ref<IGrade[]>([]);
const weights = ref<IWeight[]>([]);
const masteries = ref<IMastery[]>([]);

const submitAssessment = () => {
  if (!name.value) return;

  emit('submit', createAssessment(name.value, grades.value, weights.value, masteries.value));
};
</script>
