const express = require('express');
const cors = require('cors');
const PORT = process.env.PORT || 5555;

const app = express();

app.use(cors());

// parse requests of content-type - application/json
app.use(express.json());
app.use(express.raw());

// Routes
require('./routes/graph.routes.js')(app);

app.listen(PORT, () => {
  console.log(`Graph POC BE listening on port ${PORT}!`);
});