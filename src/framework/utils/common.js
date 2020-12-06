/**
 * Created by PanJiaChen on 16/11/18.
 */

import defaultSettings from '@/settings'

const title = defaultSettings.title || '默认标题'

export function getPageTitle(pageTitle) {
  if (pageTitle) {
    return `${pageTitle} - ${title}`
  }
  return `${title}`
}

/**
 * @param {string} path
 * @returns {Boolean}
 */
export function isExternal(path) {
  return /^(https?:|mailto:|tel:)/.test(path)
}