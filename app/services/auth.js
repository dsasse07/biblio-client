import Service from '@ember/service';
// import ENV from 'biblio-client/config/environment';
import { inject as service } from '@ember/service';
import rpcActionsEnum from '../models/enums/rpcActions';

export default class AuthService extends Service {
  @service rpc;
  @service store;
  @service router;
  _currentUser = null;

  get isAuthenticated() {
    return this._currentUser != null;
  }

  getMe() {
    if (!this.rpc.JWToken) {
      this.router.transitionTo('login');
      return;
    }
    this.rpc.post(rpcActionsEnum.LOGIN, {}).then((user) => {
      this._setCurrentUser(user);
    });
  }

  async login(payload) {
    this.rpc
      .post(rpcActionsEnum.LOGIN, payload)
      .then((user) => {
        this._setCurrentUser(user);
      })
      .then(() => {
        this.router.transitionTo('index');
      });
  }

  signup(payload) {
    this.rpc.post(rpcActionsEnum.SIGNUP, payload).then((user) => {
      this._setCurrentUser(user);
    });
  }

  async _setCurrentUser(user) {
    this._currentUser = await this.store.createRecord('user', user);
    localStorage.setItem('userToken', user.id);
    console.log(user);
  }

  logout() {
    localStorage.removeItem('userToken');
    this._currentUser = null;
  }
}
