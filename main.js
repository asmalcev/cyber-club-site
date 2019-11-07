/*
Menu element controler
*/
let menu = {
  isOpen: false,
  html: document.querySelector('header'),
  btn: document.querySelector('#toggle-btn')
}
const body = document.querySelector('body')
menu
  .btn
  .addEventListener('click', _ => {
    if (!menu.isOpen) {
      menu.isOpen = true
      menu.html.style['transform'] = 'translateX(0)'
      menu.btn.classList.add('active')
      body.style['overflow'] = 'hidden'
    } else closeMenu()
  })
function closeMenu() {
  if (window.innerWidth < 1000) {
    menu.isOpen = false
    menu.html.style['transform'] = 'translateX(-101%)'
    menu.btn.classList.remove('active')
    body.style['overflow'] = 'auto'
  }
}
/*
Achievements animation
*/
let achievements = {
  activeIndex: 0,
  html: document.querySelectorAll('.achievement'),
  body: document.querySelector('.achievements'),
  isOver: false
}
if (!achievements.isOver && window.innerWidth > 1000) achievements.html[achievements.activeIndex].classList.add('active')
if (window.innerWidth > 1000)
  setInterval(_ => {
    if (!achievements.isOver) {
      achievements.html[achievements.activeIndex].classList.remove('active')
      achievements.activeIndex = (achievements.activeIndex + 1) % achievements.html.length
      achievements.html[achievements.activeIndex].classList.add('active')
    }
  }, 2000)
achievements.body.addEventListener('mouseover', _ => {achievements.isOver = true})
achievements.body.addEventListener('mouseout', _ => {
  achievements.isOver = false
  achievements.html.forEach(ach => {ach.classList.remove('active')})
})
/*
Yandex map code
*/
ymaps.ready(function () {
    let myMap = new ymaps.Map('map', {
          center: [56.14034789, 47.26792762],
          zoom: 17,
          controls: ['zoomControl', 'fullscreenControl']
        }),
        MyIconContentLayout = ymaps.templateLayoutFactory.createClass(
          '<div id="iconContent">$[properties.iconContent]</div>'
        ),
        myPlacemarkWithContent = new ymaps.Placemark([56.14034789, 47.26792762], {
          hintContent: 'г.Чебоксары ул.Калинина дом 91к1',
          iconContent: 'Cyber city' }, {
          iconLayout: 'default#imageWithContent',
          iconImageHref: 'images/placemark.png',
          iconImageSize: [60, 60],
          iconImageOffset: [-30, -30],
          iconContentOffset: [55, 15],
          iconContentLayout: MyIconContentLayout
        })
    myMap.geoObjects.add(myPlacemarkWithContent)
})
/*
Modal window controler
*/
let modal = {
  html: document.querySelector('.modal-wrapper'),
  isOpen: false
}
document
  .querySelectorAll('.btn-order')
  .forEach(btn => {
  btn.addEventListener('click', _ => {
    if (!modal.isOpen) {
      modal
        .html
        .style['display'] = 'block'
      body.style['overflow'] = 'hidden'
      setTimeout(_ => {
        modal
          .html
          .style['opacity'] = '1'
          modal.isOpen = true
      }, 100)
    }
  })
})
function closeModal() {
  if (modal.isOpen) {
    modal
      .html
      .style['opacity'] = '0'
    body.style['overflow'] = 'auto'
    setTimeout(_ => {
      modal
        .html
        .style['display'] = 'none'
        modal.isOpen = false
    }, 300)
  }
}
document
  .querySelector('.modal-back')
  .addEventListener('click', closeModal)
window.addEventListener('keydown', e => {
  if (e.keyCode == 27) closeModal()
})
/*
Background animation behind Lounge Block
*/
let lounge = {
  front: document.querySelector('#lounge').childNodes[3],
  img: document.querySelector('#lounge').childNodes[1].childNodes[1],
  opacity: 204,
  t: 0,
  image: 0,
  bool: true
}
function animateBackground() {
  requestAnimationFrame(animateBackground)
  lounge.t++

  if (lounge.t > 350) {
    if (lounge.bool) {
      lounge.opacity++
      if (lounge.opacity > 255) {
        lounge.image = (lounge.image + 1) % 4
        lounge.bool = false
      }
    } else {
      lounge.opacity -= 2
      if (lounge.opacity < 204) {
        lounge.t = 0
        lounge.bool = true
      }
    }
  }
  lounge
    .front
    .style['background'] = `-webkit-linear-gradient(-45deg,
      #000000${lounge.opacity.toString(16)},
      #111111${lounge.opacity.toString(16)})`
  lounge
    .img
    .setAttribute('src',`images/lounge${lounge.image}.png`)
}
/*
Form validation and sending AJAX request
*/
let form = {
  html: document.querySelector('#modal-form'),
  btn: document.querySelector('#modal-form')['btn'],
  isOk: true
}
form
  .btn
  .addEventListener('click', sendData)
function sendData() {
  form.isOk = true
	if (form.html['name'].value == '') { // name validation
    form.isOk = false
    form
      .html['name']
      .style['border-color'] = '#e70000'
  }
  if (form.html['count'].value == '') { // count of people validation
    form.isOk = false
    form
      .html['count']
      .style['border-color'] = '#e70000'
  }
  if (form.html['date'].value == '') { // date validation
    form.isOk = false
    form
      .html['date']
      .style['border-color'] = '#e70000'
  }
  if (form.html['phone'].value == '' // phone validation
      || form
          .html['phone']
          .value
          .search(/^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/) == -1) {
    form.isOk = false
    form
      .html['phone']
      .style['border-color'] = '#e70000'
  }
	if (form.isOk) {
		let x = new XMLHttpRequest()
		x.open('GET', `../mail.php?name=${form.html['name'].value}
                              &tel=${form.html['phone'].value}
                              &count=${form.html['count'].value}
                              &date=${form.html['date'].value}`, true)
		x.send()
    form.html['name'].value = ''
    form.html['phone'].value = ''
    form.html['count'].value = ''
    form.html['date'].value = ''
		closeModal()
	}
}
function clearRed(el) {
  el.style['border-color'] = '#666'
}

window.addEventListener('load', _ => {
  /*
  Supportive function to control the size of the back part with image
  */
  document
    .querySelectorAll('.fixed')
    .forEach( block => {
      let frontground = block.childNodes[3]
      let backgroundImage = block.childNodes[1].childNodes[1]
      block.style['height'] = frontground.clientHeight + 'px'
      if (frontground.clientHeight > backgroundImage.height) {
        backgroundImage.style['height'] = frontground.clientHeight + 'px'
        backgroundImage.style['width'] = 'auto'
      }
    })

  /*
  Checking if connection type less than 4g
  */
  let back = document.querySelector('.welcome-block.bg-gradient > .back');
  if (navigator.connection.effectiveType == '4g')
    back.innerHTML = `<video loop="" muted="" autoplay=""
                      poster="images/grd.jpg" class="fullscreen-bg__video">
                        <source src="video/promo.mp4" type="video/mp4">
                      </video>`;
  else
    back.innerHTML = '<img src="images/grd.jpg" alt="background">';

  if (window.innerWidth > window.innerHeight) {
    document.querySelector('.fullscreen-bg__video').style['height'] = 'auto'
    document.querySelector('.fullscreen-bg__video').style['width'] = '100vw'
  }

  animateBackground()
})
