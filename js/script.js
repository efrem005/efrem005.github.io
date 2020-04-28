const a = document.querySelector(".data-date");

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

  // Народный мониторинг

  function narod() {
    // // 1. Создаём новый объект XMLHttpRequest
    var xhr = new XMLHttpRequest();

    // // 2. Конфигурируем его: GET-запрос на URL 'phones.json'
    xhr.open(
      "GET",
      "https://narodmon.ru/api?cmd=sensorsValues&sensors=30847&uuid=498b547435bb46df9ab4a46ccdf9b5cd&api_key=sGvnAVWPfAXty&lang=ru",
      false
    );

    // let user = JSON.parse(xhr.response);
    // xhr.setRequestHeader('Content-Type', 'application/json');

    // // 3. Отсылаем запрос
    xhr.send();

    let data = JSON.parse(xhr.response);

    // // // 4. Если код ответа сервера не 200, то это ошибка
    if (xhr.status != 200) {
      // //   // обработать ошибку
      console.log(xhr.status + ": " + xhr.statusText); // пример вывода: 404: Not Found
    } else {
      // //   // вывести результат

      // console.log(data.sensors[0].value); // responseText -- текст ответа.
      document.querySelector(".footer__street").innerHTML =
        "улица: " + data.sensors[0].value + " &#8451";
      setTimeout(narod, 120000);
    }
    return
  }

  narod();


  // google Sheet

  function covid() {
    let getJSON = function (url, callback) {
      let xhr = new XMLHttpRequest();
      xhr.open("GET", url, true);
      xhr.responseType = "json";
      xhr.onload = function () {
        let status = xhr.status;
        if (status === 200) {
          callback(null, xhr.response);
        } else {
          callback(status, xhr.response);
        }
      };
      xhr.send();
    };

    getJSON(
      "https://spreadsheets.google.com/feeds/list/1gZ41L7djGnCzH0m1MZN8FmgL0OCuIn4U2rhe6QTWLmM/2/public/values?alt=json",
      function (err, data) {
        // console.log(data);
        if (err !== null) {
          alert("Error: " + err);
        } else {
          data = data.feed.entry;
          // console.log(data);

          document.querySelector(".temp__sheet").innerHTML =
            "Вода: " + data[0].gsx$weather.$t + " &#8451";
          document.querySelector(".foofer__water").innerHTML =
            "Вода: " + data[0].gsx$weather.$t + " &#8451";
          // Новости анапа

          document.querySelector(".commit__page3").innerHTML = covid1(data);
          document.querySelector(".update__data").innerHTML = update(data);
          document.querySelector(".commit__page1").innerHTML = usd(data);
          document.querySelector(".commit__page4").innerHTML = listRegion(data);

          setTimeout(covid, 120000);
        }
      }
    );

    // COVID-19
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

    function update(data) {
      const now = new Date();
      const day = now.getDate();
      let out = "";
      let upDay = data[1].gsx$update.$t;
      console.log(data);
      if (upDay == day) {
        out += `<span class="data__green">обновлено</span>`;
      } else if (upDay == "") {
        out += `<span class="data__red">пусто</span>`;
      } else {
        out += `<span class="data__red">не обновлено</span>`;
      }
      return out;
    }

    // Курс доллара
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

    // Covid-19 Регионы
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
  }

  covid();

  ////

  // НОВОСТИ АНАПА

  function newNow() {
    let getJSON = function (url, callback) {
      let xhr = new XMLHttpRequest();
      xhr.open("GET", url, true);
      xhr.responseType = "json";
      xhr.onload = function () {
        let status = xhr.status;
        if (status === 200) {
          callback(null, xhr.response);
        } else {
          callback(status, xhr.response);
        }
      };
      xhr.send();
    };

    getJSON(
      "https://spreadsheets.google.com/feeds/list/1gZ41L7djGnCzH0m1MZN8FmgL0OCuIn4U2rhe6QTWLmM/10/public/values?alt=json",
      function (err, data) {
        // console.log(data);
        if (err !== null) {
          alert("Error: " + err);
        } else {
          data = data.feed.entry;
          // console.log(data);

          // Новости анапа

          document.querySelector(".commit__page5").innerHTML = anapa(data);

          setTimeout(newNow, 120000);
        }
      }
    );

    function anapa(data) {
      let out = "";
      for (var i = 0; i < data.length; i++) {
        if (data[i]["gsx$on"]["$t"] != 0) {
          out += `<div class="new__vesti">`;
          out += `<h1>`;
          out += `<a href="${data[i].gsx$url1.$t}">${data[i].gsx$title1.$t}</a>`;
          out += `</h1>`;
          out += `<span>`;
          out += `<img src="https://www.anapa-official.ru${data[i].gsx$img.$t}" alt="${data[i].gsx$title1.$t}">`;
          out += `</span>`;
          out += `<h2>${data[i].gsx$text1.$t}</h2>`;
          out += `</div>`;
        }
      }
      return out;
    }
  }
  newNow();

  // Курс доллара

  function test() {
    // 1. Создаём новый объект XMLHttpRequest
    let xhr = new XMLHttpRequest();
    let list = 4;
    let url = `https://spreadsheets.google.com/feeds/list/1gZ41L7djGnCzH0m1MZN8FmgL0OCuIn4U2rhe6QTWLmM/${list}/public/values?alt=json`;

    // 2. Конфигурируем его: GET-запрос на URL 'phones.json'
    xhr.open("GET", url, false);

    // 3. Отсылаем запрос
    xhr.send();

    let data = JSON.parse(xhr.response);

    // 4. Если код ответа сервера не 200, то это ошибка
    if (xhr.status != 200) {
      // обработать ошибку
      console.log(xhr.status + ": " + xhr.statusText); // пример вывода: 404: Not Found
    } else {
      // вывести результат
      data = data.feed.entry;
      console.log(data); // responseText -- текст ответа.
      document.querySelector(".selectID").innerHTML = listRegion(data);
    }
  }

  function listRegion(data) {
    let out = "";
    for (var i = 0; i < data.length; i++) {
      // if (data[i]['gsx$on']['$t']>1){
      out += `<option value=”Краснодарский”>${data[i].gsx$location.$t}</option>`;
      // }
    }
    return out;
  }

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

  // function data() {
  //     let date = new Date();
  //     const t = date.getHours()+ ':' + date.getMinutes();
  //     document.querySelector('.data').innerHTML = t;
  //     setTimeout(data, 1000);
  // }

  // data();

  // Google Sheet

  var script_url =
    "https://script.google.com/macros/s/AKfycbxHXgnvyGy-yt1HksIHkA2HsfvpnDjArBPCV53Z/exec";

  // Make an AJAX call to Google Script
  function insert_value() {
    let login = document.querySelector("#login").value;
    let pass = document.querySelector("#pass").value;
    let phone = document.querySelector("#phone").value;

    console.log(phone);

    var url =
      script_url +
      "?callback=ctrlq&login=" +
      login +
      "&pass=" +
      pass +
      "&phone=" +
      phone +
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
    alert(e.result);
    console.log("Yes...");
    document.querySelector("#name").value = "";
  }
};