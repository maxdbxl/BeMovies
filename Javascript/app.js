const searchBar = document.getElementById('searchBar')
const searchInput = searchBar.querySelector('input[type="text"]')
const searchButton = searchBar.querySelector('button')
const resultsSection = document.getElementById('hidden')
const resultSpan = document.querySelector('h2 span')
const resultsImages = document.querySelectorAll('.resultimages')

resultsSection.style.display = 'none'
//User interface events handler

const searchSubmitHandler = (event) => {
    event.preventDefault()
    //call api here to find results related to a movie

    if (!searchInput.value.trim()) {
        resultsSection.style.display = 'none'
        return
    } else {
        resultFetchData(searchInput.value, 1)
        resultsSection.style.display = 'flex'
    }
    resultSpan.textContent = searchInput.value
    searchInput.value = ''

    //if results existes display block the results section
}

//Swiper events handler

const navigationNextHandler = function (swiper) {}

const navigationPrevHandler = function (swiper) {}

const loadMoreHandler = function (swiper) {
    console.log('load more pictures from here')
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
        loop: true,
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

        on: {
            init: swiperOnInit,
            navigationNext: navigationNextHandler,
            navigationPrev: navigationPrevHandler,
            reachEnd: loadMoreHandler,
        },
    })
    return swiper
}

function updateResultImage(response) {
    resultsImages.forEach((image, index) => {
        image.setAttribute(
            'src',
            `https://image.tmdb.org/t/p/original/${response[index].poster_path}`
        )
    })
}
//Call Api handler
function resultFetchData(searchValue, page) {
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization:
                'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiOTBjOTI1NzdhYjUyZTUxNThmYWU0MGYxMDdkMzBjOCIsInN1YiI6IjY2NzE5MzgzZTA3ZmFmZjAzNTcyZWZhNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ztStLJqy8UtW95RrD6ie8sIpBORWWgbdk32o9Zxx9HQ',
        },
    }

    fetch(
        `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(
            searchValue
        )}&include_adult=false&language=en-US&page=${page}`,
        options
    )
        .then((response) => response.json())
        .then((response) => {
            const filtered_response = response.results.filter((movie) => {
                if (movie.hasOwnProperty('poster_path')) {
                    // Now check for non-empty string and not null/undefined
                    return (
                        movie.poster_path !== null && movie.poster_path !== ''
                    )
                }
                // If the field doesn't exist, automatically exclude the movie
                return false
            })

            updateResultImage(filtered_response)
        })
        .catch((err) => console.error(err))
}

//Main Code
searchButton.addEventListener('click', searchSubmitHandler)
const swiper1 = SwiperFactory('.swiper1', '1')
const swiper2 = SwiperFactory('.swiper2', '2')
const swiper3 = SwiperFactory('.swiper3', '3')
