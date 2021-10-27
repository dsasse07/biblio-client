import Model from '@ember-data/model';
import { attr, belongsTo } from '../../dist/assets/vendor';

export default class UserBookModel extends Model {
  @attr('string') id;
  @attr('date') createdAt;
  @attr('boolean') isActive;
  //@belongsTo('user') user;
  @belongsTo('book') book;
}
