import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class ApplicationRoute extends Route {
  @service auth;
  @service store;

  async beforeModel() {
    await this.auth.getMe();
  }
}
