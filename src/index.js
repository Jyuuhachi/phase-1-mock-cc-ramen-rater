const targetURL = "http://localhost:3000/ramens"
const ramenForm = document.getElementById("new-ramen")
document.addEventListener("DOMContentLoaded", e => {
    fetch(`${targetURL}/1`)
    .then(response=>response.json())
    .then(initialRamen=>updateView(e, initialRamen))
    fetch(targetURL)
    .then(response=>response.json())
    .then(ramenList=>ramenList.forEach(createRamen))
})
ramenForm.addEventListener("submit", e=> {
    e.preventDefault()
    const ramenForm = document.getElementById("new-ramen")
    const submittedRamen = {}
    submittedRamen.name = document.getElementById("new-name").value
    submittedRamen.restaurant = document.getElementById("new-restaurant").value
    submittedRamen.image = document.getElementById("new-image").value
    submittedRamen.rating = document.getElementById("new-rating").value
    submittedRamen.comment = document.getElementById("new-comment").value
    fetch(targetURL, { method:"POST",
    headers: {
        "Content-Type":"application/json",
        "Accept":"application/json"
    },
    body: JSON.stringify(submittedRamen)
    })
    .then(response=>response.json())
    .then(ramen =>createRamen(ramen))
    ramenForm.reset()
})


function createRamen (ramen) {
const ramenMenu = document.getElementById("ramen-menu")
const newRamen = document.createElement("img")
newRamen.src = ramen.image
ramenMenu.appendChild(newRamen)
newRamen.addEventListener("click", e=>updateView(e,ramen))

}
function updateView (e, ramen) {
    const updateImage = document.getElementsByClassName("detail-image")
    updateImage[0].src = ramen.image
    updateImage[0].alt = ramen.name
    const updateName = document.getElementsByClassName("name")
    updateName[0].textContent = ramen.name
    const updateRestaurant = document.getElementsByClassName("restaurant")
    updateRestaurant[0].textContent = ramen.restaurant
    const updateRating = document.getElementById("rating-display")
    updateRating.textContent = ramen.rating
    const updateComment = document.getElementById("comment-display")
    updateComment.textContent = ramen.comment
    console.log(ramen)
    console.log(ramen.image)
}
