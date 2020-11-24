import Vue from 'vue'
import store from '../store'
function check(el, binding) {
  console.log(store.getters.accountAction)
  if (!store.getters.accountAction.includes(binding.value)) {
    el.parentNode && el.parentNode.removeChild(el)
  }
}

Vue.directive('action', {
  inserted(el, binding) {
    check(el, binding)
  },
  update(el, binding) {
    check(el, binding)
  }
})
