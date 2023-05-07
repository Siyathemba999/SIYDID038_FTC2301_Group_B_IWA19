import {BOOKS_PER_PAGE, authors, genres, books } from "./data.js"

const dataHeaderSearch = document.querySelector('[data-header-search]')
const dataHeaderSettings = document.querySelector('[data-header-settings]')

const dataListItems = document.querySelector('[data-list-items]')
const dataListMessage = document.querySelector('[data-list-message]')
const dataListButton = document.querySelector('[data-list-button]')

const dataListActive = document.querySelector('[data-list-active]')
const dataListBlur = document.querySelector('[data-list-blur]')
const dataListImage = document.querySelector('[data-list-image]')
const dataListTitle = document.querySelector('[data-list-title]')
const dataListSubtitle = document.querySelector('[data-list-subtitle]')
const dataListDescription = document.querySelector('[data-list-description]')

const dataListClose = document.querySelector('[data-list-close]')

const dataSearchOverlay = document.querySelector('[data-search-overlay]')
const dataSearchForm = document.querySelector('[data-search-form]')
const dataSearchTitle = document.querySelector('[data-search-title]')

const dataSearchGenres = document.querySelector('[data-search-genres]')
const dataSearchAuthors = document.querySelector('[data-search-authors]')

const dataSearchCancel= document.querySelector('[data-search-cancel]')

const dataSettingsOverlay = document.querySelector('[data-settings-overlay]')
const dataSettingsForm = document.querySelector('[data-settings-form]')

const dataSettingsTheme = document.querySelector('[data-settings-theme]')
const dataSettingsCancel = document.querySelector('[data-settings-cancel]')

let matches = books
let page = 1;


//themes
const css={
  day : ['255, 255, 255','10, 10, 20'],
  night : ['10, 10, 20','255, 255, 255']
     
}
//themes
dataSettingsTheme.value = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'night' : 'day'
let v = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches? 'night' : 'day'

//themes
dataSettingsForm.addEventListener("submit", (event) =>  { 
    event.preventDefault()
        const formSubmit = new FormData(event.target)
        const option = Object.fromEntries(formSubmit)
        if (option.theme === 'night') {
            document.documentElement.style.setProperty('--color-light', css[option.theme][0])
            document.documentElement.style.setProperty('--color-dark', css[option.theme][1])
        } else{
            document.documentElement.style.setProperty('--color-light', css[option.theme][0])
            document.documentElement.style.setProperty('--color-dark', css[option.theme][1])
        }
        dataSettingsOverlay.close()
    })

    //themes
dataSettingsCancel.addEventListener("click", () => {                 //"cancel" clicked closes settingbar
    dataSettingsOverlay.close()
  
})

//themes
dataHeaderSettings.addEventListener("click", () => {                  //opens settings and focuses on themes 
    dataSettingsTheme.focus()
     dataSettingsOverlay.showModal()
 })
 

/*----------------------------------------------------------------------------------------------------------------------------------------------------
/**
 * for loop below creates a list of books
 */
const fragment = document.createDocumentFragment()
const extracted = books.slice(0, 36)

for (let i = 0; i < extracted.length; i++ ) {
    const { author: authorId, id, image, title } = extracted[i]

   const extractedBooks = document.createElement('button')          //creates a button for button effect
   extractedBooks.classList = 'preview'
   extractedBooks.setAttribute('data-preview', id)

    extractedBooks.innerHTML = /* html */ `
        <img
            class="preview__image"
            src="${image}"
        />
        
        <div class="preview__info">
            <h3 class="preview__title">${title}</h3>
            <div class="preview__author">${authors[authorId]}</div>
        </div>
    `

    fragment.appendChild(extractedBooks)
}
dataListItems.appendChild(fragment)


/*----------------------------------------------------------------------------------------------------------------------------------------------------
/**
 * create list of the genres 
 */
const bookGenre = document.createDocumentFragment()
const theGenres = document.createElement('option')
theGenres.value = 'any'
theGenres.textContent = 'All Genres'
bookGenre.appendChild(theGenres)

const genreArray = Object.entries(genres)
for (let i = 0; i < genreArray.length; i++) {
    const [id,name] = genreArray[i]
    const genreOp = document.createElement('option')
    genreOp.value = id
    genreOp.textContent = name
    bookGenre.appendChild(genreOp)
}
dataSearchGenres.appendChild(bookGenre)


/**
 * creates list of the author names
 */
const bookAuthors = document.createDocumentFragment()
const theAuthors = document.createElement('option')
theAuthors.value = 'any'
theAuthors.innerText = 'All Authors'
bookAuthors.appendChild(theAuthors)

const authorArray = Object.entries(authors)
for (let i = 0; i < authorArray.length ; i++) {
    const [id, name] = authorArray[i]
    const authOp = document.createElement('option')
    authOp.value = id
    authOp.textContent = name
    bookAuthors.appendChild(authOp)
}
dataSearchAuthors.appendChild(bookAuthors)

