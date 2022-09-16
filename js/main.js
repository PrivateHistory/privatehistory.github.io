window.addEventListener('load', function () {
    let allInputs = document.querySelectorAll('input');
    for (let i = 0; i < allInputs.length; i++) {
        let container = allInputs[i].parentElement;
        let wrapper = container.parentElement;
        let errorElement = wrapper.querySelector('.form__input-informer');

        allInputs[i].addEventListener('focus', function () {
            container.classList.remove('form__input-container--success', 'form__input-container--error');
            container.classList.add('form__input-container--focus');
            this.previousElementSibling.classList.add('form__input-placeholder--active', 'form__input-placeholder--focus');
        });

        allInputs[i].addEventListener('blur', function () {
            container.classList.remove('form__input-container--focus');
            if (this.value === '' || this.value === null || this.value === undefined || this.value === ' ' || this.value === "+7 (") {
                this.previousElementSibling.classList.remove('form__input-placeholder--active', 'form__input-placeholder--focus');
                errorElement.childNodes[1].classList.add('form__input-informer-wrapper--active');
            } 
        });
    }

});


// =================== Валидация номера телефона ===================
const phone = document.querySelector('#phone');
const parent = phone.parentElement;
const wrapper = parent.parentElement;
const phoneError = document.querySelector('#phone-error');


phone.addEventListener("input", (e) => {
    const value = phone.value.replace(/\D+/g, "");
    const numberLength = 11;

    if (value.length < numberLength) {
        phoneError.classList.add("form__input-informer-wrapper--active");
        phoneError.childNodes[2].textContent = "Номер телефона указан неверно";
        parent.classList.remove('form__input-container--success');
        phone.nextElementSibling.classList.remove('form__input-success--active');
        phone.classList.add("form__input--error");
        parent.classList.add("form__input-container--focus");
        phone.previousElementSibling.classList.add("form__input-placeholder--focus");

    } else if(value.length >= numberLength) {
        phoneError.classList.remove('form__input-informer-wrapper--active');
        phone.nextElementSibling.classList.add('form__input-success--active');
        parent.classList.remove('form__input-container--error');
        parent.classList.add('form__input-container--success');
        phone.classList.remove('form__input--error');
        phone.previousElementSibling.classList.remove("form__input-placeholder--focus");

    } if(value === "" || value === '+7 (') {
        phoneError.childNodes[2].textContent = "Обязательное поле";
        phone.nextElementSibling.classList.remove('form__input-success--active');
        parent.classList.remove('form__input-container--success');
    }

    let result;
    if (phone.value.includes("+8") || phone.value[0] === "8") {
        result = "";
    } else {
        result = "+7 (";
    }

    for (let i = 0; i < value.length && i < numberLength; i++) {
        switch (i) {
            case 0:
                continue;
            case 4:
                result += ") ";
                break;
            case 7:
                result += "-";
                break;
            case 9:
                result += "-";
                break;
            default:
                break;
        }
        result += value[i];
    }
    //
    phone.value = result;
});

phone.addEventListener("blur", (e) => {
    phone.previousElementSibling.classList.remove("form__input-placeholder--focus");
    if(phone.value === "" || phone.value === '+7 (') {
        phoneError.childNodes[2].textContent = "Обязательное поле";
        parent.classList.add('form__input-container--error');
        phone.classList.add('form__input--error');
    } else if(phone.value.length < 18) {
        parent.classList.add('form__input-container--error');
        phone.classList.add('form__input--error');
        phone.previousElementSibling.classList.add('form__input-placeholder--error');
    } else {
        parent.classList.remove('form__input-container--error');
        phone.classList.remove('form__input--error');
        phone.previousElementSibling.classList.remove('form__input-placeholder--error');
    }
});


// ================== Валидация почты ==================

const email = document.querySelector("#email");
email.addEventListener("input", (e) => {
    email.value = transliterateENG(email.value);
    checkMailValid();
});

email.addEventListener("blur", (e) => {
    email.previousElementSibling.classList.remove('form__input-placeholder--focus');
    checkMailValid();
    if(checkMailValid()){
        email.previousElementSibling.classList.add("form__input-placeholder--active");
    }
});

