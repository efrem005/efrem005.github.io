const b1 = document.querySelector('.b-1');
const b2 = document.querySelector('.b-2');

// b1.onclick = test;
// b2.onclick = test;


function test(color, num) {
    console.log(color);
    console.log(num);
    this.style.background = color;
}

// b2.onclick = function () {
//     test.apply(b1, ['green', 6031]);
// }

let a = test.bind(b1, 'orange', 6031);
let b = test.bind(b2, 'red', 005);

b2.onclick = b;
b1.onclick = a;


function userProgress(time) {
    let start = 0;
    let progressElement = document.getElementById('user-progress');
    let intervalId = setInterval(function () {
        if (start > 100) {
            clearInterval(intervalId);

        } else {
            progressElement.value = start;
        }
        start++;
    }, time);
}

let Data = new Date();
let Year = Data.getFullYear();
let Month = Data.getMonth()
let Day = Data.getDate();
let Hour = Data.getHours();
let Minutes = Data.getMinutes();



// console.log(`${Year}-${Month}-${Day}`);





let a = new Promise((resolve, reject) => {
    fetch('https://spreadsheets.google.com/feeds/list/1gZ41L7djGnCzH0m1MZN8FmgL0OCuIn4U2rhe6QTWLmM/1/public/values?alt=json')
        .then(data => {
            resolve(data.text());
        })
});
Promise.all([a]).then(value => {
    let a = JSON.parse(value[0]);
    // document.querySelector('.alert-warning').innerHTML = a.feed.entry[1].content.$t;
    // console.log(a.feed.entry);
    let g = a.feed.entry[1].gsx$data.$t;
    // console.log(g);
    // document.querySelector('.alert-warning').innerHTML = g;
    let led = document.querySelector('#showradius');

    if (Day == g) {
        led.classList.add('green');
        userProgress(167);
    } else {
        led.classList.add('red');
    }
})