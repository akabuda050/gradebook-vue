<template>
  <div class="border border-sky-600 rounded-md mb-2 p-4 overflow-y-hidden bg-white shadow-lg">
    <div class="flex items-center justify-between pb-4 border-b border-sky-600">
      <h2 class="text-xl font-bold">Skills</h2>
      <button
        @click="() => (isFormActive = true)"
        class="bg-sky-100 hover:bg-blue-400 border border-sky-700 text-sm font-bold py-1 px-2 rounded"
      >
        <FontAwesomeIcon :icon="faPlusCircle" />
      </button>
    </div>
    <div class="overflow-y-auto h-full max-h-[350px]">
      <div class="p-2 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
        <SkillCard v-for="(skill, index) in props.skills" :key="index" :skill="skill">
          <template v-slot:actions>
            <div class="flex items-center justify-between">
              <button
                title="Delete skill"
                @click="() => emit('delete', skill)"
                class="text-sm bg-sky-100 hover:bg-blue-400 border border-sky-700 text-sm font-bold py-1 px-2 mr-2 rounded"
              >
                <FontAwesomeIcon :icon="faTrash" />
              </button>
            </div>
          </template>
        </SkillCard>
      </div>
    </div>
    <Modal v-if="isFormActive" @close="() => (isFormActive = false)">
      <template v-slot:title>Create Skill</template>
      <SkillForm @submit="onFormSubmit" />
    </Modal>
  </div>
</template>
<script setup lang="ts">
import type { ISkill } from 'gradebook-base';
import { ref, type PropType } from 'vue';
import Modal from '../Base/BaseModal.vue';
import SkillForm from './SkillForm.vue';
import SkillCard from './SkillCard.vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faPlusCircle, faTrash } from '@fortawesome/free-solid-svg-icons';

const emit = defineEmits(['create', 'delete']);
const props = defineProps({
  skills: {
    type: Array as PropType<ISkill[]>,
  },
});

const isFormActive = ref(false);
const onFormSubmit = (skill: ISkill) => {
  emit('create', skill);

  isFormActive.value = false;
};
</script>
