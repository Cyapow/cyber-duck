import Vue from 'vue'

import en from 'vee-validate/dist/locale/en.json'

import {
  ValidationObserver,
  ValidationProvider,
  extend,
  localize,
} from 'vee-validate'

import * as rules from 'vee-validate/dist/rules'

Object.keys(rules).forEach((rule) => {
  if (rule === 'size') {
    extend('size', {
      ...rules[rule],
      message: (field, { size }) =>
        `The ${field} field size must be less than ${formatFileSize(size)}`,
    })
  } else {
    extend(rule, rules[rule])
  }
})

const MinDimensions = {
  message: (field, { width, height } = {}) =>
    'The ' + field + ' must be at least ' + width + 'px x ' + height + 'px.',
  validate: (value, { width, height } = {}) => {
    const URL = window.URL || window.webkitURL
    return new Promise((resolve) => {
      const image = new Image()
      image.onerror = () => resolve(false)
      image.onload = () =>
        resolve(image.width >= width && image.height >= height)
      image.src = URL.createObjectURL(value[0])
    })
  },
  params: ['width', 'height'],
}
extend('MinDimensions', MinDimensions)

const formatFileSize = (
  size,
  units = ['Byte', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
  delimiter = ' '
) => {
  const threshold = 1024
  size = size * threshold
  const i = size == 0 ? 0 : Math.floor(Math.log(size) / Math.log(threshold))
  return (size / Math.pow(threshold, i)).toFixed(2) * 1 + delimiter + units[i]
}

localize('en', en)
Vue.component('ValidationObserver', ValidationObserver)
Vue.component('ValidationProvider', ValidationProvider)
