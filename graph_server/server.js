const express = require('express');
const cors = require('cors');
const PORT = process.env.PORT || 5555;

const app = express();

app.use(cors());

// parse requests of content-type - application/json
app.use(express.json());

app.listen(PORT, (req,res) => {
  logger.info(`Graph POC BE listening on port ${PORT}!`);
});