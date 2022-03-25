import React, { useState, useEffect } from 'react';
import { 
  EVENT, 
  transformIntoSetItemWithCustomEvent, 
  transformIntoRemoveItemWithCustomEvent 
} from 'custom-local-storage';

const ACCESS_TOKEN = 'accessToken'

export const App = () => {
  const [accessToken, setAccessToken] = useState(localStorage.getItem(ACCESS_TOKEN));

  const saveAccessToken = () => {
    localStorage.setItem(ACCESS_TOKEN, 'test');
  }

  const removeAccessToken = () => {
    localStorage.removeItem(ACCESS_TOKEN);
  }

  const handleStorageChange = function(event) {
    if(event.key === ACCESS_TOKEN) {
      const { newValue } = event;
      setAccessToken(newValue)
    }
  }

  const customEventOn = () => {
    transformIntoSetItemWithCustomEvent();
    transformIntoRemoveItemWithCustomEvent();
  }

  useEffect(() => {
    window.addEventListener(EVENT.STORAGE, handleStorageChange);
    window.addEventListener(EVENT.CUSTOM_STORAGE_SET_ITEM, handleStorageChange, false);
    window.addEventListener(EVENT.CUSTOM_STORAGE_REMOVE_ITEM, handleStorageChange, false);
    return () => {
      window.removeEventListener(EVENT.STORAGE, handleStorageChange);
      window.removeEventListener(EVENT.CUSTOM_STORAGE_SET_ITEM, handleStorageChange, false);
      window.removeEventListener(EVENT.CUSTOM_STORAGE_REMOVE_ITEM, handleStorageChange, false);
    }
  }, []);

  return (
    <React.Fragment>
      <div>
        <h1>Local Storage Event</h1>
        <div>
          <button onClick={saveAccessToken}>AccessToken 저장</button>
          <button onClick={removeAccessToken}>AccessToken 삭제</button>
        </div>
        <div>
          <button onClick={customEventOn}>CUSTOM ON</button>
        </div>
        <div>LocalStorage AccessToken : {accessToken}</div>
      </div>
    </React.Fragment>
  );
}
