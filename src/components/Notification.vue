<template>
  <transition name="fade">
    <div :class="['msg', alertSize, alertType]">
      <svg viewBox="0 0 512 512">
        <path
          v-if="type === 'info'"
          d="M256 40c118.621 0 216 96.075 216 216 0 119.291-96.61 216-216 216-119.244 0-216-96.562-216-216 0-119.203 96.602-216 216-216m0-32C119.043 8 8 119.083 8 256c0 136.997 111.043 248 248 248s248-111.003 248-248C504 119.083 392.957 8 256 8zm-36 344h12V232h-12c-6.627 0-12-5.373-12-12v-8c0-6.627 5.373-12 12-12h48c6.627 0 12 5.373 12 12v140h12c6.627 0 12 5.373 12 12v8c0 6.627-5.373 12-12 12h-72c-6.627 0-12-5.373-12-12v-8c0-6.627 5.373-12 12-12zm36-240c-17.673 0-32 14.327-32 32s14.327 32 32 32 32-14.327 32-32-14.327-32-32-32z"
        />
        <path
          v-else-if="type === 'success'"
          d="M256 8C119.033 8 8 119.033 8 256s111.033 248 248 248 248-111.033 248-248S392.967 8 256 8zm0 48c110.532 0 200 89.451 200 200 0 110.532-89.451 200-200 200-110.532 0-200-89.451-200-200 0-110.532 89.451-200 200-200m140.204 130.267l-22.536-22.718c-4.667-4.705-12.265-4.736-16.97-.068L215.346 303.697l-59.792-60.277c-4.667-4.705-12.265-4.736-16.97-.069l-22.719 22.536c-4.705 4.667-4.736 12.265-.068 16.971l90.781 91.516c4.667 4.705 12.265 4.736 16.97.068l172.589-171.204c4.704-4.668 4.734-12.266.067-16.971z"
        />
        <path
          v-else-if="type === 'warning'"
          d="M270.2 160h35.5c3.4 0 6.1 2.8 6 6.2l-7.5 196c-.1 3.2-2.8 5.8-6 5.8h-20.5c-3.2 0-5.9-2.5-6-5.8l-7.5-196c-.1-3.4 2.6-6.2 6-6.2zM288 388c-15.5 0-28 12.5-28 28s12.5 28 28 28 28-12.5 28-28-12.5-28-28-28zm281.5 52L329.6 24c-18.4-32-64.7-32-83.2 0L6.5 440c-18.4 31.9 4.6 72 41.6 72H528c36.8 0 60-40 41.5-72zM528 480H48c-12.3 0-20-13.3-13.9-24l240-416c6.1-10.6 21.6-10.7 27.7 0l240 416c6.2 10.6-1.5 24-13.8 24z"
        />
        <path
          v-else-if="type === 'error'"
          d="M256 40c118.621 0 216 96.075 216 216 0 119.291-96.61 216-216 216-119.244 0-216-96.562-216-216 0-119.203 96.602-216 216-216m0-32C119.043 8 8 119.083 8 256c0 136.997 111.043 248 248 248s248-111.003 248-248C504 119.083 392.957 8 256 8zm-11.49 120h22.979c6.823 0 12.274 5.682 11.99 12.5l-7 168c-.268 6.428-5.556 11.5-11.99 11.5h-8.979c-6.433 0-11.722-5.073-11.99-11.5l-7-168c-.283-6.818 5.167-12.5 11.99-12.5zM256 340c-15.464 0-28 12.536-28 28s12.536 28 28 28 28-12.536 28-28-12.536-28-28-28z"
        />
      </svg>
      <span class="ml-2">{{ message }}</span>

      <svg v-if="showClose" class="close-icon" viewBox="0 0 320 512" @click="close">
        <path
          d="M193.94 256L296.5 153.44l21.15-21.15c3.12-3.12 3.12-8.19 0-11.31l-22.63-22.63c-3.12-3.12-8.19-3.12-11.31 0L160 222.06 36.29 98.34c-3.12-3.12-8.19-3.12-11.31 0L2.34 120.97c-3.12 3.12-3.12 8.19 0 11.31L126.06 256 2.34 379.71c-3.12 3.12-3.12 8.19 0 11.31l22.63 22.63c3.12 3.12 8.19 3.12 11.31 0L160 289.94 262.56 392.5l21.15 21.15c3.12 3.12 8.19 3.12 11.31 0l22.63-22.63c3.12-3.12 3.12-8.19 0-11.31L193.94 256z"
        />
      </svg>
    </div>
  </transition>
</template>

<script>
export default {
  props: {
    message: {
      type: String,
      required: true,
    },

    size: {
      type: String,
      required: false,
      default: "sm",
      validator: (value) => {
        return ["sm", "lg"].indexOf(value) !== -1;
      },
    },

    type: {
      type: String,
      default: "info",
      validator: (value) => {
        let allowedValues = ["info", "success", "warning", "error"];

        return allowedValues.indexOf(value) !== -1;
      },
      description:
        "Notification type of notification (info|success|warning|error)",
    },

    timeout: {
      type: Number,
      default: 5000,
      validator: (value) => {
        return value >= 0;
      },
      description:
        "Notification timeout (closes after X milliseconds). Default is 5000 (5s)",
    },

    timestamp: {
      type: Date,
      default: () => new Date(),
      description:
        "Notification timestamp (used internally to handle notification removal correctly)",
    },

    showClose: {
      type: Boolean,
      default: true,
      description: "Whether to show close button",
    },
  },

  emits: ["close"],

  computed: {
    alertType() {
      return `msg-${this.type}`;
    },

    alertSize() {
      return `msg-${this.size}`;
    },
  },

  mounted() {
    if (this.timestamp) {
      if (this.timeout !== 0) {
        setTimeout(this.close, this.timeout);
      }
    }
  },

  methods: {
    close() {
      this.$emit("close", this.timestamp);
    },
  },
};
</script>

<style scoped>
.fade-enter-active {
  animation: fadeInUp 0.3s ease-out;
}

.fade-leave-active {
  animation: fadeOutUp 0.3s ease-out;
}

@keyframes fadeOutUp {
  from {
    opacity: 1;
  }

  to {
    opacity: 0;
    -webkit-transform: translate3d(0, -100%, 0);
    transform: translate3d(0, -100%, 0);
  }
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    -webkit-transform: translate3d(0, 100%, 0);
    transform: translate3d(0, 100%, 0);
  }

  to {
    opacity: 1;
    -webkit-transform: none;
    transform: none;
  }
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
