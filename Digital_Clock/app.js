let hrs = document.querySelector('.hour');
let min = document.querySelector('.minute');
let sec = document.querySelector('.second');

setInterval ( function time() {
    let currentDate = new Date();
    hrs.innerHTML = (currentDate.getHours() < 10 ? "0" : "") + currentDate.getHours();
    min.innerHTML = (currentDate.getMinutes() < 10 ? "0" : "") + currentDate.getMinutes();
    sec.innerHTML = (currentDate.getSeconds() < 10 ? "0" : "") + currentDate.getSeconds();
} , 1000 )
