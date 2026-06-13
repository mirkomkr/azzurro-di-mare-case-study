<script setup>
import { computed, nextTick, onMounted, reactive, ref } from "vue";

const initialForm = () => ({
  guests: "",
  date: "",
  time: "",
  name: "",
  email: "",
  phone: "",
  notes: "",
  demoConfirmed: false,
});

const form = reactive(initialForm());
const errors = reactive({});
const fieldRefs = {};
const minDate = ref("");
const isSubmitting = ref(false);
const successMessage = ref("");
const successMessageRef = ref(null);

const timeSlots = {
  Pranzo: ["12:30", "13:00", "13:30"],
  Cena: ["20:00", "20:30", "21:00", "21:30"],
};

const errorCount = computed(() => Object.keys(errors).length);

const setFieldRef = (field, element) => {
  if (element) {
    fieldRefs[field] = element;
  }
};

const describedBy = (field, helperId) =>
  errors[field] ? `${helperId} ${field}-error` : helperId;

const clearErrors = () => {
  Object.keys(errors).forEach((field) => delete errors[field]);
};

const validate = () => {
  clearErrors();

  if (!Number.isInteger(form.guests) || form.guests < 1 || form.guests > 20) {
    errors.guests = "Inserisci un numero di persone compreso tra 1 e 20.";
  }
  if (!form.date) {
    errors.date = "Seleziona una data per la simulazione.";
  } else if (minDate.value && form.date < minDate.value) {
    errors.date = "Seleziona una data a partire da oggi.";
  }
  if (!form.time) errors.time = "Seleziona una fascia oraria demo.";
  if (!form.name.trim()) errors.name = "Inserisci un nome.";

  if (!form.email.trim()) {
    errors.email = "Inserisci un indirizzo email.";
  } else if (!fieldRefs.email?.validity.valid) {
    errors.email = "Inserisci un indirizzo email in formato valido.";
  }

  if (!form.phone.trim()) errors.phone = "Inserisci un numero di telefono.";
  if (!form.demoConfirmed) {
    errors.demoConfirmed = "Conferma di aver compreso che questa è una demo.";
  }

  return errorCount.value === 0;
};

const focusFirstError = async () => {
  await nextTick();
  const firstError = Object.keys(errors)[0];
  fieldRefs[firstError]?.focus();
};

const resetForm = () => {
  Object.assign(form, initialForm());
  clearErrors();
};

const submitForm = async () => {
  successMessage.value = "";

  if (!validate()) {
    await focusFirstError();
    return;
  }

  isSubmitting.value = true;

  window.setTimeout(async () => {
    isSubmitting.value = false;
    resetForm();
    successMessage.value =
      "Richiesta demo ricevuta. Questa simulazione mostra come potrebbe funzionare un flusso di prenotazione per un ristorante reale. Nessun dato è stato inviato o salvato.";
    await nextTick();
    successMessageRef.value?.focus();
  }, 700);
};

onMounted(() => {
  const today = new Date();
  const localDate = new Date(today.getTime() - today.getTimezoneOffset() * 60000);
  minDate.value = localDate.toISOString().split("T")[0];
});
</script>

