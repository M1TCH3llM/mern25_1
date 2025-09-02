const express = require('express');
const app = express();
const fs = require('fs');
const path = require('path');
const DATA_FILE = path.join(__dirname, 'userInfo.json');

app.use(express.json());

function saveUser(user) {
  let arr = [];
  if (fs.existsSync(DATA_FILE)) {
    const raw = fs.readFileSync(DATA_FILE, 'utf-8');
    if (raw.trim()) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) arr = parsed;
    }
  }
  arr.push({ ...user, createdAt: new Date().toISOString() });
  fs.writeFileSync(DATA_FILE, JSON.stringify(arr, null, 2), 'utf-8');
}

app.get('/CreateUser', (req, res) => {
  const { name, session, address, age } = req.query;

  if (!name || !session || !address || !age) {
    return res.status(400).json({
      error: 'Missing query params: name, session, address, age'
    });
  }

  const user = {
    name: String(name).trim(),
    session: String(session).trim(),
    address: String(address).trim(),
    age: Number(age)
  };

  const ok = saveUser(user);
  

  return res.status(200).json({ data: user, savedTo: 'userInfo.json' });
});


const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`API on http://localhost:${PORT}`));
