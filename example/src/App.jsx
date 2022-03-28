import React, { useState, useEffect } from 'react';
import { 
  init, addEventListener, removeEventListener
} from 'custom-local-storage';

const ACCESS_TOKEN = 'accessToken'
const EVENT = {
 STORAGE: 'storage',
 CUSTOM_STORAGE: 'CustomStorage'
}

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
    init(EVENT.CUSTOM_STORAGE);
  }

  useEffect(() => {
    window.addEventListener(EVENT.STORAGE, handleStorageChange);
    addEventListener(EVENT.CUSTOM_STORAGE, handleStorageChange);
    return () => {
      window.removeEventListener(EVENT.STORAG, handleStorageChange);
      removeEventListener(EVENT.CUSTOM_STORAGE, handleStorageChange);
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
