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
import { faGamepad } from "@fortawesome/free-solid-svg-icons";

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
								<p>Rating: {game.rating}</p>
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
											size="2x"
											style={{ marginRight: "1rem", color: "rgba(0,0,0,0.6" }}
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

	img {
		width: 100%;
	}
`;

const Stats = styled(motion.div)`
	display: flex;
	align-items: center;
	justify-content: space-between;
`;

const Info = styled(motion.div)`
	text-align: center;
`;

const Platforms = styled(motion.div)`
	display: flex;
	justify-content: space-evenly;

	img {
		margin-left: 3rem;
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
`;

export default GameDetail;
