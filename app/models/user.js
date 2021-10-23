import Model from '@ember-data/model';
import { attr, hasMany } from '../../dist/assets/vendor';

export default class UserModel extends Model {
  @attr('string') id;
  @attr('string') firstName;
  @attr('string') lastName;
  @attr('date') createdAt;
  @hasMany('user-book') userBooks;
}
