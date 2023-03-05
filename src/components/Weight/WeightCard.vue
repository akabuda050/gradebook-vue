<template>
  <div class="bg-white rounded-lg shadow-lg overflow-hidden px-6 py-4">
    <div class="flex flex-col justify-between h-full">
      <h2 class="font-bold text-xl mb-2">
        {{ props.weight.name }}
      </h2>
      <div class="flex flex-col">
        <span class="text-gray-700 text-sm truncate font-medium">
          Value: {{ props.weight.value }}
        </span>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import type { IWeight } from 'gradebook-base';
import type { PropType } from 'vue';

const props = defineProps({
  weight: {
    type: Object as PropType<IWeight>,
    required: true,
  },
});
</script>
