import { defineStore } from 'pinia';
import type { IWeight } from 'gradebook-base';
import { ref } from 'vue';

const defaultWeights = [
  {
    name: 'Low',
    value: 0.25,
  },
  {
    name: 'Medium',
    value: 0.5,
  },
  {
    name: 'Hight',
    value: 0.75,
  },
  {
    name: 'Top',
    value: 1,
  },
];

export const useWeightsStore = defineStore('weights', () => {
  const weights = ref<IWeight[]>(defaultWeights);

  const upsertWeight = (weight: IWeight) => {
    const index = weights.value.findIndex((w) => w.name === weight.name);

    if (index === -1) {
      weights.value.unshift(weight);
    } else {
      weights.value = weights.value.map((w) => (w.name === weight.name ? weight : w));
    }
  };

  const deleteWeight = (weight: IWeight) => {
    weights.value = weights.value.filter((w) => w.name !== weight.name);
  };

  return { weights, upsertWeight, deleteWeight };
});
