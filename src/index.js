// import { open } from "../components/popap";
// import { close } from "../components/popap";

document.addEventListener('DOMContentLoaded', function() {
    // это то модальное окно, с которым и будем работать
    const modal = document.querySelector('#myModal');

    // назначаем обработчик события для клика по кнопке открытия окна
    document.querySelector('#myBtn').addEventListener('click', openModal);
    document.querySelector('#myBtn2').addEventListener('click', openModal);
    /*
     * Обработчик события клика по кнопке открытия модального окна
     */
    function openModal() {
        modal.classList.add('modal-open');
        // обработчики событий, которые работают, когда окно открыто
        attachModalEvents();
    }

    /*
     * Функция назначает обработчики событий к элементам модального окна при открытии
     */
    function attachModalEvents() {
        // закрывать модальное окно при нажатии на крестик
        modal.querySelector('.close').addEventListener('click', closeModal);
        // закрывать модальное окно при нажатии клавиши Escape
        document.addEventListener('keydown', handleEscape);
        // закрывать модальное окно при клике вне контента модального окна
        modal.addEventListener('click', handleOutside);
    }

    /*
     * Обработчик события клика по кнопке закрытия модального окна
     */
    function closeModal() {
        modal.classList.remove('modal-open');
        // окно закрыто, эти обработчики событий больше не нужны
        detachModalEvents();
    }

    /*
     * Функция удаляет обработчики событий к элементам модального окна при закрытии
     */
    function detachModalEvents() {
        modal.querySelector('.close').removeEventListener('click', closeModal);
        document.removeEventListener('keydown', handleEscape);
        modal.removeEventListener('click', handleOutside);
    }

    /*
     * Функция закрывает модальное окно при нажатии клавиши Escape
     */
    function handleEscape(event) {
        if (event.key === 'Escape') {
            closeModal();
        }
    }

    /*
     * Функция закрывает модальное окно при клике вне контента модального окна
     */
    function handleOutside(event) {
        const isClickInside = !!event.target.closest('.modal-content');
        if (!isClickInside) {
            closeModal();
        }
    }
});





/*
 * Validate
 */


const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const password2 = document.getElementById('password2');
form.addEventListener('submit', e => {
    e.preventDefault();

    validateInputs();
});
const setError = (element, message) => {
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector('.error');

    errorDisplay.innerText = message;
    inputControl.classList.add('error');
    inputControl.classList.remove('success')
}
const setSuccess = element => {
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector('.error');

    errorDisplay.innerText = '';
    inputControl.classList.add('success');
    inputControl.classList.remove('error');
};
const isValidEmail = email => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}
const validateInputs = () => {
    const usernameValue = username.value.trim();
    const emailValue = email.value.trim();
    const passwordValue = password.value.trim();
    const password2Value = password2.value.trim();

    if (usernameValue === '') {
        setError(username, 'Username is required');
    } else {
        setSuccess(username);
    }

    if (emailValue === '') {
        setError(email, 'Email is required');
    } else if (!isValidEmail(emailValue)) {
        setError(email, 'Provide a valid email address');
    } else {
        setSuccess(email);
    }

    if (passwordValue === '') {
        setError(password, 'Password is required');
    } else if (passwordValue.length < 8) {
        setError(password, 'Password must be at least 8 character.')
    } else {
        setSuccess(password);
    }

    if (password2Value === '') {
        setError(password2, 'Please confirm your password');
    } else if (password2Value !== passwordValue) {
        setError(password2, "Passwords doesn't match");
    } else {
        setSuccess(password2);
    }
};






// ТАБЫ




document.querySelectorAll('.accordion').forEach(function(el, index) {
    el.addEventListener('click', function() {
        el.classList.toggle('active');
        el.nextElementSibling.style.display = el.nextElementSibling.style.display === 'block' ?
            'none' :
            'block';
    });

    0 === index && (el.nextElementSibling.style.display = 'block');
    1 === index && (el.nextElementSibling.style.display = 'block');
});
//Оля

const selectAllGoods = document.querySelector('#all'),
    selectOneGood = document.querySelector('#sel_one'),
    selectTwoGood = document.querySelector('#sel_two'),
    selectThreeGood = document.querySelector('#sel_three');
//console.log(selectAllGoods);


const goods = [selectOneGood, selectTwoGood, selectThreeGood];
const selectedGoods = [];

const selectAll = () => {
    if (selectAllGoods.checked) {
        goods.map(good => good.checked = true)

    } else {
        goods.map(good => good.checked = false)
    }
    console.log(goods);
}
selectAllGoods.addEventListener('change', selectAll)

const goodItems = document.querySelectorAll('.card');
goodItems.forEach(item => {
    console.log(item);
    const counter = item.querySelector('.product__counter');

    const count = counter.querySelector('.product__quanity');
    const finalPrice = item.querySelector('.product__finalPrice strong');
    console.log(finalPrice);
    const discountPrice = item.querySelector('.product__discount strong');
    const incrementor = () => {
        count.textContent = +count.textContent + 1
    }
    const decrementor = () => {

        count.textContent = +count.textContent - 1
    }
    const changePrice = () => {
        finalPrice.textContent = parseInt(finalPrice.textContent.replace(' ', '')) * parseInt(count.textContent)
        discountPrice.textContent = parseInt(discountPrice.textContent.replace(' ', '')) * parseInt(count.textContent)
    }

    counter.querySelector('.product__plus').addEventListener('click', () => {
        incrementor();
        changePrice();
    })
    counter.querySelector('.product__minus').addEventListener('click', () => {
        decrementor();
        changePrice();
    })
})