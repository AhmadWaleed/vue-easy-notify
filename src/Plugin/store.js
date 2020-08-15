export default {
    state: [],

    settings: {
        type: 'info',
        timeout: 5000,
        showClose: true,
    },

    setOptions(options) {
        this.settings = Object.assign(this.settings, options)
    },

    reset() {
        this.state = [];
        this.settings = {
            type: 'info',
            timeout: 5000,
            showClose: true,
        }
    },

    addNotification(notification) {
        if (typeof notification === 'string' || notification instanceof String) {
            notification = { message: notification }
        }
        notification.timestamp = new Date();
        notification.timestamp.setMilliseconds(
            notification.timestamp.getMilliseconds() + this.state.length
        );
        notification = Object.assign({}, this.settings, notification)
        this.state.push(notification)
    },

    removeNotification(timestamp) {
        const index = this.state.findIndex(n => n.timestamp === timestamp)
        if (index !== -1) {
            this.state.splice(index, 1);
        }
    },

    notify(notification) {
        if (Array.isArray(notification)) {
            notification.forEach(n => this.addNotification(n))
        } else {
            this.addNotification(notification)
        }
    }
};