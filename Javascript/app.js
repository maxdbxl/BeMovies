import { SwiperFactory, loadMoreHandler } from './swiperHandler.js'

const searchBar = document.getElementById('searchBar')
const searchInput = searchBar.querySelector('input[type="text"]')
const searchButton = searchBar.querySelector('button')
const resultsSection = document.getElementById('hidden')
const resultSpan = document.querySelector('h2 span')
const resultsImages = document.querySelectorAll('.resultimages')

resultsSection.style.display = 'none'
//State management for pagination
let resultsPagination = {
    totalPage: 0,
    actualPage: 0,
    totalCount: 4,
    lastSearchInput: '',
}

const searchSubmitHandler = async (event) => {
    event.preventDefault()
    let totalResults = 0
    //call api here to find results related to a movie

    if (!searchInput.value.trim()) {
        resultsSection.style.display = 'none'
        return
    } else {
        console.log('searching for ' + searchInput.value)
        // resultsPagination.totalCount = 0
        totalResults = await resultFetchData(searchInput.value, 1)

        resultsSection.style.display = 'flex'
    }
    resultSpan.textContent = `${searchInput.value} - total : ${totalResults}`
    searchInput.value = ''

    //if results existes display block the results section
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
    console.log(`totalCount of firstPage equal to ${resultsPagination.totalCount}`)
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
            `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(searchValue)}&include_adult=false&language=en-US&page=${page}`,
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
        console.log(`total number of pages is equal to ${responseJson.total_pages}`)
        resultsPagination.actualPage = page

        if (page === 1) {
            console.log('first time loading images for the this search input ' + searchValue)
            console.log(filtered_response)
            initResultImage(filtered_response)
        } else {
            console.log('updating and loading more images after reaching end of swiper , page : ' + page)
            updateResultImage(filtered_response)
        }
        resultsPagination.lastSearchInput = searchValue

        console.log(JSON.stringify(resultsPagination))
        return responseJson.total_results
    } catch (err) {
        console.error(err)
    }
}

//Main Code
searchButton.addEventListener('click', searchSubmitHandler)
const swiper1 = SwiperFactory('.swiper1', '1')
const swiper2 = SwiperFactory('.swiper2', '2')
const swiper3 = SwiperFactory('.swiper3', '3')
