<template>
  <div :class="['msg-container', alertPosition]">
    <notification
      v-for="notification in notifications"
      :key="notification.timestamp.getTime()"
      v-bind="notification"
      @close="removeNotification"
    />
  </div>
</template>

<script>
import Notification from "./Notification";
export default {
  components: {
    Notification,
  },

  props: {
    messages: {
      type: Array,
      required: false,
      default: () => [],
    },

    position: {
      type: String,
      required: false,
      default: "top",
      validator: (value) => {
        return ["top", "bottom"].indexOf(value) !== -1;
      },
    },
  },

  data() {
    return {
      notifications: this.$notifications.state,
    };
  },

  computed: {
    alertPosition() {
      if (this.position === "top") {
        return "";
      }

      return "show-bottom";
    },
  },

  mounted() {
    this.messages.forEach((msg) => this.$notifications.addNotification(msg));
  },

  methods: {
    removeNotification(timestamp) {
      this.$notifications.removeNotification(timestamp);
    },
  },
};
</script>

<style scoped>
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

.msg-container.show-bottom {
  top: unset;
  bottom: 2%;
}
</style>