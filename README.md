# Usage

```javascript
const data = {
  a: 1,
  array: [{ a: 1 }]
};

const valid = new ValidGroup({
  a: {
    validFun: function(value) {
      return value === 1;
    }
  },
  array: new ValidArray({
    a: {
      validFun: function(value) {
        return value === 1;
      }
    }
  })
});
valid.do(data);
```

use `valid.valid` to get the result(true | false);
