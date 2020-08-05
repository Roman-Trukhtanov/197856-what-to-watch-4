module.exports = {
  rootDir: `./src`,
  transform: {
    "^.+\\.tsx?$": `ts-jest`,
    "^.+\\.ts?$": `ts-jest`,
    "^.+\\.js?$": `babel-jest`,
    "^.+\\.jsx?$": `babel-jest`,
  },
  testRegex: `.test.(js?|jsx?|ts?|tsx?)$`,
  moduleFileExtensions: [
    `ts`,
    `tsx`,
    `js`,
    `jsx`,
    `json`,
    `node`
  ],
};
