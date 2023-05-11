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


dataListButton.innerHTML = /* html */ 
    `<span> Show more </span>
    <span class="list__remaining"> (${matches.length - (page * BOOKS_PER_PAGE) > 0 ? matches.length - (page * BOOKS_PER_PAGE) : 0})</span>`

dataHeaderSearch.addEventListener("click", () => {                  //opens seacrhbar and focuses on title 
    dataSearchTitle.focus()
    dataSearchOverlay.showModal()
})

dataSearchCancel.addEventListener("click", () => {                 //"cancel" clicked closes searchbar
    dataSearchOverlay.close()
  
})
