const request = require("request");
const fs = require("fs");
const input = process.argv;
const url = input[2];
const path = input[3];
let fileSize = 0;

const fetcher = function (url, path) {
  request(url, (error, response, body) => {
    console.log("error:", error); // Print the error if one occurred
    console.log("statusCode:", response && response.statusCode); // Print the response status code if a response was received
    console.log("body:", body); // Print the HTML for the Google homepage.

    const content = body;
    fs.writeFile(path, content, { flag: "a+" }, (err, data) => {
      if (err) {
        console.error(err);
      } else {
        fs.stat(path, (err, stats) => {
          if (err) {
            console.error(err);
          }
          console.log(
            `Downloaded and saved ${stats.size} bytes to ./index.html.`
          );
        });
      }
    });
  });
};

fetcher(url, path);
