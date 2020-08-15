import Notifications from "../components/Notifications";

const NotificationStore = {
    state: [],

    settings: {
        type: 'info',
        timeout: 5000,
        showClose: true,
    },

    setOptions(options) {
        this.settings = Object.assign(this.settings, options)
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

const NotificationPlugin = {
    install(Vue, options) {
        let app = new Vue({
            data() {
                return {
                    notificationStore: NotificationStore
                }
            },

            methods: {
                notify(notification) {
                    this.notificationStore.addNotification(notification)
                },

                notifyInfo(notification) {
                    this.notificationStore.setOptions({ type: 'info' })
                    this.notificationStore.addNotification(notification);
                },

                notifySuccess(notification) {
                    this.notificationStore.setOptions({ type: 'success' })
                    this.notificationStore.addNotification(notification);
                },

                notifyWarning(notification) {
                    this.notificationStore.setOptions({ type: 'warning' })
                    this.notificationStore.addNotification(notification);
                },

                notifyError(notification) {
                    this.notificationStore.setOptions({ type: 'error' })
                    this.notificationStore.addNotification(notification);
                },
            }
        });

        Vue.prototype.$notify = app.notify;
        Vue.prototype.$notifyInfo = app.notifyInfo;
        Vue.prototype.$notifySuccess = app.notifySuccess;
        Vue.prototype.$notifyWarning = app.notifyWarning;
        Vue.prototype.$notifyError = app.notifyError
        Vue.prototype.$notifications = app.notificationStore

        Vue.component('Notifications', Notifications);

        if (typeof options === 'object' && Object.keys(options) > 0) {
            NotificationStore.setOptions(options)
        }
    }
};

export default NotificationPlugin
