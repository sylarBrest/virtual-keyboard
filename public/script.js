(()=>{"use strict";console.log("Virtual Keyboard task started"),(new class{constructor(){this.elements={main:null,textarea:null,keyboardContainer:null,keys:[],el:null},this.properties={isCapsLock:!1,isShiftPressed:!1,isCtrlPressed:!1,isAltPressed:!1,isLangSwitched:!1,lang:"en"},this.layouts={en:["`","1","2","3","4","5","6","7","8","9","0","-","=","backspace","tab","q","w","e","r","t","y","u","i","o","p","[","]","\\","del","capslock","a","s","d","f","g","h","j","k","l",";","'","enter","leftshift","z","x","c","v","b","n","m",",",".","/","uparrow","rightshift","leftctrl","win","leftalt","spacebar","rightalt","leftarrow","downarrow","rightarrow","rightctrl"],enShift:["~","!","@","#","$","%","^","&","*","(",")","_","+","backspace","tab","Q","W","E","R","T","Y","U","I","O","P","{","}","|","del","capslock","A","S","D","F","G","H","J","K","L",":",'"',"enter","leftshift","Z","X","C","V","B","N","M","<",">","?","uparrow","rightshift","leftctrl","win","leftalt","spacebar","rightalt","leftarrow","downarrow","rightarrow","rightctrl"],ru:["ё","1","2","3","4","5","6","7","8","9","0","-","=","backspace","tab","й","ц","у","к","е","н","г","ш","щ","з","х","ъ","\\","del","capslock","ф","ы","в","а","п","р","о","л","д","ж","э","enter","leftshift","я","ч","с","м","и","т","ь","б","ю",".","uparrow","rightshift","leftctrl","win","leftalt","spacebar","rightalt","leftarrow","downarrow","rightarrow","rightctrl"],ruShift:["Ё","!",'"',"№",";","%",":","?","*","(",")","_","+","backspace","tab","Й","Ц","У","К","Е","Н","Г","Ш","Щ","З","Х","Ъ","/","del","capslock","Ф","Ы","В","А","П","Р","О","Л","Д","Ж","Э","enter","leftshift","Я","Ч","С","М","И","Т","Ь","Б","Ю",",","uparrow","rightshift","leftctrl","win","leftalt","spacebar","rightalt","leftarrow","downarrow","rightarrow","rightctrl"]},this.keyCodes=["Backquote","Digit1","Digit2","Digit3","Digit4","Digit5","Digit6","Digit7","Digit8","Digit9","Digit0","Minus","Equal","Backspace","Tab","KeyQ","KeyW","KeyE","KeyR","KeyT","KeyY","KeyU","KeyI","KeyO","KeyP","BracketLeft","BracketRight","Backslash","Delete","CapsLock","KeyA","KeyS","KeyD","KeyF","KeyG","KeyH","KeyJ","KeyK","KeyL","Semicolon","Quote","Enter","ShiftLeft","KeyZ","KeyX","KeyC","KeyV","KeyB","KeyN","KeyM","Comma","Period","Slash","ArrowUp","ShiftRight","ControlLeft","MetaLeft","AltLeft","Space","AltRight","ArrowLeft","ArrowDown","ArrowRight","ControlRight"]}init(){this.elements.main=document.createElement("main"),this.elements.main.classList.add("main"),this.elements.main.classList.add("main-container"),this.elements.textarea=document.createElement("textarea"),this.elements.textarea.classList.add("textarea"),this.elements.textarea.setAttribute("autofocus","autofocus"),this.elements.textarea.setAttribute("rows","10"),this.elements.textarea.setAttribute("cols","62"),this.elements.keyboardContainer=document.createElement("div"),this.elements.keyboardContainer.classList.add("keyboard"),this.elements.keys=this.elements.keyboardContainer.querySelectorAll(".key"),this.render(),this.elements.textarea.addEventListener("keyup",(e=>this.keyboardClick(e))),this.elements.textarea.addEventListener("keydown",(e=>this.keyboardClick(e)))}createKeys(){const e=document.createDocumentFragment(),t=this.layouts[this.properties.lang],s=e=>`<span class="material-icons">${e}</span>`;return t.forEach(((t,r)=>{const i=document.createElement("button");switch(i.setAttribute("type","button"),i.classList.add("key"),t){case"del":i.classList.add("text"),i.innerHTML="del";break;case"leftctrl":case"rightctrl":i.classList.add("text"),i.textContent="ctrl";break;case"leftalt":case"rightalt":i.classList.add("text"),i.textContent="alt";break;case"backtick":i.classList.add("symbol"),i.textContent="`";break;case"tab":i.innerHTML=s("keyboard_tab");break;case"win":i.innerHTML=s("window");break;case"uparrow":i.innerHTML=s("keyboard_arrow_up");break;case"leftarrow":i.innerHTML=s("keyboard_arrow_left");break;case"downarrow":i.innerHTML=s("keyboard_arrow_down");break;case"rightarrow":i.innerHTML=s("keyboard_arrow_right");break;case"backspace":i.classList.add("wide"),i.innerHTML=s("keyboard_backspace");break;case"capslock":i.classList.add("wide"),i.innerHTML=s("keyboard_capslock");break;case"enter":i.classList.add("wide"),i.innerHTML=s("keyboard_return");break;case"leftshift":case"rightshift":i.classList.add("wide"),i.classList.add("shift"),i.innerHTML=s("publish");break;case"spacebar":i.classList.add("ultrawide"),i.innerHTML=s("space_bar");break;default:i.classList.add("symbol"),i.innerHTML=t}i.setAttribute("data-key",t),i.setAttribute("data-code",this.keyCodes[r]),i.addEventListener("click",(e=>this.mouseClick(e))),e.append(i)})),e}chooseSymbol(e){const[t,s]=[this.properties.lang,`${this.properties.lang}Shift`],r=this.layouts[t][this.keyCodes.indexOf(e)];let i=this.properties.isCapsLock?r.toUpperCase():r;return this.properties.isShiftPressed&&(i=this.layouts[s][this.keyCodes.indexOf(e)]),this.properties.isCapsLock&&this.properties.isShiftPressed?i.toLowerCase():i}reLoadKeys(e){e.forEach((e=>{const t=e;t.textContent=this.chooseSymbol(t.dataset.code)})),this.properties.isLangSwitched&&(this.properties.isLangSwitched=!this.properties.isLangSwitched)}keyboardClick(e){"keydown"===e.type&&"F5"!==e.code&&e.preventDefault();const t=e.code,s=this.elements.keyboardContainer.querySelectorAll(".key");this.keyCodes.forEach(((e,r)=>{t===e&&(this.elements.el=s[r],this.elements.el.classList.add("pressed"))})),"keyup"===e.type&&(this.toDo(s[this.keyCodes.indexOf(t)]),this.removePressed())}toDo(e){if(e){const t=e.dataset.code,s=this.elements.textarea;let r=s.selectionStart+1,[i,a,o]=[this.chooseSymbol(t),s.selectionStart,s.selectionEnd];switch(t){case"Delete":i="",o=s.selectionStart===s.selectionEnd?s.selectionEnd+1:s.selectionEnd;break;case"Backspace":i="",a=s.selectionStart===s.selectionEnd?s.selectionStart-1:s.selectionStart;break;case"Enter":i="\n";break;case"Tab":i="\t";break;case"Space":i=" ";break;case"CapsLock":this.properties.isCapsLock?e.classList.remove("pressed"):e.classList.add("pressed"),[i,r]=["",s.selectionStart],this.capsLockOn();break;case"ShiftRight":case"ShiftLeft":[i,r]=["",s.selectionStart],this.shiftKeyOn(e);break;case"ControlLeft":case"ControlRight":e.classList.toggle("pressed"),this.properties.isCtrlPressed=!this.properties.isCtrlPressed,[i,r]=["",s.selectionStart];break;case"AltLeft":case"AltRight":e.classList.toggle("pressed"),this.properties.isAltPressed=!this.properties.isAltPressed,[i,r]=["",s.selectionStart];break;case"MetaLeft":[i,r]=["",s.selectionStart];break;case"ArrowUp":i="∧";break;case"ArrowDown":i="∨";break;case"ArrowLeft":i="<";break;case"ArrowRight":i=">"}a>=0&&s.setRangeText(i,a,o),"Delete"!==t&&"Backspace"!==t||(r=s.selectionStart),this.checkShiftPressed(t),this.checkSwitchLang(t),this.elements.textarea.focus(),this.elements.textarea.selectionStart=r}}removePressed(){this.elements.keyboardContainer.querySelectorAll(".key").forEach((e=>{"ShiftLeft"!==e.dataset.code&&"ShiftRight"!==e.dataset.code&&"CapsLock"!==e.dataset.code&&e.classList.remove("pressed")}))}mouseClick(e){this.toDo(e.currentTarget)}capsLockOn(){this.properties.isCapsLock=!this.properties.isCapsLock;const e=this.elements.keyboardContainer.querySelectorAll(".symbol");this.reLoadKeys(e)}checkShiftPressed(e){"ShiftLeft"!==e&&"ShiftRight"!==e&&"CapsLock"!==e&&this.properties.isShiftPressed&&this.shiftKeyOn()}shiftKeyOn(e=null){this.properties.isShiftPressed=!this.properties.isShiftPressed;const t=this.elements.keyboardContainer.querySelectorAll(".shift"),s=this.elements.keyboardContainer.querySelectorAll(".symbol");this.properties.isShiftPressed?null!==e&&e.classList.add("pressed"):t.forEach((e=>e.classList.remove("pressed"))),this.reLoadKeys(s)}checkSwitchLang(e){"ControlLeft"===e||"ControlRight"===e?(this.properties.isCtrlPressed||this.removePressed(),this.properties.isCtrlPressed&&this.properties.isAltPressed&&this.switchLang()):"AltLeft"===e||"AltRight"===e?(this.properties.isAltPressed||this.removePressed(),this.properties.isCtrlPressed&&this.properties.isAltPressed&&this.switchLang()):(this.properties.isAltPressed=!1,this.properties.isCtrlPressed=!1,this.removePressed())}switchLang(){this.properties.isLangSwitched=!this.properties.isLangSwitched,this.properties.lang="ru"===this.properties.lang?"en":"ru";const e=this.elements.keyboardContainer.querySelectorAll(".symbol");this.reLoadKeys(e),this.properties.isCtrlPressed=!1,this.properties.isAltPressed=!1,this.removePressed()}render(){document.body.prepend(this.elements.main);const e=document.createElement("h1");e.textContent="RSS Virtual Keyboard",this.elements.main.appendChild(e),this.elements.main.appendChild(this.elements.textarea),this.elements.main.appendChild(this.elements.keyboardContainer),this.elements.keyboardContainer.appendChild(this.createKeys());const t=document.createElement("p"),s=document.createElement("p");t.textContent="Клавиатура создана в операционной среде Windows",s.textContent="Клавиши для переключения языка - Ctrl + Alt",this.elements.main.appendChild(t),this.elements.main.appendChild(s)}toString(){return JSON.stringify(this.properties)}}).init()})();