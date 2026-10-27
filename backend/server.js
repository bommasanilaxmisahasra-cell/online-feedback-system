const express = require("express");
const path = require("path");

const app = express();
const PORT = 5000;

const feedbackRoutes = require("./routes/feedbackRoutes");

app.use(express.json());

app.use(
    express.static(path.join(__dirname, "..", "frontend"))
);

app.use("/api/feedback", feedbackRoutes);

app.get("/", (req, res) => {
    res.sendFile(
        path.join(__dirname, "..", "frontend", "index.html")
    );
});

app.listen(PORT, () => {
    console.log("Server running at http://localhost:" + PORT);
});