/**---------------------------------------------------------------------------------------------------------------------------------------------- */


//close list items preview
dataListClose.addEventListener("click",  () =>  { 
    dataListActive.close() 
})


//list items preview
dataListItems.addEventListener("click", (event) => {
    const pathArray = Array.from(event.path || event.composedPath())
    let active = null;

    for (let node of pathArray) {
        if (active){
            break;
        }
        const previewId = node?.dataset?.preview
    
        for (const singleBook of books) {
            if (singleBook.id === previewId){
                active = singleBook
                break
            }
        } 
    }
    
    if (!active){
        return
    } 

    dataListActive.open = true
    dataListBlur.src, dataListImage.src = active.image 
    dataListTitle.textContent = active.title

    dataListSubtitle.textContent = `${authors[active.author]} (${new Date(active.published).getFullYear()})`
    dataListDescription.textContent = active.description
})

/*-------------------------------------------------------------------------------------------------------------------------------------------------------------------*/


// dataListButton = `Show more ${(books.length - BOOKS_PER_PAGE)}`
// dataListButton.disabled == !(matches.length - (page * BOOKS_PER_PAGE) > 0)

dataListButton.innerHTML = /* html */ 
    `<span> Show more </span>
    <span class="list__remaining"> (${matches.length - (page * BOOKS_PER_PAGE) > 0 ? matches.length - (page * BOOKS_PER_PAGE) : 0})</span>`

// dataListButton.addEventListener("click", () => {
//     button = document.querySelector(dataListItems.appendChild(createPreviewFragment(matches.length, page * BOOKS_PER_PAGE, (page + 1) * BOOKS_PER_PAGE)))
//     actions.list.updateRemaining()
//     page = page + 1
// })

/**---------------------------------------------------------------------------------------------------------------------------------------------------------- */

dataHeaderSearch.addEventListener("click", () => {                  //opens seacrhbar and focuses on title 
    dataSearchTitle.focus()
    dataSearchOverlay.showModal()
})

dataSearchCancel.addEventListener("click", () => {                 //"cancel" clicked closes searchbar
    dataSearchOverlay.close()
  
})

// //more books
// const range = [0, BOOKS_PER_PAGE]
// if (!books && !Array.isArray(books)){
//     throw new Error('Source required') 
// } 
// if (!range && range.length < 2){
//     throw new Error('Range must be an array with two numbers')
// }


// dataSearchForm.addEventListener("submit", (event) => {
//     event.preventDefault()
//     const formData = new FormData(event.target)
//     const filters = Object.fromEntries(formData)
//     const result = []

//     for (let book of booksList.length) {
//          let titleMatch = filters.title.trim() = '' && book.title.toLowerCase().includes[filters.title.toLowerCase()]
//          let authorMatch = filters.author = 'any' || book.author === filters.author
        
        
//             const genreMatch = filters.genre = 'any'
//             for (let genres of book.genres) { 
//                 if (singleGenre == filters.genre){
//                      genreMatch = true 
//                     }
//                 }
//             }

//         if (titleMatch && authorMatch && genreMatch){
//             result.push(book)
//         }

//     if(display.length < 1 ){
//         dataListMessage.class.add('list__message_show')
//      } else {
//         dataListMessage.class.remove('list__message_show')
//     }
//     return result
// })

    

    // dataListItems.innerHTML = ''
    //  const fragment2 = document.createDocumentFragment()
    //  const extracted2 = books.slice(0,36)
    
    // for (let i = 0; i < extracted2.length; i++ ) {
    //     const { author: authorId, id, image, title } = extracted2[i]
    
    //    const morebooks = document.createElement('button') 
    //    morebooks.classList = 'preview'
    //    morebooks.setAttribute('data-preview', id)
    
    //    morebooks.innerHTML = /* html */ `
    //         <img
    //             class="preview__image"
    //             src="${image}"
    //         />
            
    //         <div class="preview__info">
    //             <h3 class="preview__title">${title}</h3>
    //             <div class="preview__author">${authors[authorId]}</div>
    //         </div>
    //     `
      
    //     fragment2.appendChild(morebooks)
    // }
    // dataListItems.appendChild(fragment2)
    
   
    // const hasRemaining = true
    // const fragment3 = document.createDocumentFragment() 
    // dataListItems.appendChild(fragment3)

    // const initial = matches.length - (page * BOOKS_PER_PAGE)
    // const remaining = (initial >= 0 && hasRemaining) ? initial : 0
    
    // dataListButton.disabled = (remaining <= 0)

    // dataListButton.innerHTML = /* html */ `
    //     <span>Show more</span>
    //     <span class="list__remaining"> (${remaining})</span>
    // `

    // window.scrollTo({ top: 0, behavior: 'smooth' });
    // dataSearchOverlay.open = false
