module.exports = {
    // other configurations
    reporters: [
      "default",
      ["jest-html-reporters", {
        "publicPath": "./html-report",
        "filename": "test-report.html",
        "expand": true
      }]
    ],
  };
  