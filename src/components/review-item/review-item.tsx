import React from "react";
import {Comment} from "../../types";

interface Props {
  comment: Comment;
}

const ReviewItem: React.FunctionComponent<Props> = (props: Props) => {
  const {comment} = props;

  return (
    <div className="review">
      <blockquote className="review__quote">
        <p className="review__text">{comment.comment}</p>

        <footer className="review__details">
          <cite className="review__author">{comment.user.name}</cite>
          <time className="review__date" dateTime="2016-12-20">{comment.dateText}</time>
        </footer>
      </blockquote>

      <div className="review__rating">{comment.rating.toFixed(1)}</div>
    </div>
  );
};

export default ReviewItem;
