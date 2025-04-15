const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

let sending = false;
let interval;

app.post('/start', async (req, res) => {
  const { webhook, message, count, delay } = req.body;
  let sent = 0;
  sending = true;

  interval = setInterval(async () => {
    if (!sending || sent >= count) {
      clearInterval(interval);
      sending = false;
      return;
    }

    try {
      await axios.post(webhook, { content: message });
      console.log(`Sent ${sent + 1}/${count}`);
      sent++;
    } catch (err) {
      console.error('Error sending message:', err.message);
    }
  }, delay);

  res.send({ success: true });
});

app.post('/stop', (req, res) => {
  sending = false;
  clearInterval(interval);
  res.send({ success: true });
});

app.listen(port, () => {
  console.log(`Dashboard running on port ${port}`);
});
