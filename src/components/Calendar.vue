<script setup>
import { ref, reactive, nextTick, computed, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import FullCalendar from '@fullcalendar/vue3'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import ukLocale from '@fullcalendar/core/locales/uk'
import { createEventId, getDateFromFullDate, getTimeFromFullDate, validateEventForm } from '../utils.js'
import EventForm from './EventForm.vue'
import EventDialog from './EventDialog.vue'

const props = defineProps({
  userLang: {
    type: String,
    required: true,
  }
})

const { t } = useI18n()

const isShowDialog = ref(false)
const isEdit = ref(false)
const selectedEvent = ref(null)
const customDialogRef = ref(null)
const calendarRef = ref(null)
const hasFormError = ref(false)

const dialogTile = computed(() => isEdit.value ? t('edit_event') : t('add_event'))
const appLang = computed(() => props.userLang === 'uk' ? ukLocale : 'en')

const dialogPosition = reactive({ x: 0, y: 0 })
const formData = reactive({ 
  title: '', 
  color: '#3a87ad', 
  date: '',
  time: '',
  allDay: false 
})
const calendarOptions = reactive({
  plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
  headerToolbar: {
    left: 'prev,next today',
    center: 'title',
    right: 'dayGridMonth,timeGridWeek,timeGridDay',
  },
  locale: appLang,
  initialView: 'dayGridMonth',
  editable: true,
  selectable: true,
  selectMirror: true,
  dayMaxEvents: true,
  select: handleDateSelect,
  eventClick: handleEventClick,
  displayEventEnd: false,
})

function handleDateSelect(selectInfo) {
  resetForm()

  isEdit.value = false
  formData.date = getDateFromFullDate(selectInfo.startStr)
  formData.allDay = selectInfo.allDay
  showDialog(selectInfo.jsEvent)
  selectInfo.view.calendar.unselect()
}

function handleEventClick(clickInfo) {
  resetForm()

  isEdit.value = true
  selectedEvent.value = clickInfo.event
  
  formData.title = clickInfo.event.title
  formData.color = clickInfo.event.backgroundColor
  formData.date = getDateFromFullDate(clickInfo.event.startStr)
  formData.time = getTimeFromFullDate(clickInfo.event.startStr)
  formData.allDay = clickInfo.event.allDay

  showDialog(clickInfo.jsEvent)
  clickInfo.jsEvent.stopPropagation()
}

function submitForm() {
  const isFormValid = validateEventForm(formData);
  if (!isFormValid) {
    hasFormError.value = true;

    return
  }

  const startDateTime = `${formData.date}T${formData.time}`;

  if (isEdit.value && selectedEvent.value) {
    selectedEvent.value.setProp('title', formData.title);
    selectedEvent.value.setStart(startDateTime);
    selectedEvent.value.setProp('backgroundColor', formData.color);
  } else {
    const calendarApi = calendarRef.value.getApi();
    calendarApi.addEvent({
      id: createEventId(),
      title: formData.title,
      start: startDateTime,
      allDay: false,
      backgroundColor: formData.color,
    });
  }

  closeDialog();
}

function deleteEvent() {
  if (selectedEvent.value) {
    selectedEvent.value.remove()
  }
  closeDialog()
}

function showDialog(event) {

  isShowDialog.value = true

  nextTick(() => {
    const el = customDialogRef.value?.dialogEl
    if (!el) return

    const formWidth = el.offsetWidth
    const formHeight = el.offsetHeight
    const margin = 16

    let x = event.clientX
    let y = event.clientY

    const viewportWidth = window.innerWidth
    const viewportHeight = window.innerHeight

    if (x + formWidth + margin > viewportWidth) {
      x = viewportWidth - formWidth - margin
    }

    if (y + formHeight + margin > viewportHeight) {
      y = viewportHeight - formHeight - margin
    }

    dialogPosition.x = x
    dialogPosition.y = y
  })
}

function closeDialog() {
  isShowDialog.value = false
  selectedEvent.value = null
  hasFormError.value = false
  resetForm()
  document.removeEventListener('click', onOutsideClick)
}

function resetForm() {
  formData.title = ''
  formData.color = '#3a87ad'
  formData.date = ''
  formData.time = ''
  formData.allDay = false
}

const onOutsideClick = (event) => {
  const dialogEl = customDialogRef.value?.dialogEl
  if (!dialogEl || !isShowDialog.value) return

  if (!dialogEl.contains(event.target)) {
    closeDialog()
  }
}

watch(isShowDialog, (newValue) => {
  if (newValue) {
    nextTick(() => {
      document.addEventListener('click', onOutsideClick)
    })
  } else {
    document.removeEventListener('click', onOutsideClick)
  }
})
</script>

<template>
  <div class="calendar-main">
    <FullCalendar
      ref="calendarRef"
      class="calendar"
      :options="calendarOptions"
    >
      <template #eventContent="{ event, timeText }">
        <div
          :style="{ backgroundColor: event.backgroundColor}"
          class="event"
        >
          <b>{{ timeText }}</b> <i>{{ event.title }}</i>
        </div>
      </template>
    </FullCalendar>
  </div>

  <EventDialog
    v-if="isShowDialog"
    ref="customDialogRef"
    :title="dialogTile"
    :position="dialogPosition"
    @close="closeDialog"
  >
    <EventForm
      :formData="formData"
      :handleSubmit="submitForm"
      :onDeleteEvent="deleteEvent"
      :onCloseDialog="closeDialog"
      :hasFormError="hasFormError"
      :isEdit="isEdit"
    />
  </EventDialog>
</template>

<style scoped>
.calendar-main {
  flex: 1;
  padding: 1rem;
  background-color: #fcfafa;
}
.event {
  width: 100%;
  padding: 2px;
  border-radius: 4px;
}
.event i {
  white-space: wrap;
}
</style>
