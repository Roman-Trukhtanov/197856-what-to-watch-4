import NameSpace from "../name-space.js";

export const getScreen = (state) => {
  return state[NameSpace.SCREEN].screen;
};
export const getPrevScreen = (state) => {
  return state[NameSpace.SCREEN].prevScreen;
};
