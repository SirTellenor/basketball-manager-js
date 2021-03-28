<template>
  <v-container>
    <v-calendar
      type="month"
      :weekdays="weekdayFormat"
      :show-month-on-first="false"
    />
  </v-container>
</template>
<script>
export default {
  data: () => ({
    weekdayFormat: [1, 2, 3, 4, 5, 6, 0]
  })
};
</script>
