<template>
  <div class="bg-white rounded-lg shadow-lg overflow-hidden px-6 py-4">
    <div class="flex flex-col justify-between h-full">
      <h2 class="font-bold text-xl mb-2">
        {{ props.grade.name }}
      </h2>
    </div>
  </div>
</template>
<script setup lang="ts">
import type { IGrade } from 'gradebook-base';
import type { PropType } from 'vue';

const props = defineProps({
  grade: {
    type: Object as PropType<IGrade>,
    required: true,
  },
});
</script>
