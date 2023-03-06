import { describe, it, expect, beforeEach } from 'vitest';

import { mount } from '@vue/test-utils';
import MainPage from '../../../pages/MainPage.vue';
import { createPinia, setActivePinia } from 'pinia';

describe('MainPage', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });
  it('renders properly', () => {
    const wrapper = mount(MainPage);
    expect(wrapper.text()).toContain('Welcome');
  });
});
