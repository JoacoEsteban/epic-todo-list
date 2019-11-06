// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

Vue.config.productionTip = false
Vue.filter('time', (oldDate) => {
  let now = new Date()
  oldDate = new Date(oldDate)
  let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

  let date = {
    today: oldDate.getFullYear() === now.getFullYear() && oldDate.getMonth() === now.getMonth() && oldDate.getDate() === now.getDate(),
    sameYear: oldDate.getFullYear() === now.getFullYear(),
    month: months[oldDate.getMonth()].substring(0, 3),
    date: oldDate.getDate(),
    year: oldDate.getFullYear()
  }

  let time = {
    hours: oldDate.getHours(),
    minutes: oldDate.getMinutes() < 10 ? '0' + oldDate.getMinutes() : oldDate.getMinutes()
  }
  let separator = '-'
  let timeStr = ''
  timeStr += (date.today ? 'Today' : ([date.month, date.date].join(separator) + (date.sameYear ? '' : separator + date.year))) + ' @ ' + [time.hours, time.minutes].join(':')
  return timeStr
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
