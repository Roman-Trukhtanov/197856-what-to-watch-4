export const TabType = {
  OVERVIEW: `overview`,
  DETAILS: `details`,
  REVIEWS: `reviews`,
};

export const tabs = [`overview`, `details`, `reviews`];

export const movieInfo = [
  {
    id: 0,
    title: `The Grand Budapest Hotel`,
    genre: `drama`,
    releaseYear: 2014,
    coverSrc: `/img/bg-the-grand-budapest-hotel.jpg`,
    bigPosterSrc: `img/the-grand-budapest-hotel-poster.jpg`,
  }
];

export const moviesOverview = [
  {
    id: 0,
    rate: 8.9,
    level: `Very good`,
    ratingCount: 240,
    description: [
      `In the 1930s, the Grand Budapest Hotel is a popular European ski resort, presided over by concierge Gustave H. (Ralph Fiennes). Zero, a junior lobby boy, becomes Gustave's friend and protege.`,
      `Gustave prides himself on providing first-class service to the hotel's guests, including satisfying the sexual needs of the many elderly women who stay there. When one of Gustave's lovers dies mysteriously, Gustave finds himself the recipient of a priceless painting and the chief suspect in her murder.`
    ],
    director: `Wes Andreson`,
    starring: `Bill Murray, Edward Norton, Jude Law, Willem Dafoe and other`,
  }
];

export const moviesDetails = [
  {
    id: 0,
    genre: `Comedy`,
    director: `Wes Andreson`,
    releaseYear: 2014,
    starring: [
      `Bill Murray`,
      `Edward Norton`,
      `Jude Law`,
      `Willem Dafoe`,
      `Saoirse Ronan`,
      `Tony Revoloru`,
      `Tilda Swinton`,
      `Tom Wilkinson`,
      `Owen Wilkinson`,
      `Adrien Brody`,
      `Ralph Fiennes`,
      `Jeff Goldblum`
    ],
    runTime: `1h 39m`,
  }
];

export const moviesComments = [
  {
    id: 0,
    comments: [
      {
        rate: 8.9,
        author: `Kate Muir`,
        description: `Discerning travellers and Wes Anderson fans will luxuriate in the glorious Mittel-European kitsch of one of the director's funniest and most exquisitely designed movies in years.`,
        date: `December 24, 2016`,
      },
      {
        rate: 7.2,
        author: `Matthew Lickona`,
        description: `The mannered, madcap proceedings are often delightful, occasionally silly, and here and there, gruesome and/or heartbreaking.`,
        date: `December 20, 2016`,
      },
      {
        rate: 8.0,
        author: `Bill Goodykoontz`,
        description: `Anderson's films are too precious for some, but for those of us willing to lose ourselves in them, they're a delight. "The Grand Budapest Hotel" is no different, except that he has added a hint of gravitas to the mix, improving the recipe.`,
        date: `November 18, 2015`,
      },
      {
        rate: 7.6,
        author: `Paula Fleri-Soler`,
        description: `It is certainly a magical and childlike way of storytelling, even if the content is a little more adult.`,
        date: `December 20, 2016`,
      },
      {
        rate: 8.0,
        author: `Amanda Greever`,
        description: `I didn't find it amusing, and while I can appreciate the creativity, it's an hour and 40 minutes I wish I could take back.`,
        date: `November 18, 2015`,
      },
      {
        rate: 7.0,
        author: `Paula Fleri-Soler`,
        description: `It is certainly a magical and childlike way of storytelling, even if the content is a little more adult.`,
        date: `December 20, 2016`,
      },
    ]
  }
];
