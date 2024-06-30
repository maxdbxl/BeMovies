const searchBar = document.getElementById('searchBar')
const searchInput = searchBar.querySelector('input[type="text"]')
const searchButton = searchBar.querySelector('button')
const resultsSection = document.getElementById('hidden')
const resultSpan = document.querySelector('h2 span')
const resultsImages = document.querySelectorAll('.resultimages')

resultsSection.style.display = 'none'
//User interface events handler
let resultsPagination = {
    totalPage: 0,
    actualPage: 0,
    totalCount: 4,
    lastSearchInput: '',
}

const searchSubmitHandler = (event) => {
    event.preventDefault()
    //call api here to find results related to a movie

    if (!searchInput.value.trim()) {
        resultsSection.style.display = 'none'
        return
    } else {
        console.log('searching for ' + searchInput.value)
        // resultsPagination.totalCount = 0
        resultFetchData(searchInput.value, 1)

        resultsSection.style.display = 'flex'
    }
    resultSpan.textContent = searchInput.value

    searchInput.value = ''

    //if results existes display block the results section
}

//Swiper events handler

const loadMoreHandler = function (swiper) {
    console.log('load more pictures from here  :')
    resultsPagination.actualPage++

    if (resultsPagination.actualPage > resultsPagination.totalPage)
        console.log('No mores pages to load')
    else {
        resultFetchData(
            resultsPagination.lastSearchInput,
            resultsPagination.actualPage
        )
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
function SwiperFactory(containerClass, buttonsClass) {
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

function initResultImage(results) {
    swiper1.slideTo(0, 1, false)
    swiper1.off('reachEnd', loadMoreHandler)
    swiper1.removeAllSlides()
    for (let index = 0; index < results.length; index++) {
        console.log(`creating ${results.length} new slide : `)
        const slide = `<div class="swiper-slide"><img class="resultimages" src="https://image.tmdb.org/t/p/original/${results[index].poster_path}" loading="lazy" alt=""/>   <div class="swiper-lazy-preloader"></div> </div>`

        swiper1.appendSlide(slide)
        swiper1.update()
    }
    swiper1.on('reachEnd', loadMoreHandler)
    resultsPagination.totalCount = 0
    resultsPagination.totalCount += results.length
    console.log(
        `totalCount of firstPage equal to ${resultsPagination.totalCount}`
    )
}

function updateResultImage(results) {
    console.log(`swiper UPDATE with ${results.length} images`)
    for (let index = 0; index < results.length; index++) {
        const slide = `<div class="swiper-slide"><img class="resultimages" src="https://image.tmdb.org/t/p/original/${results[index].poster_path}" loading="lazy" alt=""/>   <div class="swiper-lazy-preloader"></div> </div>`

        swiper1.appendSlide(slide)
    }
    resultsPagination.totalCount += results.length
    console.log(`totalCount now equal to ${resultsPagination.totalCount}`)
}

async function resultFetchData(searchValue, page) {
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization:
                'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiOTBjOTI1NzdhYjUyZTUxNThmYWU0MGYxMDdkMzBjOCIsInN1YiI6IjY2NzE5MzgzZTA3ZmFmZjAzNTcyZWZhNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ztStLJqy8UtW95RrD6ie8sIpBORWWgbdk32o9Zxx9HQ',
        },
    }

    try {
        const response = await fetch(
            `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(
                searchValue
            )}&include_adult=false&language=en-US&page=${page}`,
            options
        )

        const responseJson = await response.json()

        const filtered_response = responseJson.results.filter((movie) => {
            if (movie.hasOwnProperty('poster_path')) {
                return movie.poster_path !== null && movie.poster_path !== ''
            }

            return false
        })

        resultsPagination.totalPage = responseJson.total_pages
        console.log(
            `total number of pages is equal to ${responseJson.total_pages}`
        )
        resultsPagination.actualPage = page

        if (page === 1) {
            console.log(
                'first time loading images for the this search input ' +
                    searchValue
            )
            console.log(filtered_response)
            initResultImage(filtered_response)
        } else {
            console.log(
                'updating and loading more images after reaching end of swiper , page : ' +
                    page
            )
            updateResultImage(filtered_response)
        }
        resultsPagination.lastSearchInput = searchValue

        console.log(JSON.stringify(resultsPagination))
    } catch (err) {
        console.error(err)
    }
}

//Main Code
searchButton.addEventListener('click', searchSubmitHandler)
const swiper1 = SwiperFactory('.swiper1', '1')
const swiper2 = SwiperFactory('.swiper2', '2')
const swiper3 = SwiperFactory('.swiper3', '3')
