export default class serviceApi {
    constructor() {
    this.page = 1;
    this.KEY = '23530022-92f1b2e37220c2d922c4e208a';
    this.BASE_URL = 'https://pixabay.com/api/';
    this.endPoint = `name/`;
        this.value = '';
    }

   
async fetchDataDb() {
    try {
        const response = await fetch(`${this.BASE_URL}?image_type=photo&orientation=horizontal&q=${this.value}&page=${this.page}&per_page=12&key=${this.KEY}`);
        const data = await response.json();
        
        return data;
    } catch (error) {
        console.log('ошибка', error);
    };
    
    };

  
scrollToEnd() {
       gallery.scrollIntoView({
            behavior: 'smooth',
            block: 'end',
        });
} 

    

resetPage() {
    this.page = 1;
    };

get addValue() {
    return this.value;
    };

set addValue(newValue) {
    this.value = newValue;
    };



set addNewPage(newPage) {
    this.page += newPage;
    };

}