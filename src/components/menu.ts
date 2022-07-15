
   let hambMenu = document.querySelector(".menu__button");
   let menu = document.querySelector('header');
   let active = document.querySelector('.active');
   console.log(active)
   const disableScroll = () => document.body.classList.add('no-scroll');
   const enableScroll = () => document.body.classList.remove('no-scroll');

hambMenu.addEventListener('click', () => {
   if (menu.className==='active'){
      enableScroll()
   }else   { disableScroll()};
   menu.classList.toggle('active');
  hambMenu.classList.toggle('rotated')
});