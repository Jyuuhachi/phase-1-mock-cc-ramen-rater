const targetURL = "http://localhost:3000/ramens"
const ramenForm = document.getElementById("new-ramen")
const editRamenForm = document.getElementById("edit-ramen")
const deleteRamenButton = document.getElementById("delete-ramen")
const ramenTracker = []
let ramenId = 0
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
    ramenForm.reset()
})
editRamenForm.addEventListener("submit", e => {
    e.preventDefault()
    fetch(`${targetURL}/${ramenId}`, {
        method:"PATCH",
        headers:{
            "Content-Type":"application/json",
            "Accept":"application/json"
        },
        body: JSON.stringify({
            rating: e.target['rating'].value,
            comment: e.target['new-comment'].value
        })
    })
    .then(response => response.json())
    .then(ramen => {
        updateView(ramen)
        const ramenArray = document.getElementById("ramen-menu")
        const updatedRamen = document.createElement("img")
        updatedRamen['src'] = ramen['image']
        const addId = ramen['id']
        updatedRamen.id = `ramen${addId}`
        updatedRamen.addEventListener("click", () =>updateView(ramen))
        ramenTracker.forEach(function (item,index) {
            if (item.id.toString() === updatedRamen.id) {
                console.log(index)
                ramenArray.replaceChild(updatedRamen, ramenArray.children[index])
            }
        })
    })
    editRamenForm.reset()
})
deleteRamenButton.addEventListener("click", e => deleteRamen())
function deleteRamen() {
fetch(`${targetURL}/${ramenId}`, {
        method:"DELETE",
    })
    fetch(targetURL)
    .then(response=>response.json())
    .then(ramenList=> updateView(ramenList[0]))
    ramenTracker.forEach(function (item, index) {
        if (item.id.toString() === `ramen${ramenId}`) {
            ramenTracker.splice(index, 1)
            const ramenToDelete = document.getElementById(`ramen${ramenId}`)
            ramenToDelete.remove()
        }
    })
}

function createRamen (ramen) {
const ramenMenu = document.getElementById("ramen-menu")
const newRamen = document.createElement("img")
newRamen['src'] = ramen['image']
const addId = ramen['id']
newRamen.id = `ramen${addId}`
ramenTracker.push(newRamen)
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
    ramenId = ramen['id']
}