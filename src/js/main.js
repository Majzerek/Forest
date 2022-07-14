const footerYear = document.querySelector('#footer-year')
const hamburgerBtn = document.querySelector('.ti')
const navMobile = document.querySelector('.nav-mobile')
const navItems = document.querySelectorAll('.hide')
const userName = document.querySelector('#username');
const email = document.querySelector('#email');
const btnClear = document.querySelector('.clear');
const btnSend = document.querySelector('.send');
const btnClose = document.querySelector('.close');
const popup = document.querySelector('.popup');

const showError = (input,msg) => {
    
    const formBox = input.parentElement;
    const errorMsg = formBox.querySelector('.error-text');

    formBox.classList.add('error');
    errorMsg.textContent = msg;
}

const clearError = input => {
    const formBox = input.parentElement;
    formBox.classList.remove('error')
}


const checkForm = input => {
    input.forEach( el => {
        if(el.value === ''){
            showError(el, el.placeholder)
        } else {
           clearError(el)
        }
    })
}

const checkLength = (input, min) => {

    if(input.value < min) {
        showError(input, `${input.previousElementSibling.innerText.slice(0, -1)} musi zawierać min.${min} znaków`)
    }
}



const checkMail = email => {
        
        const re =    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        
        if(re.test(email.value)) {
            clearError(email)
        } else {
            showError(email, 'E-mail jest niepoprawny')
        }
      
}

const checkErrors = () => {
    const allInputs = document.querySelectorAll('.form-box');
    let errorCount = 0

    allInputs.forEach(el => {
        if(el.classList.contains('error')) {
            errorCount ++;
        }
    })
    if(errorCount === 0) {
        popup.classList.add('show-popup')
    }
}

btnSend.addEventListener('click', e => {
    e.preventDefault()

    checkForm([userName, email])
    checkLength(userName, 3)
    checkMail(email)
    checkErrors();
})




btnClear.addEventListener('click', (e) => {
	e.preventDefault();
	[userName, email].forEach((el) => {
		el.value = '';
        clearError(el)
	});
});

const handleNav = () => {
	navMobile.classList.toggle('active')
}
const hideNav = () => {
	navItems.forEach.addEventListener('click', handleNav)
}





const handleCurrentYear = () => {
	const year = new Date().getFullYear();
	footerYear.innerText = year;
};

handleCurrentYear();
hamburgerBtn.addEventListener('click', handleNav)
navItems.forEach.addEventListener('click', hideNav)