const express = require('express');
const app = express();
const PORT = 3001;

const personalDetails = {
  name: "Mitchell Morgan",
  age: 33,
  location: "Denver, Colorado",
  email: "mitchell@example.com",
  interests: ["Technology", "Cars", "Fitness"],
  profession: "Software Developer"
};

app.get('/api/details', (req, res) => {
  res.json(personalDetails);
});


app.listen(PORT, () => {
  console.log(`API running at http://localhost:${PORT}/api/details`);
});