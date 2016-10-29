import {Injectable} from '@angular/core';
import {NgRedux} from 'ng2-redux';
import {IAppState} from '../store';
import {IAction, IAsyncAction, IAsyncActionCompletion} from './index';

@Injectable()
export class AuthorizationActions {
  constructor(
    private _ngRedux: NgRedux<IAppState>) {}

    static SET_AUTHORIZATION_HEADER = "AUTHORIZATION.SET_AUTHORIZATION_HEADER";
    static SET_TOKEN_EXPIRATION = "AUTHORIZATION.SET_TOKEN_EXPIRATION";

    setAuthorizationHeader(token: string) {
      let action: ISetAuthorizationHeader = {
        type: AuthorizationActions.SET_AUTHORIZATION_HEADER,
        token: token
      };

      this._ngRedux.dispatch(action);
    }

    setExpiration(expires: number) {
      let action: ISetExpiration = {
        type: AuthorizationActions.SET_TOKEN_EXPIRATION,
        expires: expires
      };

      this._ngRedux.dispatch(action);
    }
}

export interface ISetAuthorizationHeader extends IAction {
  token: string;
}

export interface ISetExpiration extends IAction {
  expires: number;
}