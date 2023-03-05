<template>
  <div class="min-w-[350px] max-w-5xl container mx-auto p-4">
    <h1 class="text-3xl font-bold mb-2">Welcome</h1>
    <h2 class="text-md font-semibold mb-4">
      This is a demo version of a grade book application. This app is aimed to help to manage and
      grade employees or candidates for interviews.
    </h2>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
      <CandidateList
        :candidates="candidatesStore.candidates"
        @create="(candidate: ICandidate) => candidatesStore.upsertCandidate(candidate)"
        @delete="(candidate: ICandidate) =>candidatesStore.deleteCandidate(candidate)"
      />
      <AssessmentList
        :assessments="assessmentsStore.assessments"
        @create="(assessment: IAssessment) =>assessmentsStore.upsertAssessment(assessment)"
        @delete="(assessment: IAssessment) => assessmentsStore.deleteAssessment(assessment)"
      />
    </div>
    <div class="grid grid-cols-1 gap-4">
      <SkillList
        :skills="skillsStore.skills"
        @create="(skill: ISkill) => skillsStore.upsertSkill(skill)"
        @delete="(skill: ISkill) => skillsStore.deleteSkill(skill)"
      />
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
      <WeightList
        :weights="weightsStore.weights.sort((a, b) => a.value - b.value)"
        @create="(weight: IWeight) =>weightsStore.upsertWeight(weight)"
      />
      <MasteryList
        :masteries="masteriesStore.masteries.sort((a, b) => a.level - b.level)"
        @create="(mastery: IMastery) => masteriesStore.upsertMastery(mastery)"
      />
    </div>
    <div class="grid grid-cols-1 gap-4">
      <GradeList
        :grades="gradesStore.grades.sort((a, b) => a.order - b.order)"
        @create="(grade: IGrade) => gradesStore.upsertGrade(grade)"
      />
    </div>
  </div>
</template>
<script setup lang="ts">
import CandidateList from '@/components/Candidate/CandidateList.vue';
import AssessmentList from '@/components/Assessment/AssessmentList.vue';
import SkillList from '@/components/Skill/SkillList.vue';
import WeightList from '@/components/Weight/WeightList.vue';
import GradeList from '@/components/Grade/GradeList.vue';
import MasteryList from '@/components/Mastery/MasteryList.vue';

import type { IAssessment, ICandidate, IGrade, IMastery, ISkill, IWeight } from 'gradebook-base';
import { useAssessmentsStore } from '@/stores/assessment';
import { useCandidatesStore } from '@/stores/candidate';
import { useSkillsStore } from '@/stores/skill';
import { useWeightsStore } from '@/stores/weight';
import { useGradesStore } from '@/stores/grade';
import { useMasteriesStore } from '@/stores/mastery';

const candidatesStore = useCandidatesStore();
const assessmentsStore = useAssessmentsStore();
const skillsStore = useSkillsStore();
const weightsStore = useWeightsStore();
const gradesStore = useGradesStore();
const masteriesStore = useMasteriesStore();
</script>
