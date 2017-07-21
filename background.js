/* globals browser */
let activatedTab = null

async function openInActiveTabContainer (tab) {
  console.log('openInActiveTabContainer')
  console.log('tab.id: ', tab.id)
  console.log('tab.cookieStoreId: ', tab.cookieStoreId)
  console.log('activatedTab: ', activatedTab)
  console.log('activatedTab.cookieStoreId: ', activatedTab.cookieStoreId)
  if (tab.cookieStoreId !== activatedTab.cookieStoreId) {
    browser.tabs.create({
      active: true,
      cookieStoreId: activatedTab.cookieStoreId
    })
  }
  await browser.tabs.remove(tab.id)
}

async function assignActiveTabCookieStoreId (tabInfo) {
  console.log('assignActiveTabCookieStoreId')
  activatedTab = await browser.tabs.get(tabInfo.tabId)
}

browser.tabs.onCreated.addListener(openInActiveTabContainer)
browser.tabs.onActivated.addListener(assignActiveTabCookieStoreId)
