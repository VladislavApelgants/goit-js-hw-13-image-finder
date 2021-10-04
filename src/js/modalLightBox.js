import refs from './refs.js'
import * as basicLightbox from 'basiclightbox';
import  '../../node_modules/basiclightbox/src/styles/main.scss'
import  '../../node_modules/basiclightbox/src/scripts/main.js'


const { gallery} = refs;

gallery.addEventListener('click', (e) => {
    const  instance = basicLightbox.create(`
		<img width="500" height="300" src='${e.target.dataset.source}'>
	`)
console.dir(e.target)
   if(e.target.localName === 'img'){
       instance.show()

    }
})


