# gitlab-fetcher

Simple helper to aggregate Gitlab API results across multiple pages

## Usage

```js
import fetchGitlab from "gitlab-fetcher";

const issues = fetchGitlab("YourToken", "https://gitlab.url/issues", { scope: "all", state: "opened" });
```

`issues` will contain a `Promise` resolving to aggregated results from all result pages. An `Error` will be thrown in case of HTTP error (with `message` containing `response.statusText`).
