import iziToast from 'izitoast';
import "izitoast/dist/css/iziToast.min.css";

const form = document.querySelector('.form');
const label = document.querySelector('.form label')
const input = label.querySelector('input')
const fieldset = form.querySelector('fieldset')
const button = form.querySelector('button')

form.addEventListener('submit', event => {
    event.preventDefault();

const delay = Number(form.elements.delay.value);
const state = form.elements.state.value;

const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
        if (state === 'fulfilled') {
            resolve(delay);
        } else {
            reject(delay);
        }
    }, delay);
});

promise
    .then(delay => {
        iziToast.success({
            title: '✅',
            message: `Fulfilled promise in ${delay}ms`,
            position: 'topRight',
            messageColor: 'white',
            color: '#38ca27ff',
            close: false,
            icon: null
        });
    })
    .catch(delay => {
        iziToast.error({
            title: '❌',
            message: `Rejected promise in ${delay}ms`,
            position: 'topRight',
            messageColor: 'white',
            color: '#d65a25ff',
            close: false,
            icon: null
        });
    });
});

Object.assign(form.style, {
    marginTop: `${24}px`,
    width: `${261}px`,
    fontFamily: 'Montserrat, sans-serif',
    padding: `${25}px`,
});

Object.assign(input.style, {
    display: 'block',
    marginTop: `${4}px`,
    height: `${32}px`,
    marginBottom: `${8}px`,
    width: `${250}px`,
});

Object.assign(button.style, {
    marginTop: `${8}px`,
    width: `${260}px`,
    height:`${30}px`,
});
