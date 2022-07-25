const update = document.querySelector('#update-button')

update.addEventListener('click', _ => {
    fetch('/quotes', {
        method: 'put',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            name: 'Darth Vader',
            quote: "I find your lack of faith disturbing."
        })
    })
    .then(res => {
        if (res.ok) return res.json()
    })
    .then(response => {
        window.location.reload(true)
    })
})

const deleteButton = document.querySelector('#delete-button')
const messageSection = document.querySelector('#message')

deleteButton.addEventListener('click', _ => {
    fetch('/quotes', {
        method: 'delete',
        headers: { 'Content-Type' : 'application/json'},
        body: JSON.stringify({
            name: 'Darth Vader'
        })
    })
        .then(res => {
            if (res.ok) return res.json()
        })
        .then(response => {
            if(response === 'No quote to delete'){
                messageSection.textContent = 'No Darth Vader quote to delte'
            } else {
                window.location.reload(true)
            }
        })
        .catch(err => console.log(err))
})

