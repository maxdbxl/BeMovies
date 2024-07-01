import { initResultImage, updateResultImage } from './swiperHandler.js'

//State management for pagination
export let resultsPagination = {
    totalPage: 0,
    actualPage: 0,
    totalCount: 4,
    lastSearchInput: '',
}

export async function resultFetchData(searchValue, page, swiper) {
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
            initResultImage(filtered_response, swiper)
        } else {
            console.log('updating and loading more images after reaching end of swiper , page : ' + page)
            updateResultImage(filtered_response, swiper)
        }
        resultsPagination.lastSearchInput = searchValue

        console.log(JSON.stringify(resultsPagination))
        return responseJson.total_results
    } catch (err) {
        console.error(err)
    }
}
