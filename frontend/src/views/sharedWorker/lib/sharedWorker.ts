const ports = [];

addEventListener("connect", (e) => {
  console.log("123")
  postMessage("Hello World!");
})
