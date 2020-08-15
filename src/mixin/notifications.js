export default {
    mounted() {
        this.checkNotify();
    },

    methods: {
        checkNotify() {
            if (!flash_notification) {
                return;
            }

            flash_notification.forEach(notification => {
                let type = notification.level;

                if (type === 'danger') {
                    type = 'error';
                }

                this.$notify({
                    message: notification.message,
                    timeout: 5000,
                    type
                })
            })
        }
    }
}
