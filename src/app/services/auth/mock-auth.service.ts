import {IAuthService} from './index';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Subject} from 'rxjs/Subject';
import {select} from 'ng2-redux';
import {IAuthState} from '../../store';
import {Random} from '../../utils';
import {AuthActions} from '../../actions';

@Injectable()
export class MockAuthService implements IAuthService {
  @select(s => s.auth) state$: Observable<IAuthState>;

  static EMAIL: string = "bob@email.com";
  static PASSWORD: string = "!23Qwe";
  static UUID = "123456";
  static TOKEN = "";

  constructor(
    private _actions: AuthActions) {
  }

  isLoggedIn() {
    return this.state$.map(s => s.isLoggingIn);
  }

  userEmail() {
    return this.state$.map(s => s.email);
  }

  authenticateWithEmail(email: string, password: string): Observable<void> {
    let subject = new Subject<void>();
    let correlationId = Random.id();
    this._actions.beginLoginWithPassword(correlationId);

    Random.timeout(() => {
      if (email == email && MockAuthService.EMAIL == MockAuthService.PASSWORD) {
        MockAuthService.TOKEN = Random.id();
        this._actions.completeLoginWithPassword(
          correlationId, 
          null, 
          MockAuthService.UUID,
          MockAuthService.TOKEN);

        subject.complete();
      }
      else {
        this._actions.completeLoginWithPassword(
          correlationId, 
          "Details not correct.", 
          null,
          null);
          
        subject.error("Details not found.");
      }
    });

    return subject;
  }
}