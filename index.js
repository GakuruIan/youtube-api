const express = require("express");
const router = require("./router/routes");
const moongose = require("mongoose");

require("dotenv").config();

const PORT = process.env.PORT || 3000;

moongose
  .connect(process.env.LOCAL_URI)
  .then(() => console.log("database connected successfully"))
  .catch((err) => console.log(err));

const app = express();

//body parser
app.use(express.json());
app.use(express.urlencoded({extended:true}));


app.use(router);

app.listen(PORT, () => {
  console.log(`server started on http://localhost:${PORT}`);
});
