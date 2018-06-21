# gitlab-fetcher

Simple helper to aggregate Gitlab API results across multiple pages

## Usage

```js
import { fetchGitlab } from "gitlab-fetcher";

fetchGitlab("YourToken", "https://gitlab.url/projects/1/issues", { scope: "all", state: "opened" })
  .then(issues => {
    /* ... */
  })
  .catch(console.error);
```

`issues` will contain a `Promise` resolving to aggregated results from all result pages. An `Error` will be thrown in case of HTTP error (with `message` containing `response.statusText`).

If you need to do a `POST` request, this package can help as well:

```js
import { callGitlab } from "gitlab-fetcher";

callGitlab("YourToken", "https://gitlab.url/projects/1/issues", { /* ... */ }, "post")
  .then(response => response.json())
  .catch(console.error);
```
