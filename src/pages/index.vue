<template>
  <v-container>
    <br />
    <br />
    <v-alert
      v-model="alert"
      border="left"
      close-text="Close"
      color="primary"
      dark
      dismissible
    >
      Welcome to basketball manager. This is an free software, completely
      written in VueJS and VuetifyJS. Feel free and checkout my github repo.
    </v-alert>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      alert: this.$store.state.settings.showWelcomeDialog
    }
  }
};
</script>
