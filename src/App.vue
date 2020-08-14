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

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.msg-container {
  position: fixed;
  top: 2%;
  left: 0;
  width: 100%;
  z-index: 1000000;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.msg-container .msg {
  padding: 1rem;
  margin: 0.25rem 0;
  color: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 80%;
  border-radius: 0.25rem;
  line-height: calc(0.9rem * 1.5);
}

.msg-container .msg svg {
  width: 1.25rem;
  height: 1.25rem;
  fill: #fff;
}

.msg-container .msg .close-icon {
  width: 1rem;
  height: 1rem;
  fill: #fff;
  cursor: pointer;
}

.msg-container .msg.msg-success {
  background-color: #68d391;
}

.msg-container .msg.msg-info {
  background-color: #63b3ed;
}

.msg-container .msg.msg-error {
  background-color: #fc8181;
}

.msg-container .msg.msg-warning {
  background-color: #f6ad55;
}

.msg-container .msg.msg-sm {
  width: auto;
  min-width: 28%;
  max-width: 80%;
}

@media (max-width: 1024px) {
  .msg-container .msg.msg-sm {
    min-width: 50%;
  }
}

.msg-container .msg.msg-sm .close-icon {
  margin: 0 0 0 0.5rem;
}

.msg-container.show-bottom {
  top: unset;
  bottom: 2%;
}
</style>