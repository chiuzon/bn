import { BigNumber } from '@ethersproject/bignumber';

const varRegExp = /(?<=var)(.*?)(?=;)/gis;
const varNameRexExp = /[A-Z][a-z]*/gis;

enum ExpresionTypes {
  VAR = 0,
  EXPRS = 1,
  FUNCALL = 2,
  RETURN = 3,
}

type TreeType = {
  [key: string]: {
    type: ExpresionTypes;
    value: BigNumber;
  };
};

/*
var <varname> = <value>;
var <varname> = <value> <operator> <value> ...;

<function>(<argument>);

out <varname>;
*/

/*
  var a = 10000;
  var b = 10000;

  var x = a * b;

  print(x);

  out x;
*/

export function bn(content: TemplateStringsArray) {
  const _str = content;

  const tree: TreeType = {};

  _str
    .toString()
    .match(varRegExp)
    ?.forEach((str) => {
      const _varName = str.match(varNameRexExp);

      const token = _varName?.[0];

      if (token) {
        tree[token] = {
          type: ExpresionTypes.VAR,
          value: (() => {
            if (str.match(/[0-9]+/)) {
              return BigNumber.from(str.match(/[0-9]+/)?.[0]);
            }

            return BigNumber.from(0);
          })(),
        };
      }
    });

  return tree;
}
