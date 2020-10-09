// Here we have to pass a callback function to make it a delay function
function delay(cb) {
  setTimeout(cb, 1000);
}

// Using Promises
function delay() {
  return new Promise((res, rej) => {
    setTimeout(() => res(), 1000);
  });
}

delay()
  .then(() => console.log("Hello"))
  .then(() => delay())
  .then(() => {
    console.log("Another Hello");
  })
  .then(() => delay())
  .then(() => {
    console.log("Third Hello");
  });
