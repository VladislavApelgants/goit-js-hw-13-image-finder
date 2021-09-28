import refs from './refs.js'
import api from './apiService.js'
import debounce from 'lodash.debounce';
import cardImage from '../templates/card-image.hbs'
import validator from 'validator';
import lightBox from './modalLightBox.js';

const { gallery, searchForm, showBtn} = refs;

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