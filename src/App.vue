<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png" />
    <h1>Vue Nofify Plugin.</h1>

    <notifications position="bottom"></notifications>
  </div>
</template>

<script>
export default {
  name: "App",
  components: {},
  mounted() {
    this.$notifyInfo("This is info message.");
    this.$notifySuccess("This is success message.");
    this.$notifyWarning("This is warning message!");
    this.$notifyError("This is error message.");
    this.$notify({
      message: "Message with 10 second timeout.",
      timeout: 10000,
      type: "info",
    });
    this.$notify({
      message: "Message with no timeout.",
      timeout: 0,
      type: "info",
    });
  },
};
</script>

<style scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>