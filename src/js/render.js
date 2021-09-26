import refs from './refs.js'
import api from './add-service.js'
import * as basicLightbox from 'basiclightbox';
import debounce from 'lodash.debounce';
import cardImage from '../templates/card-image.hbs'

const { gallery, searchForm, showBtn } = refs;

const apiService = new api();


// -------------Получение значения из инпута----------------
searchForm.addEventListener('input', debounce(() => {
    apiService.addValue = searchForm.query.value;
    apiService.resetPage();
    gallery.innerHTML = '';
    createElemToHtml();
}, 500));
// -------------Получение значения из инпута----------------



// -------------Слушатель событий на кнопку показать ещё----------------
showBtn.addEventListener('click', addPage)
// -------------Слушатель событий на кнопку показать ещё----------------


function addPage() {
    apiService.addPage = 1;
    createElemToHtml();
    
};

// -------------Добавление элементов на страницу----------------
function createElemToHtml() {
    apiService.fetchDataDb().then((param) => {
        const card = cardImage(param.hits);
        gallery.insertAdjacentHTML('beforeend', card);
    })
    // scrollToEnd()
}


// const element = document.getElementById('scroll');
// element.childElementCount
// element.scrollIntoView({
//   behavior: 'smooth',
//   block: 'end',
// });


// -------------Добавление элементов на страницу----------------




    // console.log(page)
// -------------Запрос в БД и получение данных----------------
// async function fetchDataDb(value) {
    
//     try {
//         const response = await fetch(`${BASE_URL}?image_type=photo&orientation=horizontal&q=${value}&page=${page}&per_page=5&key=${KEY}`)
//         const data = await response.json()
//         createElemToHtml(data);
//     } catch (error) {
//         console.log('ошибка' + error);
//     }
// }
// -------------Запрос в БД и получение данных----------------






// "comments": 78,
//   "downloads": 63296,
//   "favorites": 558,
//   "id": 1508613,
//   "imageHeight": 2135,
//   "imageSize": 1630104,
//   "imageWidth": 2894,
//   "largeImageURL": "https://pixabay.com/get/57e5d54b4c53af14f6da8c7dda793376173cd8e7524c704c702873dc9f44c551_1280.jpg",
//   "likes": 575,
//   "pageURL": "https://pixabay.com/photos/cat-animal-cat-portrait-cat-s-eyes-1508613/",
//   "previewHeight": 110,
//   "previewURL": "https://cdn.pixabay.com/photo/2016/07/10/21/47/cat-1508613_150.jpg",
//   "previewWidth": 150,
//   "tags": "cat, animal, cat portrait",
//   "type": "photo",
//   "user": "cocoparisienne",
//   "userImageURL": "https://cdn.pixabay.com/user/2018/11/26/11-06-29-714_250x250.jpg",
//   "user_id": 127419,
//   "views": 127450,
//   "webformatHeight": 472,
//   "webformatURL": "https://pixabay.com/get/57e5d54b4c53af14f6da8c7dda793376173cd8e7524c704c702873dc9f44c551_640.jpg",
//   "webformatWidth": 640