export function onClickOutside(node, options = {}) {
  //ensure options is always an object and callback is a function
  const { callback = () => {}, excludeSelector } = options;

  function handleClick(event) {
    //if click is inside the node=> do nothing
    if (node.contains(event.target)) return;

    //if click is on the excluded element => do nothing
    if (excludeSelector && event.target.closest(excludeSelector)) return;

    callback();
  }

  document.addEventListener("click", handleClick);

  return {
    destroy() {
      document.removeEventListener("click", handleClick);
    },
  };
}
