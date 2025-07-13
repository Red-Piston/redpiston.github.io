  async function sendMessage() {
    const message = document.getElementById("message").value;
    const status = document.getElementById("status");
    status.textContent = "Отправка...";

    try {
      const response = await fetch("https://redpistonbot.vercel.app/api/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ text: message })  // <-- ВАЖНО!
      });

      const data = await response.json();

      if (response.status === 429) {
        status.textContent = data.error || "Подождите перед следующей отправкой.";
      } else if (response.ok) {
        status.textContent = "Отправлено!";
      } else {
        status.textContent = data.error || "Ошибка при отправке.";
      }

    } catch (e) {
      status.textContent = "Ошибка соединения.";
    }
  }