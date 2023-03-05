<template>
  <form
    class="w-full max-h-[400px] overflow-y-auto mx-auto p-2 mb-4"
    @submit.prevent="submitCandidateAssessment"
  >
    <SkillCard
      v-for="(skillMastery, index) in skillMasteries"
      :key="index"
      :skill="skillMastery.skill"
      class="mb-2 p-2"
    >
      <div class="flex flex-col">
        <div class="mb-2">
          <h3 class="font-medium text-sm">Description:</h3>
          <p class="text-gray-700 text-sm mb-2">
            {{ skillMastery.skill.description }}
          </p>
          <select
            v-model="skillMastery.mastery"
            class="w-full px-3 py-2 mb-2 leading-tight text-gray-700 border rounded shadow focus:outline-none focus:shadow-outline"
          >
            <option
              v-for="(m, index) in [...assessment.mastery].sort((a, b) => a.level - b.level)"
              :key="index"
              :value="{ ...m }"
            >
              {{ m.name }}
            </option>
          </select>
        </div>
      </div>
    </SkillCard>
    <button
      type="submit"
      class="bg-sky-100 hover:bg-blue-400 border border-sky-700 text-sm font-bold py-1 px-2 rounded"
    >
      Submit
    </button>
  </form>
</template>
<script setup lang="ts">
import type { IAssessment, IMastery, ISkillMastery } from 'gradebook-base';
import { ref, type PropType } from 'vue';
import SkillCard from '../Skill/SkillCard.vue';

const emit = defineEmits(['submit']);
const props = defineProps({
  assessment: {
    type: Object as PropType<IAssessment>,
    required: true,
  },
});

const skillMasteries = ref<ISkillMastery[]>(
  props.assessment.skillConfig.map((skillConfig) => {
    return {
      skill: skillConfig.skill,
      mastery: {} as IMastery,
    };
  }) || [],
);

const submitCandidateAssessment = () => {
  if (skillMasteries.value.some((sm) => !sm.mastery)) return;

  emit('submit', skillMasteries.value);
};
</script>
