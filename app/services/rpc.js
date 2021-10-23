import Service from '@ember/service';
import { tracked } from '@glimmer/tracking';
// import { action } from '@ember/object';
// import { inject as service } from '@ember/service';
import ENV from 'biblio-client/config/environment';
import rpcActionsEnum from '../models/enums/rpcActions';

export default class RpcService extends Service {
  @tracked isLoading = false;
  @tracked isError = false;
  @tracked isSuccess = false;
  _statusTimer = null;

  get JWToken() {
    const JWToken = localStorage.getItem('userToken');
    if (typeof JWToken === 'string') {
      return encodeURIComponent(JWToken);
    }
    return null;
  }

  async post(rpcAction, payload) {
    if (this.isLoading || !payload) return;

    const path = this._getUrl(rpcAction);
    const config = this._createConfig(payload);

    this._setLoading();
    return fetch(`${ENV.APP.BACKEND_URL}/rpc-api/${path}`, config)
      .then((res) => {
        return this._handleResponse(res);
      })
      .catch((err) => {
        return this._handleError(err);
      });
  }

  _createConfig(payload) {
    return {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(payload),
    };
  }

  _getUrl(rpcAction) {
    switch (rpcAction) {
      case rpcActionsEnum.LOGIN:
        return 'login';
      default:
        throw new Error('Invalid RPC Action');
    }
  }
  _setLoading() {
    this.isLoading = true;
    this.isError = false;
    this.isSuccess = false;
    clearTimeout(this._statusTimer);
  }

  _handleResponse(res) {
    if (res.ok) {
      this.isLoading = false;
      this.isSuccess = true;
      this._handleSetClearStatus();
      return res.json();
    }
    throw new Error(res);
  }
  _handleError(err) {
    this.isLoading = false;
    this.isError = true;
    this._handleSetClearStatus();
    return err;
  }
  _handleSetClearStatus(timeout = 2000) {
    this._statusTimer = setTimeout(() => {
      this.isSuccess = false;
      this.isError = false;
    }, timeout);
  }
}
