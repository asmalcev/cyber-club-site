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

let lounge = {
  html: document.querySelector('.lounge'),
  opacity: 204,
  t: 0,
  image: 0
}
function animateBackground() {
  requestAnimationFrame(animateBackground)
  lounge.t++

  if (lounge.t > 350) {
    lounge.opacity++
    if (lounge.opacity > 255) {
      lounge.opacity = 204
      lounge.t = 0
      lounge.image = (lounge.image + 1) % 3
    }
  }
  lounge
    .html
    .style['background-image'] = `-webkit-linear-gradient(-45deg,
      #000000${lounge.opacity.toString(16)},
      #111111${lounge.opacity.toString(16)}),
      url('images/lounge${lounge.image}.jpg')`
}
// animateBackground()
