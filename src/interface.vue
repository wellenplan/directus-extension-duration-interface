<template>
  <div class="v-form grid with-fill">
    <div class="field half">
      <v-input
        :autofocus="props.autofocus"
        :model-value="input"
        :nullable="!props.clear"
        :placeholder="props.placeholder"
        :disabled="props.disabled"
        :type="props.type"
        :class="props.font"
        :db-safe="props.dbSafe"
        :slug="props.slug"
        :min="props.min"
        :max="props.max"
        :step="props.step"
        @update:model-value="input = $event"
      />
    </div>
    <div class="field half-right">
      <v-select
        :model-value="multiplier"
        :items="choices"
        :disabled="props.disabled"
        :show-deselect="false"
        :placeholder="placeholder"
        :allow-other="false"
        @update:model-value="multiplier = $event"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { withDefaults, computed, ref, watch } from "vue";
import { useI18n } from "vue-i18n";

const { t } = useI18n();

interface Props {
  value: number;
  type?: string;
  clear?: boolean;
  disabled?: boolean;
  placeholder?: string;
  font?: string;
  dbSafe?: boolean;
  autofocus?: boolean;
  slug?: boolean;
  min?: number | undefined;
  max?: number | undefined;
  step: number;
}

const props = withDefaults(defineProps<Props>(), {
  font: "sans-serif",
  step: 1,
});

const emit = defineEmits<{
  (e: "input", val: any): void;
}>();

const choices = [
  {
    text: t("seconds"),
    value: 1,
  },
  {
    text: t("minutes"),
    value: 60,
  },
  {
    text: t("hours"),
    value: 3600,
  },
  {
    text: t("days"),
    value: 86400,
  },
];

// input adds/removes multiplier as needed for display
const input = computed({
  get: () => props.value / multiplier.value,
  set: (val) => {
    emit("input", val * multiplier.value);
  },
});

// keep track of underlying multiplier so we can do magic in it's setter
const realMultiplier = ref(60);

const multiplier = computed({
  get: () => realMultiplier.value,
  set: (val) => {
    // recalculate value to ensure that changing the multiplier doesn't affect the input
    const newVal = (props.value / realMultiplier.value) * val;
    realMultiplier.value = val;
    emit("input", newVal);
  },
});

const init = () => {
  // initial multiplier is the next smaller one from choices
  realMultiplier.value = choices
    .map(({ value }) => value)
    .filter((v) => v < props.value)
    .pop();
};

// init as soon as props are ready
if (props.value) {
  init();
} else {
  const unwatch = watch(props, () => {
    init();
    unwatch();
  });
}
</script>

<style scoped>
div.grid {
  display: grid;
  grid-template-columns:
    [start] minmax(0, var(--form-column-max-width)) [half] minmax(
      0,
      var(--form-column-max-width)
    )
    [full];
  gap: var(--form-vertical-gap) var(--form-horizontal-gap);
}

@media (min-width: 960px) {
  div.half {
    grid-column: start/half;
  }
}
</style>
