import { fetchData, getDynamicUrl, resultsPagination } from './apiHandler.js'
import { SwiperFactory } from './swiperHandler.js'

const searchBar = document.getElementById('searchBar')
const searchInput = searchBar.querySelector('input[type="text"]')
const searchButton = searchBar.querySelector('button')
const resultsSection = document.getElementById('hidden')
const resultSpan = document.querySelector('#resultSubtitle span')
const latestSpan = document.querySelector('#latestSubtitle span')

//const resultsImages = document.querySelectorAll('.resultimages')

resultsSection.style.display = 'none'

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
        totalResults = await fetchData(
            getDynamicUrl('SEARCH_MOVIES_BY_NAME', {
                query: encodeURIComponent(searchInput.value),
                page: 1,
            }),
            swiper1
        )
        resultsPagination.lastSearchInput = searchInput.value
        resultsSection.style.display = 'flex'
    }
    resultSpan.textContent = `${searchInput.value} - total : ${totalResults}`
    searchInput.value = ''

    //if results existes display block the results section
}

//Main Code
searchButton.addEventListener('click', searchSubmitHandler)
const swiper1 = SwiperFactory('.swiper1', '1')
const swiper2 = SwiperFactory('.swiper2', '2')
const swiper3 = SwiperFactory('.swiper3', '3')

//load latest swiper

const latestTotalResults = await fetchData(getDynamicUrl('GET_LATEST_MOVIES', { page: 1 }), swiper2)
latestSpan.textContent = `total : ${latestTotalResults}`
