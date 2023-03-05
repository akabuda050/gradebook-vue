import { ref } from 'vue';
import { defineStore } from 'pinia';
import { createCandidate, type IAssessment, type ICandidate } from 'gradebook-base';
import { useAssessmentsStore } from './assessment';

export const useCandidatesStore = defineStore('candidates', () => {
  const assessmentStore = useAssessmentsStore();
  const candidates = ref<ICandidate[]>([
    createCandidate('Carl Doe', [assessmentStore.assessments[0] as IAssessment]),
  ]);

  const upsertCandidate = (candidate: ICandidate) => {
    const index = candidates.value.findIndex((c) => c.name === candidate.name);

    if (index === -1) {
      candidates.value.unshift(candidate);
    } else {
      candidates.value = candidates.value.map((c) => (c.name === candidate.name ? candidate : c));
    }
  };

  const deleteCandidate = (candidate: ICandidate) => {
    candidates.value = candidates.value.filter((c) => c.name !== candidate.name);
  };

  const upsertCandidateAssessment = (candidate: ICandidate, assessment: IAssessment) => {
    candidates.value = candidates.value.map((c) => {
      if (c.name === candidate.name) {
        const index = c.assessment.findIndex((a) => a.name === assessment.name);

        if (index === -1) {
          c.assessment.unshift(assessment);
        } else {
          c.assessment = c.assessment.map((a) => (a.name === assessment.name ? assessment : a));
        }
      }

      return c;
    });
  };

  return { candidates, upsertCandidate, deleteCandidate, upsertCandidateAssessment };
});
