//task 1
function logMouseCoordinates() {
  let timeoutId;

  window.addEventListener('mousemove', (e) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      console.log(e.clientX, e.clientY);
    }, 100);
  });
}

logMouseCoordinates();
