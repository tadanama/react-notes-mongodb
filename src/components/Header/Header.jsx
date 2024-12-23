import React, { useState, useContext } from "react";
import { SearchContext } from "../../App";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import "./Header.css";

function Header() {
	// State to toggle display nav links
	const [isOpen, setIsOpen] = useState(false);
	// Search input state
	// const [search, setSearch] = useState("");

	// Get the search useState hook through the SearchContext in App component
	const { search, setSearch } = useContext(SearchContext);
	console.log(search);

	return (
		<div className="header-container">
			<h1>Notes</h1>
			<input
				type="text"
				className="search-input"
				placeholder="Search by title"
				value={search}
				onChange={(e) => setSearch(e.target.value)}
			/>
			<div className="nav-links">
				<ul className={isOpen ? "active" : null}>
					<Link to={"/note"}>
						<li>Create note</li>
					</Link>
					<Link to={"/"}>
						<li>My notes</li>
					</Link>
				</ul>
			</div>
			<div className="hamburger-icon" onClick={() => setIsOpen(!isOpen)}>
				<FontAwesomeIcon icon={faBars} />
			</div>
		</div>
	);
}

export default Header;
