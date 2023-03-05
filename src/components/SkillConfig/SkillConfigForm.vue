<template>
  <form class="w-full mx-auto mb-4" @submit.prevent="submitSkillConfig">
    <div class="mb-4">
      <label class="block font-bold text-gray-700 text-sm" for="skill"> Skill </label>
      <select
        v-model="skill"
        class="w-full px-3 py-2 mb-2 leading-tight text-gray-700 border rounded shadow focus:outline-none focus:shadow-outline"
      >
        <option
          v-for="(s, index) in [...props.skills]"
          :key="`${s.name}-${index}`"
          :value="{ ...s }"
        >
          {{ s.name }}
        </option>
      </select>
      <label class="block font-bold text-gray-700 text-sm" for="weight"> Weight </label>
      <select
        v-model="weight"
        class="w-full px-3 py-2 mb-2 leading-tight text-gray-700 border rounded shadow focus:outline-none focus:shadow-outline"
      >
        <option
          v-for="(p, index) in [...props.weights].sort((a, b) => a.value - b.value)"
          :key="`${p.name}-${index}`"
          :value="{ ...p }"
        >
          {{ p.name }}
        </option>
      </select>
      <div class="flex flex-col w-full px-2">
        <span class="block font-bold text-gray-700 text-sm mb-2"> Grades Mastery Map </span>
        <ul class="grid grid-cols-2 gap-4 px-2">
          <li
            v-for="(gradeMastery, index) in gradeMasteries.sort(
              (a, b) => a.grade.order - b.grade.order,
            )"
            :key="index"
          >
            <div class="flex flex-col items-left">
              <span class="block font-bold text-gray-700 text-sm mr-2">
                {{ gradeMastery.grade.name }}
              </span>
              <select
                v-model="gradeMastery.mastery"
                class="w-full px-3 py-2 mb-2 leading-tight text-gray-700 border rounded shadow focus:outline-none focus:shadow-outline"
              >
                <option
                  v-for="(m, index) in [...props.masteries].sort((a, b) => a.level - b.level)"
                  :key="index"
                  :value="{ ...m }"
                >
                  {{ m.name }}
                </option>
              </select>
            </div>
          </li>
        </ul>
      </div>
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
import {
  createGradeMastery,
  createSkillConfig,
  type IGrade,
  type IGradeMastery,
  type IMastery,
  type IWeight,
  type ISkill,
  type ISkillConfig,
} from 'gradebook-base';
import { ref, type PropType } from 'vue';
const emit = defineEmits(['submit']);

const props = defineProps({
  skillConfig: {
    type: Object as PropType<ISkillConfig>,
    default: null,
  },
  skills: {
    type: Array as PropType<ISkill[]>,
    required: true,
  },
  weights: {
    type: Array as PropType<IWeight[]>,
    required: true,
  },
  masteries: {
    type: Array as PropType<IMastery[]>,
    required: true,
  },
  grades: {
    type: Array as PropType<IGrade[]>,
    required: true,
  },
});

const skill = ref<ISkill | null>(props.skillConfig?.skill);
const weight = ref<IWeight | null>(props.skillConfig?.weight);
const gradeMasteries = ref<IGradeMastery[]>(
  props.skillConfig?.gradeMastery ||
    props.grades.map((grade) => {
      return {
        name: '',
        grade,
        mastery: {} as IMastery,
      };
    }),
);

const submitSkillConfig = () => {
  console.log(skill.value, weight.value, gradeMasteries.value);
  if (!skill.value || !weight.value) return;

  emit(
    'submit',
    createSkillConfig(
      skill.value.name,
      skill.value,
      weight.value,
      gradeMasteries.value
        .filter((gm) => gm.mastery.level !== undefined && gm.mastery.level !== null)
        .map((gm: IGradeMastery) => createGradeMastery(gm.grade, gm.mastery)),
    ),
  );
};
</script>
