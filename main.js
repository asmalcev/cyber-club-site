let menu = {
  isOpen: false,
  html: document.querySelector('header'),
  btn: document.querySelector('#toggle-btn')
}
const body = document.querySelector('body')
menu
  .btn
  .addEventListener('click', _ => {
    if (menu.isOpen) {
      menu.isOpen = false
      menu.html.style['transform'] = 'translateX(-101%)'
      menu.btn.classList.remove('active')
      body.style['overflow'] = 'auto'
    } else {
      menu.isOpen = true
      menu.html.style['transform'] = 'translateX(0)'
      menu.btn.classList.add('active')
      body.style['overflow'] = 'hidden'
    }
  })

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

document
  .querySelectorAll('.btn-order')
  .forEach(btn => {
  btn.addEventListener('click', _ => {
    document
      .querySelector('.modal-wrapper')
      .style['display'] = 'block'
    body.style['overflow'] = 'hidden'
  })
})
function closeModal() {
  document
    .querySelector('.modal-wrapper')
    .style['display'] = 'none'
  body.style['overflow'] = 'auto'
}
document
  .querySelector('.modal-back')
  .addEventListener('click', closeModal)
window.addEventListener('keydown', e => {
  if (e.keyCode == 27) closeModal()
})
