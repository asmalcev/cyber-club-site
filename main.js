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
  html: document.querySelectorAll('.achievement')
}
achievements.html[achievements.activeIndex].classList.add('active')
if (window.innerWidth > 1000)
  setInterval(_ => {
    achievements.html[achievements.activeIndex].classList.remove('active')
    achievements.activeIndex = (achievements.activeIndex + 1) % achievements.html.length
    achievements.html[achievements.activeIndex].classList.add('active')
  }, 2000)
