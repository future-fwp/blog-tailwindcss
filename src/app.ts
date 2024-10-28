// server.js
import express from "express";
import cors from "cors"; // Add this to handle CORS issues

const app = express();
const PORT = 5173;

// Middleware to parse JSON and enable CORS
app.use(express.json());
app.use(cors());

// Sample POST route
app.post("/api/data", (req, res) => {
	console.log(req.body);
	res.json({ message: "Data received!" });
});

// Sample GET route
app.get("/api/data", (req, res) => {
	res.json({ message: "Hello, this is your data!" });
});

app.listen(PORT, () => {
	console.log(`Server running on http://localhost:${PORT}`);
});
