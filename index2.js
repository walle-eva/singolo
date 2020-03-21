const data = [
    {
        id: 1,
		idToImg: 'Project1',
        title: 'Project1',
        urlToImage: 'assets/img/portfolio/Project.png',
    },
    {
       id: 2,
		idToImg: 'Project2',
        title: 'Project2',
        urlToImage: 'assets/img/portfolio/Project2.png',
    },
    {
       id: 3,
		idToImg: 'Project3',
        title: 'Project3',
        urlToImage: 'assets/img/portfolio/Project3.png',
    },
	{
       id: 4,
		idToImg: 'Project4',
        title: 'Project4',
        urlToImage: 'assets/img/portfolio/Project4.png',
    },
	{
       id: 5,
		idToImg: 'Project5',
        title: 'Project5',
        urlToImage: 'assets/img/portfolio/Project5.png',
    },
	{
       id: 6,
		idToImg: 'Project6',
        title: 'Project6',
        urlToImage: 'assets/img/portfolio/Project6.png',
    },
	{
       id: 7,
		idToImg: 'Project7',
        title: 'Project7',
        urlToImage: 'assets/img/portfolio/Project7.png',
    },
	{
       id: 8,
		idToImg: 'Project8',
        title: 'Project8',
        urlToImage: 'assets/img/portfolio/Project8.png',
    },
	{
       id: 9,
		idToImg: 'Project9',
        title: 'Project9',
        urlToImage: 'assets/img/portfolio/Project9.png',
    },
	{
       id: 10,
		idToImg: 'Project10',
        title: 'Project10',
        urlToImage: 'assets/img/portfolio/Project10.png',
    },
	{
       id: 11,
		idToImg: 'Project11',
        title: 'Project11',
        urlToImage: 'assets/img/portfolio/Project11.png',
    },
	{
       id: 12,
		idToImg: 'Project12',
        title: 'Project12',
        urlToImage: 'assets/img/portfolio/Project12.png',
    }
];



window.onload = function() {
	//Header
	
    // Menu click
    addMenuClickHandler();

    // Menu Scroll
    addMenuScrollHandler();
	
	//Portfolio
	
	//Img Show
	renderImgsToDom();
}

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


const generateImg = () =>{
	let template = '';	
	let img = document.createElement('img');
	template = `<div class="portfolio__img"> + ${img} + </div>`
	return template;
}

const generateImgs = (data) => {
    let imgs = [];
	let img;
    data.forEach((itemImg) => {
		
		img = document.createElement('img');
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
}

function randomInteger(min, max, num) {
  var i, arr = [], res = [];
	    for (i = min; i <= max; i++ ) arr.push(i);
	    for (i = 0; i < num; i++) res.push(arr.splice(Math.floor(Math.random() * (arr.length)), 1)[0])
	    return res;
}







































































































