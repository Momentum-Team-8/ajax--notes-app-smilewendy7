/*globals fetch, moment */

const url = "http://localhost:3000/notes"
const form = document.querySelector('#note-form')
const noteList = document.querySelector('#note-list')

// add event listener to submit 
form.addEventListener('submit', event => {
    event.preventDefault()
    const noteText = document.getElementById('note-text').value
    console.log(noteText)
    createNote(noteText)
    //!!!!!!!!!
    // updateNote(noteText)
})


// removing a note from the dom 

noteList.addEventListener("click", event=> {
    // when user click delete run deleteNote()
    if(event.target.classList.contains('delete')) {
        deleteNote(event.target)
        console.log(event.target.classList)
    }
})


//!!!!!!!!!!!edit a note from the dom ******>>>>
//click --> edit input --> save ---> update  

noteList.addEventListener("click", event=> {
    // when user click edit run edit note()
    if(event.target.classList.contains('edit')) {
        updateNote(event.target)
    }
})

function listNotes(){
    //get request 
    fetch(url)
        .then((res) =>  res.json())
        .then((data)=> {
            //loop tjrpigj array
            for(let note of data){
                console.log(note)
                renderNoteItem(note)
            }
    })
}

// add note
function createNote(noteText) {
    //POST a new note to my data base
    fetch(url, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            title: noteText,
            body: noteText,
            //using moment
            create_at: moment().format()
        })
    })
    .then(response => response.json())
    .then(data => renderNoteItem(data))
}

function deleteNote(element){
    //find note item to reomoce from the DOM
    //delete it from the database by note id 
    //???????????????????????????????????????????*******
    const noteId = element.parentElement.id 
    fetch(url + "/" + `${noteId}`, {
        method: 'DELETE'
    }).then (() => element.parentElement.remove())

    console.log(element.parentElement)
}

//Update #####################!!!!!!!!!!!!*************************

// function updateNote(element) {
//     // noteText update 
//     // then save 
//     const noteText = document.getElementById('note-text').value
//     const noteId = element.parentElement.id
//     fetch(url + "/" + `${noteId}`, {
//         method: 'PATCH',
//         headers: {'Content-Type': 'application/json'},
//         body: JSON.stringify({
//             title: noteText,
//             body: noteText,
//             //using moment
//             create_at: moment().format()
//         })
//     })
//     .then(response => response.json())
//     .then(data => renderNoteItem(data))
// }


// rendering 
function renderNoteItem(noteObj){
    const itemEl = document.createElement('li')
    itemEl.id = noteObj.id

    renderNoteText(itemEl, noteObj)
    console.log(itemEl)
    noteList.appendChild(itemEl)
}

function renderNoteText(noteListItem, noteObj) {
    
    noteListItem.innerHTML = `<span class="dib w-60">${noteObj.body}</span><i class="ml2 dark-red fas fa-times delete"></i><i class="ml3 fas fa-edit edit"></i>`
}

listNotes();



























