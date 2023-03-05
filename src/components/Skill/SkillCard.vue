<template>
  <div class="bg-white rounded-lg shadow-lg overflow-hidden px-6 py-4">
    <div class="flex flex-col justify-between h-full">
      <div class="flex items-center justify-between mb-4">
        <slot name="title">
          <h2 class="font-bold text-xl">
            {{ props.skill.name }}
          </h2>
        </slot>
        <slot name="actions"></slot>
      </div>
      <slot>
        <div class="flex flex-col">
          <div class="mb-2">
            <h3 class="font-medium text-sm">Description:</h3>
            <p class="text-gray-700 text-sm truncate">
              {{ props.skill.description }}
            </p>
          </div>
          <div v-if="props.skill.comment" class="mb-2">
            <h3 class="font-medium text-sm">Comment:</h3>
            <p class="text-gray-700 text-sm truncate">
              {{ props.skill.comment }}
            </p>
          </div>
        </div>
      </slot>
    </div>
  </div>
</template>
<script setup lang="ts">
import type { ISkill } from 'gradebook-base';
import type { PropType } from 'vue';

const props = defineProps({
  skill: {
    type: Object as PropType<ISkill>,
    required: true,
  },
});
</script>
