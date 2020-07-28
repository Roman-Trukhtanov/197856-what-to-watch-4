import React from 'react';
import Enzyme, {mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import withReview from './with-review';

Enzyme.configure({
  adapter: new Adapter()
});

const mockComponent = () => {
  return (
    <div/>
  );
};

const mockEventReview = {
  target: {
    value: `review text`,
  }
};

const mockEventRating = {
  target: {
    value: 5,
  }
};

describe(`HOC withReview`, () => {
  it(`Should withReview change review`, () => {
    const ComponentWrapped = withReview(mockComponent);

    const wrapper = mount(<ComponentWrapped/>);

    wrapper.instance()._handleReviewInput(mockEventReview);
    expect(wrapper.state().comment).toEqual(mockEventReview.target.value);
  });

  it(`Should withComment change rating`, () => {
    const ComponentWrapped = withReview(mockComponent);

    const wrapper = mount(<ComponentWrapped/>);

    wrapper.instance()._handleStarChange(mockEventRating);
    expect(wrapper.state().rating).toEqual(mockEventRating.target.value);
  });
});
