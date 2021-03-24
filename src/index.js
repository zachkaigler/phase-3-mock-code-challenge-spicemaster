// Global Variables
let spiceBlendTitleH2 = document.querySelector("h2.title")
let spiceBlendIngredientsUl = document.querySelector("ul.ingredients-list")
let spiceBlendIngredientImg = document.querySelector("img")
let editSpiceBlendForm = document.querySelector("form#update-form")
let ingredientForm = document.querySelector("form#ingredient-form")

// Populate first ingredient on DOM
fetch("http://localhost:3000/spiceblends/1")
    .then(resp => resp.json())
    .then(function (spiceObj) {
        let ingredientsArray = spiceObj.ingredients
        spiceBlendTitleH2.innerText = spiceObj.title
        spiceBlendIngredientImg.src = spiceObj.image
        
        ingredientsArray.forEach(function (ingredient) {
            let ingredientLi = document.createElement("li")
            ingredientLi.innerText = ingredient.name
            
            spiceBlendIngredientsUl.append(ingredientLi)
        })
    })
    
// Update title and push to server    
editSpiceBlendForm.addEventListener("submit", function(event) {
    event.preventDefault()
    
    let userInputTitle = event.target.title.value
    
    fetch("http://localhost:3000/spiceblends/1", {
        method: "PATCH",
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify({
            title: userInputTitle
        })
    })
    .then(resp => resp.json())
    .then(function (UpdatedSpiceObj) {
        spiceBlendTitleH2.innerText = UpdatedSpiceObj.title
    })
})

// Update new ingredient on DOM
ingredientForm.addEventListener("submit", function(event) {
        event.preventDefault()

        let userInputIngredient = event.target.name.value
        
        let ingredientLi = document.createElement("li")

        ingredientLi.innerText = userInputIngredient
        spiceBlendIngredientsUl.append(ingredientLi)
    
})
