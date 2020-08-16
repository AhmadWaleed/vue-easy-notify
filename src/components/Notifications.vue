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

<style>
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

.msg {
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

.msg svg {
  width: 1.25rem;
  height: 1.25rem;
  fill: #fff;
}

.msg .close-icon {
  width: 1rem;
  height: 1rem;
  fill: #fff;
  cursor: pointer;
}

.msg.msg-success {
  background-color: #68d391;
}

.msg.msg-info {
  background-color: #63b3ed;
}

.msg.msg-error {
  background-color: #fc8181;
}

.msg.msg-warning {
  background-color: #f6ad55;
}

.msg.msg-sm {
  width: auto;
  min-width: 28%;
  max-width: 80%;
}

@media (max-width: 1024px) {
  .msg.msg-sm {
    min-width: 50%;
  }
}

.msg.msg-sm .close-icon {
  margin: 0 0 0 0.5rem;
}
</style>