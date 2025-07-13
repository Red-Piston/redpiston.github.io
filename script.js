    const btn = document.getElementById('sendBtn');
    const statusDiv = document.getElementById('status');
    let cooldown = 0;
    let cooldownTimer;

    btn.onclick = async function() {
      if (cooldown > 0) return;
      const message = document.getElementById('message').value.trim();
      if (!message) return;

      btn.disabled = true;
      statusDiv.textContent = "Отправка...";
      statusDiv.className = "";
      try {
        const res = await fetch('https://redpistonbot.vercel.app/api/send', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ text: message })
        });
        const data = await res.json();
        if (data.ok) {
          statusDiv.textContent = "Отправлено";
          document.getElementById('message').value = "";
          cooldown = 30;
          statusDiv.className = "";
          cooldownTimer = setInterval(() => {
            cooldown--;
            if (cooldown > 0) {
              statusDiv.textContent = `Подождите ${cooldown} секунд для след. отправки`;
              statusDiv.className = "wait";
              btn.disabled = true;
            } else {
              statusDiv.textContent = "";
              statusDiv.className = "";
              btn.disabled = false;
              clearInterval(cooldownTimer);
            }
          }, 1000);
        } else {
          statusDiv.textContent = data.error || "Ошибка отправки";
          statusDiv.className = "wait";
        }
      } catch (e) {
        statusDiv.textContent = "Ошибка соединения";
        statusDiv.className = "wait";
      } finally {
        if (cooldown === 0) btn.disabled = false;
      }
    };