export const EVENT = {
  STORAGE: 'storage',
  CUSTOM_STORAGE_SET_ITEM: 'CustomStorageSetItem',
  CUSTOM_STORAGE_REMOVE_ITEM: 'CustomStorageRemoveItem'
}

export const transformIntoSetItemWithCustomEvent = (eventName = EVENT.CUSTOM_STORAGE_SET_ITEM) => {
  const originalSetItem = localStorage.setItem;

  localStorage.setItem = function(...rest) {
    const [key, value] = rest;
    const event = new Event(eventName);

    event.key = key;
    event.oldValue = localStorage.getItem(key);
    event.newValue = value;

    window.dispatchEvent(event);

    originalSetItem.apply(this, rest);
  };
}

export const transformIntoRemoveItemWithCustomEvent = (eventName = EVENT.CUSTOM_STORAGE_REMOVE_ITEM) => {
  const originalRemoveItem = localStorage.removeItem;

  localStorage.removeItem = function(...rest) {
    const [key] = rest;
    const event = new Event(eventName);
    event.key = key;

    window.dispatchEvent(event);

    originalRemoveItem.apply(this, rest);
  };
}
