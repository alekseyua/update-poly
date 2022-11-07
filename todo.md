Replace Autoprefixer browsers option to Browserslist config.
  Use browserslist key in package.json or .browserslistrc file.

  Using browsers option can cause errors. Browserslist config can
  be used for Babel, Autoprefixer, postcss-normalize and other tools.

  If you really need to use option, rename it to overrideBrowserslist.

  Learn more at:
  https://github.com/browserslist/browserslist#readme
  https://twitter.com/browserslist

`Login: root `
`Password: ABkxb52RF8 `
` Выделенный IP: 91.218.229.240 `


Чтобы выбирать язык необходимо реализовать lang



/home/admin/poly15112021/TEST

//?! block for ERRORS
try{
  dispatch('setModalState', {
    show: true,
  })

} catch (err) {
  console.log('ERROR removeItemFromOrder = ', err);
  let error = [Text({text: 'error-on-server'})];
  if (err?.data) {
      const errors = err.data;
      if ( typeof errors !== 'object') {
          error.push(`${errors}`)
      }else{
          error.push(`${errors[0]}`)
      }
      console.log({errors}, {err: typeof errors})
  }
  dispatch('setModalState', {
      show: true,
      content: textErrorMessage(error),
      iconImage: errorAlertIcon,
      addClass: 'modal-alert-error',
      action: {
          title: ['продолжить', null]
      },
      onClick: () => closeModalState()
  })
}

<!-- отмена скрола -->
 let scrollTop =  window.pageYOffset || document.documentElement.scrollTop;
      let scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
        window.onscroll = function() {
          window.scrollTo(scrollLeft, scrollTop);
          return window.scrollTo()
        };

<!--  -->


