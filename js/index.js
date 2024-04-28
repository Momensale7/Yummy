// ^varianles
const navWidth = $('.navContent').outerWidth();




// *____________events
// ^loading screen
$(window).ready(function () {
    $('#sideNav').animate({ 'z-index': 999 })
    $('.loader').fadeOut(500);
})

// ^nav open&close 
$('.openCloseIcon').click(function () {
    if ($('#sideNav').css('left') == '0px') {
        //    its open so fclose
        clsNav();
    }
    else {
        openNav();
        // its close open it
    }
})

// ^get categories
$('#Categories').click(function () {
    getCategories();
})

// ^ get area
$('#area').click(function () {
    getArea();
})

// ^ get Ingredients
$('#ingredients').click(function () {
    getIngredients();
})

// ^search 
$('#search').click(function () {
    showSearchFeild();
})

$('#inputWord').keyup(function () {
    let inputVal = $(this).val()
    getMealSearch('s=' + inputVal);
})
$('#inputChar').keyup(function () {
    let inputVal = $(this).val()
    getMealSearch('f=' + inputVal);
})

// ^contact
$('#contact').click(function () {
    showFormFeild();
})

// &__________________functions
// *close nav
function clsNav() {
    $('.openCloseIcon').addClass('fa-align-justify');
    $('.openCloseIcon').removeClass('fa-x');
    $('#sideNav').animate({ left: -navWidth }, 500)
    for (let i = 0; i < $('.navItem li').length; i++) {
        $('.navItem li').eq(i).animate({ top: "300px" }, 500)
    }
}
// *opennav
function openNav() {
    $('.openCloseIcon').addClass('fa-x');
    $('.openCloseIcon').removeClass('fa-align-justify');
    $('#sideNav').animate({ left: 0 }, 500)
    for (let i = 0; i < $('.navItem li').length; i++) {
        $('.navItem li').eq(i).animate({ top: "0px" }, (i + 5) * 100)
    }

}
// * get categories
async function getCategories() {
    clsNav();
    $('.loader').fadeIn(300);
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`)
    response = await response.json();
    let categories = response.categories;
    displayCategories(categories);
    $('.loader').fadeOut(500);

}
// * get area
async function getArea() {
    clsNav();
    $('.loader').fadeIn(300);
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`)
    response = await response.json();
    displayArea(response.meals);
    $('.loader').fadeOut(500);

}

