import {monthsNames} from "../const";
import {Comment} from "../types";

export default class ModelComment implements Comment {
  readonly comment: string;
  readonly date: string;
  readonly dateText: string;
  readonly id: number;
  readonly rating: number;
  readonly user: {
    id: number;
    name: string;
  };

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

  static parseComment(data): Comment {
    return new ModelComment(data);
  }

  static parseComments(data): Comment[] {
    return data.map(ModelComment.parseComment);
  }

  static getTextDate(date: string): string {
    const dateInfo = new Date(date);

    const month = monthsNames[dateInfo.getMonth()];

    const day = dateInfo.getDate();

    const year = dateInfo.getFullYear();

    return `${month} ${day}, ${year}`;
  }
}
