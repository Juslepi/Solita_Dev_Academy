require("ts-node").register({
  project: "./tsconfig.json", // Replace with the path to your tsconfig.json file
});

require("./test/app.test.ts"); // Replace with the path to your test file
