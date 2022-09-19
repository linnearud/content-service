const express = require("express");
const cors = require("cors");
const router = require("./routes");
const formidableMiddleware = require("express-formidable");

const app = express();

const corsOptions = {
  origin: "*",
};

app.use(cors(corsOptions));
app.use(formidableMiddleware());

require("./routes.js")(app);

// set port, listen for requests
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
