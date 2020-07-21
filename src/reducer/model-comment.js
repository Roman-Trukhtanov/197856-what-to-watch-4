import {monthsNames} from "../const";

export default class ModelComment {
  constructor(data) {
    if (data[`id`]) {
      this.id = data[`id`];
    }
    this.user = {
      id: data[`user`][`id`],
      name: data[`user`][`name`]
    };
    this.rating = data[`rating`];
    this.comment = data[`comment`];
    this.date = data[`date`];
    this.dateText = ModelComment.getTextDate(data[`date`]);
  }

  static parseComment(data) {
    return new ModelComment(data);
  }

  static parseComments(data) {
    return data.map(ModelComment.parseComment);
  }

  static getTextDate(date) {
    const dateInfo = new Date(date);

    const month = monthsNames[dateInfo.getMonth()];

    const day = dateInfo.getDate();

    const year = dateInfo.getFullYear();

    return `${month} ${day}, ${year}`;
  }

  toRAW() {
    const dataRAW = {
      "user": {
        "id": this.user.id,
        "name": this.user.name
      },
      "rating": this.rating,
      "comment": this.comment,
      "date": this.date,
    };

    if (this.id) {
      dataRAW[`id`] = this.id;
    }

    return dataRAW;
  }
}
