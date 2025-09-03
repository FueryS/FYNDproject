class Images {
    constructor() {
        this.images = [];
        this.offerImages = [];
    }

    collectOfferImage() {
    const imageContext = require.context('../Pictures', false, /\.(png|jpe?g)$/);
    this.offerImages = imageContext.keys().map(imageContext); 
}

    getOfferImages() {
        return this.offerImages;
    }

    collectImage() {
    const imageContext = require.context('../Pictures/products', false, /\.(png|jpe?g)$/);
    this.offerImages = imageContext.keys().map(imageContext); 
}

    getsImages() {
        return this.offerImages;
    }

    getImageByIndex(index) {
        return this.offerImages[index];
    }

    emptyImage(){
        return this.offerImages=[];
    }

    reloadImage(){
        this.emptyImage();
        this.collectImage();
    }
}

export default Images;
export const images = new Images();

//import { images } from './Backend/imageCollector.js';