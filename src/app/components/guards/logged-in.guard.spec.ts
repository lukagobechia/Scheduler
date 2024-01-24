import { TestBed } from '@angular/core/testing';

import { loggedInGuard } from './logged-in.guard';

describe('loggedInGuard', () => {
  let guard: loggedInGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(loggedInGuard)
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});



// import { TestBed } from '@angular/core/testing';

// import { AdminGuard } from './admin-guard.guard';

// describe('AdminGuard', () => {
//   let guard: AdminGuard;

//   beforeEach(() => {
//     TestBed.configureTestingModule({});
//     guard = TestBed.inject(AdminGuard);
//   });

//   it('should be created', () => {
//     expect(guard).toBeTruthy();
//   });
// });