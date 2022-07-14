const footerYear = document.querySelector('#footer-year')
const hamburgerBtn = document.querySelector('.ti')
const navMobile = document.querySelector('.nav-mobile')
const navItems = document.querySelectorAll('.hide')

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