//global variables in DOM 
const url = "http://localhost:3000/notes"
const form = document.querySelector('.note-form')
const noteText = document.getElementById('note-text').value
const noteList = document.getElementById('note-list')


// click on *save* / edit note
form.addEventListener('submit', event=> {
    event.preventDefault()

    const noteText = document.getElementById('note-text').value
    const inputBox = document.getElementById('note-text')
    // console.log("form submitted!",noteText)

    if(document.querySelector('.save-note').innerText===("Edit Note"))
    {
        updateNote(noteList.childNodes[eval(form.id)-1])
        // targetItem = noteList.childNodes[eval(form.id)-1]
        console.log("chick on edit id", noteList.childNodes[eval(form.id)-1])
    }

    else{postNote(noteText)}

  })

// click on delete 
noteList.addEventListener("click", event=> {
   console.log("here is button content", event.target.innerText)
   if(event.target.innerText=== "delete"){
       deleteNote(event.target)
   }

})

// click on edit 
noteList.addEventListener("click", event=> {
    if(event.target.innerText === "edit"){
        document.querySelector('.save-note').innerText = "Edit Note"
        form.id = event.target.parentElement.id
        console.log("save button id is", form.id )
    }
 
 })


// get + post + delete + edit ...... 2 works , then more .. 

// *get*
fetch (url)
.then(res => res.json())
.then(data=> {
    for (let note of data) {
        console.log(note.id)
        displayNote(note)
    }
})

// *post* .... note: a random id will be generated.
function postNote(noteText) {
    fetch (url, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
       title: noteText,
       body: noteText,
       create_at: moment().format()
    })
})

    .then(response => response.json())
    // ******* why below does not work????? ************* 
    // post data here, undefined ************************ 

    // .then(function(response){
    //     response.json()
    // })  
    
    .then(data => {
        console.log("post data here," , data)
        alert("new note is added")
        displayNote(data)
    })
}

// *delete*
function deleteNote (element) {
    
    console.log(element.parentElement.id )
    const noteId = element.parentElement.id 
    fetch(url + "/" + `${noteId}`, {
        method: 'DELETE'
    })
    .then (()=> element.parentElement.remove())
}

// *Update note*
function updateNote(element){
    const noteText = document.getElementById('note-text').value
    const inputBox = document.getElementById('note-text')
    const noteId = element.id
    console.log("element id is ", element.id)
        fetch(url + "/" + `${noteId}`, {
            method: 'PATCH',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({ 
                title: noteText,
                body: noteText,
                create_at: moment().format()
            })
        })
        .then(response => response.json())
        .then (data=> {
            console.log("update data is here", data)  
            // element.replace()??? 
            location.reload()
        })
        
    }

// display postted note on the page 

function displayNote(note) {
    noteItem = document.createElement('li')
    noteItem.setAttribute('id', note.id)
    noteItem.innerText = `${note.body}`
    noteList.appendChild(noteItem)
    editButton= document.createElement('button')
    editButton.innerText = "edit"
    noteItem.appendChild(editButton)
    deleteButton= document.createElement('button')
    deleteButton.innerText = "delete"
    noteItem.appendChild(deleteButton)

}