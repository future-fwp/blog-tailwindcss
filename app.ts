import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import bodyParser from "body-parser";

const app = express();
const router = express.Router();

// Middleware
app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

// Connect to MongoDB
mongoose
	.connect("mongodb://localhost:27017/formDataDB")
	.then(() => console.log("Connected to MongoDB"))
	.catch((err) => console.error("Could not connect to MongoDB", err));

// Mongoose Schema
const formSchema = new mongoose.Schema({
	title: String,
	description: String,
	detail: String,
});

const Form = mongoose.model("Form", formSchema);

// POST Route
router.post("/", async (req, res) => {
	try {
		const { title, description, detail } = req.body;
		const newForm = new Form({ title, description, detail });
		await newForm.save();
		res.status(201).json(newForm);
	} catch (err) {
		console.error(err);
		res.status(500).json({ error: "Failed to submit form" });
	}
});

// GET Route
router.get("/", async (req, res) => {
	try {
		const forms = await Form.find();
		res.status(200).json(forms);
	} catch (err) {
		console.error(err);
		res.status(500).json({ error: "Failed to fetch data" });
	}
});

// Use the router
app.use("/api/form", router);

const PORT = 5174;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
