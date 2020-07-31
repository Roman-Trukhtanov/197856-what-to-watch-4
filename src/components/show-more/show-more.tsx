import React, {MouseEvent} from "react";
import {connect} from "react-redux";
import {ActionCreator as AppStateActionCreator} from "../../reducer/app-state/app-state";
import {AppDispatch} from "../../index";

interface Props {
  onShowMoreBtnClick: (evt: MouseEvent<HTMLButtonElement>) => void;
}

const ShowMore: React.FunctionComponent<Props> = (props: Props) => {
  const {onShowMoreBtnClick} = props;

  return (
    <div className="catalog__more">
      <button className="catalog__button" type="button" onClick={onShowMoreBtnClick}>Show more</button>
    </div>
  );
};

const mapDispatchToProps = (dispatch: AppDispatch) => ({
  onShowMoreBtnClick(evt: MouseEvent<HTMLButtonElement>) {
    evt.preventDefault();

    dispatch(AppStateActionCreator.incrementCollection());
  },
});

export {ShowMore};
export default connect(null, mapDispatchToProps)(ShowMore);
