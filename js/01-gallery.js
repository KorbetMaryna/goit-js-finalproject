import { galleryItems } from './gallery-items.js';


const galleryContainer = document.querySelector('.gallery'); 

galleryContainer.insertAdjacentHTML('beforeend', createMarkupGallery(galleryItems));
galleryContainer.addEventListener('click', onImageClick);

function createMarkupGallery(images) {
    return images.map(({ preview, original, description }) => 
        `<li class="gallery__item">
                    <a class="gallery__link" href="${original}">
                        <img class="gallery__image"
                        src="${preview}"
                        data-source="${original}"
                        alt="${description}"
                        />
                    </a>
                </li>`
    ).join('');
};

function onImageClick(e) {
    e.preventDefault();
    if (e.target.nodeName !== 'IMG') {
        return;
    }
    openModalWindow(e);
};

function openModalWindow(e) {
    const bigImageURL = e.target.dataset.source;
    const modal = basicLightbox.create(`
        <img src="${bigImageURL}" width="800" height="600">`,

        {
            onShow: () => {
                window.addEventListener('keydown', handlePressEscape);
            },
            onClose: () => {
                window.removeEventListener('keydown', handlePressEscape);
            },
        }
    );

    modal.show();

    function handlePressEscape(e) {
        if (e.code === 'Escape') {
            modal.close();
        }
    }
};









