import Swiper from 'https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.mjs'

//Swiper events handler

export const loadMoreHandler = function (swiper) {
    console.log('load more pictures from here  :')
    resultsPagination.actualPage++

    if (resultsPagination.actualPage > resultsPagination.totalPage) console.log('No mores pages to load')
    else {
        resultFetchData(resultsPagination.lastSearchInput, resultsPagination.actualPage)
    }
}

const swiperOnInit = function (event) {
    if (event.el.classList.contains('swiper1')) {
        console.log('swiper initialized in results section')
    } else if (event.el.classList.contains('swiper2')) {
        console.log('swiper initialized in latest section')
        //load default latest images from movie database
    } else if (event.el.classList.contains('swiper3')) {
        console.log('swiper initialized in genre')
        //load default active genre images from movie database
    } else console.log('unknown swiper module : default images loaded')
}

// Swiper factory that helps create multiple independant swipers
export function SwiperFactory(containerClass, buttonsClass) {
    const swiper = new Swiper(containerClass, {
        // Optional parameters
        direction: 'horizontal',
        loop: false,
        slidesPerView: 1,
        spaceBetween: 20,
        slidesPerGroup: 1,
        breakpoints: {
            500: {
                slidesPerView: 2,
            },
            768: {
                slidesPerView: 3,
            },
            1250: {
                slidesPerView: 4,
            },
        },
        slidesOffsetAfter: 100,
        slidesOffsetbefore: 100,
        //setWrapperSize: true,

        // Navigation arrows with unique class names
        navigation: {
            nextEl: `.swiper-button-next${buttonsClass}`,
            prevEl: `.swiper-button-prev${buttonsClass}`,
        },
        grabCursor: true,
        on: {
            init: swiperOnInit,
        },
    })
    return swiper
}
