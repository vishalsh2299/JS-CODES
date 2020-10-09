function doThis(cb) {
  setTimeout(cb, 1000);
}

// Callback
doThis(function () {
  console.log("Hello");
  doThis(function () {
    console.log("Second Hello");
    doThis(function () {
      console.log("Third Hello");
    });
  });
});

// Promises
doThis()
  .then(function () {
    console.log("Hello");
  })
  .then(function () {
    console.log("Hello Second");
  })
  .then(function () {
    console.log("Hello Third");
  });

// Await Async
await doThis(function () {
  console.log("Hello");
});

await doThis(function () {
  console.log("123123");
});

await doThis(function () {
  console.log("Abcbb");
});
