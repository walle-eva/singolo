let data = [
    {
        id: 1,
		idToImg: 'Project1',
        title: 'Project1',
        urlToImage: 'assets/img/portfolio/Project01.png',
    },
    {
       id: 2,
		idToImg: 'Project2',
        title: 'Project2',
        urlToImage: 'assets/img/portfolio/Project02.png',
    },
    {
       id: 3,
		idToImg: 'Project3',
        title: 'Project3',
        urlToImage: 'assets/img/portfolio/Project03.png',
    },
	{
       id: 4,
		idToImg: 'Project4',
        title: 'Project4',
        urlToImage: 'assets/img/portfolio/Project04.png',
    },
	{
       id: 5,
		idToImg: 'Project5',
        title: 'Project5',
        urlToImage: 'assets/img/portfolio/Project05.png',
    },
	{
       id: 6,
		idToImg: 'Project6',
        title: 'Project6',
        urlToImage: 'assets/img/portfolio/Project06.png',
    },
	{
       id: 7,
		idToImg: 'Project7',
        title: 'Project7',
        urlToImage: 'assets/img/portfolio/Project07.png',
    },
	{
       id: 8,
		idToImg: 'Project8',
        title: 'Project8',
        urlToImage: 'assets/img/portfolio/Project08.png',
    },
	{
       id: 9,
		idToImg: 'Project9',
        title: 'Project9',
        urlToImage: 'assets/img/portfolio/Project09.png',
    },
	{
       id: 10,
		idToImg: 'Project10',
        title: 'Project10',
        urlToImage: 'assets/img/portfolio/Project010.png',
    },
	{
       id: 11,
		idToImg: 'Project11',
        title: 'Project11',
        urlToImage: 'assets/img/portfolio/Project011.png',
    },
	{
       id: 12,
		idToImg: 'Project12',
        title: 'Project12',
        urlToImage: 'assets/img/portfolio/Project012.png',
    }
];



window.onload = function() {
	//Header
	
    // Menu click
    addMenuClickHandler();

    // Menu Scroll
    addMenuScrollHandler();
	
	//slider
	addSliderClickHandler();
	
	//Portfolio
	
	//Tags
	renderImgsToDom();
	
	//BorderImg
	addBorderImg()
	
	//Contacts
	addSendClickHandler();
	
	//menuMobile
	addMenuMobileHandler();
	addMenuMobileClickHandler();
	linkCloseMenuMobile();
	addMenuMobileScrollHandler();
}

//Menu
const addMenuClickHandler = () => {
	let navigationItems = document.querySelector('.navigation__items');
	 
	navigationItems.addEventListener('click', (event) => {
	event.preventDefault();
	
	document.querySelectorAll('.navigation__item').forEach((item) => {
      item.classList.remove('navigation__item_active')
    });
	event.target.closest('li').classList.add('navigation__item_active');
  
	let marginMenu = getComputedStyle(navigationItems);	
	let blockID = event.target.closest('a').getAttribute('href').substr(1);
  
	window.scrollTo({
	  top: document.getElementById(blockID).getBoundingClientRect().top + pageYOffset - parseInt(marginMenu.height),
	  left: 0,
	  behavior: 'smooth'})
	});
}

const addMenuScrollHandler = () => {
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
}



//slider
const addSliderClickHandler = () => {
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
	document.querySelector('.slider').classList.toggle('slider-blue');
	document.querySelector('.arrow-left').classList.toggle('arrow-left-blue');
	document.querySelector('.arrow-right').classList.toggle('arrow-right-blue');
	
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


phoneVerticalOff();
phoneHorizontalOff();

}

const phoneVerticalOff = () => {
	document.querySelector('.slider__phone-vertical-wrap').addEventListener('click', () =>{
	document.querySelectorAll('.phone-vertical').forEach((img) => {
	  img.classList.toggle('phone-vertical-on')
	});
  })
}
const phoneHorizontalOff = () => {
document.querySelector('.slider__phone-horizontal-wrap').addEventListener('click', () => {
	document.querySelectorAll('.phone-horizontal').forEach((img) => {
	  img.classList.toggle('phone-horizontal-on')
	});
  })
}

//Portfolio
const generateImgs = (data) => {
    let imgs = [];
    data.forEach((itemImg) => {
		let img = document.createElement('img');
        img.setAttribute('id', itemImg.id);
		img.setAttribute('src', itemImg.urlToImage);
		img.setAttribute('alt', itemImg.title);
		imgs.push(img)
    });
    return imgs;
}

const getImgWrapper = () => {
    let imgWrapper = document.querySelector('.layout-4-column');
    imgWrapper.innerHTML = '';
	return imgWrapper;
}

const renderImgsToDom = () => { 
   let imgWrapper = getImgWrapper();
    generateImgs(data).forEach(item => {
		let imgDiv = document.createElement('div');
		imgDiv.classList.add('portfolio__img');
        imgWrapper.append(imgDiv);
		imgDiv.append(item);
    })
    addPortfolioClickHandler();
}

const addPortfolioClickHandler = () => {
	document.querySelector('.tag').addEventListener('click', (event) => {
	event.preventDefault();
	document.querySelectorAll('.tags').forEach((item) => {
		item.classList.remove('tag__active');
	});
	event.target.closest('li').classList.add('tag__active');
	
	let img = document.querySelectorAll('.portfolio__img');
	let arrRandom = [];
	arrRandom = randomInteger(0, img.length - 1, img.length)
	
	newData = [];
	
	for(let i = 0; i < arrRandom.length; i++){
	  newData.push(data[arrRandom[i]]);
	}	
	data = newData;
	renderImgsToDom();
})
}

