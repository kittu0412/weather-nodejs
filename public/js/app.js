fetch('http://localhost:3000/weather?address=!').then((response)=>{
    response.json().then((data)=>{
        console.log(data)
    })
})

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')


weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault()

    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''
    const location = search.value
    //messageOne.textContent = 'Loading...'
    //messageTwo.textContent = ''

    fetch('/weather?address='+location).then((response)=>{
    response.json().then((data)=>{
        if(data.error){
            messageOne.textContent = data.error
            //console.log(data.error)
        } else{
            messageOne.textContent = data.forecast
        //console.log(data)
        }
    })
})

    //console.log(location)
})