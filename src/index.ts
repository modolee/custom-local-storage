export class CustomLocalStorageEvent extends Event {
  key: string;
  oldValue: string;
  newValue: string;

  constructor(params: {
    type: string;
    eventInitDict?: EventInit;
    key: string;
    oldValue: string;
    newValue: string;
  }) {
    super(params.type, params.eventInitDict);
    this.key = params.key;
    this.oldValue = params.oldValue;
    this.newValue = params.newValue;
  }
}

const transformIntoSetItemWithCustomEvent = (type: string): void => {
  const originalSetItem = localStorage.setItem;

  localStorage.setItem = function (key: string, value: string): void {
    const event = new CustomLocalStorageEvent({
      type,
      key,
      oldValue: localStorage.getItem(key),
      newValue: value,
    });

    window.dispatchEvent(event);

    originalSetItem.apply(this, [key, value]);
  };
};

const transformIntoRemoveItemWithCustomEvent = (type: string): void => {
  const originalRemoveItem = localStorage.removeItem;

  localStorage.removeItem = function (key: string): void {
    const event = new CustomLocalStorageEvent({
      type,
      key,
      oldValue: localStorage.getItem(key),
      newValue: "",
    });

    window.dispatchEvent(event);

    originalRemoveItem.apply(this, [key]);
  };
};

export const init = (type: string): void => {
  transformIntoSetItemWithCustomEvent(type);
  transformIntoRemoveItemWithCustomEvent(type);
};

export const addEventListener = (
  type: string,
  eventHandler: EventListenerOrEventListenerObject
): void => {
  window.addEventListener(type, eventHandler, false);
};

export const removeEventListener = (
  type: string,
  eventHandler: EventListenerOrEventListenerObject
): void => {
  window.removeEventListener(type, eventHandler, false);
};
