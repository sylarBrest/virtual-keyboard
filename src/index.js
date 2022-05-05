import Keyboard from './Keyboard';
import './style.scss';

console.log('Virtual Keyboard task started');

const kb = new Keyboard();
kb.init();
console.log(kb.toString());
