const datumsor =document.getElementById('datum')
const ido=document.getElementById('ido')

const date=new Date();

let ev = date.getFullYear();
let honap=date.getMonth()+1;
let nap=date.getDate();

let ora;
let perc;

function frissit(){

 ora= date.getHours();
 perc=date.getMinutes();
}

frissit()
setInterval(frissit(),1000)

ido.innerText=ora+":"+perc
datumsor.innerText=ev+"."+honap+"."+nap

