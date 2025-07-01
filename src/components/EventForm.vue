<script setup>
import { defineProps, computed } from 'vue';
import { useI18n } from 'vue-i18n'
import CustomButton from './CustomButton.vue';

const props = defineProps({
  formData: {
    type: Object,
    required: true,
  },
  handleSubmit: {
    type: Function,
    required: true,
  },
  onDeleteEvent: {
    type: Function,
    required: true,
  },
  onCloseDialog: {
    type: Function,
    required: true,
  },
  hasFormError: {
    type: Boolean,
    required: false,
    default: false,
  },
  isEdit: {
    type: Boolean,
    required: false,
    default: false,
  }
})

const { t } = useI18n()

const form = computed({
  get: () => props.formData,
  set: val => {
    Object.assign(props.formData, val)
  }
})

</script>

<template>
  <form
    class="custom-form"
    @submit.prevent="handleSubmit" 
    autocomplete="off"
  >
    <input
      v-model="form.title"
      class="form-input"
      name="event-title"
      :placeholder="t('form.event_name')"
      maxlength="30"
    />

    <input
      type="date"
      v-model="form.date"
      name="event-date"
      class="form-input"
    />

    <input
      type="time"
      v-model="form.time"
      name="event-time"
      class="form-input"
    />

    <label class="form-label">
      {{ t('form.color') }} :
      <input
        type="color"
        v-model="form.color"
        name="event-color"
        class="color-input"
      />
    </label>

    <p v-if="hasFormError" class="form-error">
      {{ t('form.invalid_values') }}
    </p>

    <div class="form-actions">
      <CustomButton
        v-if="isEdit"
        @click="onDeleteEvent"
      >
        {{ t('form.discart') }}
      </CustomButton>
      <CustomButton
        v-else
        @click="onCloseDialog"
      >
        {{ t('form.cancel') }}
      </CustomButton>
      <CustomButton
        type="submit"
      >
        {{ t('form.save') }}
      </CustomButton>
    </div>
  </form>
</template>

<style scoped>
.custom-form {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.form-title {
  margin-top: 0;
  color: grey;
}

.form-input {
  height: 2rem;
  border: none;
  border-bottom: 1px solid grey;

  font-size: 16px;
  color: grey;
  outline: none;
}

.color-input {
  border-radius: 4px;
  width: 2rem;
  height: 2rem;
  background-color: transparent;
  cursor: pointer;
  outline: none;
}

.form-label {
  width: fit-content;
  cursor: pointer;
}

.form-actions {
  margin-top: 1rem;
  display: flex;
  justify-content: space-between;
  gap: 0.5rem;
}

.form-error {
  color: red;
  margin: 0;
}
</style>