import { bn } from './';

describe('test', () => {
  it('test', () => {
    console.log(bn`
       var a = 10000;
       var b = 10000;

       var x = a * b;

       print(x)

       out x;
    `);
  });
});
