/*globals fetch, moment */

const url = "http://localhost:3000/notes"
const form = document.querySelector('#note-form')
const noteList = document.querySelector('#note-list')
const noteText = document.getElementById('note-text').value

// add event listener to submit 
form.addEventListener('submit', event => {

    event.preventDefault()
    const noteText = document.getElementById('note-text').value
    //edit
    if ( document.querySelector('#save-note').innerText === "edit"){
        //refresh
        location.reload()
    }

    //*** 
    
    else {console.log("here is my note",  noteText)
    createNote(noteText)
    }
    
})


// removing a note from the dom 

noteList.addEventListener("click", event=> {
    // when user click delete run deleteNote()
    if(event.target.classList.contains('delete')) {
        deleteNote(event.target)
        // console.log("this is target", event.target)
    }
})


    //!!!!!!!!!!!edit a note from the dom ******>>>>
        //click --> edit input --> save ---> update  
// click link the id of note to edit ... 

noteList.addEventListener("click", event=> {
    // when user click edit run edit note()
    if(event.target.classList.contains('edit')) {
        // updateNote(event.target)
        document.querySelector('#save-note').innerText = "edit"
        // link the ID in dom with note ID .....**** noteID**** ??
        // point to note # 
        console.log("this is target", event.target)
        updateNote(event.target)
    }
})


// list notes ... ????
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

// Edit then update.... 
    // first remove ,then add... 

function updateNote(element){
    const noteText = document.getElementById('note-text').value
    const noteId = element.parentElement.id
    fetch(url + "/" + `${noteId}`, {
        // ** -- replace old note content with new input 
        //** -- save the new input to DOM and Json, show on the page
        method: 'PATCH',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            //replace old note to new inputs ... 
            title: noteText,
            body: noteText,
            //using moment
            create_at: moment().format()
        })
    })
    .then(response => response.json())
    .then(data => {
        console.log("I want this", data)
        // then click on edit, save changes to dom  
        //upate(data)
        data=> element.parentElement.replace()
        
            })
}

// function update(content) {


// }



// rendering each note.. 
function renderNoteItem(eachNote){
    const itemEl = document.createElement('li')
    itemEl.id = eachNote.id
    renderNoteText(itemEl, eachNote)
    noteList.appendChild(itemEl)
}

// what is noteListItem is the whole row ... 
function renderNoteText(noteListItem, eachNote) {
    
    noteListItem.innerHTML = `<span class="dib w-60">${eachNote.body}</span><i class="ml2 dark-red fas fa-times delete"></i><i class="ml3 fas fa-edit edit"></i>`
}

listNotes();


// if it is editing update input ,



























