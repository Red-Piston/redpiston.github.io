    async function sendOrder() {
      const nickname = document.getElementById('nickname').value.trim();
      const coords = document.getElementById('coords').value.trim();
      const blocks = document.getElementById('blocks').value.trim();
      const status = document.getElementById('status');

      if (!nickname || !coords || !blocks) {
        status.textContent = "Пожалуйста, заполните все поля.";
        return;
      }

      status.textContent = "Отправка...";

      try {
        const res = await fetch("https://redpistonbot.vercel.app/api/send", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            nickname,
            coords,
            blocks
          }),
        });

        const data = await res.json();
        status.textContent = data.message || "Отправлено.";
      } catch (err) {
        status.textContent = "Ошибка при отправке.";
        console.error(err);
      }
    }