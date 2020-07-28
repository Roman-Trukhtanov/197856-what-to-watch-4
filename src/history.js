import {createBrowserHistory} from "history";
import {AppRoute, HistoryAction} from "./const";

const history = createBrowserHistory();

export const historyGoBack = () => {
  const historyAction = history.action;

  if (historyAction === HistoryAction.PUSH) {
    history.goBack();
  } else {
    history.push(AppRoute.ROOT);
  }
};

export default history;
