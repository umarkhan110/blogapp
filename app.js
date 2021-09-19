const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });
require('./db/conn');
const cors = require("cors");
const PORT = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use("/", require("./routes/routes"));
app.use("/blog", require("./routes/blogroutes"))

if (process.env.NODE_ENV == "production") {
    app.use(express.static("frontend/build"));
    const path = require("path");
    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html')
        );
    })
}


app.listen(PORT, () => { console.log("HI man") });