const randomInteger = (min, max, num) => {
  var i, arr = [], res = [];
	    for (i = min; i <= max; i++ ) arr.push(i);
	    for (i = 0; i < num; i++) res.push(arr.splice(Math.floor(Math.random() * (arr.length)), 1)[0])
	    return res;
}

const addBorderImg = () => {
	document.querySelector('.layout-4-column').addEventListener('click', () => {
	document.querySelectorAll('.portfolio__img').forEach((item) => {
		item.classList.remove('img_active');
	});
	event.target.closest('.portfolio__img').classList.add('img_active');
})
}

//Contacts
const addSendClickHandler = () => {
	document.querySelector('button').addEventListener('click', () => {
	event.preventDefault();
	renderModalWindow();
	validateModalWindow();
	closeModalWindow();
}
)}

const generateModalWindow = () => {
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
		subject = 'No subject';
	}
	else {
		subject = 'Subject: ' + subjectValue;
	}

	if(describeValue == 'Singolo'){
		describe = 'Description: Portfolio project ';
	}
	else if(describeValue == ''){
		describe= 'No description ';
	}
	else {
		describe = 'Описание: ' + describeValue;
	}
	
	windowMessage.innerHTML = `<p>The letter was sent </p>  <p>${subject}</p> <p>${describe}</p> <button class="button-modal">OK</button>`;
	return windowMessage;

}

const renderModalWindow = () => {
	if(document.forms.contact.elements.email.validity.valid && document.forms.contact.elements.name.validity.valid){
	document.body.append(generateModalWindow());
	} else {
		return;
	}
}

const closeModalWindow = () => {
	document.querySelector('.button-modal').addEventListener('click', () => {
		document.querySelector('.modal').remove();
	})
	
	clearForm();
}

const clearForm = () => {
	let formValue = document.forms.contact.elements;
	[].forEach.call(formValue,(value) => {
		value.value = '';
	})
}

const validateModalWindow = () => {
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

}


//Mobile menu
const addMenuMobileClickHandler = () => {
  document.querySelector('.hamburger').addEventListener('click', openMenu);
}

const openMenu = () => {
		let hamburgerMenu = document.querySelector('.mobile .header-menu');
		let hamburgerMenuItems = document.querySelector('.mobile .navigation__items');
		let hamburgerMenuLogo = document.querySelector('.mobile span.logo');
		let hamburgerIcon = document.querySelector('.hamburger');
		let logo = document.querySelector('.mobile  .logo__text');
		
		hamburgerMenu.classList.add('menu-active');
		hamburgerMenuItems.classList.add('menu-enable');
		hamburgerMenuLogo.classList.add('menu-enable');
		hamburgerIcon.classList.add('hamburger-active');
	
		logo.style.transform = 'translateX(' + (-parseInt(logo.getBoundingClientRect().left - hamburgerIcon.getBoundingClientRect().right - 30)) + 'px)';
		
		darkenMenuMobile();
		
		hamburgerIcon.removeEventListener('click', openMenu);
		hamburgerIcon.addEventListener('click', closeMenu); 
		document.querySelector('.darken').addEventListener('focus', closeMenu) 
		 
	} 

const closeMenu = ( ) => {
	 
	  let hamburgerMenu = document.querySelector('.mobile .header-menu');
	  let hamburgerMenuItems = document.querySelector('.mobile .navigation__items');
		let hamburgerMenuLogo = document.querySelector('.mobile span.logo');
		let hamburgerIcon = document.querySelector('.hamburger');
		let logo = document.querySelector('.mobile  .logo__text');
		
		hamburgerMenu.classList.remove('menu-active');
		hamburgerMenuItems.classList.remove('menu-enable');
		hamburgerMenuLogo.classList.remove('menu-enable');
		hamburgerIcon.classList.remove('hamburger-active');

		logo.style.transform = 'translateX(' + (parseInt(logo.getBoundingClientRect().width/2 - hamburgerIcon.getBoundingClientRect().right)) + 'px)';
		
		
		
		hidedarkenMenuMobile();
		
		hamburgerIcon.removeEventListener('click', closeMenu);
		hamburgerIcon.addEventListener('click', openMenu);
	
}

const linkCloseMenuMobile = () => {
	let linkMenuMobile = document.querySelectorAll('.mobile .navigation__item');
	linkMenuMobile.forEach(link => {
		link.addEventListener('click', closeMenu);
	})
}

const darkenMenuMobile = () => {
	let darken = document.querySelector('.darken');
	darken.classList.add('darken-active');
}

const hidedarkenMenuMobile = () => {
	let darken = document.querySelector('.darken');
	darken.classList.remove('darken-active'); 
}


const addMenuMobileHandler = () => {
	let navigationItems = document.querySelector('.mobile .navigation__items');
	navigationItems.addEventListener('click', (event) => {
	event.preventDefault();
	
	document.querySelectorAll('.mobile .navigation__item').forEach((item) => {
      item.classList.remove('navigation__item_active');
    });
	event.target.closest('li').classList.add('navigation__item_active');
  
	let marginMenu = getComputedStyle(navigationItems);	
	let blockID = event.target.closest('a').getAttribute('href').substr(1);
  console.log(document.getElementById(blockID).getBoundingClientRect().top + pageYOffset - parseInt(marginMenu.height))
	window.scrollTo({
	  top: document.getElementById(blockID).getBoundingClientRect().top + pageYOffset,
	  left: 0,
	  behavior: 'smooth'})
	});
	
	//linkCloseMenuMobile();
}

const addMenuMobileScrollHandler = () => {
	document.addEventListener('scroll', (event) => {
	  let currentPos = window.scrollY;
	  let sections= document.querySelectorAll('section');
	  let links = document.querySelectorAll('.mobile .navigation__item a');

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
}




























































































