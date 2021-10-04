import refs from './refs.js'
import api from './apiService.js'
import debounce from 'lodash.debounce';
import cardImage from '../templates/card-image.hbs'
import validator from 'validator';
import lightBox from './modalLightBox.js';

const { gallery, searchForm, showBtn, up} = refs;

const apiService = new api();

const query = searchForm.query;


const objectRender = {

    listen(queryValueValidator) {
        
        if (queryValueValidator) {
            apiService.resetPage();
            this.createElemToHtml();
            showBtn.disabled = false;
            showBtn.classList.remove('hidden')
        }
        gallery.innerHTML = ' ';
        showBtn.classList.add('hidden')
    },
 
    createElemToHtml() {
        apiService.fetchDataDb().then((param) => {
            if (param.hits.length < 12) {
                showBtn.classList.add('hidden')
            } else {
                showBtn.classList.remove('hidden')
            }
            if (param.hits.length === 0) {
                gallery.innerHTML = ' ';
            }

             
            return cardImage(param.hits);
        
        }).then((array) => {
            gallery.insertAdjacentHTML('beforeend', array);
            apiService.scrollToEnd()
        
        })
    },
    
};



 query.addEventListener('input', debounce((e) => {
    const queryValue = e.target.value;
    const queryValueValidator = validator.isAlphanumeric(queryValue);
     apiService.addValue = queryValue;

     objectRender.listen(queryValueValidator);

    }, 500));




showBtn.addEventListener('click', () => {
    apiService.addNewPage = 1;
    objectRender.createElemToHtml();
});



up.addEventListener('click', scrollToTop);

window.addEventListener('scroll', listenScroll);

function listenScroll() {
    let scrolled = window.pageYOffset;

    let coords = document.documentElement.clientHeight;

    if (scrolled > coords) {
        up.classList.add('show')
    }
    if (scrolled < coords) {
        up.classList.remove('show')
    }
};

function scrollToTop() {
//     if (window.pageYOffset > 0) {
//         window.scrollBy(0, -20);
//         setTimeout(scrollToTop, 0 )
// }
    
    var scrollStep = window.pageYOffset / 40;
if (window.pageYOffset > 0) {
window.scrollBy(0, -(scrollStep));
setTimeout(scrollToTop, 0);
}
};
