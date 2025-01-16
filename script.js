const datumsor =document.getElementById('datum')
const ido=document.getElementById('ido')

const date=new Date();

let ev = date.getFullYear();
let honap=date.getMonth()+1;
let nap=date.getDate();

let ora= date.getHours();
let perc=date.getMinutes();

ido.innerText=ora+":"+perc
datumsor.innerText=ev+"."+honap+"."+nap