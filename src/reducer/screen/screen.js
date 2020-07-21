import {extend} from "../../utils";
import {ScreenType} from "../../const";

const initialState = {
  prevScreen: ``,
  screen: ScreenType.MAIN,
};

const ActionType = {
  CHANGE_SCREEN: `CHANGE_SCREEN`,
};

const ActionCreator = {
  changeScreen(screen = ScreenType.MAIN) {
    return {
      type: ActionType.CHANGE_SCREEN,
      payload: screen,
    };
  },
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.CHANGE_SCREEN:
      return extend(state, {
        prevScreen: state.screen,
        screen: action.payload,
      });
  }

  return state;
};

export {
  reducer,
  ActionType,
  ActionCreator,
};
