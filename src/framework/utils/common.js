/**
 * Created by PanJiaChen on 16/11/18.
 */

import defaultSettings from '@/settings'

const title = defaultSettings.title || '小破孩'

/**
 * 生成页面标题
 * @param pageTitle
 * @returns {string}
 */
export function getPageTitle(pageTitle) {
  if (pageTitle) {
    return `${pageTitle} - ${title}`
  }
  return `${title}`
}

/**
 * 是否是链接
 * @param {string} path
 * @returns {Boolean}
 */
export function isExternal(path) {
  return /^(https?:|mailto:|tel:)/.test(path)
}
