import { defineStore } from 'pinia';
import type { IMastery } from 'gradebook-base';
import { ref } from 'vue';

const defaultMasteries = [
  {
    name: 'Noob',
    level: 0,
  },
  {
    name: 'Beginner',
    level: 2,
  },
  {
    name: 'Intermediate',
    level: 4,
  },
  {
    name: 'Advanced',
    level: 6,
  },
  {
    name: 'Expert',
    level: 8,
  },
];

export const useMasteriesStore = defineStore('masteries', () => {
  const masteries = ref<IMastery[]>(defaultMasteries);

  const upsertMastery = (mastery: IMastery) => {
    const index = masteries.value.findIndex((m) => m.name === mastery.name);

    if (index === -1) {
      masteries.value.unshift(mastery);
    } else {
      masteries.value = masteries.value.map((m) => (m.name === mastery.name ? mastery : m));
    }
  };

  const deleteMastery = (mastery: IMastery) => {
    masteries.value = masteries.value.filter((m) => m.name !== mastery.name);
  };

  return { masteries, upsertMastery, deleteMastery };
});
