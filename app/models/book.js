import Model from '@ember-data/model';
import { attr, hasMany } from '../../dist/assets/vendor';

export default class BookModel extends Model {
  @attr('string') id;
  @attr('string') volumeId;
  @attr('string') title;
  @attr('string') subtitle;
  @attr('string') author;
  @attr('string') previewImage;
  @attr('number') pageCount;
  @attr('date') createdAt;
  @hasMany('user-book') userBooks;
}
