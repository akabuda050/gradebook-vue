import { defineStore } from 'pinia';
import type { ISkill } from 'gradebook-base';
import { ref } from 'vue';

const defaultSkills = [
  {
    name: 'PHP basics',
    description: 'Additional information for candidate',
    comment: 'Additional info that helps manager.',
  },
  {
    name: 'JS basics',
    description: 'Additional information for candidate',
    comment: 'Additional info that helps manager.',
  },
  {
    name: 'C# basics',
    description: 'Additional information for candidate',
    comment: 'Additional info that helps manager.',
  },
  {
    name: 'Laravel',
    description: 'Additional information for candidate',
    comment: 'Additional info that helps manager.',
  },
  {
    name: 'Symfony',
    description: 'Additional information for candidate',
    comment: 'Additional info that helps manager.',
  },
  {
    name: 'Node.js',
    description: 'Additional information for candidate',
    comment: 'Additional info that helps manager.',
  },
  {
    name: 'Vue',
    description: 'Additional information for candidate',
    comment: 'Additional info that helps manager.',
  },
  {
    name: 'React',
    description: 'Additional information for candidate',
    comment: 'Additional info that helps manager.',
  },
  {
    name: '.NET',
    description: 'Additional information for candidate',
    comment: 'Additional info that helps manager.',
  },
  {
    name: 'ASP.NET',
    description: 'Additional information for candidate',
    comment: 'Additional info that helps manager.',
  },
  {
    name: 'English',
    description: 'Additional information for candidate',
    comment: 'Additional info that helps manager.',
  },
];

export const useSkillsStore = defineStore('skills', () => {
  const skills = ref<ISkill[]>(defaultSkills);

  const upsertSkill = (skill: ISkill) => {
    const index = skills.value.findIndex((s) => s.name === skill.name);

    if (index === -1) {
      skills.value.unshift(skill);
    } else {
      skills.value = skills.value.map((s) => (s.name === skill.name ? skill : s));
    }
  };

  const deleteSkill = (skill: ISkill) => {
    skills.value = skills.value.filter((s) => s.name !== skill.name);
  };

  return { skills, upsertSkill, deleteSkill };
});
