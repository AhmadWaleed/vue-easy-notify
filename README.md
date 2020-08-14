# Vue-Notify

## Introduction
Vue Notify is very minimal and simple to use plugin available for VueJs, It comes with mixin that you can use to easily integrated your server-service notifications with vue-notify.

---

- [Demo](#demo)
- [Quick Start](#quick-start)

---

## Demo

[CodePen](https://codepen.io/)

## Quick Start

### NPM

Install the package:

```bash
npm install vue-notify
```

Register the plugin:

```js
import Vue from 'vue'
import NotifyPlugin from 'vue-notify'

Vue.use(NotifyPlugin)
```

Use the component:

```html
<notifications></notifications>
```

```js
// you can call like this in your component
this.$notify.info("This is info message.")

// and also 
Vue.notify.info("Another info message.")
```

Great Now you have this cool vue-notify installed on your project..

##### Examples
```javascript
// notify by notification type
this.$notify.notify({
  message: 'Example message.',
  type: 'info' // success, warning, error
})

// notify with timeout
this.$notify.notify({
  message: 'Example message.',
  type: 'success',
  timeout: 3000
})

// shorthand methods
this.$notify.info('This is info messsage.');
this.$notify.success('This is success messsage.');
this.$notify.warning('This is warning messsage!');
this.$notify.error('This is error messsage!');
```
