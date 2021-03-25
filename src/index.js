// Global Variables
let spiceBlendTitleH2 = document.querySelector("h2.title")
let spiceBlendIngredientsUl = document.querySelector("ul.ingredients-list")
let spiceBlendIngredientImg = document.querySelector("img")
let editSpiceBlendForm = document.querySelector("form#update-form")
let ingredientForm = document.querySelector("form#ingredient-form")
let spiceBlendImagesDiv = document.querySelector("div#spice-images")


// Populate first recipe on DOM
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

// Populate all upper blend iamges on page load
fetch("http://localhost:3000/spiceblends")
    .then(resp => resp.json())
    .then(function(blendsArray) {
        blendsArray.forEach(function(blend) {
            let blendImg = document.createElement("img")
                blendImg.src = blend.image
                blendImg.alt = blend.title
            spiceBlendImagesDiv.append(blendImg)
            

            blendImg.addEventListener("click", function(event) {
                populateRecipeToDom(blend)
            })
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

// Update new ingredient on DOM and persist to server

ingredientForm.addEventListener("submit", function(event) {
            event.preventDefault()

            let userInputIngredient = event.target.name.value

            fetch("http://localhost:3000/spiceblends/1/ingredients", {
                method: "POST",
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify({
                    name: userInputIngredient,
                    spiceblendId: 1
                })
            })
                .then(resp => resp.json())
                .then(function(newIngredient) {
                    let ingredientLi = document.createElement("li")
                    ingredientLi.innerText = newIngredient.name
                    spiceBlendIngredientsUl.append(ingredientLi)
                })

        
})



// Populate any recipe on DOM <HELPER FUNCTION>
function populateRecipeToDom(blend) {
    fetch(`http://localhost:3000/spiceblends/${blend.id}`)
        .then(resp => resp.json())
        .then(function (recipesObj) {
            // Clear DIV
            spiceBlendIngredientsUl.innerText = ""
            spiceBlendTitleH2.innerText = ""
            spiceBlendIngredientImg.src = "./assets/image-placeholder.jpg"
            
            // Populate DIV with passed in elements
            let ingredientsArray = recipesObj.ingredients
            spiceBlendTitleH2.innerText = recipesObj.title
            spiceBlendIngredientImg.src = recipesObj.image
            
            ingredientsArray.forEach(function (ingredient) {
                let ingredientLi = document.createElement("li")
                ingredientLi.innerText = ingredient.name
                spiceBlendIngredientsUl.append(ingredientLi)
                
            })
        })
}