// * get Ingredients
async function getIngredients() {
    clsNav();
    $('.loader').fadeIn(300);
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?i=list`)
    response = await response.json();
    displayIngredients(response.meals);
    $('.loader').fadeOut(500)

}

// *get meals
async function getMeal(meal) {
    clsNav();
    $('.loader').fadeIn(300);
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?${meal}`)
    response = await response.json();
    displayMeal(response.meals);
    $('.loader').fadeOut(500)
}
// *get search meal
async function getMealSearch(meal) {
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?${meal}`)
    response = await response.json();
    if (response.meals) {
        $('.loader').fadeIn(300);
        $('.loader').fadeOut(500)
        displayMeal(response.meals);
    }
    else {
        $('#mainContent').html('');
    }
}

// * get Recipes 
async function getRecipes(id) {
    clsNav();
    $('.loader').fadeIn(300);
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
    response = await response.json();
    displayRecipes(response.meals);
    $('.loader').fadeOut(500)
}

// *display Categories
function displayCategories(arr) {
    $('#searchContainer').hide();
    let cartona = ``;
    for (let i = 0; i < arr.length; i++) {
        cartona += `<div class="col-md-3">
                <div onclick="getMeal('c=${arr[i].strCategory}')" class="item position-relative overflow-hidden text-center rounded-2 pointer ">
                    <img class="img-fluid" src="${arr[i].strCategoryThumb}" alt="" >
                    <div class="overlay position-absolute text-center text-black p-2">
                        <h3>${arr[i].strCategory}</h3>
                        <p>${arr[i].strCategoryDescription.split(" ").slice(0, 20).join(" ")}</p>
                    </div>
                </div>
            </div>`
    }
    $('#mainContent').html(cartona);

}

// *display area
function displayArea(arr) {
    $('#searchContainer').hide();
    let cartona = ``
    for (let i = 0; i < arr.length; i++) {
        cartona += `<div class="col-md-3">
                <div  onclick="getMeal('a=${arr[i].strArea}')" class="rounded-2 text-center fColor pointer">
                    <i class="fa-solid fa-house-laptop fa-4x"></i>
                    <h3>${arr[i].strArea}</h3>
                </div>
            </div>`
    }
    $('#mainContent').html(cartona);
}

// *display Ingredients
function displayIngredients(arr) {
    $('#searchContainer').hide();
    let cartona = ``;
    for (let i = 0; i < 20; i++) {
        cartona += `<div class="col-md-3">
            <div onclick="getMeal('i=${arr[i].strIngredient}')" class="rounded-2 text-center fColor pointer">
                <i class="fa-solid fa-drumstick-bite fa-4x"></i>
                <h3>${arr[i].strIngredient}</h3>
                <p>${arr[i].strDescription.split(" ").slice(0, 20).join(" ")}</p>
            </div>
            </div>`
    }
    $('#mainContent').html(cartona);
}

// *display meal 
function displayMeal(arr) {
    let cartona = ``;
    for (let i = 0; i < arr.length; i++) {
        cartona += `<div class="col-md-3">
                <div onclick="getRecipes(${arr[i].idMeal})" class="item position-relative overflow-hidden text-center rounded-2 pointer">
                    <img class="img-fluid" src="${arr[i].strMealThumb}" alt="" >
                    <div class="overlay position-absolute text-center text-black p-2">
                        <h3>${arr[i].strMeal}</h3>
                    </div>
                </div>
            </div>`
    }
    $('#mainContent').html(cartona);
}

// * display Recipes
function displayRecipes(arr) {
    $('#searchContainer').hide();
    let cartona = ``;
    let recip;
    let recipesContent = ``;
    let tagsContent = ``;
    for (let i = 1; i <= 20; i++) {
        if (arr[0][`strIngredient${i}`] && arr[0][`strMeasure${i}`]) {
            recip = arr[0][`strMeasure${i}`]+' '+ arr[0][`strIngredient${i}`]
            recipesContent += `<li class="alert alert-info m-2 p-1">${recip}</li>`
        }
    }
    if (arr[0].strTags) {
        let tags = arr[0].strTags.split(",")
        for (let i = 0; i < tags.length; i++) {
            if (tags[i]) {
                tagsContent += `<li class="alert alert-danger m-2 p-1">${tags[i]}</li>`
            }
        }
    }
    cartona += `<div class="col-md-4 fColor">
                <img class="w-100 rounded-3" src="${arr[0].strMealThumb}"
                    alt="">
                <h2>${arr[0].strMeal}</h2>
            </div>
            <div class="col-md-8 fColor">
                <h2>Instructions</h2>
                <p>${arr[0].strInstructions}</p>
                <h3><span class="fw-bolder">Area : </span>${arr[0].strArea}</h3>
                <h3><span class="fw-bolder">Category : </span>${arr[0].strCategory}</h3>
                <h3>Recipes :</h3>
                <ul class="list-unstyled d-flex g-3 flex-wrap">${recipesContent}</ul>
                <h3>Tags :</h3>
                <ul class="list-unstyled d-flex g-3 flex-wrap">${tagsContent}</ul>
                <a target="_blank" href=${arr[0].strSource} class="btn btn-success">Source</a>
                <a target="_blank" href=${arr[0].strYoutube} class="btn btn-danger">Youtube</a>
            </div>
            `
    $('#mainContent').html(cartona);
}

// * search feild
function showSearchFeild(params) {
    $('#searchContainer').show();
    clsNav();
    $('#mainContent').html('');
}

// * form field
function showFormFeild() {
    $('#searchContainer').hide();
    clsNav();
    let cartona = `<div class="contact min-vh-100 d-flex justify-content-center align-items-center">
                <div class="container w-75 text-center">
                    <div class="row g-4">
                        <div class="col-md-6">
                            <input onkeyup="validateForm($(this))" onInput="validateAll();showAlert($(this))" id="nameInput" type="text" class="form-control"
                                placeholder="Enter Your Name">
                            <div id="nameAlert" class="alert alert-danger py-1 fs-6 mt-1 d-none">
                                Special characters and numbers not allowed
                            </div>
                        </div>
                        <div class="col-md-6">
                            <input onkeyup="validateForm($(this))" onInput="validateAll();showAlert($(this))"  id="emailInput" type="email" class="form-control "
                                placeholder="Enter Your Email">
                            <div id="emailAlert" class="alert alert-danger  py-1 fs-6 mt-1  d-none">
                                 ex:m@yy.zzz
                            </div>
                        </div>
                        <div class="col-md-6">
                            <input onkeyup="validateForm($(this))" onInput="validateAll();showAlert($(this))"  id="phoneInput" type="text" class="form-control "
                                placeholder="Enter Your Phone">
                            <div id="phoneAlert" class="alert alert-danger py-1 fs-6 mt-1  d-none">
                                ex:01012345678
                            </div>
                        </div>
                        <div class="col-md-6">
                            <input onkeyup="validateForm($(this))" onInput="validateAll();showAlert($(this))"  id="ageInput" type="number" class="form-control "
                                placeholder="Enter Your Age">
                            <div id="ageAlert" class="alert alert-danger  py-1 fs-6 mt-1  d-none">
                                Age from 1 to 99
                            </div>
                        </div>
                        <div class="col-md-6">
                            <input onkeyup="validateForm($(this))" onInput="validateAll();showAlert($(this))"  id="passwordInput" type="password" class="form-control "
                                placeholder="Enter Your Password">
                            <div id="passwordAlert" class="alert alert-danger  py-1 fs-6 mt-1  d-none">
                                 password should be Minimum eight characters, at least one letter and one number:*
                            </div>
                        </div>
                        <div class="col-md-6">
                            <input onkeyup="validateForm($(this))" onInput="validateAll();showAlert($(this));passEqyalAlert()"  id="repasswordInput" type="password" class="form-control "
                                placeholder="Repassword">
                            <div id="repasswordAlert" class="alert alert-danger w-100 py-1 fs-6 mt-1  d-none">
                                passwords not matching
                            </div>
                        </div>
                    </div>
                    <button id="submitBtn" disabled class="btn btn-outline-danger px-2 mt-3">Submit</button>
                </div>
            </div>`
    $('#mainContent').html(cartona);

}

// * validate Form
function validateForm(element) {
    let regex = {
        nameInput: /^[a-zA-Z]{3,}$/,
        emailInput: /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/gm,
        phoneInput: /^01\d{9}$/,
        ageInput: /^(?:[1-9]|[1-9][0-9])$/,
        passwordInput: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
        repasswordInput: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
    }
    if (regex[$(element).attr("id")].test($(element).val())) {
        return true
    }
    else{
    return false
    }
}
function passEqyal() {
    if ($('#passwordInput').val() == $('#repasswordInput').val()) {
        return true
    }
    else{
      return false
    }
}
function passEqyalAlert() {
    if ($('#passwordInput').val() == $('#repasswordInput').val()) {
        $('#repasswordInput').next().removeClass('d-block')
        $('#repasswordInput').next().addClass('d-none')
        return true
    }
    else {
        $('#repasswordInput').next().removeClass('d-none')
    }
}

// * submit
function validateAll() {
    if (validateForm($('#nameInput'))  
        && validateForm($('#emailInput')) 
        && validateForm($('#phoneInput')) 
        && validateForm($('#ageInput'))
        && validateForm($('#passwordInput'))
        && validateForm($('#repasswordInput'))
        &&passEqyal() ) {
        $('#submitBtn').prop('disabled', false);
        
    }
    else{
        $('#submitBtn').prop('disabled', true);
    }
    
}
// * alerts
function showAlert(element){
    if(validateForm(element)){
        $(element).next().removeClass('d-block')
        $(element).next().addClass('d-none')
        $(element).addClass('is-valid')
        
    }
    else  {
        $(element).next().removeClass('d-none')
        $(element).removeClass('is-valid')
    }
}

getMealSearch('s=' +'')