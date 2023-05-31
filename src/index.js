const targetURL = "http://localhost:3000/ramens"
const ramenForm = document.getElementById("new-ramen")
document.addEventListener("DOMContentLoaded", () => {
    fetch(targetURL)
    .then(response=>response.json())
    .then(ramenList=> {
        updateView(ramenList[0])
        ramenList.forEach(createRamen)
    })
})
ramenForm.addEventListener("submit", e=> {
    e.preventDefault()
    const submittedRamen = {}
    submittedRamen['name'] = e.target['name'].value
    submittedRamen['restaurant'] = e.target['restaurant'].value
    submittedRamen['image'] = e.target['image'].value
    submittedRamen['rating'] = e.target['rating'].value
    submittedRamen['comment'] = e.target['new-comment'].value
    fetch(targetURL, { method:"POST",
    headers: {
        "Content-Type":"application/json",
        "Accept":"application/json"
    },
    body: JSON.stringify(submittedRamen)
    })
    .then(response=>response.json())
    .then(ramen =>createRamen(ramen))
    e.reset()
})


function createRamen (ramen) {
const ramenMenu = document.getElementById("ramen-menu")
const newRamen = document.createElement("img")
newRamen['src'] = ramen['image']
ramenMenu.appendChild(newRamen)
newRamen.addEventListener("click", () =>updateView(ramen))

}
function updateView (ramen) {
    const updateImage = document.getElementsByClassName("detail-image")
    updateImage[0]['src'] = ramen['image']
    updateImage[0]['alt'] = ramen['name']
    const updateName = document.getElementsByClassName("name")
    updateName[0].textContent = ramen['name']
    const updateRestaurant = document.getElementsByClassName("restaurant")
    updateRestaurant[0].textContent = ramen['restaurant']
    const updateRating = document.getElementById("rating-display")
    updateRating.textContent = ramen['rating']
    const updateComment = document.getElementById("comment-display")
    updateComment.textContent = ramen['comment']
}