function checkMailValid() {
    const value = email.value;
    const emailReg = /^[\w-\.]+@[\w-]+\.[a-z]{2,4}$/i;
    const valid = emailReg.test(value);
    const container = email.parentElement;
    const wrapper = container.parentElement;
    const errorElement = wrapper.querySelector('.form__input-informer');
    if (!valid && value !== "") {
        email.nextElementSibling.classList.remove("form__input-success--active");
        email.parentElement.classList.remove("form__input-container--success");
        email.classList.add("form__input--error");
        email.parentElement.classList.add("form__input-container--error");
        errorElement.childNodes[1].classList.add('form__input-informer-wrapper--active');
        errorElement.childNodes[1].childNodes[2].textContent = "Проверьте адрес почты";
        return false;
    
    } else if(value.length === 0) {
        email.nextElementSibling.classList.remove("form__input-success--active");
        email.parentElement.classList.remove("form__input-container--success");
        email.classList.add("form__input--error");
        email.parentElement.classList.add("form__input-container--error");
        errorElement.childNodes[1].classList.add('form__input-informer-wrapper--active');
        errorElement.childNodes[1].childNodes[2].textContent = "Обязательное поле";
        return false;
    } else {
        email.classList.remove("form__input--error");
        errorElement.childNodes[1].classList.remove('form__input-informer-wrapper--active');
        email.parentElement.classList.remove("form__input-container--error");
        email.nextElementSibling.classList.add("form__input-success--active");
        email.parentElement.classList.add("form__input-container--success");
        return true;
    }
}

// ================== Валидачия имени ==================

const nameInput = document.querySelectorAll(".form__input-name");
nameInput.forEach((item) => {
    item.addEventListener("input", (e) => {
        item.value = transliterateRU(item.value);
        checkNameValid(item);
    });

    item.addEventListener("blur", (e) => {
        item.previousElementSibling.classList.remove('form__input-placeholder--focus');
        checkNameValid(item);
    });
}
);


// =============== Транслитерация английского в русский ===============
function transliterateRU(word) {
    var answer = "";
    var converter = {
        // eng rus
        a: "а",
        b: "б",
        v: "в",
        g: "г",
        d: "д",
        e: "е",
        yo: "ё",
        zh: "ж",
        z: "з",
        i: "и",
        j: "й",
        k: "к",
        l: "л",
        m: "м",
        n: "н",
        o: "о",
        p: "п",
        r: "р",
        s: "с",
        t: "т",
        u: "у",
        f: "ф",
        h: "х",
        c: "ц",
        ch: "ч",
        sh: "ш",
        shch: "щ",
        y: "ы",
        yu: "ю",
        ya: "я",
        A: "А",
        B: "Б",
        V: "В",
        G: "Г",
        D: "Д",
        E: "Е",
        Yo: "Ё",
        Zh: "Ж",
        Z: "З",
        I: "И",
        J: "Й",
        K: "К",
        L: "Л",
        M: "М",
        N: "Н",
        O: "О",
        P: "П",
        R: "Р",
        S: "С",
        T: "Т",
        U: "У",
        F: "Ф",
        H: "Х",
        C: "Ц",
        Ch: "Ч",
        Sh: "Ш",
        Shch: "Щ",
        Y: "Ы",
        Yu: "Ю",
        Ya: "Я",
        q: "й",
        w: "ц",
        e: "у",
        r: "к",
        Q: "Й",
        W: "Ц",
        E: "У",
        R: "К",

    };

    for (var i = 0; i < word.length; i++) {
        if (converter[word[i]] == undefined) {
            answer += word[i];
        } else {
            answer += converter[word[i]];
        }
    }

    return answer;
}

// =============== Транслитерация русского в английский ===============
function transliterateENG(word) {
    var answer = "";
    var converter = {
        // rus eng
        а: "a",
        б: "b",
        в: "v",
        г: "g",
        д: "d",
        е: "e",
        ё: "yo",
        ж: "zh",
        з: "z",
        и: "i",
        й: "j",
        к: "k",
        л: "l",
        м: "m",
        н: "n",
        о: "o",
        п: "p",
        р: "r",
        с: "s",
        т: "t",
        у: "u",
        ф: "f",
        х: "h",
        ц: "c",
        ч: "ch",
        ш: "sh",
        щ: "shch",
        ы: "y",
        ю: "yu",
        я: "ya",
        А: "A",
        Б: "B",
        В: "V",
        Г: "G",
        Д: "D",
        Е: "E",
        Ё: "Yo",
        Ж: "Zh",
        З: "Z",
        И: "I",
        Й: "J",
        К: "K",
        Л: "L",
        М: "M",
        Н: "N",
        О: "O",
        П: "P",
        Р: "R",
        С: "S",
        Т: "T",
        У: "U",
        Ф: "F",
        Х: "H",
        Ц: "C",
        Ч: "Ch",
        Ш: "Sh",
        Щ: "Shch",
        Ы: "Y",
        Ю: "Yu",
        Я: "Ya",
        й: "q",
        ц: "w",
        у: "e",
        к: "r",
        Й: "Q",
        Ц: "W",
        У: "E",
        К: "R",
    };

    for (var i = 0; i < word.length; i++) {
        if (converter[word[i]] == undefined) {
            answer += word[i];
        } else {
            answer += converter[word[i]];
        }
    }

    return answer;
}

