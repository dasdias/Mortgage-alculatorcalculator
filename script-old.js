const CREDIT_MIN = 0; 
const CREDIT_MAX = 15000000; 

const creditText = document.querySelector('#creditNumber');
const creditRange = document.querySelector('#creditNumberInput');
const firstContributionNumber = document.querySelector('#firstContributionNumber');

const formaterNubber = new Intl.NumberFormat('ru');
const formaterCurrency = new Intl.NumberFormat('ru', {
    style: 'currency',
    currency: 'RUB',
    minimumFractionDigits: 0
});

creditText.addEventListener('focus', function(event){
    let number = '';

    for (const letter of this.value) {
        if ("0123456789".includes(letter)) {
            number += letter;
        }
    }

    number = parseInt(number);
    this.value = formaterNubber.format(number);
});


creditText.addEventListener('input', function(event){

    let number = '';

    for (const letter of this.value) {
        if ("0123456789".includes(letter)) {
            number += letter;
        }
    }

    number = parseInt(number);

    if (number < CREDIT_MIN) {
        number = CREDIT_MIN;
    }

    if (number > CREDIT_MAX) {
        number = CREDIT_MAX;
    }


    creditRange.value = number;

    number = formaterNubber.format(number);
    this.value = number;

});

creditText.addEventListener('blur', function (event) {
    let number = '';

    for (const letter of this.value) {
        if ("0123456789".includes(letter)) {
            number += letter;
        }
    }

    number = parseInt(number);
    this.value = formaterCurrency.format(number);
});

creditRange.addEventListener('input', function (event) {
    creditText.value = formaterCurrency.format(parseInt(this.value));
});