<template>
  <div class="booking-form">
    <div
      v-if="successMessage"
      ref="successMessageRef"
      class="booking-form__success"
      role="status"
      tabindex="-1"
    >
      <h3>Simulazione completata</h3>
      <p>{{ successMessage }}</p>
    </div>

    <div
      class="booking-form__status visually-hidden"
      aria-live="polite"
      aria-atomic="true"
    >
      <span v-if="isSubmitting">Simulazione della richiesta in corso.</span>
      <span v-else-if="errorCount">
        Il modulo contiene {{ errorCount }} errori. Controlla i campi indicati.
      </span>
    </div>

    <form class="booking-form__form" novalidate @submit.prevent="submitForm">
      <fieldset class="booking-form__fieldset">
        <legend>Dettagli della richiesta demo</legend>

        <div class="booking-form__grid">
          <div class="field">
            <label for="guests">Numero persone</label>
            <input
              id="guests"
              :ref="(element) => setFieldRef('guests', element)"
              v-model.number="form.guests"
              type="number"
              inputmode="numeric"
              min="1"
              max="20"
              step="1"
              :aria-describedby="describedBy('guests', 'guests-help')"
              :aria-invalid="Boolean(errors.guests)"
              required
            />
            <p id="guests-help" class="field__help">
              Inserisci il numero di persone. Per questa demo sono accettati
              valori da 1 a 20.
            </p>
            <p v-if="errors.guests" id="guests-error" class="field__error">
              {{ errors.guests }}
            </p>
          </div>

          <div class="field">
            <label for="date">Data</label>
            <input
              id="date"
              :ref="(element) => setFieldRef('date', element)"
              v-model="form.date"
              type="date"
              :min="minDate"
              :aria-describedby="describedBy('date', 'date-help')"
              :aria-invalid="Boolean(errors.date)"
              required
            />
            <p id="date-help" class="field__help">Non verifica disponibilità reali.</p>
            <p v-if="errors.date" id="date-error" class="field__error">
              {{ errors.date }}
            </p>
          </div>

          <div class="field">
            <label for="time">Orario</label>
            <select
              id="time"
              :ref="(element) => setFieldRef('time', element)"
              v-model="form.time"
              :aria-describedby="describedBy('time', 'time-help')"
              :aria-invalid="Boolean(errors.time)"
              required
            >
              <option value="">Seleziona</option>
              <optgroup
                v-for="(slots, service) in timeSlots"
                :key="service"
                :label="service"
              >
                <option v-for="slot in slots" :key="slot" :value="slot">
                  {{ slot }}
                </option>
              </optgroup>
            </select>
            <p id="time-help" class="field__help">
              Gli orari sono dimostrativi e divisi tra pranzo e cena.
            </p>
            <p v-if="errors.time" id="time-error" class="field__error">
              {{ errors.time }}
            </p>
          </div>
        </div>
      </fieldset>

      <fieldset class="booking-form__fieldset">
        <legend>Recapiti dimostrativi</legend>

        <div class="booking-form__grid">
          <div class="field">
            <label for="name">Nome</label>
            <input
              id="name"
              :ref="(element) => setFieldRef('name', element)"
              v-model="form.name"
              type="text"
              autocomplete="name"
              :aria-describedby="describedBy('name', 'name-help')"
              :aria-invalid="Boolean(errors.name)"
              required
            />
            <p id="name-help" class="field__help">Il nome non viene conservato.</p>
            <p v-if="errors.name" id="name-error" class="field__error">
              {{ errors.name }}
            </p>
          </div>

          <div class="field">
            <label for="email">Email</label>
            <input
              id="email"
              :ref="(element) => setFieldRef('email', element)"
              v-model="form.email"
              type="email"
              autocomplete="email"
              inputmode="email"
              :aria-describedby="describedBy('email', 'email-help')"
              :aria-invalid="Boolean(errors.email)"
              required
            />
            <p id="email-help" class="field__help">Nessuna email verrà inviata.</p>
            <p v-if="errors.email" id="email-error" class="field__error">
              {{ errors.email }}
            </p>
          </div>

          <div class="field">
            <label for="phone">Telefono</label>
            <input
              id="phone"
              :ref="(element) => setFieldRef('phone', element)"
              v-model="form.phone"
              type="tel"
              autocomplete="tel"
              inputmode="tel"
              :aria-describedby="describedBy('phone', 'phone-help')"
              :aria-invalid="Boolean(errors.phone)"
              required
            />
            <p id="phone-help" class="field__help">Il numero non viene inviato o salvato.</p>
            <p v-if="errors.phone" id="phone-error" class="field__error">
              {{ errors.phone }}
            </p>
          </div>

          <div class="field field--full">
            <label for="notes">Note opzionali</label>
            <textarea
              id="notes"
              v-model="form.notes"
              rows="4"
              aria-describedby="notes-help"
            ></textarea>
            <p id="notes-help" class="field__help">
              Scrivi solo contenuti di prova: le note non vengono conservate.
            </p>
          </div>
        </div>
      </fieldset>

      <div class="field field--checkbox">
        <input
          id="demo-confirmed"
          :ref="(element) => setFieldRef('demoConfirmed', element)"
          v-model="form.demoConfirmed"
          type="checkbox"
          :aria-describedby="
            errors.demoConfirmed ? 'demo-confirmed-help demoConfirmed-error' : 'demo-confirmed-help'
          "
          :aria-invalid="Boolean(errors.demoConfirmed)"
          required
        />
        <div>
          <label for="demo-confirmed">
            Ho capito che questa è una prenotazione dimostrativa e che non verrà
            registrata alcuna prenotazione reale.
          </label>
          <p id="demo-confirmed-help" class="field__help">
            La conferma è necessaria per completare la simulazione.
          </p>
          <p
            v-if="errors.demoConfirmed"
            id="demoConfirmed-error"
            class="field__error"
          >
            {{ errors.demoConfirmed }}
          </p>
        </div>
      </div>

      <button class="booking-form__submit" type="submit" :disabled="isSubmitting">
        {{ isSubmitting ? "Simulazione in corso…" : "Invia richiesta demo" }}
      </button>
    </form>
  </div>
