    async function sendMessage() {
      const msg = document.getElementById("message").value;
      const status = document.getElementById("status");

      if (!msg.trim()) {
        status.textContent = "Пустое сообщение!";
        return;
      }

      status.textContent = "Отправка...";
      try {
        const res = await fetch("https://redpistonbot.vercel.app/api/send", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ message: msg }),
        });
        const data = await res.json();
        status.textContent = data.message;
      } catch (e) {
        status.textContent = "Ошибка отправки.";
      }
    }