const express = require("express");
const pool = require("./config/db");
const contactUsRoutes = require("./api/routes/contactUsRouters");
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

pool.connect((err, client, release) => {
    if (err) {
      return console.error("Error acquiring client", err.stack);
    }
    console.log("Connected to PostgreSQL database");
    release();
  });

app.get("/testingDBRoute", async (req, res) => {
    try {
      const result = await pool.query("SELECT NOW()");
      res.send(`Current time from PostgreSQL: ${result.rows[0].now}`);
    } catch (error) {
      console.error(error);
      res.status(500).send("Error fetching data from database");
    }
  });


app.use(cors());

app.use(express.json());

app.use("/api", contactUsRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