</template>

<style scoped>
.booking-form {
  max-width: 52rem;
}

.booking-form__success {
  margin-block-end: var(--space-6);
  padding: var(--space-6);
  border: 0.15rem solid var(--color-petrol);
  border-radius: var(--radius-md);
  background-color: var(--color-sand-alt);
}

.booking-form__success h3 {
  margin-block-end: var(--space-2);
  font-family: var(--font-body);
  font-size: var(--font-size-lg);
}

.booking-form__success:focus-visible {
  border-radius: var(--radius-md);
  outline: 0.15rem solid transparent;
  box-shadow: var(--focus-ring);
}

.booking-form__form {
  display: grid;
  gap: var(--space-8);
}

.booking-form__fieldset {
  display: grid;
  gap: var(--space-6);
  min-width: 0;
  padding: 0;
  border: 0;
}

.booking-form__fieldset legend {
  margin-block-end: var(--space-4);
  color: var(--color-heading);
  font-family: var(--font-heading);
  font-size: var(--font-size-xl);
  font-weight: var(--font-weight-bold);
  line-height: var(--line-height-heading);
}

.booking-form__grid {
  display: grid;
  gap: var(--space-6);
}

.field {
  display: grid;
  gap: var(--space-2);
  min-width: 0;
}

.field label {
  width: fit-content;
  font-weight: var(--font-weight-bold);
}

.field :is(input, select, textarea) {
  width: 100%;
  padding: var(--space-3);
  border: 1px solid var(--color-text-muted);
  border-radius: var(--radius-sm);
  background-color: var(--color-white);
  color: var(--color-text);
}

.field :is(input, select, textarea)[aria-invalid="true"] {
  border-color: var(--color-coral);
  border-width: 0.15rem;
}

.field__help,
.field__error {
  font-size: var(--font-size-sm);
}

.field__help {
  color: var(--color-text-muted);
}

.field__error {
  color: var(--color-coral-text);
  font-weight: var(--font-weight-bold);
}

.field--checkbox {
  grid-template-columns: auto minmax(0, 1fr);
  align-items: start;
  padding: var(--space-4);
  border: 1px solid var(--color-sand-alt);
  border-radius: var(--radius-sm);
  background-color: var(--color-surface);
}

.field--checkbox input {
  width: 1.25rem;
  min-height: 1.25rem;
  margin-block-start: var(--space-1);
}

.booking-form__submit {
  width: fit-content;
  min-height: var(--touch-target-min);
  padding: var(--space-3) var(--space-6);
  border: 0.125rem solid var(--color-petrol);
  border-radius: var(--radius-sm);
  background-color: var(--color-petrol);
  color: var(--color-white);
  font-weight: var(--font-weight-bold);
}

.booking-form__submit:hover:not(:disabled) {
  text-decoration: underline;
  text-decoration-thickness: 0.15rem;
}

.booking-form__submit:disabled {
  cursor: wait;
  opacity: 0.72;
}

@media (min-width: 40rem) {
  .booking-form__grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .field--full {
    grid-column: 1 / -1;
  }
}
</style>
