import React from "react";
//Styling and Animation
import styled from "styled-components";
import { motion } from "framer-motion";
//Redux
import { useSelector } from "react-redux";
import { useHistory } from "react-router";
import { smallImage } from "../util";
//Fontawesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faPlaystation,
	faXbox,
	faSteam,
	faApple,
} from "@fortawesome/free-brands-svg-icons";
import {
	faGamepad,
	faStar as faStarFull,
	faStarHalf,
} from "@fortawesome/free-solid-svg-icons";
import { faStar as faStarEmpty } from "@fortawesome/free-regular-svg-icons";

const GameDetail = ({ pathId }) => {
	const history = useHistory();
	//Exit Detail
	const exitDetailHandler = (e) => {
		const element = e.target;
		if (element.classList.contains("shadow")) {
			document.body.style.overflow = "auto";
			history.push("/");
		}
	};

	const getPlatform = (platform, id, name) => {
		switch (platform) {
			case "PlayStation 4":
				return faPlaystation;
			case "PlayStation 5":
				return faPlaystation;
			case "Xbox One":
				return faXbox;
			case "Xbox Series S/X":
				return faXbox;
			case "PC":
				return faSteam;
			case "Nintendo Switch":
				return faGamepad;
			case "iOS":
				return faApple;
			default:
				return faGamepad;
		}
	};

	// Get Stars
	const getStars = () => {
		const stars = [];
		const rating = game.rating;
		let idCounter = 0;
		console.log(rating);
		for (let i = 0; i < 5; i++) {
			if (i < Math.floor(rating)) {
				stars.push(
					<FontAwesomeIcon
						style={{ color: "orange" }}
						key={idCounter}
						icon={faStarFull}
					/>
				);
			} else if (i >= Math.floor(rating) && rating % i < rating) {
				stars.push(
					<FontAwesomeIcon
						style={{ color: "orange" }}
						key={idCounter}
						icon={faStarHalf}
					/>
				);
			} else {
				stars.push(
					<FontAwesomeIcon
						style={{ color: "orange" }}
						key={idCounter}
						icon={faStarEmpty}
					/>
				);
			}
			idCounter++;
		}

		return stars;
	};

	//Data
	const { game, screen, isLoading } = useSelector((state) => state.detail);

	return (
		<>
			{!isLoading && (
				<CardShadow className="shadow" onClick={exitDetailHandler}>
					<Detail layoutId={pathId}>
						<Stats>
							<div className="rating">
								<motion.h3 layoutId={`title ${pathId}`}>{game.name}</motion.h3>
								<p>Rating:</p>
								{getStars()}
							</div>

							<Info>
								<h3>Platforms</h3>
								<Platforms>
									{game.platforms.map((data) => (
										<FontAwesomeIcon
											icon={getPlatform(data.platform.name)}
											key={data.platform.id}
											data-bs-toggle="tooltip"
											data-bs-placement="bottom"
											title={data.platform.name}
											id="platform-icons"
										/>
									))}
								</Platforms>
							</Info>
						</Stats>

						<Media>
							<motion.img
								layoutId={`image ${pathId}`}
								src={smallImage(game.background_image, 1280)}
								alt={game.background_image}
							/>
						</Media>

						<Description>
							<p>{game.description_raw}</p>
						</Description>

						<div className="gallery">
							{screen.results.map((screen) => (
								<img
									src={smallImage(screen.image, 1280)}
									key={screen.id}
									alt={screen.image}
								/>
							))}
						</div>
					</Detail>
				</CardShadow>
			)}
		</>
	);
};

const CardShadow = styled(motion.div)`
	width: 100%;
	min-height: 100vh;
	overflow-y: scroll;
	background: rgba(0, 0, 0, 0.5);
	position: fixed;
	top: 0;
	left: 0;
	z-index: 5;

	&::-webkit-scrollbar {
		width: 0.5rem;
	}

	&::-webkit-scrollbar-thumb {
		background-color: #ff7676;
	}

	&::-webkit-scrollbar-track {
		background: white;
	}
`;

const Detail = styled(motion.div)`
	width: 80%;
	border-radius: 1rem;
	padding: 2rem 5rem;
	background: white;
	position: absolute;
	left: 10%;
	color: black;
	z-index: 10;
	margin-bottom: 1rem !important;

	img {
		width: 100%;
	}

	@media screen and (max-width: 700px) {
		width: 90%;
		padding: 0.5rem 1rem;
		border-radius: 0.5rem;
		left: 5%;
		margin-top: 1rem;
	}
`;

const Stats = styled(motion.div)`
	display: flex;
	align-items: center;
	justify-content: space-between;

	@media screen and (max-width: 700px) {
		.rating {
			font-size: 0.8rem;

			p {
				font-size: 0.8rem;
			}

			h3 {
				font-size: 0.8rem;
			}
		}
	}
`;

const Info = styled(motion.div)`
	text-align: center;

	@media screen and (max-width: 700px) {
		font-size: 0.8rem;
	}
`;

const Platforms = styled(motion.div)`
	display: flex;
	justify-content: space-evenly;

	#platform-icons {
		color: rgba(0, 0, 0, 0.6);
		font-size: 2rem;
		margin-right: 1rem;
	}

	@media screen and (max-width: 700px) {
		#platform-icons {
			font-size: 1rem;
			margin-right: 0.5rem;
		}
	}
`;

const Media = styled(motion.div)`
	margin-top: 5rem;

	img {
		width: 100%;
	}
`;

const Description = styled(motion.div)`
	margin: 5rem;

	@media screen and (max-width: 700px) {
		margin: 1rem;

		p {
			font-size: 1rem;
		}
	}
`;

export default GameDetail;
