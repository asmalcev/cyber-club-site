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
