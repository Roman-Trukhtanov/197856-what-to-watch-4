import {extend} from "../../utils";
import ModelMovie from "../model-movie";
import ModelComment from "../model-comment";
import {getUpdatedMovies} from "./selectors";
import {Action, ActionObject, Comment, Movie} from "../../types";
import {AxiosInstance, AxiosResponse} from "axios";
import {AppDispatch, AppGetState} from "../../index";

export interface DataState {
  movies?: Movie[];
  promoMovie?: Movie;
  favoriteMovies?: Movie[];
  movieComments?: Comment[];
}

const initialState: DataState = {
  movies: [],
  promoMovie: null,
  favoriteMovies: [],
  movieComments: [],
};

const ActionType: Action = {
  LOAD_MOVIES: `LOAD_MOVIES`,
  LOAD_PROMO_MOVIE: `LOAD_PROMO_MOVIE`,
  LOAD_FAVORITE_MOVIES: `LOAD_FAVORITE_MOVIES`,
  LOAD_MOVIE_COMMENTS: `LOAD_MOVIE_COMMENTS`,
  UPDATE_MOVIE: `UPDATE_MOVIE`,
  UPDATE_PROMO_MOVIE: `UPDATE_PROMO_MOVIE`,
};

const ActionCreator = {
  loadMovies: (movies: Movie[]): ActionObject<Movie[]> => {
    return {
      type: ActionType.LOAD_MOVIES,
      payload: movies,
    };
  },
  loadPromoMovie: (movie: Movie): ActionObject<Movie> => {
    return {
      type: ActionType.LOAD_PROMO_MOVIE,
      payload: movie,
    };
  },
  loadFavoriteMovies: (movies: Movie[]): ActionObject<Movie[]> => {
    return {
      type: ActionType.LOAD_FAVORITE_MOVIES,
      payload: movies,
    };
  },
  loadMovieComments: (comments: Comment[]): ActionObject<Comment[]> => {
    return {
      type: ActionType.LOAD_MOVIE_COMMENTS,
      payload: comments,
    };
  },
  updateMovie: (movie: Movie): ActionObject<Movie> => {
    return {
      type: ActionType.UPDATE_MOVIE,
      payload: movie,
    };
  },
  updatePromoMovie: (movie: Movie): ActionObject<Movie> => {
    return {
      type: ActionType.UPDATE_PROMO_MOVIE,
      payload: movie,
    };
  },
};

const Operation = {
  loadMovies: () => (
      dispatch: AppDispatch,
      getState: AppGetState,
      api: AxiosInstance
  ) => {
    return api.get(`/films`)
      .then((response: AxiosResponse) => {
        dispatch(ActionCreator.loadMovies(ModelMovie.parseMovies(response.data)));
      });
  },
  loadPromoMovie: () => (
      dispatch: AppDispatch,
      getState: AppGetState,
      api: AxiosInstance
  ) => {
    return api.get(`/films/promo`)
      .then((response: AxiosResponse) => {
        dispatch(ActionCreator.loadPromoMovie(ModelMovie.parseMovie(response.data)));
      });
  },
  loadFavoriteMovies: () => (
      dispatch: AppDispatch,
      getState: AppGetState,
      api: AxiosInstance
  ) => {
    return api.get(`/favorite`)
      .then((response: AxiosResponse) => {
        dispatch(ActionCreator.loadFavoriteMovies(ModelMovie.parseMovies(response.data)));
      });
  },
  loadMovieComments: (movieID: number) => (
      dispatch: AppDispatch,
      getState: AppGetState,
      api: AxiosInstance
  ) => {
    return api.get(`/comments/${movieID}`)
      .then((response: AxiosResponse) => {
        dispatch(ActionCreator.loadMovieComments(ModelComment.parseComments(response.data)));
      });
  },
  postFavoriteMovie: (
      film: Movie,
      status: 0 | 1,
      isPromoMovie?: boolean
  ) => (
      dispatch: AppDispatch,
      getState: AppGetState,
      api: AxiosInstance
  ) => {
    return api.post(`/favorite/${film.id}/${status}`)
      .then((response: AxiosResponse) => {
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

const reducer = (
    state: DataState = initialState,
    {type, payload}: ActionObject<typeof payload>
): object => {
  switch (type) {
    case ActionType.LOAD_MOVIES:
      return extend(state, {
        movies: payload,
      });
    case ActionType.LOAD_PROMO_MOVIE:
      return extend(state, {
        promoMovie: payload,
      });
    case ActionType.LOAD_FAVORITE_MOVIES:
      return extend(state, {
        favoriteMovies: payload,
      });
    case ActionType.LOAD_MOVIE_COMMENTS:
      return extend(state, {
        movieComments: payload,
      });
    case ActionType.UPDATE_MOVIE:
      return extend(state, {
        movies: getUpdatedMovies(state.movies, payload),
      });
    case ActionType.UPDATE_PROMO_MOVIE:
      return extend(state, {
        promoMovie: payload,
      });
  }

  return state;
};


export {reducer, Operation, ActionType, ActionCreator};
