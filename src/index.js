import Keyboard from './Keyboard';
import './style.scss';

/* TODO or not TODO List
0. Local storage of language
1. Shift, CapsLock and LangSwitching only after keyup event
*/

console.log('Virtual Keyboard task started');

const kb = new Keyboard();
kb.init();
