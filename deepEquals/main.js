"use strict";

function deepEquals(a, b) {
  if (typeof a === typeof b && a === a && b === b) {
    if (a === b) {
      return true;
    } else if (Array.isArray(a) && Array.isArray(b)) {
      if (a.length === b.length) {
        if (a.length === 0 && b.length === 0) {
          return true;
        } else {
          for (let i = 0; i < a.length; i++) {
            if (Array.isArray(a[i]) && Array.isArray(b[i])) {
              if (deepEquals(a[i], b[i]) === false) {
                return false;
              }
            } else if (
              a[i] !== null &&
              b[i] !== null &&
              typeof a[i] === "object" &&
              typeof b[i] === "object" &&
              !(Array.isArray(a[i]) || Array.isArray(b[i]))
            ) {
              if (object(a[i], b[i]) === false) {
                return false;
              }
            } else if (primitives(a[i], b[i]) !== true) {
              return false;
            }
          }
        }
        return true;
      }
    } else if (
      a !== null &&
      b !== null &&
      typeof a === "object" &&
      typeof b === "object" &&
      !(Array.isArray(a) || Array.isArray(b))
    ) {
      if (Object.keys(a).length === Object.keys(b).length) {
        if (Object.keys(a).length === 0 && Object.keys(b).length === 0) {
          return true;
        }
        for (let i = 0; i < Object.keys(a).length; i++) {
          if (Object.keys(b).some((x) => x === Object.keys(a)[i]) === false) {
            return false;
          }
          let key = Object.keys(b).find((x) => x === Object.keys(a)[i]);
          if (
            a[key] !== null &&
            b[key] !== null &&
            typeof a[key] === "object" &&
            typeof b[key] === "object" &&
            !(Array.isArray(a[key]) || Array.isArray(b[key]))
          ) {
            if (deepEquals(a[key], b[key]) === false) {
              return false;
            }
          } else if (Array.isArray(a[key]) && Array.isArray(b[key])) {
            if (arrays(a[key], b[key]) === false) {
              return false;
            }
          } else {
            if (primitives(a[key], b[key]) !== true) {
              return false;
            }
          }
        }
        return true;
      }
      return false;
    } else if (a !== a && b !== b) {
      return true;
    }
    return false;
  }
  return false;
}

function primitives(a, b) {
  if (typeof a === typeof b && a === a && b === b) {
    if (a === b) {
      return true;
    }
  } else if (a !== a && b !== b) {
    return true;
  }
  return false;
}

function arrays(a, b) {
  if (Array.isArray(a) && Array.isArray(b)) {
    if (a.length === b.length) {
      if (a.length === 0 && b.length === 0) {
        return true;
      } else {
        for (let i = 0; i < a.length; i++) {
          if (Array.isArray(a[i]) && Array.isArray(b[i])) {
            if (deepEquals(a[i], b[i]) === false) {
              return false;
            }
          } else if (
            a[i] !== null &&
            b[i] !== null &&
            typeof a[i] === "object" &&
            typeof b[i] === "object" &&
            !(Array.isArray(a[i]) || Array.isArray(b[i]))
          ) {
            if (object(a[i], b[i]) === false) {
              return false;
            }
          } else if (primitives(a[i], b[i]) !== true) {
            return false;
          }
        }
      }
      return true;
    }
  }
  return false;
}

function object(a, b) {
  if (Object.keys(a).length === Object.keys(b).length) {
    if (Object.keys(a).length === 0 && Object.keys(b).length === 0) {
      return true;
    }
    for (let i = 0; i < Object.keys(a).length; i++) {
      if (Object.keys(b).some((x) => x === Object.keys(a)[i]) === false) {
        return false;
      }
      let key = Object.keys(b).find((x) => x === Object.keys(a)[i]);
      if (
        a[key] !== null &&
        b[key] !== null &&
        typeof a[key] === "object" &&
        typeof b[key] === "object" &&
        !(Array.isArray(a[key]) || Array.isArray(b[key]))
      ) {
        if (object(a[key], b[key]) === false) {
          return false;
        }
      } else if (Array.isArray(a[key]) && Array.isArray(b[key])) {
        if (object(a[key], b[key]) === false) {
          return false;
        }
      } else {
        if (primitives(a[key], b[key]) !== true) {
          return false;
        }
      }
    }
    return true;
  }
}

