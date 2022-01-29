import axios from "axios";
import {
	popularGamesURL,
	upcomingGamesURL,
	newGamesURL,
	serachGameURL,
} from "../api";

//Action Creator
export const loadGames = () => async (dispatch) => {
	//FETCH AXIOS
	const popularData = await axios.get(popularGamesURL());
	const newGamesData = await axios.get(newGamesURL());
	const upcomingData = await axios.get(upcomingGamesURL());

	dispatch({
		type: "FETCH_GAMES",
		payload: {
			popular: popularData.data.results,
			upcoming: upcomingData.data.results,
			newGames: newGamesData.data.results,
		},
	});
};

export const fetchSearch = (game_name) => async (dispatch) => {
	const searchGamesData = await axios.get(serachGameURL(game_name));

	dispatch({
		type: "FETCH_SEARCHED",
		payload: {
			searched: searchGamesData.data.results,
		},
	});
};
