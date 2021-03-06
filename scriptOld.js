//header
document.querySelector('.navigation__items').addEventListener('click', (event) => {
  event.preventDefault();
  document.querySelectorAll('.navigation__item').forEach((item) => {
    item.classList.remove('navigation__item_active')
  });
  event.target.closest('li').classList.add('navigation__item_active');
  
  let marginMenu = getComputedStyle(document.querySelector('.navigation__items'));	
  let blockID = event.target.closest('a').getAttribute('href').substr(1);
  
  window.scrollTo({
	top: document.getElementById(blockID).getBoundingClientRect().top + pageYOffset - parseInt(marginMenu.height),
	left: 0,
	behavior: 'smooth'})
});

document.addEventListener('scroll', (event) => {
	  let currentPos = window.scrollY;
	  let sections= document.querySelectorAll('section');
	  let links = document.querySelectorAll('.navigation__item a');

	  sections.forEach((item)=> {
	    item.getAttribute('id');
		  if(item.offsetTop <= currentPos && (item.offsetTop + item.offsetHeight) > currentPos){
		    links.forEach((a) => {
		    a.parentElement.classList.remove('navigation__item_active');
			  if(item.getAttribute('id') === a.getAttribute('href').slice(1)){
			    a.parentElement.classList.add('navigation__item_active')
			  }
		    })
		  }
	  })	
	})


//slider
let items = document.querySelectorAll('.item-slider');
let currentItem = 0;
let isEnabled = true;

function changeCurrentItem(n) {
	currentItem = (n + items.length) % items.length;
}

function hideItem(direction) {
	isEnabled = false;
	items[currentItem].classList.add(direction);
	items[currentItem].addEventListener('animationend', function() {
		this.classList.remove('active', direction);
	});
}

function showItem(direction) {
	items[currentItem].classList.add('next', direction);
	items[currentItem].addEventListener('animationend', function() {
		this.classList.remove('next', direction);
		this.classList.add('active');
		isEnabled = true;
	});
}

function nextItem(n) {
	hideItem('to-left');
	changeCurrentItem(n + 1);
	showItem('from-right');
}

function previousItem(n) {
	hideItem('to-right');
	changeCurrentItem(n - 1);
	showItem('from-left');
}

document.querySelector('.arrow-left').addEventListener('click', function() {
	if (isEnabled) {
		previousItem(currentItem);
	}
});

document.querySelector('.arrow-right').addEventListener('click', function() {
	if (isEnabled) {
		nextItem(currentItem);
	}
});


document.querySelector('.slider__phone-vertical-base').addEventListener('click', onScreen);
function onScreen(event){
	if(event.target.classList.contains('slider__phone-vertical-base')){
	document.querySelector('.slider__phone-vertical-screen').classList.toggle('screen_off');
	}
}

document.querySelector('.slider__phone-horizontal-base').addEventListener('click', onScreen1);
function onScreen1(event){
	if(event.target.classList.contains('slider__phone-horizontal-base')){
	document.querySelector('.slider__phone-horizontal-screen').classList.toggle('screen_off');
	}
}


//portfolio
function randomInteger(min, max, num) {
  var i, arr = [], res = [];
	    for (i = min; i <= max; i++ ) arr.push(i);
	    for (i = 0; i < num; i++) res.push(arr.splice(Math.floor(Math.random() * (arr.length)), 1)[0])
	    return res;
}

document.querySelector('.teg').addEventListener('click', (event) => {
	event.preventDefault();
	document.querySelectorAll('.tegs').forEach((item) => {
		item.classList.remove('teg__active');
	});
	event.target.closest('li').classList.add('teg__active');
	
	let img = document.querySelectorAll('.portfolio__img');
	let arrRandom = [];
	arrRandom = randomInteger(0, img.length, img.length)
	
	for(let i = 0; i < arrRandom.length; i++){
		img[i].style.order = arrRandom[i];
	}	
})

document.querySelector('.layout-4-column').addEventListener('click', () => {
	document.querySelectorAll('.portfolio__img').forEach((item) => {
		item.classList.remove('img_active');
	});
	event.target.closest('.portfolio__img').classList.add('img_active');
})

//contact
document.querySelector('button').addEventListener('click', () => {
	event.preventDefault();
let windowMessage = document.createElement('div');
windowMessage.classList.add('modal');

let subjectValue = document.forms.contact.elements.subject.value;
let describeValue = document.forms.contact.elements.message.value;
let subject = '';
let describe = '';
if(subjectValue == 'Singolo'){
	subject = 'Тема: Singolo';
}
else if(subjectValue == ''){
	subject = 'Без темы';
}
else {
	subject = 'Тема: ' + subjectValue;
}

if(describeValue == 'Singolo'){
	describe = 'Описание: Portfolio project ';
}
else if(describeValue == ''){
	describe= 'Без описания';
}
else {
	describe = 'Описание: ' + describeValue;
}

if(!document.forms.contact.elements.name.validity.valid){
	document.forms.contact.elements.name.style.border = '1px solid #fff';
	document.querySelector('.hint-name').classList.add('hint_active');
} else {
	document.forms.contact.elements.name.style.border = 'none';
	document.querySelector('.hint-name').classList.remove('hint_active');
}
if(!document.forms.contact.elements.email.validity.valid){
	document.forms.contact.elements.email.style.border = '1px solid #fff';
	document.querySelector('.hint-email').classList.add('hint_active');
}else{
	document.forms.contact.elements.email.style.border = 'none';
	document.querySelector('.hint-email').classList.remove('hint_active');
}

windowMessage.innerHTML = `<p>Письмо отправлено </p>  <p>${subject}</p> <p>${describe}</p> <button class="button-modal">OK</button>`;
if(document.forms.contact.elements.email.validity.valid && document.forms.contact.elements.name.validity.valid){
document.body.appendChild(windowMessage);
} else {
	return;
}

document.querySelector('.button-modal').addEventListener('click', () => {
	document.querySelector('.modal').remove();
})
});










