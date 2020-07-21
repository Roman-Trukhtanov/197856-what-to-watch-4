import {reducer, ActionCreator, ActionType} from "./screen";
import {ScreenType} from "../../const";

it(`Reducer without additional parameters should return initial state`, () => {
  expect(reducer(undefined, {})).toEqual({
    prevScreen: ``,
    screen: ScreenType.MAIN,
  });
});

it(`Reducer should change screen`, () => {
  expect(reducer({
    screen: ScreenType.MAIN,
  }, {
    type: ActionType.CHANGE_SCREEN,
    payload: `Movie`,
  })).toEqual({
    prevScreen: ScreenType.MAIN,
    screen: `Movie`,
  });

  expect(reducer({
    screen: ScreenType.MOVIE,
  }, {
    type: ActionType.CHANGE_SCREEN,
    payload: `Main`,
  })).toEqual({
    prevScreen: ScreenType.MOVIE,
    screen: `Main`,
  });
});

describe(`Action creators work correctly`, () => {
  it(`Action creator for changing screen returns default screen`, () => {
    expect(ActionCreator.changeScreen()).toEqual({
      type: ActionType.CHANGE_SCREEN,
      payload: ScreenType.MAIN,
    });
  });

  it(`Action creator for changing screen returns any screen`, () => {
    expect(ActionCreator.changeScreen(ScreenType.MOVIE)).toEqual({
      type: ActionType.CHANGE_SCREEN,
      payload: ScreenType.MOVIE,
    });
  });
});
