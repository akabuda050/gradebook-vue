import { ref } from 'vue';
import { defineStore } from 'pinia';
import {
  createSkillConfig,
  createGradeMastery,
  type IAssessment,
  type ISkillConfig,
} from 'gradebook-base';
import { useGradesStore } from './grade';
import { useWeightsStore } from './weight';
import { useMasteriesStore } from './mastery';
import { useSkillsStore } from './skill';

const defaults = (): IAssessment => {
  const skillsStore = useSkillsStore();
  const gradesStore = useGradesStore();
  const weightsStore = useWeightsStore();
  const masteriesStore = useMasteriesStore();

  const defaultAssessment = {
    name: 'JavaScript',
    grade: [
      gradesStore.grades[0],
      gradesStore.grades[1],
      gradesStore.grades[2],
      gradesStore.grades[3],
      gradesStore.grades[4],
      gradesStore.grades[5],
    ],
    weight: [
      weightsStore.weights[0],
      weightsStore.weights[1],
      weightsStore.weights[2],
      weightsStore.weights[3],
    ],
    mastery: [
      masteriesStore.masteries[0],
      masteriesStore.masteries[1],
      masteriesStore.masteries[2],
      masteriesStore.masteries[3],
      masteriesStore.masteries[4],
    ],
    skillConfig: [
      createSkillConfig(
        skillsStore.skills[1].name,
        skillsStore.skills[1],
        weightsStore.weights[3],
        [
          createGradeMastery(gradesStore.grades[0], masteriesStore.masteries[0]),
          createGradeMastery(gradesStore.grades[1], masteriesStore.masteries[1]),
          createGradeMastery(gradesStore.grades[2], masteriesStore.masteries[1]),
          createGradeMastery(gradesStore.grades[3], masteriesStore.masteries[2]),
          createGradeMastery(gradesStore.grades[4], masteriesStore.masteries[3]),
          createGradeMastery(gradesStore.grades[5], masteriesStore.masteries[4]),
        ],
      ),
      createSkillConfig(
        skillsStore.skills[5].name,
        skillsStore.skills[5],
        weightsStore.weights[3],
        [
          createGradeMastery(gradesStore.grades[0], masteriesStore.masteries[0]),
          createGradeMastery(gradesStore.grades[1], masteriesStore.masteries[0]),
          createGradeMastery(gradesStore.grades[2], masteriesStore.masteries[1]),
          createGradeMastery(gradesStore.grades[3], masteriesStore.masteries[2]),
          createGradeMastery(gradesStore.grades[4], masteriesStore.masteries[3]),
          createGradeMastery(gradesStore.grades[5], masteriesStore.masteries[4]),
        ],
      ),
      createSkillConfig(
        skillsStore.skills[6].name,
        skillsStore.skills[6],
        weightsStore.weights[3],
        [
          createGradeMastery(gradesStore.grades[0], masteriesStore.masteries[0]),
          createGradeMastery(gradesStore.grades[1], masteriesStore.masteries[0]),
          createGradeMastery(gradesStore.grades[2], masteriesStore.masteries[1]),
          createGradeMastery(gradesStore.grades[3], masteriesStore.masteries[2]),
          createGradeMastery(gradesStore.grades[4], masteriesStore.masteries[3]),
          createGradeMastery(gradesStore.grades[5], masteriesStore.masteries[4]),
        ],
      ),
      createSkillConfig(
        skillsStore.skills[7].name,
        skillsStore.skills[7],
        weightsStore.weights[2],
        [
          createGradeMastery(gradesStore.grades[0], masteriesStore.masteries[0]),
          createGradeMastery(gradesStore.grades[1], masteriesStore.masteries[0]),
          createGradeMastery(gradesStore.grades[2], masteriesStore.masteries[1]),
          createGradeMastery(gradesStore.grades[3], masteriesStore.masteries[2]),
          createGradeMastery(gradesStore.grades[4], masteriesStore.masteries[3]),
          createGradeMastery(gradesStore.grades[5], masteriesStore.masteries[4]),
        ],
      ),
    ],
    skillMastery: [],
  };

  return defaultAssessment;
};

export const useAssessmentsStore = defineStore('assessments', () => {
  const assessments = ref<IAssessment[]>([defaults()]);

  const upsertAssessment = (assessment: IAssessment) => {
    const index = assessments.value.findIndex((a) => a.name === assessment.name);

    if (index === -1) {
      assessments.value.unshift(assessment);
    } else {
      assessments.value = assessments.value.map((a) =>
        a.name === assessment.name ? assessment : a,
      );
    }
  };

  const deleteAssessment = (assessment: IAssessment) => {
    assessments.value = assessments.value.filter((a) => a.name !== assessment.name);
  };

  const upsertAssessmentSkillConfig = (assessment: IAssessment, skillConfig: ISkillConfig) => {
    const index = assessments.value.findIndex((a) => a.name === assessment.name);

    if (index === -1) {
      return;
    } else {
      assessments.value = assessments.value.map((a) => {
        if (a.name !== assessment.name) {
          return a;
        }

        const scIndex = a.skillConfig.findIndex((sc) => sc.name === skillConfig.name);

        if (scIndex === -1) {
          a.skillConfig.unshift(skillConfig);
        } else {
          a.skillConfig = a.skillConfig.map((sc) =>
            sc.name === skillConfig.name ? skillConfig : sc,
          );
        }

        return a;
      });
    }
  };

  const deleteAssessmentSkillConfig = (assessment: IAssessment, skillConfig: ISkillConfig) => {
    assessments.value = assessments.value.map((a) => {
      if (a.name !== assessment.name) {
        return a;
      }

      a.skillConfig = a.skillConfig.filter((sc) => sc.name !== skillConfig.name);

      return a;
    });
  };

  return {
    assessments,
    upsertAssessment,
    deleteAssessment,
    upsertAssessmentSkillConfig,
    deleteAssessmentSkillConfig,
  };
});
