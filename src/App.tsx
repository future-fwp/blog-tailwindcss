import React from "react";
import { Link, Route, Routes, useParams } from "react-router-dom";
import "./App.css";
import axios from "axios";

// function useDataFormAdded() {
// 	const [formAdded, setFormAdded] = React.useState<boolean>(false);
// }

function useDisplayAllElement({ urlName }: { urlName: string }) {
	const [elements, setElements] = React.useState<any[]>([]);

	React.useEffect(() => {
		axios
			.get(urlName)
			.then((response) => setElements(response.data))
			.catch((error) => console.error("Error fetching elements:", error));
	}, [urlName]);

	return elements;
}

function useFilter<T>(elements: T[], filterFn: (element: T) => boolean): T[] {
	return React.useMemo(() => elements.filter(filterFn), [elements, filterFn]);
}

function CardDataElement({ ...props }) {
	return (
		<li className="card-container">
			<img
				src={props.imageUrl}
				alt="Blog Image"
				width={200}
				height={120}
			/>
			<div className="flex flex-col ">
				<h3>{props.title}</h3>
				<p>{props.description}</p>
				<Link
					to={`/detail/${props.id}`}
					className="view-details"
				>
					View Details
				</Link>
			</div>
		</li>
	);
}

function BlogList() {
	const elements = useDisplayAllElement({ urlName: "http://localhost:5174/api/form" });
	// const contentData = [
	// 	{
	// 		id: 1,
	// 		imageUrl: "https://via.placeholder.com/120",
	// 		title: "Introduction to JavaScript",
	// 		description: "Learn the basics of JavaScript, including syntax, variables, and functions.",
	// 		detail:
	// 			"JavaScript is a versatile and powerful language widely used for building dynamic and interactive websites. It allows developers to manipulate web elements, handle user input, and manage data efficiently. Whether you want to create engaging user experiences or build complex web applications, understanding the fundamentals of JavaScript is essential. This course takes you through the basics, covering syntax, data types, control structures, and essential functions. By the end, you will be comfortable writing basic scripts and ready to dive deeper into more advanced topics.",
	// 	},
	// 	{
	// 		id: 2,
	// 		imageUrl: "https://via.placeholder.com/120",
	// 		title: "Understanding CSS Flexbox",
	// 		description: "A comprehensive guide to mastering CSS Flexbox for modern web layouts.",
	// 		detail:
	// 			"CSS Flexbox is a layout model designed to provide a more efficient way to arrange items within a container. By using flex properties, developers can control the size, position, and spacing of items in a predictable manner. Flexbox simplifies the process of creating responsive and flexible designs, making it easier to align and distribute space among items in a container. This guide covers the core concepts such as flex containers, flex directions, alignment, and spacing techniques, helping you master one of CSS’s most essential layout modules.",
	// 	},
	// 	{
	// 		id: 3,
	// 		imageUrl: "https://via.placeholder.com/120",
	// 		title: "Responsive Web Design with Tailwind CSS",
	// 		description: "Discover how to create responsive and mobile-first websites using Tailwind CSS.",
	// 		detail: `Creating responsive websites is no longer a luxury but a necessity in today’s mobile-first world. Tailwind CSS offers a utility-first approach, making it incredibly easy to implement responsive designs without writing custom CSS. By leveraging pre-defined classes, you can focus more on structure and design consistency while building projects faster. In this course, you'll learn how to utilize Tailwind's responsive classes effectively, create mobile-first layouts, and refine your designs for different devices with ease.`,
	// 	},
	// 	{
	// 		id: 4,
	// 		imageUrl: "https://via.placeholder.com/120",
	// 		title: "Advanced React Hooks",
	// 		description: "Explore advanced concepts with React Hooks such as useReducer and custom hooks.",
	// 		detail: `As you progress with React, understanding advanced hooks like useReducer, useContext, and custom hooks becomes crucial for managing state and side effects effectively. Advanced hooks allow you to centralize logic, avoid repetitive code, and create reusable components in a more structured way. This course will help you grasp the intricate workings of these hooks through practical examples and real-world scenarios, empowering you to write cleaner, more efficient code in your React applications.`,
	// 	},
	// 	{
	// 		id: 5,
	// 		imageUrl: "https://via.placeholder.com/120",
	// 		title: "PHP for Beginners",
	// 		description: "An introduction to PHP scripting for dynamic web applications and back-end development.",
	// 		detail: `PHP is a foundational language for web development, widely adopted for creating dynamic and data-driven websites. It seamlessly integrates with HTML and databases like MySQL to serve dynamic content to users. In this introductory course, you'll learn the core concepts of PHP, from setting up your development environment to writing scripts that interact with databases. By understanding the basics, you’ll be prepared to build web applications, handle form data, and enhance the functionality of your websites.`,
	// 	},
	// ];

	// State to hold blog data from the backend
	// Function to fetch the list of blogs from the backend API (useEffect)

	return (
		// Render a list of blog titles, and add a button/link to view details
		<ul className="card-wrapper">
			{elements?.map((data, index) => (
				<CardDataElement
					key={JSON.stringify(data) + index}
					{...data}
				/>
			))}
		</ul>
	);
}

