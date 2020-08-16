import Notifications from "../components/Notifications";
import NotificationStore from "./store";

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
export { NotificationPlugin }
