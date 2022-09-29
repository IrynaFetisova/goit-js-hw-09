const body = document.querySelector('body');
const btnStart = document.querySelector('button[data-start]');
const btnStop = document.querySelector('button[data-stop]');

let timerId = null;
const INTERVAL_DURATION = 1000;
btnStart.disabled = false;
btnStop.disabled = true;

function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
  };

  function bodyBgColor () {
    body.style.backgroundColor = getRandomHexColor();
  };

  btnStart.addEventListener("click", onRandomColor);

  function onRandomColor() {
    console.log(`Call onRandomColor ${INTERVAL_DURATION} ms`)
    timerId = setInterval(bodyBgColor, INTERVAL_DURATION);
    btnStart.disabled = true;
    btnStop.disabled = false;
  };

  btnStop.addEventListener("click", offRandomColor);

  function offRandomColor() {
    btnStart.disabled = false;
    btnStop.disabled = true;
    clearInterval(timerId);
    console.log(`Interval has stopped!`);
  };

