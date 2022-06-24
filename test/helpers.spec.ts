import { response } from 'helpers';

it('should return success response with any object', async () => {
  expect(await response({ foo: 'bar' })).toMatchSnapshot();
});

it('should return error response with any object', async () => {
  expect(await response({ message: 'any_error_message' }, 400)).toMatchSnapshot();
});
