import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { Provider } from "react-redux";
import { store } from "./app/store.js";
import { getAllNotes } from "./features/notes/notesSlice.js";
import { BrowserRouter, Routes, Route } from "react-router-dom";

store.dispatch(getAllNotes());

createRoot(document.getElementById("root")).render(
	<StrictMode>
		<Provider store={store}>
			<BrowserRouter>
				<Routes>
					<Route path="/react-notes-mongodb/*" element={<App />} />
				</Routes>
			</BrowserRouter>
		</Provider>
	</StrictMode>
);