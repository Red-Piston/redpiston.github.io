window.onload = function () {
  const btn = document.getElementById("sendBtn");
  if (!btn) {
    alert("Кнопка не найдена!");
    return;
  }

  btn.onclick = sendOrder;
};

function sendOrder() {
  console.log("Кнопка нажата!");

  const username = document.getElementById("username").value;
  const coords = document.getElementById("coords").value;
  const blocks = document.getElementById("blocks").value;

  if (!username || !coords || !blocks) {
    alert("Заполни все поля!");
    return;
  }

  const items = blocks.split("\n").map(line => {
    const [name, countRaw, priceRaw] = line.split(",").map(e => e.trim());
    return {
      name,
      count: parseInt(countRaw),
      price: parseInt(priceRaw),
    };
  });

  fetch("https://redpistonbot.vercel.app/api/send", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      username,
      coords,
      ip: "Неизвестен",
      items
    })
  })
    .then(res => res.json())
    .then(data => {
      console.log(data);
      if (data.ok) {
        alert("Заказ отправлен!");
      } else {
        alert("Ошибка отправки.");
      }
    })
    .catch(err => {
      console.error("Ошибка запроса:", err);
      alert("Не удалось отправить заказ.");
    });
}
