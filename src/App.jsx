import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import AddNoteForm from "./components/AddNoteForm/AddNoteForm";
import EditNoteForm from "./components/EditNoteForm/EditNoteForm";
import NotesList from "./components/NotesList/NotesList";

function App() {
	return (
		<>
			<BrowserRouter>
				<div className="container">
					<Header />
					<Routes>
						<Route path="/" element={<NotesList />} />

						<Route path={"/note"}>
							<Route index element={<AddNoteForm />} />
							<Route path=":noteId" element={<EditNoteForm />} />
						</Route>

						<Route path="*" element={<h1>Page not found</h1>}/>
					</Routes>
					{/* <Routes>
						<Route path="/" element={<NotesList/>}/>
						<Route path="/add" element={<AddNoteForm/>}/>
						<Route path="/edit/:id" element={<EditNoteForm/>}/>
					</Routes> */}
				</div>
			</BrowserRouter>
		</>
	);
}

export default App;
