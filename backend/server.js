const express = require("express");
const dotenv = require('dotenv');
const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const patientRoutes = require("./routes/patientRoutes");
const inspectorRoutes = require("./routes/inspectorRoutes");
const doctorRoutes = require("./routes/doctorRoutes");
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const path = require('path');

dotenv.config();
connectDB();
app.use(express.json());
app.use(userRoutes);
app.use(patientRoutes);
app.use(inspectorRoutes);
app.use(doctorRoutes);

// --------------------------deployment------------------------------
__dirname = path.resolve();

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/build")));

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"))
  );
} else {
  app.get("/", (req, res) => {
    res.send("API is running..");
  });
}
// --------------------------deployment------------------------------

const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

app.listen(PORT,console.log(`Server started on port ${PORT}`));