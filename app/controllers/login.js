import Controller from '@ember/controller';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

export default class LoginController extends Controller {
  @service auth;
  firstName = '';

  @action
  login(e) {
    e.preventDefault();
    this.auth.login({ firstName: this.firstName });
  }
}
