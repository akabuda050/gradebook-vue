import { defineStore } from 'pinia';
import type { IGrade } from 'gradebook-base';
import { ref } from 'vue';

const defaultGrades = [
  {
    name: 'Student',
    order: 0,
  },
  {
    name: 'Trainee',
    order: 1,
  },
  {
    name: 'Junior',
    order: 2,
  },
  {
    name: 'Middle',
    order: 3,
  },
  {
    name: 'Senior',
    order: 4,
  },
  {
    name: 'Principal',
    order: 5,
  },
];

export const useGradesStore = defineStore('grades', () => {
  const grades = ref<IGrade[]>(defaultGrades);

  const upsertGrade = (grade: IGrade) => {
    const index = grades.value.findIndex((g) => g.name === grade.name);

    if (index === -1) {
      grades.value.unshift(grade);
    } else {
      grades.value = grades.value.map((g) => (g.name === grade.name ? grade : g));
    }
  };

  const deleteGrade = (grade: IGrade) => {
    grades.value = grades.value.filter((g) => g.name !== grade.name);
  };

  return { grades, upsertGrade, deleteGrade };
});
