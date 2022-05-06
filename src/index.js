import Keyboard from './Keyboard';
import './style.scss';

/* TODO List
1. Delete/Backspace captures one more symbol
2. Switch language should be only if consecutive pressing
3. Remove 'pressed' class from keys CTRL and ALT after language switch
*/

console.log('Virtual Keyboard task started');

const kb = new Keyboard();
kb.init();
