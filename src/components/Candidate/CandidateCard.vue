<template>
  <div class="bg-white rounded-lg shadow-lg overflow-hidden px-4 py-4">
    <div class="flex flex-col justify-between h-full">
      <div class="flex items-center justify-between mb-4">
        <h2
          class="font-bold truncate text-xl mb-2 cursor-pointer hover:text-sky-400"
          @click="() => (isCandidateAssesmentsModalOpened = true)"
        >
          {{ props.candidate.name }}
        </h2>
        <div class="flex items-center justify-between">
          <button
            title="Start assessment"
            v-if="assessmentsCount"
            @click="() => (isCandidateAssessmentChooseFormOpen = true)"
            class="text-sm mr-2 bg-sky-100 hover:bg-blue-400 border border-sky-700 text-sm font-bold py-1 px-2 mr-2 rounded"
          >
            <FontAwesomeIcon :icon="faPlayCircle" />
          </button>
          <button
            title=" Add Assessment"
            @click="() => (isCandidateAssessmentFormOpen = true)"
            class="text-sm bg-sky-100 hover:bg-blue-400 border border-sky-700 text-sm font-bold py-1 px-2 mr-2 rounded"
          >
            <FontAwesomeIcon :icon="faFileCirclePlus" />
          </button>
          <button
            title="Delete candidate"
            @click="() => emit('delete')"
            class="text-sm bg-sky-100 hover:bg-blue-400 border border-sky-700 text-sm font-bold py-1 px-2 rounded"
          >
            <FontAwesomeIcon :icon="faTrash" />
          </button>
        </div>
      </div>
      <div class="flex flex justify-between">
        <p class="text-gray-700 text-sm">
          <span class="font-medium"
            >Max Grade:
            {{
              maxGrade.grade.name === 'N/A'
                ? maxGrade.grade.name
                : `${maxGrade.grade.name}(${maxGrade.score})`
            }}</span
          >
        </p>
        <span class="mx-1 font-medium min-w-max">&nbsp;|&nbsp;</span>
        <span class="text-gray-700 text-sm font-medium"> Assessments: {{ assessmentsCount }} </span>
      </div>
    </div>

    <Modal
      v-if="isCandidateAssessmentFormOpen"
      @close="() => (isCandidateAssessmentFormOpen = false)"
    >
      <template v-slot:title>Choose Assessment</template>
      <CandidateAssessmentForm
        :assessments="
          assessmentsStore.assessments.filter(
            (assessment) =>
              !!assessment.skillConfig.length &&
              !props.candidate.assessment.some((ca) => ca.name === assessment.name),
          )
        "
        @submit="(assessment: IAssessment) => addAssessment(assessment)"
      />
    </Modal>

    <Modal
      v-if="isCandidateAssessmentChooseFormOpen"
      @close="() => (isCandidateAssessmentChooseFormOpen = false)"
    >
      <template v-slot:title>Choose Assessment</template>
      <CandidateAssessmentForm
        :assessments="
          props.candidate.assessment.filter(
            (assessment) => !!assessment.skillConfig.length && !assessment.skillMastery.length,
          )
        "
        @submit="(assessment: IAssessment) => {
            currentAssassment = assessment;
            isCandidateAssessmentChooseFormOpen = false;
            isCandidateAssessmentSkillMasteryFormOpen = true;
        }"
      />
    </Modal>

    <Modal
      v-if="isCandidateAssessmentSkillMasteryFormOpen"
      @close="() => (isCandidateAssessmentSkillMasteryFormOpen = false)"
    >
      <template v-slot:title>Take your time and good luck ;)</template>
      <CandidateAssessmentSkillMasteryForm
        v-if="currentAssassment"
        :assessment="currentAssassment"
        @submit="addSkillMasteries"
      />
    </Modal>

    <Modal
      v-if="isCandidateAssesmentsModalOpened"
      @close="() => (isCandidateAssesmentsModalOpened = false)"
    >
      <template v-slot:title>Assessments</template>
      <p class="grid grid-cols-2 my-4 gap-4 text-gray-700 text-sm">
        <span
          v-for="(s, index) in scores"
          :key="index"
          class="font-medium truncate"
          :title="`${s.assessment.name}: ${s.grade.name} (${s.score})`"
        >
          <span>{{ s.assessment.name }}: {{ s.grade.name }} ({{ s.score }})</span>
        </span>
      </p>
    </Modal>
  </div>
</template>
<script setup lang="ts">
import { useAssessmentsStore } from '@/stores/assessment';
import { useCandidatesStore } from '@/stores/candidate';
import { faFileCirclePlus, faPlayCircle, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import {
  calculateCandidateAssesmentResults,
  type IAssessment,
  type ICandidate,
  type IAssessmentResult,
  type ISkillMastery,
  type IGradeMasteryScore,
} from 'gradebook-base';
import { ref, computed, type PropType } from 'vue';
import Modal from '../Base/BaseModal.vue';
import CandidateAssessmentForm from './CandidateAssessmentForm.vue';
import CandidateAssessmentSkillMasteryForm from './CandidateAssessmentSkillMasteryForm.vue';

const emit = defineEmits(['delete']);

const assessmentsStore = useAssessmentsStore();

const props = defineProps({
  candidate: {
    type: Object as PropType<ICandidate>,
    required: true,
  },
});

const currentAssassment = ref<IAssessment | null>(null);

const assessmentsCount = computed(
  () => props.candidate.assessment.filter((a) => !a.skillMastery.length).length || 0,
);

const scores = computed<IAssessmentResult[]>(() =>
  calculateCandidateAssesmentResults(props.candidate),
);

const maxGrade = computed<IGradeMasteryScore>(() => {
  const assesmentResult = scores.value.reduce((prev: IAssessmentResult | null, curr) => {
    if (!prev) return curr;
    return prev.score >= curr.score ? prev : curr;
  }, null);

  if (!assesmentResult) {
    return { grade: { name: 'N/A', order: 0 }, score: 0 };
  }
  return { grade: assesmentResult.grade, score: assesmentResult.score };
});

const addAssessment = (assessment: IAssessment) => {
  candidatesStore.upsertCandidateAssessment(props.candidate, assessment);

  isCandidateAssessmentFormOpen.value = false;
};

const isCandidateAssessmentFormOpen = ref(false);
const isCandidateAssessmentChooseFormOpen = ref(false);
const isCandidateAssessmentSkillMasteryFormOpen = ref(false);
const isCandidateAssesmentsModalOpened = ref(false);

const candidatesStore = useCandidatesStore();
const addSkillMasteries = (skillMasteries: ISkillMastery[]) => {
  candidatesStore.candidates = candidatesStore.candidates.map((c) => {
    if (c.name !== props.candidate.name) return c;

    const assessmentIndex = c.assessment.findIndex((a) => a.name === currentAssassment.value?.name);

    if (assessmentIndex === -1) return c;

    c.assessment[assessmentIndex].skillMastery = skillMasteries;

    return c;
  });
  currentAssassment.value = null;
  isCandidateAssessmentSkillMasteryFormOpen.value = false;
};
</script>
