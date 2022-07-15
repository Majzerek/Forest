document.addEventListener(
	'DOMContentLoaded',
	function () {
		const footerYear = document.querySelector('#footer-year');
		const hamburgerBtn = document.querySelector('.ti-menu-2');
		const navMobile = document.querySelector('.nav-mobile');
		const navItems = document.querySelector('nav');
		const nav = document.querySelectorAll('.nav__item');
		const userName = document.querySelector('#username');
		const email = document.querySelector('#email');
		const btnClear = document.querySelector('.clear');
		const btnSend = document.querySelector('.send');
		const btnClose = document.querySelector('.close');
		const popup = document.querySelector('.popup');
		const allSection = document.querySelectorAll('.section');
		const btnNav = document.querySelector('.burger-btn__bars');
	
	

		const options = {
			// root: null, // vieport default
			threshold: '0.6' // procent widocznosci
			// rootMargin: '200px' //margin obniza
		}

		const observer = new IntersectionObserver(function(entries) {
			entries.forEach(e => {
				if(e.isIntersecting) {
					//changing navbar style on scroll to next section
					// if(e.target.id !== "base") {
					// 	navItems.classList.add('nav-')
					// } else {
					// 	navItems.classList.remove('nav-')
					// }
					// section indicator 
					nav.forEach(link => {
						link.classList.remove('nav-black')
						if(e.target.id === link.dataset.nav) {
							link.classList.add('nav-black')
						}
					})
				}
				
			})
		}, options)
		allSection.forEach(section => 
			observer.observe(section))

		const handleNav = () => {
			navMobile.classList.toggle('actives');
			hamburgerBtn.classList.toggle('black-bars-color');
			nav.forEach((item) => {
				item.addEventListener('click', () => {
					navMobile.classList.remove('actives');
					hamburgerBtn.classList.remove('black-bars-color');
				});
			});
		};

		const handleCurrentYear = () => {
			const year = new Date().getFullYear();
			footerYear.innerHTML = year;
		};

		const sauron = () => {
			const currentSection = window.scrollY;

			allSection.forEach((section) => {
				if (
					section.classList.contains('white-section') &&
					section.offsetTop <= currentSection + 60
				) {
					btnNav.classList.add('black-bars-color');
				} else if (
					!section.classList.contains('white-section') &&
					section.offsetTop <= currentSection + 60
				) {
					btnNav.classList.remove('black-bars-color');
				}
			});
		};

		handleCurrentYear();
		hamburgerBtn.addEventListener('click', handleNav);
		window.addEventListener('scroll', sauron);

		const showError = (input, msg) => {
			const formBox = input.parentElement;
			const errorMsg = formBox.querySelector('.error-text');

			formBox.classList.add('error');
			errorMsg.textContent = msg;
		};

		const clearError = (input) => {
			const formBox = input.parentElement;
			formBox.classList.remove('error');
		};

		const checkForm = (input) => {
			input.forEach((el) => {
				if (el.value === '') {
					showError(el, el.placeholder);
				} else {
					clearError(el);
				}
			});
		};

		const checkLength = (input, min) => {
			if (input.value < min) {
				showError(
					input,
					`${input.previousElementSibling.innerText.slice(
						0,
						-1
					)} musi zawierać min.${min} znaków`
				);
			}
		};

		const checkMail = (email) => {
			const re =
				/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

			if (re.test(email.value)) {
				clearError(email);
			} else {
				showError(email, 'E-mail jest niepoprawny');
			}
		};

		const checkErrors = () => {
			const allInputs = document.querySelectorAll('.form-box');
			let errorCount = 0;

			allInputs.forEach((el) => {
				if (el.classList.contains('error')) {
					errorCount++;
				}
			});
			if (errorCount === 0) {
				popup.classList.add('show-popup');
			}
		};

		btnSend.addEventListener('click', (e) => {
			e.preventDefault();

			checkForm([userName, email]);
			checkLength(userName, 3);
			checkMail(email);
			checkErrors();
		});

		btnClear.addEventListener('click', (e) => {
			e.preventDefault();
			[userName, email].forEach((el) => {
				el.value = '';
				clearError(el);
			});
		});

		
	
})
