(()=>{"use strict";console.log("Virtual Keyboard task started"),(new class{constructor(){this.elements={main:null,textarea:null,keyboardContainer:null,keys:[]},this.properties={value:"",isCapsLock:!1,isShiftPressed:!1,lang:"en",cursorPosition:0},this.layouts={en:["`","1","2","3","4","5","6","7","8","9","0","-","=","backspace","tab","q","w","e","r","t","y","u","i","o","p","[","]","\\","del","capslock","a","s","d","f","g","h","j","k","l",";","'","enter","leftshift","z","x","c","v","b","n","m",",",".","/","uparrow","rightshift","leftctrl","win","leftalt","spacebar","rightalt","leftarrow","downarrow","rightarrow","rightctrl"],enShift:["~","!","@","#","$","%","^","&","*","(",")","_","+","backspace","tab","Q","W","E","R","T","Y","U","I","O","P","{","}","|","del","capslock","A","S","D","F","G","H","J","K","L",":",'"',"enter","leftshift","Z","X","C","V","B","N","M","<",">","?","uparrow","rightshift","leftctrl","win","leftalt","spacebar","rightalt","leftarrow","downarrow","rightarrow","rightctrl"]}}init(){this.elements.main=document.createElement("main"),this.elements.main.classList.add("main"),this.elements.main.classList.add("main-container"),this.elements.textarea=document.createElement("textarea"),this.elements.textarea.classList.add("textarea"),this.elements.textarea.setAttribute("autofocus","autofocus"),this.elements.textarea.setAttribute("rows","10"),this.elements.textarea.setAttribute("cols","62"),this.elements.keyboardContainer=document.createElement("div"),this.elements.keyboardContainer.classList.add("keyboard"),this.elements.keys=this.elements.keyboardContainer.querySelectorAll(".key"),this.render()}createKeys(){const e=document.createDocumentFragment(),t=this.layouts.en,s=e=>`<span class="material-icons">${e}</span>`;return t.forEach((t=>{const a=document.createElement("button");switch(a.setAttribute("type","button"),a.classList.add("key"),t){case"del":a.classList.add("text"),a.innerHTML="del";break;case"leftctrl":case"rightctrl":a.classList.add("text"),a.textContent="ctrl";break;case"leftalt":case"rightalt":a.classList.add("text"),a.textContent="alt";break;case"backtick":a.classList.add("symbol"),a.textContent="`";break;case"tab":a.innerHTML=s("keyboard_tab");break;case"win":a.innerHTML=s("window");break;case"uparrow":a.innerHTML=s("keyboard_arrow_up");break;case"leftarrow":a.innerHTML=s("keyboard_arrow_left");break;case"downarrow":a.innerHTML=s("keyboard_arrow_down");break;case"rightarrow":a.innerHTML=s("keyboard_arrow_right");break;case"backspace":a.classList.add("wide"),a.innerHTML=s("keyboard_backspace");break;case"capslock":a.classList.add("wide"),a.innerHTML=s("keyboard_capslock");break;case"enter":a.classList.add("wide"),a.innerHTML=s("keyboard_return");break;case"leftshift":case"rightshift":a.classList.add("wide"),a.classList.add("shift"),a.innerHTML=s("publish");break;case"spacebar":a.classList.add("ultrawide"),a.innerHTML=s("space_bar");break;default:a.classList.add("symbol"),a.innerHTML=t}a.setAttribute("data-key",t),a.addEventListener("click",(e=>this.mouseClick(e))),e.append(a)})),e}chooseSymbol(e){let t=this.properties.isCapsLock?e.toUpperCase():e;return this.properties.isShiftPressed&&(t=this.layouts.enShift[this.layouts.en.indexOf(e)]),this.properties.isCapsLock&&this.properties.isShiftPressed?t.toLowerCase():t}reLoadKeys(e){e.forEach((e=>{const t=e;t.textContent=this.chooseSymbol(t.dataset.key)}))}mouseClick(e){const t=e.currentTarget.dataset.key,s=this.elements.textarea;let a=s.selectionStart+1,[r,i,n]=[this.chooseSymbol(t),s.selectionStart,s.selectionEnd];switch(t){case"del":[r,n]=["",s.selectionEnd+1];break;case"backspace":[r,i]=["",s.selectionStart-1];break;case"enter":r="\n";break;case"tab":r="\t";break;case"spacebar":r=" ";break;case"capslock":e.currentTarget.classList.toggle("pressed"),[r,a]=["",s.selectionStart],this.capsLockOn();break;case"rightshift":case"leftshift":[r,a]=["",s.selectionStart],this.shiftKeyOn(e.currentTarget);break;case"leftctrl":case"rightctrl":case"leftalt":case"rightalt":case"win":[r,a]=["",s.selectionStart];break;case"uparrow":r="∧";break;case"downarrow":r="∨";break;case"leftarrow":r="<";break;case"rightarrow":r=">"}i>=0&&s.setRangeText(r,i,n),"del"!==t&&"backspace"!==t||(a=s.selectionStart),this.elements.textarea.focus(),this.elements.textarea.selectionStart=a}capsLockOn(){this.properties.isCapsLock=!this.properties.isCapsLock;const e=this.elements.keyboardContainer.querySelectorAll(".symbol");this.reLoadKeys(e)}shiftKeyOn(e){this.properties.isShiftPressed=!this.properties.isShiftPressed;const t=this.elements.keyboardContainer.querySelectorAll(".shift"),s=this.elements.keyboardContainer.querySelectorAll(".symbol");this.properties.isShiftPressed?e.classList.add("pressed"):t.forEach((e=>e.classList.remove("pressed"))),this.reLoadKeys(s)}render(){document.body.prepend(this.elements.main),this.elements.main.appendChild(this.elements.textarea),this.elements.main.appendChild(this.elements.keyboardContainer),this.elements.keyboardContainer.appendChild(this.createKeys())}toString(){return this.properties}}).init()})();