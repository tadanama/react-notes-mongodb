import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import "./Header.css";

function Header() {
	// State to toggle display nav links
	const [isOpen, setIsOpen] = useState(false);
	// Search input state
	const [search, setSearch] = useState("");

	return (
		<div className="header-container">
			<h1>Notes</h1>
			<input
				type="text"
				className="search-input"
				placeholder="Search"
				value={search}
				onChange={(e) => setSearch(e.target.value)}
			/>
			<div className="nav-links">
				<ul className={isOpen ? "active" : null}>
					<li>Create note</li>
					<li>My notes</li>
				</ul>
			</div>
			<div className="hamburger-icon" onClick={() => setIsOpen(!isOpen)}>
				<FontAwesomeIcon icon={faBars} />
			</div>
		</div>
	);
}

export default Header;
