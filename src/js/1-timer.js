import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
import iconUrl from "../img/close-circle-svgrepo-com.svg";

const startBtn = document.querySelector("[data-start]");
const dateInput = document.querySelector("#datetime-picker");
const daysSpan = document.querySelector("[data-days]");
const hoursSpan = document.querySelector("[data-hours]")
const minutesSpan = document.querySelector("[data-minutes]")
const secondsSpan = document.querySelector("[data-seconds]")
const timerContainer = document.querySelector(".timer")
const parentDaysSpan = document.querySelector("[data-days]").parentElement;
const parentHoursSpan = document.querySelector("[data-hours]").parentElement;
const parentMinuteSpan = document.querySelector("[data-minutes]").parentElement;
const parentSecondSpan = document.querySelector("[data-seconds]").parentElement;

let userSelectedDate = null;
let timerId = null;

startBtn.disabled = true;

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        const selectedDate = selectedDates[0]
        const now = new Date()   
        if (selectedDate <= now) {
            iziToast.warning({
                iconUrl,
                iconColor: 'black',
                message: 'Please choose the date in the future',
                messageColor: 'white',
                color: '#e02828ff',
                position: 'topRight',
                close: false,
            });
            startBtn.disabled = true;
            userSelectedDate = null;
            return;
        };
        userSelectedDate = selectedDate;
        startBtn.disabled = false;
    },
};

flatpickr(dateInput, options);

startBtn.addEventListener("click", btnClickHandler);

function btnClickHandler() { 
    if (!userSelectedDate) { 
        return;
    };
    startBtn.disabled = true;
    dateInput.disabled = true;

    timerId = setInterval(() => { 
        const now = new Date();
        const delta = userSelectedDate - now;
        if (delta <= 0) { 
            clearInterval(timerId)
            updateTimerDisplay(0);
            dateInput.disabled = false;
            return;
        }
        updateTimerDisplay(delta);
    }, 1000);
};

function updateTimerDisplay(ms) {
    const { days, hours, minutes, seconds } = convertMs(ms);

    daysSpan.textContent = addLeadingZero(days);
    hoursSpan.textContent = addLeadingZero(hours);
    minutesSpan.textContent = addLeadingZero(minutes);
    secondsSpan.textContent = addLeadingZero(seconds);
}

function addLeadingZero(value) {
    return String(value).padStart(2, '0');
}

function convertMs(ms) {
    const second = 1000;
    const minute = 60 * second;
    const hour = 60 * minute;
    const day = 24 * hour;

    const days = Math.floor(ms / day);
    const hours = Math.floor((ms % day) / hour);
    const minutes = Math.floor((ms % hour) / minute);
    const seconds = Math.floor((ms % minute) / second);

    return { days, hours, minutes, seconds };
}

Object.assign(dateInput.style, {
    marginTop: `${20}px`,
    height: `${25}px`,
    marginLeft: `${25}px`,
});

Object.assign(startBtn.style, {
    height: `${25}px`,
});

Object.assign(timerContainer.style, {
    display: 'flex',
    marginTop: `${20}px`,
    gap: `${10}px`,
    marginLeft: `${25}px`,
});
  
[parentDaysSpan, parentHoursSpan, parentMinuteSpan, parentSecondSpan].forEach(el =>  
    Object.assign(el.style, {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        fontFamily: 'Inter, sans-serif',
        textTransform: 'uppercase',
        fontSize:`${10}px`
  })
);

[daysSpan, hoursSpan, minutesSpan, secondsSpan].forEach((el) => { 
    Object.assign(el.style, {
        fontSize: `${30}px`,
    });
});



