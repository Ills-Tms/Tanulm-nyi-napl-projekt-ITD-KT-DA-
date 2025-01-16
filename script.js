const datumsor =document.getElementById('datum')


const date=new Date();

let ev = date.getFullYear();
let honap=date.getMonth()+1;
let nap=date.getDate();

datumsor.innerText=ev+"."+honap+"."+nap