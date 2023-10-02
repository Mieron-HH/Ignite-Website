import axios from "axios";
import {
	popularGamesURL,
	upcomingGamesURL,
	newGamesURL,
	searchGameURL,
} from "../api";

//Action Creator
export const loadGames = () => async (dispatch) => {
	//FETCH AXIOS
	let popularData = await axios.get(popularGamesURL());
	let newGamesData = await axios.get(newGamesURL());
	let upcomingData = await axios.get(upcomingGamesURL());

	popularData = popularData.data.results.filter(
		({ background_image }) => background_image !== null
	);

	upcomingData = upcomingData.data.results.filter(
		({ background_image }) => background_image !== null
	);

	newGamesData = newGamesData.data.results.filter(
		({ background_image }) => background_image !== null
	);

	dispatch({
		type: "FETCH_GAMES",
		payload: {
			popular: popularData,
			upcoming: upcomingData,
			newGames: newGamesData,
		},
	});
};

export const fetchSearch = (game_name) => async (dispatch) => {
	const searchGamesData = await axios.get(searchGameURL(game_name));

	dispatch({
		type: "FETCH_SEARCHED",
		payload: {
			searched: searchGamesData.data.results,
		},
	});
};
