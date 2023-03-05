<template>
  <div class="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">
    <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>

    <div class="fixed inset-0 z-10 overflow-y-auto">
      <div class="flex min-h-full items-center justify-center p-4 text-center">
        <div
          class="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all w-full min-w-[325px] max-w-[500px]"
        >
          <div class="bg-white px-4 pt-5 pb-4">
            <div class="text-left">
              <h3
                class="text-lg font-semibold leading-6 text-gray-900 mb-4 py-2 border-b border-sky-600"
                id="modal-title"
              >
                <slot name="title"></slot>
              </h3>
              <slot></slot>
            </div>
          </div>
          <div class="px-4 py-3">
            <button
              type="button"
              @click="() => emit('close')"
              class="mt-3 inline-flex w-full justify-center bg-sky-100 hover:bg-blue-400 border border-sky-700 text-sm font-bold py-1 px-2 rounded"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
const emit = defineEmits(['close']);
</script>
