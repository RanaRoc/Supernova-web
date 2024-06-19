import { TestBed } from '@angular/core/testing';

import { UserService } from './user.service';

describe('UserService', () => {
  let user: UserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    user = TestBed.inject(UserService);
  });


  it('should be created', () => {
    expect(user).toBeTruthy();
  });
});
