import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { createContext, useState } from "react";
import Header from "./components/Header/Header";
import AddNoteForm from "./components/AddNoteForm/AddNoteForm";
import EditNoteForm from "./components/EditNoteForm/EditNoteForm";
import NotesList from "./components/NotesList/NotesList";

export const SearchContext = createContext();

function App() {
	const [search, setSearch] = useState("");

	return (
		<>
			<SearchContext.Provider value={{ search, setSearch }}>
				<div className="container">
					<Header />
					<Routes>
						<Route path="/" element={<NotesList />} />

						<Route path={"/note"}>
							<Route index element={<AddNoteForm />} />
							<Route path=":noteId" element={<EditNoteForm />} />
						</Route>

						<Route path="*" element={<h1>Page not found</h1>} />
					</Routes>
					{/* <Routes>
						<Route path="/" element={<NotesList/>}/>
						<Route path="/add" element={<AddNoteForm/>}/>
						<Route path="/edit/:id" element={<EditNoteForm/>}/>
					</Routes> */}
				</div>
			</SearchContext.Provider>
		</>
	);
}

export default App;
