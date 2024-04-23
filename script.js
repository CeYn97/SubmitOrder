window.addEventListener("DOMContentLoaded", function () {
  [].forEach.call(document.querySelectorAll(".tel"), function (input) {
    var keyCode;
    function mask(event) {
      event.keyCode && (keyCode = event.keyCode);
      var pos = this.selectionStart;
      if (pos < 3) event.preventDefault();
      var matrix = "+7 (___) ___-__-__",
        i = 0,
        def = matrix.replace(/\D/g, ""),
        val = this.value.replace(/\D/g, ""),
        new_value = matrix.replace(/[_\d]/g, function (a) {
          return i < val.length ? val.charAt(i++) || def.charAt(i) : a;
        });
      i = new_value.indexOf("_");
      if (i != -1) {
        i < 5 && (i = 3);
        new_value = new_value.slice(0, i);
      }
      var reg = matrix
        .substr(0, this.value.length)
        .replace(/_+/g, function (a) {
          return "\\d{1," + a.length + "}";
        })
        .replace(/[+()]/g, "\\$&");
      reg = new RegExp("^" + reg + "$");
      if (
        !reg.test(this.value) ||
        this.value.length < 5 ||
        (keyCode > 47 && keyCode < 58)
      )
        this.value = new_value;
      if (event.type == "blur" && this.value.length < 5) this.value = "";
    }

    input.addEventListener("input", mask, false);
    input.addEventListener("focus", mask, false);
    input.addEventListener("blur", mask, false);
    input.addEventListener("keydown", mask, false);
  });
});

const BASE_URL = "https://davsrlmdyznopjxkmqaf.supabase.co/rest/v1";
const PUBLIC_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRhdnNybG1keXpub3BqeGttcWFmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTM4Nzc4MzMsImV4cCI6MjAyOTQ1MzgzM30.MYmKNZDiClB94hgAJ6IOq2lS7Zev79_uNNXFmC7Pbek";

const form = document.querySelector("form");
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const name = form.querySelector("input[name=name]").value;
  const tel = form.querySelector("input[name=tel]").value;
  const class_ = form.querySelector("select").value;
  console.log(class_);

  /* console.log({
    name,
    tel,
    class_,
  }); */

  fetch(`${BASE_URL}/orders`, {
    method: "POST",
    headers: {
      apikey: PUBLIC_KEY,
      Authorization: `Bearer ${PUBLIC_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name,
      phone: tel,
      class: class_,
    }),
  })
    .then((response) => response.json())
    .then((json) => console.log(json));
});

function change() {
  document.getElementById("myButton1").value = "Отправлено";
}
