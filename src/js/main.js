document.addEventListener(
	'DOMContentLoaded',
	function () {
		const footerYear = document.querySelector('#footer-year');
		const hamburgerBtn = document.querySelector('.ti-menu-2');
		const navMobile = document.querySelector('.nav-mobile');
		const navItems = document.querySelectorAll('#nav');
		const nav = document.querySelector('.nav__items');
		const userName = document.querySelector('#username');
		const email = document.querySelector('#email');
		const btnClear = document.querySelector('.clear');
		const btnSend = document.querySelector('.send');
		const btnClose = document.querySelector('.close');
		const popup = document.querySelector('.popup');
		const allSection = document.querySelectorAll('.section');
		const btnNav = document.querySelector('.burger-btn__bars');

		const handleNav = () => {
			navMobile.classList.toggle('actives');
			hamburgerBtn.classList.toggle('black-bars-color');
			navItems.forEach((item) => {
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

		// grab the sections (targets) and menu_links (triggers)
		// for menu items to apply active link styles to

		// functions to add and remove the active class from links as appropriate
		const makeActive = (link) => navItems[link].classList.add('nav-black');
		const removeActive = (link) => navItems[link].classList.remove('nav-black');
		const removeAllActive = () =>
			[...Array(allSection.length).keys()].forEach((link) =>
				removeActive(link)
			);

		// change the active link a bit above the actual section
		// this way it will change as you're approaching the section rather
		// than waiting until the section has passed the top of the screen
		const sectionMargin = 200;

		// keep track of the currently active link
		// use this so as not to change the active link over and over
		// as the user scrolls but rather only change when it becomes
		// necessary because the user is in a new section of the page
		let currentActive = 0;

		// listen for scroll events
		window.addEventListener('scroll', () => {
			// check in reverse order so we find the last section
			// that's present - checking in non-reverse order would
			// report true for all sections up to and including
			// the section currently in view
			//
			// Data in play:
			// window.scrollY    - is the current vertical position of the window
			// sections          - is a list of the dom nodes of the sections of the page
			//                     [...sections] turns this into an array so we can
			//                     use array options like reverse() and findIndex()
			// section.offsetTop - is the vertical offset of the section from the top of the page
			//
			// basically this lets us compare each section (by offsetTop) against the
			// viewport's current position (by window.scrollY) to figure out what section
			// the user is currently viewing
			const current =
				allSection.length -
				[...sections]
					.reverse()
					.findIndex(
						(section) => window.scrollY >= section.offsetTop - sectionMargin
					) -
				1;

			// only if the section has changed
			// remove active class from all menu links
			// and then apply it to the link for the current section
			if (current !== currentActive) {
				removeAllActive();
				currentActive = current;
				makeActive(current);
			}
		});
	},
	false
);
