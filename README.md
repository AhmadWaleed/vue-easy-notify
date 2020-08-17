# Vue-Easy-Notify

<p align="center">
  <a href="https://github.com/AhmadWaleed/vue-notify/blob/master/vue-notify-demo-gif.gif" title="Vue Simple Notify">
    <img src="https://github.com/AhmadWaleed/vue-notify/blob/master/vue-notify-demo-gif.gif">
  </a>
</p>

## Introduction
Vue Notify is very minimal and simple to use plugin available for VueJs, It comes with mixin that you can use to easily integrated your server-service notifications with vue-easy-notify.

---

- [Demo](#demo)
- [Quick Start](#quick-start)
- [Server Side Usage](#server-side-usage)
- [API](#api)

---

## Demo

[CodePen](https://codepen.io/)

## Quick Start

### NPM

Install the package:

```bash
npm install vue-easy-notify
```

Register the plugin:

```js
import Vue from 'vue'
import NotifyPlugin from 'vue-easy-notify'
import 'vue-easy-notify/dist/vue-easy-notify.css' // import style

Vue.use(NotifyPlugin)
```

Use the component:

```html
<notifications></notifications>
```

```js
// you can call like this in your component
this.$notifyInfo("This is info message.")

// and also 
Vue.prototype.$notifyInfo("Another info message.")
```

Great Now you have this cool vue-easy-notify installed on your project..

##### Examples
```html
<notifications position="bottom"></notifications>
```

```javascript
// notify by notification type
this.$notify({
  message: 'Example message.',
  type: 'info' // success, warning, error
})

// notify with timeout
this.
({
  message: 'Example message.',
  type: 'success',
  timeout: 3000
})

// shorthand methods
this.$notifyInfo('This is info messsage.');
this.$notifySuccess('This is success messsage.');
this.$notifyWarning('This is warning messsage!');
this.$notifyError('This is error messsage!');
```

## Server Side Usage

Below is the example how you can use vue-easy-notify to handle laravel server side flash message and errors.

Install [laracasts/flash](https://github.com/laracasts/flash) composer package.

```bash
composer require laracasts/flash
```

```php
// ExampleController
// ... //
public function index()
{
  flash()->info('server side flash message.');
  
  return redirect('/home');
}
// ... //
```

```html
<!-- layouts/app.blade.php -->
<head>
  <!-- -->
  <script type="text/javascript">
        var flash_notification = {!! (session()->has('flash_notification')) ? json_encode(session()->get('flash_notification')) : 'false' !!}
  </script>

  {{ session()->forget('flash_notification') }}
  <!-- -->
</head>
<body>
  <!-- -->
  <notifications :messages="{{ collect($errors->all())->map(fn($error) => ['message' => $error, 'type' => 'error']) }}"
                 position="bottom"
  >
  </notifications>
  <!-- -->
</body>
```

add and use this plugin in your project to check laravel notifications
```js
// resources/js/mixins/notifications.js
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

```

```js
// resources/js/app.js

import Vue from 'vue'
import NotifyPlugin from 'vue-easy-notify'
import NotifyMixin from './mixins/notifications.js'; // this mixin will automatically check server side notfications.
Vue.use(NotifyPlugin)

new Vue({
  el: '#app',
  mixins: [NotifyMixin],
  mounted() {
    this.$notifyInfo('show message from client side.')
  }
})
```

## API

### Options

below are the options you can pass to notify function.

**Option**|**Type's**|**Default**|**Description**
-----|-----|-----|-----
message|String|''|Notification message content
type|String|'info'|Notification level <br> **['info', 'success', 'warning', 'error']**
size|String|'sm'|Notification size <br> **['sm', 'lg']**
timeout|Number|5000|Display time of the notification in millisecond
showClose|Boolean|true|Show close icon on notification <br> **[true, flase]**
