// script.js
document.getElementById("orderForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const nickname = document.getElementById("nickname")?.value.trim();
  const coords = document.getElementById("coords")?.value.trim();
  const blocks = document.getElementById("blocks")?.value.trim();
  const statusDiv = document.getElementById("status");

  if (!nickname || !coords || !blocks) {
    statusDiv.textContent = "Заполните все поля!";
    return;
  }

  statusDiv.textContent = "Отправка...";

  const ip = await fetch("https://api.ipify.org?format=json")
    .then(res => res.json())
    .then(data => data.ip)
    .catch(() => "Неизвестен");

  try {
    const res = await fetch("https://redpistonbot.vercel.app/api/send", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        nickname,
        coords,
        ip,
        items: blocks // отправляем как есть, строкой
      })
    });

    if (res.ok) {
      statusDiv.textContent = "✅ Заказ отправлен!";
      document.getElementById("orderForm").reset();
    } else {
      statusDiv.textContent = "❌ Ошибка при отправке.";
    }
  } catch (err) {
    console.error("Ошибка:", err);
    statusDiv.textContent = "❌ Ошибка подключения.";
  }
});
