import React, { useState } from "react";
import { Link } from "react-router-dom";
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
