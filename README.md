# js-wait-for

Just a JS function constructor to "wait for" something to load or happen (using setInterval checks).

```javascript
let w1 = new waitFor( someCondition, someCallback, [time interval]);
// can be canceled before condition is met:
// w1.cancel();

// or can be initiated like this
let w2 = new waitFor({
  cond: someCondition,
  call: someCallback,
  cancelable: false, /* can't be canceled */
  iti: 500 /* time interval */
});
```

For example, load some jQuery dependent app, after jQuery is loaded:

```javascript
new waitFor(
  () => window.jQuery !== undefined,
  () => jQuery("body").append("<h3>jQuery loaded</h3>"),
  200
);
```

Demo [here - test.html](test.html)
