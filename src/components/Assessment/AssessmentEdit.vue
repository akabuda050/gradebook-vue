<template>
  <div class="overflow-y-auto max-h-[500px] p-2">
    <template v-if="isSkillConfigEditFormOpen">
      <SkillConfigForm
        :skillConfig="currentSkillConfig"
        :skills="skillsFiltered"
        :grades="props.assessment.grade"
        :weights="props.assessment.weight"
        :masteries="props.assessment.mastery"
        @submit="addSkillConfig"
      />
    </template>
    <template v-else-if="!isSkillConfigEditFormOpen">
      <button
        title="Add skill config"
        @click="() => (isSkillConfigEditFormOpen = true)"
        class="w-full mb-2 text-sm bg-sky-100 hover:bg-blue-400 border border-sky-700 text-sm font-bold py-1 px-2 rounded"
      >
        <FontAwesomeIcon :icon="faPlusCircle" />
      </button>
      <SkillCard
        v-for="(skillConfig, index) in props.assessment.skillConfig"
        :key="`${skillConfig.name}-${index}`"
        :skill="skillConfig.skill"
        class="mb-2 p-2"
      >
        <template v-slot:title>
          <h2 class="font-bold text-xl truncate">
            {{ skillConfig.name }}
          </h2>
        </template>
        <template v-slot:actions>
          <div class="flex items-center justify-between">
            <button
              title="Edit"
              @click="() => editSkillConfig(skillConfig)"
              class="text-sm bg-sky-100 hover:bg-blue-400 border border-sky-700 text-sm font-bold py-1 px-2 mr-2 rounded"
            >
              <FontAwesomeIcon :icon="faPenRuler" />
            </button>
            <button
              title="Delete"
              @click="() => deleteSkillConfig(skillConfig)"
              class="text-sm bg-sky-100 hover:bg-blue-400 border border-sky-700 text-sm font-bold py-1 px-2 rounded"
            >
              <FontAwesomeIcon :icon="faTrash" />
            </button>
          </div>
        </template>
        <div class="flex flex-col">
          <div class="mb-2">
            <h3 class="font-medium text-sm">Description:</h3>
            <p class="text-gray-700 text-sm mb-2">
              {{ skillConfig.skill.description }}
            </p>
          </div>
        </div>
      </SkillCard>
    </template>
  </div>
</template>
<script setup lang="ts">
import { useAssessmentsStore } from '@/stores/assessment';
import { useSkillsStore } from '@/stores/skill';
import { faPenRuler, faPlusCircle, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import type { IAssessment, ISkillConfig } from 'gradebook-base';
import { ref, computed, type PropType } from 'vue';
import SkillCard from '../Skill/SkillCard.vue';
import SkillConfigForm from '../SkillConfig/SkillConfigForm.vue';

const props = defineProps({
  assessment: {
    type: Object as PropType<IAssessment>,
    required: true,
  },
});
const skillsStore = useSkillsStore();
const assessmentsStore = useAssessmentsStore();
const isSkillConfigEditFormOpen = ref(false);

const skillsFiltered = computed(() =>
  skillsStore.skills.filter((s) => {
    if (props.assessment.skillConfig.length === 0) return true;

    if (currentSkillConfig.value?.skill) {
      return currentSkillConfig.value?.skill.name === s.name;
    }

    return !!props.assessment.skillConfig.every((sc) => sc.skill.name !== s.name);
  }),
);

const currentSkillConfig = ref<ISkillConfig | undefined>();
const editSkillConfig = (skillConfig: ISkillConfig) => {
  isSkillConfigEditFormOpen.value = true;
  currentSkillConfig.value = { ...skillConfig };
};

const deleteSkillConfig = (skillConfig: ISkillConfig) => {
  assessmentsStore.deleteAssessmentSkillConfig(props.assessment, skillConfig);
};

const addSkillConfig = (skillConfig: ISkillConfig) => {
  assessmentsStore.upsertAssessmentSkillConfig(props.assessment, skillConfig);

  currentSkillConfig.value = undefined;
  isSkillConfigEditFormOpen.value = false;
};
</script>
