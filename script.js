const CREDIT_MIN = 0;
const CREDIT_MAX = 15000000;

const PERIOD_MIN = 1;
const PERIOD_MAX = 35;

const creditText = document.querySelector('#creditNumber');
const creditRange = document.querySelector('#creditNumberInput');

const firstContributionNumber = document.querySelector('#firstContributionNumber');
const firstContributionNumberInput = document.querySelector('#firstContributionNumberInput');

const returnPeriodNumber = document.querySelector('#returnPeriodNumber');
const returnPeriodNumberInput = document.querySelector('#returnPeriodNumberInput');

const formaterNubber = new Intl.NumberFormat('ru');
const formaterCurrency = new Intl.NumberFormat('ru', {
    style: 'currency',
    currency: 'RUB',
    minimumFractionDigits: 0
});

// при потере фокуса вызываем функцию textFocusChange
creditText.addEventListener('focus', textFocusChange);
firstContributionNumber.addEventListener('focus', textFocusChange);

// при потере фокуса форматируем цифры в input
function textFocusChange(event) {


    let number = '';

    // исключаем ввод букв
    for (const letter of this.value) {
        if ("0123456789".includes(letter)) {
            number += letter;
        }
    }

    // приводим к числовому значению
    number = parseInt(number);

    // this ссылается на тот объект на котором произошло событие
    // и записываем в него форматированое число
    this.value = formaterNubber.format(number);
}


creditText.addEventListener('input', inputChange);
firstContributionNumber.addEventListener('input', inputChange);
returnPeriodNumber.addEventListener('input', inputChange);

function inputChange() {



    let number = '';

    // исключаем ввод букв
    for (const letter of this.value) {
        if ("0123456789".includes(letter)) {
            number += letter;
        }
    }

    // приводим к числовому значению
    number = parseInt(number);

    // проверяем чтобы число было не меньше заданного в константе CREDIT_MIN
    if (number < CREDIT_MIN) {
        number = CREDIT_MIN;
    }

    // проверяем чтобы число было не больше заданного в константе CREDIT_MAX
    if (number > CREDIT_MAX) {
        number = CREDIT_MAX;
    }

    // находим следующий элемент записываем значение в input c типом range
    this.nextElementSibling.value = number;
    // creditRange.value = number;

    // форматируем число
    number = formaterNubber.format(number);

    // записываем форматированное число в объект на котором произошло событие
    this.value = number;

}

// при потере фокуса вызываем функцию formatCurrency
creditText.addEventListener('blur', formatCurrency);
firstContributionNumber.addEventListener('blur', formatCurrency);

// добавляем валюту к числу
function formatCurrency() {


    let number = '';

    for (const letter of this.value) {
        if ("0123456789".includes(letter)) {
            number += letter;
        }
    }

    number = parseInt(number);
    this.value = formaterCurrency.format(number);
}

function getYear(valYear) { 
    let numValYear = parseInt(valYear);
    if (numValYear === 1 || numValYear === 21 || numValYear === 31) {
        return   numValYear + ' год';
    } else if (numValYear >= 2 && numValYear <= 4 || numValYear >=22 && numValYear <=24 || numValYear >=32 && numValYear <= 34) {
        return   numValYear + ' года';
    } else {
        return   numValYear + ' лет';
    } 

 }
 


creditRange.addEventListener('input', changeRange);
firstContributionNumberInput.addEventListener('input', changeRange);
returnPeriodNumberInput.addEventListener('input', changeRange);

function changeRange() {

    if (this.getAttribute('data-RangeValue') === 'RangeValue') {
        //находим вышестоящего потомка (input с типом text) и записываем в него 
        // значение ползунка и валюту 
        this.previousElementSibling.value = formaterCurrency.format(parseInt(this.value));
    } else {
        //находим вышестоящего потомка (input с типом text) и записываем в него 
        // значение ползунка и год 
        this.previousElementSibling.value = getYear(this.value);
    }
}