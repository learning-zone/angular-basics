/// <reference lib="webworker" />

addEventListener('message', ({ data }) => {
  const response = `Web Workers ${data}`;
  postMessage(response);
});
