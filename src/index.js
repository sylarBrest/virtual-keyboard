import Keyboard from './Keyboard';
import './style.scss';

/* TODO or not TODO List
1. Shift, CapsLock and LangSwitching only after keyup event
*/

console.log('Virtual Keyboard task started');

const kb = new Keyboard();

const setLocalStorage = () => localStorage.setItem('lang', kb.getLang());

const getLocalStorage = () => {
  if (localStorage.getItem('lang')) {
    kb.init();
    kb.setLang(localStorage.getItem('lang'));
  } else {
    setLocalStorage();
    getLocalStorage();
  }
};

window.addEventListener('load', getLocalStorage);
window.addEventListener('beforeunload', setLocalStorage);
