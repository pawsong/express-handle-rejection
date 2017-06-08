import * as sinon from 'sinon';
import { expect } from 'chai';
import ehr from '../src';

function ok<T>(promise: Promise<T>) {
  return promise.catch(() => null);
}

describe('express-handle-rejection', () => {
  it('should pass req, res and next', async () => {
    const callback = sinon.stub().returns(Promise.resolve());
    const handler = ehr(callback);

    const req = {} as any;
    const res = {} as any;
    const next = {} as any;
    handler(req, res, next);

    const result = callback.calledWith(req, res, next);
    expect(result).to.equal(true);
  });

  it('should not call next on success', async () => {
    const promise = Promise.resolve();
    const handler = ehr(() => promise);

    const callback = sinon.spy();
    handler(null, null, callback);

    await ok(promise);

    expect(callback.called).to.equal(false);
  });

  it('should handle rejection', async () => {
    const error = new Error('test');

    const promise = Promise.reject(error);
    const handler = ehr(() => promise);

    const callback = sinon.spy();
    handler(null, null, callback);

    await ok(promise);

    expect(callback.calledWith(error)).to.equal(true);
  });
});
