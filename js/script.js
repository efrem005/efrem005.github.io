const body = document.getElementsByTagName("body")[0];

body.style.backgroundColor = localStorage.getItem('color');

function nowDate() {
  const now = new Date();
  const hrs = now.getHours();
  const mrs = now.getMinutes();
  const srs = now.getSeconds();
  a.innerHTML = `${hrs}:${mrs}:${srs}`;
  setTimeout(nowDate, 1000);
}
// nowDate();


window.onload = function () {

  let a = new Promise((resolve, reject) => {
    let page = 2;
    fetch(`https://spreadsheets.google.com/feeds/list/1gZ41L7djGnCzH0m1MZN8FmgL0OCuIn4U2rhe6QTWLmM/${page}/public/values?alt=json`)
      .then(data => {
        resolve(data.text());
      })
  });
  let b = new Promise((resolve, reject) => {
    let page = 7;
    fetch(`https://spreadsheets.google.com/feeds/list/1gZ41L7djGnCzH0m1MZN8FmgL0OCuIn4U2rhe6QTWLmM/${page}/public/values?alt=json`)
      .then(data => {
        resolve(data.text());
      })
  });
  let c = new Promise((resolve, reject) => {
    fetch(`https://narodmon.ru/api?cmd=sensorsValues&sensors=30847&uuid=498b547435bb46df9ab4a46ccdf9b5cd&api_key=sGvnAVWPfAXty&lang=ru`)
      .then(data => {
        resolve(data.text());
      })
  });
  let d = new Promise((resolve, reject) => {
    let page = 8;
    fetch(`https://spreadsheets.google.com/feeds/list/1gZ41L7djGnCzH0m1MZN8FmgL0OCuIn4U2rhe6QTWLmM/${page}/public/values?alt=json`)
      .then(data => {
        resolve(data.text());
      })
  });
  let e = new Promise((resolve, reject) => {
    let page = 1;
    fetch(`https://spreadsheets.google.com/feeds/list/1gZ41L7djGnCzH0m1MZN8FmgL0OCuIn4U2rhe6QTWLmM/${page}/public/values?alt=json`)
      .then(data => {
        resolve(data.text());
      })
  });
  Promise.all([a, b, c, d, e]).then(value => {

    document.querySelector(".menu__item").addEventListener("click", fTabs);

    function fTabs(event) {
      if (event.target.classList == "menu__link") {
        // console.log(event);
        var dataTab = event.target.getAttribute("data-tabs");
        // console.log(event.target);
        var tabI = document.getElementsByClassName("menu__link");

        for (var i = 0; i < tabI.length; i++) {
          tabI[i].classList.remove("active");
        }
        event.target.classList.add("active");
        document.querySelector('title').innerHTML = title(event);



        var tabBody = document.getElementsByClassName("commit");

        for (var i = 0; i < tabBody.length; i++) {
          if (dataTab == i) {
            tabBody[i].style.display = "flex";
          } else {
            tabBody[i].style.display = "none";
          }
        }
      }
    }

    // MYSQL //
    let e = JSON.parse(value[4]);
    let mysql = e.feed.entry;
    // console.log(mysql);




    // GOOGLE SHEETS /// ВЫБОРКА data //
    let a = JSON.parse(value[0]);
    let data = a.feed.entry;
    // console.log(data);

    // menu температура воды //
    document.querySelector(".temp__sheet").innerHTML =
      "Вода: " + data[0].gsx$weather.$t + " &#8451 " + '<img class="icon_weather" src=' + data[0].gsx$img.$t + '></>';
    //footer температура воды //
    document.querySelector(".foofer__water").innerHTML = "Вода: " + data[0].gsx$weather.$t + " &#8451 ";
    // siti //
    // document.querySelector('.footer__name').innerHTML += ` <img class="icon_weather" src=${data[0].gsx$img.$t}></img>`;
    // ICO FAVICON //
    document.querySelectorAll('link')[3].href = data[0].gsx$img.$t;

    document.querySelector(".commit__page3").innerHTML = covid1(data);
    document.querySelector(".update__data").innerHTML = update(data);
    document.querySelector(".commit__page1").innerHTML = usd(data);
    document.querySelector(".commit__page4").innerHTML = listRegion(data);
    document.querySelector(".foofer__feolet").innerHTML = fialet(data);
    document.querySelector('.menu__item').insertAdjacentHTML('afterbegin', menuli(data));
    document.querySelector('.hat__newhat').insertAdjacentHTML('afterend', hat(mysql));

    //

    function hat(mysql) {
      let out = "";
      // console.log(data);
      for (let i = 0; i < mysql.length; i++) {
        if (!mysql[i].gsx$name.$t == "") {
          if (!mysql[i].gsx$messages.$t == "") {
            out += `<h1 class="hat__name">${mysql[i].gsx$name.$t}</h1>`
            out += `<h3 class="hat__message">${mysql[i].gsx$messages.$t}</h3>`
          }
        }
      }
      return out;
    }




    function fialet(data) {
      let out = "";
      // console.log(data);
      out += `<h3 class="menu__ultraviolet">УФ-индекс: ${data[2].gsx$weather.$t}</h3>`;

      return out;
    }



    // MENU LIST //

    function menuli(data) {
      let out = "";
      // console.log(data);
      for (let i = 0; i < data.length; i++) {
        out += `<li class="menu_list">`;
        out += `<span class="menu__link" data-tabs="${i}">${data[i].gsx$title.$t}</span>`;
        out += `</li>`;
      }
      return out;
    }

    // TITLE NAME //

    function title(event) {
      let out = "";
      let tabs = event.target.dataset.tabs;
      let a = data[tabs].gsx$title.$t;

      if (event.target.className == "menu__link active") {
        out = a + ' ' + temp.sensors[0].value + " &#8451 ";

      }
      return out;
    }

    // COVID-19 страны //
    function covid1(data) {
      let out = "";
      for (var i = 0; i < data.length; i++) {
        if (data[i]["gsx$locationon"]["$t"] != 0) {
          out += `<div class="covid__siti">`;
          out += `<h1 >${data[i].gsx$location.$t}</h1>`;
          out += `<h2>Заболевших: ${data[i].gsx$cases.$t}</h2>`;
          out += `<h2>за сутки: ${data[i].gsx$newcases.$t}</h2>`;
          out += `</div>`;
        }
      }
      return out;
    }
    // обновления //
    function update(data) {
      const now = new Date();
      const day = now.getDate();
      let out = "";
      let upDay = data[1].gsx$update.$t;
      let dnDay = data[3].gsx$update.$t
      // console.log(dnDay, upDay);
      if (upDay == day && dnDay == day) {
        out += `<span class="data__green">обновлено</span>`;
      } else if (upDay == "") {
        out += `<span class="data__red">пусто</span>`;
      } else {
        out += `<span class="data__red">не обновлено</span>`;
      }
      return out;
    }

    // Курс доллара //
    function usd(data) {
      let out = "";
      for (var i = 0; i < data.length; i++) {
        if (data[i]["gsx$courseon"]["$t"] != 0) {
          out += `<div class="course__block">`;
          out += `<h1>${data[i].gsx$namecourse.$t}</h1>`;
          out += `<h2>${data[i].gsx$course.$t}</h2>`;
          out += `<h2>${data[i].gsx$courseday.$t}</h2>`;
          out += `</div>`;
        }
      }
      return out;
    }

    // Covid-19 Регионы //
    function listRegion(data) {
      let out = "";
      for (var i = 0; i < data.length; i++) {
        if (data[i]["gsx$regionon"]["$t"] != 0) {
          out += `<div class="region-blok">`;
          out += `<h1>${data[i].gsx$region.$t}</h2>`;
          out += `<h2>заражений: ${data[i].gsx$regioncases.$t}</h2>`;
          out += `<h2>смертность: ${data[i].gsx$regiondeaths.$t}</h2>`;
          out += `<h2>выздоровело: ${data[i].gsx$regionrecovered.$t}</h2>`;
          out += `</div>`;
        }
      }
      return out;
    }


    // новости анапа news //
    let b = JSON.parse(value[1]);
    let news = b.feed.entry;
    // console.log(news);
    // вызов функции news /// anapa(data) //
    document.querySelector(".commit__page5").innerHTML = anapa(news);

    function anapa(news) {
      let out = "";
      for (var i = 0; i < news.length; i++) {
        if (!news[i].gsx$title1.$t == "") {
          out += `<div class="new__vesti">`;
          out += `<h1>`;
          out += `<a href="${news[i].gsx$url1.$t}">${news[i].gsx$title1.$t}</a>`;
          out += `</h1>`;
          out += `<span>`;
          out += `<img src="https://www.anapa-official.ru${news[i].gsx$img.$t}" alt="${news[i].gsx$title1.$t}">`;
          out += `</span>`;
          out += `<h2>${news[i].gsx$text1.$t}</h2>`;
          out += `</div>`;
        }
      }
      return out;
    }


    // Народный мониторинг temp ///
    let temp = JSON.parse(value[2]);
    //температура воздуха в Анапе//
    document.querySelector(".footer__street").innerHTML =
      "улица: +" + temp.sensors[0].value + " &#8451 ";
    // console.log(temp);
    // TITLE NAME// TEMP ///
    document.querySelector('title').innerHTML = data[2].gsx$update.$t + ' ' + temp.sensors[0].value + " &#8451 ";
    //------------------------////

    // YOUTUBE //

    let d = JSON.parse(value[3]);
    let you = d.feed.entry;
    // console.log(you);

    document.querySelector('.commit__page7').innerHTML = youtube(you);

    function youtube(you) {
      let out = "";
      for (var i = 0; i < you.length; i++) {
        let d = you[i]["gsx$timeout"]["$t"];
        if (d == "Пусто") {} else {
          if (i > 0) {
            out += `<div class="you__vesti">`;
            out += `<h1>`;
            out += `<a href="${you[i].gsx$url.$t}">${you[i].gsx$title.$t}</a>`;
            out += `</h1>`;
            out += `<span>`;
            out += `<img src="${you[i].gsx$img.$t}" alt="${you[i].gsx$title.$t}">`;
            out += `</span>`;
            out += `<h2>`;
            out += `${you[i].gsx$timeout.$t}`
            out += `</h2>`;
            out += `</div>`;
          }
        }
      }
      return out;
    }



  });


  //   document.querySelector(".button__message").onclick = function () {
  //     let message = document.querySelector(".message").value;
  //     const token = "1064268202:AAEwzu8IgZVN5CkfSZDc1x1LQVo-3r6R3TM";
  //     let url =
  //       "https://api.telegram.org/bot" +
  //       token +
  //       "/sendMessage?chat_id=424856047&text=";
  //     let xhttp = new XMLHttpRequest();
  //     xhttp.open("GET", url + message, true);
  //     xhttp.send();
  //     // console.log(this);
  //   };



  // настройки //

  // color background //

  document.querySelector('.btn__view').onclick = function () {
    let color = document.getElementById('color').value;
    if (!color == "") {
      localStorage.setItem('color', color);
      body.style.backgroundColor = color;
    } else {
      alert('строка пуста');
    }
  };

  document.querySelector('.btn__clear').onclick = () => {
    if (!body.style.backgroundColor == "") {
      localStorage.clear('color');
      body.style.backgroundColor = "";
    } else {
      alert('у странице уже белый цвет');
    }
  };



};

/////// ЧАТ ///////

document.querySelector('.hat__btn').addEventListener("click", insert_value);

var script_url =
  "https://script.google.com/macros/s/AKfycbxHXgnvyGy-yt1HksIHkA2HsfvpnDjArBPCV53Z/exec";

// Make an AJAX call to Google Script
function insert_value() {
  let login = document.querySelector(".hat__title").value;
  let pass = document.querySelector(".hat__text").value;

  // console.log(login);
  // console.log(pass);

  var url =
    script_url +
    "?callback=ctrlq&login=" +
    login +
    "&pass=" +
    pass +
    "&action=insert";

  console.log(url);

  var request = jQuery.ajax({
    crossDomain: true,
    url: url,
    method: "GET",
    dataType: "jsonp",
  });
}

function ctrlq(e) {
  // alert(e.result);
  // console.log(e.result);
  document.querySelector(".hat__title").value = "";
  document.querySelector(".hat__text").value = "";
  document.querySelector(".hat__out").innerHTML = e.result;
}