// BlogDetail Component
// Display the full content of a selected blog
function BlogDetail() {
	const elements = useDisplayAllElement({ urlName: "http://localhost:5174/api/form" });

	// State to hold the selected blog details
	// Function to fetch details of a blog based on its ID
	const { blogid } = useParams<{ blogid: string }>();
	if (!blogid) {
		return;
	}
	const filteredData = useFilter(elements, (data) => data.id === parseInt(blogid));

	return (
		// Render the blog title and full content here
		<div className="bg-black text-white h-[calc(100vh-30px)] p-3">
			<h3>{filteredData[0]?.title}</h3>
			<p className="mb-2">{filteredData[0]?.detail}</p>
			<p className="mb-2">{!filteredData[0] && <div>Not found data</div>}</p>
			<Link
				to="/"
				className="backtohome"
			>
				Back to home
			</Link>
			<Link
				to="/form"
				className="addtoform"
			>
				Click me to add form
			</Link>
		</div>
	);
}

// BlogForm Component
// Form to create a new blog post
function BlogForm() {
	// State to hold title and content inputs
	// Handle input changes and form submission
	// Add form validation to check that both title and content are provided

	const [title, setTitle] = React.useState<string>("");
	const [description, setDescription] = React.useState<string>("");
	const [detail, setDetail] = React.useState<string>("");
	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
		e.preventDefault();
		try {
			const response = await axios.post("http://localhost:5174/api/form", {
				title: title,
				description: description,
				detail: detail,
			});
			console.log("Form submitted successfully:", response.data);
		} catch (err) {
			console.error("Error submitting form:", err);
		}
	};

	return (
		// Render an input field for the title, a textarea for the content, and a submit button
		<div className="bg-black flex justify-center items-center h-[calc(100vh-30px)]">
			<form
				onSubmit={handleSubmit}
				className="form-container"
			>
				<div className="w-full px-6 ">
					<label htmlFor="title">Title</label>
					<br />
					<input
						type="text"
						placeholder="title"
						value={title}
						onChange={(e) => setTitle(e.target.value)}
					/>
					<br />
					<label htmlFor="description">description</label>
					<br />
					<input
						type="text"
						placeholder="description"
						value={description}
						onChange={(e) => setDescription(e.target.value)}
					/>
					<br />
					<label htmlFor="detail">detail</label>
					<br />
					<input
						type="text"
						placeholder="detail"
						value={detail}
						onChange={(e) => setDetail(e.target.value)}
					/>
					<br />
					<button type="submit">Submit</button>
				</div>
			</form>
		</div>
	);
}

// App Component
// Main entry point that renders BlogList, BlogDetail, and BlogForm components
function App() {
	return (
		<Routes>
			<Route
				path="/"
				element={
					<>
						<div className="navbar">
							<Link to="/">BlogList</Link>
							<Link to="/detail/123444">BlogDetail</Link>
							<Link to="/form">BlogForm</Link>
						</div>{" "}
						<BlogList></BlogList>
					</>
				}
			></Route>
			<Route
				path="/detail/:blogid"
				element={
					<>
						<div className="navbar">
							<Link to="/">BlogList</Link>
							<Link to="/detail/123444">BlogDetail</Link>
							<Link to="/form">BlogForm</Link>
						</div>
						<BlogDetail></BlogDetail>
					</>
				}
			></Route>
			<Route
				path="/form"
				element={
					<>
						<div className="navbar">
							<Link to="/">BlogList</Link>
							<Link to="/detail/123444">BlogDetail</Link>
							<Link to="/form">BlogForm</Link>
						</div>
						<BlogForm></BlogForm>
					</>
				}
			></Route>
			<Route
				path="*"
				element={<div>Not found</div>}
			></Route>
		</Routes>

		// Route between BlogList, BlogDetail, and BlogForm based on the current page state
	);
}
export default App;

// next part useState and callback to useFilter and useDisplayAllElement
// return the array of object to show the value