// console.log("my  ", deepEquals(undefined, undefined));

//nested

// console.log(deepEquals([[1]], [[1]]));
// console.log(deepEquals([[1], [2]], [[1], [2]]));
// console.log(deepEquals([[1, true, "abc"], [2]], [[1, true, "abc"], [2]]));
// console.log(deepEquals([[1, [2, 3, [4, 5]]], [2]], [[1, [2, 3, [4, 5]]], [2]]));
// console.log(deepEquals([], [[]]));
// console.log(deepEquals([[]], []));
// console.log(deepEquals([[1]], [[]]));
// console.log(deepEquals([[]], [[1]]));
// console.log(deepEquals([[1]], [[0]]));
// console.log(deepEquals([[0, []]], [[0]]));
// console.log(deepEquals([[0]], [[0, []]]));
// console.log(deepEquals([[0, [1, 2]]], [[0, [1]]]));
// console.log(deepEquals([[0, [1]]], [[0, [1, 2]]]));
// console.log(deepEquals([[1, true, "abc"], [2]], [[1, true, "abc"]]));
// console.log(deepEquals([[1, [2, [4, 5]]], [2]], [[1, [2, 3, [4, 5]]], [2]]));
// console.log(
//   deepEquals([[1, [2, "3", [4, 5]]], [2]], [[1, [2, 3, [4, 5]]], [2]])
// );

//objects

// console.log(deepEquals({}, {}));
// console.log(deepEquals({ a: 123 }, { a: 123 }));
// console.log(deepEquals({ a: "123" }, { a: "123" }));
// console.log(deepEquals({ a: 123, b: "abc" }, { a: 123, b: "abc" }));
// console.log(
//   deepEquals(
//     { a: 123, c: true, b: "abc" },
//     { a: 123, b: "abc", c: true }
//   )
// );

//arrays

// console.log(deepEquals([], []))
// console.log(deepEquals([1], [1]))
// console.log(deepEquals([0, 1, 2], [0, 1, 2]))
// console.log(deepEquals([0, "abc", 2], [0, "abc", 2]))
// console.log(deepEquals([null, undefined, true], [null, undefined, true]))

//strings

// console.log(deepEquals("", ""))
// console.log(deepEquals("a", "a"))
// console.log(deepEquals("abc", "abc"))
// console.log(deepEquals("", "a"))
// console.log(deepEquals("a", ""))
// console.log(deepEquals("a", "b"))
// console.log(deepEquals("hello", "world"))
// console.log(deepEquals("ab", "abc"))
// console.log(deepEquals("abc", "ab"))

//primitive

// console.log(deepEquals(1, 1))
// console.log(deepEquals(15, 15))
// console.log(deepEquals(0, 1))
// console.log(deepEquals(1, 0))
// console.log(deepEquals(1, 10))
// console.log(deepEquals(10, 1))

// console.log(deepEquals(1, 1)); //true
// console.log(deepEquals(1, "1")); // false
// console.log(deepEquals(null, null)); //true
// console.log(deepEquals(null, undefined)); //false
// console.log(deepEquals([], [])); //true
// console.log(deepEquals({}, {})); //true
// console.log(deepEquals({}, [])); //false
// console.log(
//   deepEquals({ a: 123, b: { c: [4, 5, 6] } }, { a: 123, b: { c: [4, 5, 6] } })
// ); //true 
// console.log(deepEquals({a: 123, b: {c: [4, 5, 6]}}), {b: {c: [4, 5, 6]}}) //false
// console.log(deepEquals({a: 123, b: {c: [4, 5, 6]}}, {a: 123, b: {c: [4, "5", 6]}})) //false
// console.log(deepEquals([1, 2, [3, 4]], [1, 2, [3, 4]])); //true
// console.log(
//   deepEquals([1, 2, [3, 4, { a: "abc" }]], [1, 2, [3, 4, { a: "abc" }]])
// ); //true
