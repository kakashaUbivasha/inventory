<template>
  <vue-final-modal
      class="flex justify-end"
      content-class="modal-content-right"
      @update:model-value="updateValue"
  >
    <div class="flex items-center justify-between h-10 relative">
      <h1 v-if="title" class="text-lg font-semibold">
        {{ title }}
      </h1>
      <button @click="closeModal">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="m12 13.4l-4.9 4.9q-.275.275-.7.275t-.7-.275t-.275-.7t.275-.7l4.9-4.9l-4.9-4.9q-.275-.275-.275-.7t.275-.7t.7-.275t.7.275l4.9 4.9l4.9-4.9q.275-.275.7-.275t.7.275t.275.7t-.275.7L13.4 12l4.9 4.9q.275.275.275.7t-.275.7t-.7.275t-.7-.275z"/></svg>
      </button>
    </div>
    <slot></slot>
  </vue-final-modal>
</template>

<script>
import { VueFinalModal } from 'vue-final-modal'


export default {

  components: {
    VueFinalModal,
  },

  props: {
    title: {
      type: String,
      required: false,
      default: ''
    },
    modelValue: {
      type: Boolean,
      required: true
    }
  },

  emits: ['update:modelValue'],

  methods: {
    closeModal() {
      this.$emit('update:modelValue', false)
    },

    updateValue(value) {
      this.$emit('update:modelValue', value)
    }
  }
}
</script>