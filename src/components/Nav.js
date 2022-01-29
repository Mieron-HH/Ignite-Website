import React, { useState } from "react";
//Animation
import styled from "styled-components";
import { motion } from "framer-motion";
import { fadeIn } from "../animations";
//FontAwesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDragon } from "@fortawesome/free-solid-svg-icons";
//Redux and Route
import { fetchSearch } from "../actions/gamesAction";
import { useDispatch } from "react-redux";

const Nav = () => {
	const dispatch = useDispatch();
	const [textInput, setTextInput] = useState("");

	const inputHandler = (e) => {
		setTextInput(e.target.value);
	};

	const submitSearch = (e) => {
		e.preventDefault();
		dispatch(fetchSearch(textInput));
		setTextInput("");
	};

	const clearSearched = () => {
		dispatch({ type: "CLEAR_SEARCHED" });
	};

	return (
		<StyledNav variants={fadeIn} initial="hidden" animate="show">
			<Logo onClick={clearSearched}>
				<FontAwesomeIcon className="logo-icon" icon={faDragon} size="2x" />
				<h1>Ignite</h1>
			</Logo>
			<form className="search" onSubmit={submitSearch}>
				<input type="text" value={textInput} onChange={inputHandler} />
				<button type="submit">Search</button>
			</form>
		</StyledNav>
	);
};

const StyledNav = styled(motion.div)`
	padding: 3rem 5rem;
	text-align: center;

	input {
		width: 30%;
		font-size: 1.5rem;
		padding: 0.5rem;
		border: none;
		margin-top: 1rem;
		box-shadow: 0px 0px 30px rgba(0, 0, 0, 0.2);
	}

	button {
		font-size: 1.5rem;
		border: none;
		padding: 0.5rem 2rem;
		cursor: pointer;
		background: #ff7676;
		color: white;
	}

	@media screen and (max-width: 850px) {
		padding: 2rem;

		input {
			width: 70%;
			font-size: 1.45rem;
			padding: 0.5rem;
		}

		button {
			padding: 0.5rem 0.8rem;
		}
	}
`;

const Logo = styled(motion.div)`
	display: flex;
	justify-content: center;
	padding: 1rem;
	cursor: pointer;

	.logo-icon {
		margin-right: 0.5rem;
	}
`;

export default Nav;