// ==================== Валидация имени ====================

const name = document.querySelector("#name");
const surname = document.querySelector("#surname");

function checkNameValid(item) {

    const value = item.value;
    const nameReg = /^[a-zA-Zа-яА-Я]+$/;
    const valid = nameReg.test(value);
    const container = item.parentElement;
    const wrapper = container.parentElement;
    const errorElement = wrapper.querySelector('.form__input-informer');
        
    if (!valid && value !== "") {
        item.nextElementSibling.classList.remove("form__input-success--active");
        item.parentElement.classList.remove("form__input-container--success");
        item.classList.add("form__input--error");
        item.parentElement.classList.add("form__input-container--error");
        errorElement.childNodes[1].classList.add('form__input-informer-wrapper--active');
        errorElement.childNodes[1].childNodes[2].textContent = "Только буквы русского алфавита, дефисы и пробелы";
        return false;
    } else if(value.length === 0) {
        item.nextElementSibling.classList.remove("form__input-success--active");
        item.parentElement.classList.remove("form__input-container--success");
        item.classList.add("form__input--error");
        item.parentElement.classList.add("form__input-container--error");
        errorElement.childNodes[1].classList.add('form__input-informer-wrapper--active');
        errorElement.childNodes[1].childNodes[2].textContent = "Обязательное поле";
        return false;
    } else {
        item.classList.remove("form__input--error");
        errorElement.childNodes[1].classList.remove('form__input-informer-wrapper--active');
        item.parentElement.classList.remove("form__input-container--error");
        item.nextElementSibling.classList.add("form__input-success--active");
        item.parentElement.classList.add("form__input-container--success");
        return true;
    }
}


//===================================== Валидация отчества ===================================== 

const middlename = document.querySelector("#middlename");
middlename.addEventListener("input", (e) => {
    middlename.value = transliterateRU(middlename.value);
    if(middlename.value.length === 0) {
        middlename.classList.remove("form__input--error");
        middlename.nextElementSibling.classList.add("form__input-success--active");
        middlename.parentElement.classList.add("form__input-container--success");
    } else {
        checkMiddlenameValid();
    }
});

middlename.addEventListener("blur", (e) => {
    middlename.previousElementSibling.classList.remove('form__input-placeholder--focus');
    checkMiddlenameValid();
}
);

function checkMiddlenameValid() {
    const value = middlename.value;
    const nameReg = /^[a-zA-Zа-яА-Я]+$/;
    const valid = nameReg.test(value);
    const container = middlename.parentElement;
    const wrapper = container.parentElement;
    const errorElement = wrapper.querySelector('.form__input-informer');
    const errorElement2 = wrapper.querySelector('.form__input-informer-wrapper--error');
    if (!valid && value !== "") {
        middlename.nextElementSibling.classList.remove("form__input-success--active");
        middlename.parentElement.classList.remove("form__input-container--success");
        middlename.classList.add("form__input--error");
        middlename.parentElement.classList.add("form__input-container--error");
        errorElement2.classList.add('form__input-informer-wrapper--active');
        errorElement2.childNodes[2].textContent = "Только буквы русского алфавита, дефисы и пробелы";
        return false;
    } else if(value.length === 0) {
        middlename.nextElementSibling.classList.add("form__input-success--active");
        middlename.parentElement.classList.add("form__input-container--success");
        middlename.classList.remove("form__input--error");
        middlename.parentElement.classList.remove("form__input-container--error");
        errorElement2.classList.remove('form__input-informer-wrapper--active');
        errorElement2.childNodes[2].textContent = "";
        return false;
    } else {
        middlename.classList.remove("form__input--error");
        errorElement2.classList.remove('form__input-informer-wrapper--active');
        middlename.parentElement.classList.remove("form__input-container--error");
        middlename.nextElementSibling.classList.add("form__input-success--active");
        middlename.parentElement.classList.add("form__input-container--success");
        return true;
    }
}


// =======================  Чекбокс =======================

const checkbox = document.querySelector("#checkbox");
checkbox.addEventListener("change", (e) => {
    if(checkbox.checked) {
        document.querySelector("#checkbox-error").classList.remove("form__input-informer-wrapper--active");
        checkbox.parentElement.classList.remove("checkbox__input--error");
        checkbox.parentElement.classList.add("checkbox__input--checked");
    } else {
        checkbox.parentElement.classList.remove("checkbox__input--checked");
        checkbox.parentElement.classList.add("checkbox__input--error");
        document.querySelector("#checkbox-error").classList.add("form__input-informer-wrapper--active");
        document.querySelector("#checkbox-error").childNodes[2].textContent = "Необходимо дать свое согласие";  
    }
});
