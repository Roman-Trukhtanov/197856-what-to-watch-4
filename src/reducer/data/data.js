import {extend} from "../../utils.js";
import ModelMovie from "../model-movie";
import ModelComment from "../model-comment";
import {getUpdatedMovies} from "./selectors";

const initialState = {
  movies: [],
  promoMovie: {},
  favoriteMovies: [],
  movieComments: [{}],
};

const ActionType = {
  LOAD_MOVIES: `LOAD_MOVIES`,
  LOAD_PROMO_MOVIE: `LOAD_PROMO_MOVIE`,
  LOAD_FAVORITE_MOVIES: `LOAD_FAVORITE_MOVIES`,
  LOAD_MOVIE_COMMENTS: `LOAD_MOVIE_COMMENTS`,
  UPDATE_MOVIE: `UPDATE_MOVIE`,
  UPDATE_PROMO_MOVIE: `UPDATE_PROMO_MOVIE`,
};

const ActionCreator = {
  loadMovies: (movies) => {
    return {
      type: ActionType.LOAD_MOVIES,
      payload: movies,
    };
  },
  loadPromoMovie: (movie) => {
    return {
      type: ActionType.LOAD_PROMO_MOVIE,
      payload: movie,
    };
  },
  loadFavoriteMovies: (movies) => {
    return {
      type: ActionType.LOAD_FAVORITE_MOVIES,
      payload: movies,
    };
  },
  loadMovieComments: (comments) => {
    return {
      type: ActionType.LOAD_MOVIE_COMMENTS,
      payload: comments,
    };
  },
  updateMovie: (movie) => {
    return {
      type: ActionType.UPDATE_MOVIE,
      payload: movie,
    };
  },
  updatePromoMovie: (movie) => {
    return {
      type: ActionType.UPDATE_PROMO_MOVIE,
      payload: movie,
    };
  },
};

const Operation = {
  loadMovies: () => (dispatch, getState, api) => {
    return api.get(`/films`)
      .then((response) => {
        dispatch(ActionCreator.loadMovies(ModelMovie.parseMovies(response.data)));
      });
  },
  loadPromoMovie: () => (dispatch, getState, api) => {
    return api.get(`/films/promo`)
      .then((response) => {
        dispatch(ActionCreator.loadPromoMovie(ModelMovie.parseMovie(response.data)));
      });
  },
  loadFavoriteMovies: () => (dispatch, getState, api) => {
    return api.get(`/favorite`)
      .then((response) => {
        dispatch(ActionCreator.loadFavoriteMovies(ModelMovie.parseMovies(response.data)));
      });
  },
  loadMovieComments: (movieID) => (dispatch, getState, api) => {
    return api.get(`/comments/${movieID}`)
      .then((response) => {
        dispatch(ActionCreator.loadMovieComments(ModelComment.parseComments(response.data)));
      });
  },
  postFavoriteMovie: (film, status, isPromoMovie) => (dispatch, getState, api) => {
    return api.post(`/favorite/${film.id}/${status}`)
      .then((response) => {
        const updatedMovie = ModelMovie.parseMovie(response.data);

        if (isPromoMovie) {
          dispatch(ActionCreator.updatePromoMovie(updatedMovie));
        }

        dispatch(ActionCreator.updateMovie(updatedMovie));

        // Получаем обновленный список всех избранных фильмов
        dispatch(Operation.loadFavoriteMovies());
      })
      .catch((err) => {
        throw err;
      });
  },
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.LOAD_MOVIES:
      return extend(state, {
        movies: action.payload,
      });
    case ActionType.LOAD_PROMO_MOVIE:
      return extend(state, {
        promoMovie: action.payload,
      });
    case ActionType.LOAD_FAVORITE_MOVIES:
      return extend(state, {
        favoriteMovies: action.payload,
      });
    case ActionType.LOAD_MOVIE_COMMENTS:
      return extend(state, {
        movieComments: action.payload,
      });
    case ActionType.UPDATE_MOVIE:
      return extend(state, {
        movies: getUpdatedMovies(state.movies, action.payload),
      });
    case ActionType.UPDATE_PROMO_MOVIE:
      return extend(state, {
        promoMovie: action.payload,
      });
  }

  return state;
};


export {reducer, Operation, ActionType, ActionCreator};
