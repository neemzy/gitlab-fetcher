# gitlab-fetcher

Simple helper to aggregate Gitlab API results across multiple pages

## Usage

### Fetching a paginated collection

```js
import { fetchGitlab } from "gitlab-fetcher";

fetchGitlab("YourToken", "https://gitlab.url/projects/1/issues", { scope: "all", state: "opened" })
  .then(issues => {
    /* ... */
  })
  .catch(console.error);
```

`issues` will contain a `Promise` resolving to aggregated results from all result pages. An `Error` will be thrown in case of HTTP error (with `message` containing `response.statusText`).

### Other requests (single entity, `POST`, etc.)

```js
import { callGitlab } from "gitlab-fetcher";

callGitlab("YourToken", "https://gitlab.url/projects/1/issues", { /* ... */ }, "post")
  .then(response => response.json())
  .catch(console.error);
```

### Server-side

This package can be easily used with Node.js and [ESM](https://www.npmjs.com/package/esm):

```js
/* eslint-env node */
global.fetch = require("node-fetch");
global.Headers = require("fetch-headers");

const { callGitlab, fetchGitlab } = require("gitlab-fetcher");
```

Simply run your script with `node -r esm path/to/script.js`.
