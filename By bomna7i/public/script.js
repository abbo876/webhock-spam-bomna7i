async function startSending() {
    const message = document.getElementById("message").value;
    const webhook = document.getElementById("webhook").value;
    const count = parseInt(document.getElementById("count").value);
    const delay = parseInt(document.getElementById("delay").value);
  
    if (!webhook || !message || !count || !delay) {
      alert("يرجى تعبئة جميع الحقول");
      return;
    }
  
    await fetch("/start", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message, webhook, count, delay }),
    });
  }
  
  async function stopSending() {
    await fetch("/stop", {
      method: "POST",
    });
  }
  