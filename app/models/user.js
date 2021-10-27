import Model, { attr } from '@ember-data/model';

export default class UserModel extends Model {
  @attr('string') id;
  @attr('string') firstName;
  @attr('string') lastName;
  //@attr('date') createdAt;
  //@hasMany('user-book') userBooks;
}
