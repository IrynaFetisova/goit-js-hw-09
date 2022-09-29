import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import { Notify } from 'notiflix/build/notiflix-notify-aio';


const input = document.querySelector('#datetime-picker');
const btn = document.querySelector('button[data-start]');
const timerDiv = document.querySelector('.timer');
const day = document.querySelector('span[data-days]');
const hours = document.querySelector('span[data-hours]');
const min = document.querySelector('span[data-minutes]');
const sec = document.querySelector('span[data-seconds]');

btn.classList.add('disabled');
let userDate = null;

function pad(value) {
    return String(value).padStart(2, '0');
}

function convertMs(ms) {
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

   
    const days = pad(Math.floor(ms / day));
    const hours = pad(Math.floor((ms % day) / hour));
    const minutes = pad(Math.floor(((ms % day) % hour) / minute));
    const seconds = pad(Math.floor((((ms % day) % hour) % minute) / second));

    return { days, hours, minutes, seconds };
};

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        if (selectedDates[0] < Date.now()) {
            Notify.failure('Please choose a date in the future');
            userDate = new Date();
        } else {
            btn.disabled = false;
            btn.classList.remove('disabled');
            userDate = selectedDates[0];
        }
    },
};

class Timer {
    constructor() {
        this.isActive = false;
        this.timerId = null;
        btn.disabled = true;
    }
    timerStart() {
        if (this.isActive) {
            return;
        }
        this.isActive = true;
        this.timerId = setInterval(() => {
            const currentTime = Date.now();
            const deltaTime = userDate - currentTime;
            const components = convertMs(deltaTime);

            day.textContent = components.days;
            hours.textContent = components.hours;
            min.textContent = components.minutes;
            sec.textContent = components.seconds;
            if (deltaTime <= 0) {
                this.timerStop();
                timerDiv.innerHTML = "Time is over!";
            }
        }, 1000)
    };

    timerStop() {
        clearInterval(this.timerId);
    };
};

const timer = new Timer();
flatpickr(input, options);
btn.addEventListener('click', () => timer.timerStart());





