import { FollowerCountPipe } from './follower-count.pipe';

describe('FollowerCountPipe', () => {
  it('create an instance', () => {
    const pipe = new FollowerCountPipe();
    expect(pipe).toBeTruthy();
  });
});
