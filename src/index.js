import "./styles.css";

// api from OMDB
const apiUrl =
  "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=1";
//  get the card from html
var main = document.getElementById("main"); // Home page
var favouriteMovies = document.getElementById("favouriteMovies"); // Favt movies display div
var moreInfomation = document.getElementById("moreInfomation"); //more information display div
var movieSearch = document.getElementById("searchMovie"); // search form
var autocompleteList = document.getElementById("autocompleteList"); // autocomplete search holder
var presentPage = "main"; // to keep track of the current rendered page
const IMGPATH = "https://image.tmdb.org/t/p/original/";
var data = "";
// search form
var searchForm = document.getElementById("searchForm");
var searchMovie = document.getElementById("searchMovie");
var favt = document.getElementById("favt");
var home = document.getElementById("home");
var favtMoviesList = []; // Conatins favt movies list
var movieslist = []; // contains title of all the movies to fill autocomplete
//update the favourite movie list
function updateFavtMovies() {
  favtMoviesList = [];
  // console.log(localStorage + "local storage");
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);

    if (key === "__test__" || key === "No results found!!") {
      continue;
    }
    let object = window.localStorage.getItem(key);
    favtMoviesList.push(JSON.parse(object));
  }
}
// show movies in home page
home.addEventListener("click", function () {
  favouriteMovies.innerHTML = "";
  main.innerHTML = "";
  favouriteMovies.style.display = "none";
  moreInfomation.style.display = "none";
  main.style.display = "flex";
  presentPage = "main";
  updateFavtMovies();
  render(data.results, main);
});
// show favorite movies list
favt.addEventListener("click", function () {
  favouriteMovies.style.display = "flex";
  main.style.display = "none";
  updateFavtMovies();
  presentPage = "favouriteMovies";
  main.innerHTML = "";
  favouriteMovies.innerHTML = "";
  // render(data.results, main);
  render(favtMoviesList, favouriteMovies);
});
// toggle favt
// Defining async function
async function getapi(url) {
  // Storing response
  const response = await fetch(url);

  // Storing data in form of JSON
  data = await response.json();

  render(data.results, main);
  for (var i = 0; i < data.results.length; i++) {
    movieslist.push(data.results[i].title);
  }
}
// Calling that async function
getapi(apiUrl);
// rendering the movies
function render(results, page) {
  if (results.length === 0) {
    const title = document.createElement("h5");
    title.innerHTML = "No results found!!";
    page.appendChild(title);
  }
  for (var i = 0; i < results.length; i++) {
    var obj = results[i];
    // console.log(obj);
    const cardBody = document.createElement("div");
    const cardContainer = document.createElement("div");
    const image = document.createElement("img");
    const title = document.createElement("h5");
    const vote_average = document.createElement("h6");
    const button = document.createElement("button");
    cardBody.class = "card-body card-Body";
    cardContainer.class = "card-name-container";
    cardContainer.style = "width: 22rem";
    cardBody.style = "margin-bottom:2rem";
    button.className = "favt-button";
    // button.type = "submit";
    button.class = "btn";

    button.styles = "width:10rem heigth:10rem";
    title.class = "card-title";
    title.styles = "width:10rem";
    title.innerHTML = obj.title;
    image.className = "moreInfoImg";
    image.src = IMGPATH + obj.poster_path;
    image.style.width = "22rem";
    image.style.height = "22rem";
    button.innerHTML = '<i class="fa-regular fa-heart"></i>';
    vote_average.innerHTML = "Rating: ";
    vote_average.innerHTML += obj.vote_average;

    // console.log(localStorage.getItem(obj.title) + " localstorage content");
    if (localStorage.getItem(obj.title) !== null) {
      button.style = "color:red";
    }
    cardContainer.appendChild(image);
    cardContainer.appendChild(title);
    cardContainer.appendChild(vote_average);
    cardContainer.appendChild(button);
    cardBody.appendChild(cardContainer);
    page.appendChild(cardBody);
  }
  exampleFunction();
}

//  search api
var movie = "";
searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  main.innerHTML = "";

  movie = searchMovie.value.toLowerCase();
  // console.log(movie);
  // presentPage = "search";
  searchForMovies(movie, main);
});

// search for movies
function searchForMovies(movie, page) {
  var res = data.results.filter(searchmovieinjson);
  render(res, page);
  // console.log(res);
}
function searchmovieinjson(data) {
  // console.log(data);
  return data.title.toLowerCase().match(movie);
}

// autocomplete search
movieSearch.addEventListener("input", () =>
  autocomplete(searchMovie.value.toLowerCase(), movieslist)
);
function autocomplete(value, movieslist) {
  var a, b;
  closeAllLists();
  if (value.length === 0) {
    return false;
  }
  a = document.createElement("DIV");
  // console.log(movieslist);
  for (var i = 0; i < movieslist.length; i++) {
    // console.log(movieslist[i].substr(0, value.length).toLowerCase());
    if (movieslist[i].substr(0, value.length).toLowerCase() === value) {
      a.setAttribute("class", "autocomplete-items");
      b = document.createElement("DIV");
      b.innerHTML =
        "<strong>" + movieslist[i].substr(0, value.length) + "</strong>";
      b.innerHTML += movieslist[i].substr(value.length);
      /*insert a input field that will hold the current array item's value:*/
      b.innerHTML += "<input type='hidden' value='" + movieslist[i] + "'>";
      b.addEventListener("click", function (e) {
        /*insert the value for the autocomplete text field:*/
        movieSearch.value = this.getElementsByTagName("input")[0].value;
        /*close the list of autocompleted values,
        (or any other open lists of autocompleted values:*/
        closeAllLists();
      });
      a.appendChild(b);
      // a.appendChild(c);
    }
    autocompleteList.appendChild(a);
  }

  console.log(autocompleteList);
}
// event lister on each favt button and poster image for more details abt the movie
function exampleFunction() {
  // Function to be executed
  let favtButton = []; // to add eventlistner for each favt button on each card
  let favouriteMoviesName = []; // to keep track of favt movies
  let moreInfoImg = []; // to add eventlistner on poster of each movie to get more info abt the movie
  let moreInfoMovieName = []; // to keep track of all the movie title
  favtButton = document
    .getElementById("movieContainer")
    .getElementsByTagName("button");
  favouriteMoviesName = document
    .getElementById("movieContainer")
    .getElementsByTagName("h5");
  moreInfoImg = document
    .getElementById("movieContainer")
    .getElementsByTagName("img");
  moreInfoMovieName = document
    .getElementById("movieContainer")
    .getElementsByTagName("h5");

  // persistent favt movie list using localStorage
  for (let i = 0; i < favtButton.length; i++) {
    favtButton[i].addEventListener("click", function () {
      var favtTitle = favouriteMoviesName[i].innerHTML; ///fetch the movie title for each card
      console.log(favtTitle + " button click " + i);
      // search the each title in localstorage and update the favt button to red/ black respectively
      if (localStorage.getItem(favtTitle) !== null) {
        console.log("movie is removed from favt list");
        localStorage.removeItem(favtTitle);
        favtButton[i].style = "color:black";
        console.log(favtButton[i].parentElement.id);
        updateFavtMovies(); // update the favt movie list everytime the clcik event occurs on
        // to check which is the current rendered page
        if (presentPage === "main") {
          main.innerHTML = "";
          render(data.results, main);
        } else {
          favouriteMovies.innerHTML = "";
          render(favtMoviesList, favouriteMovies);
        }
      } else {
        var value = data.results.find((item) => item.title === favtTitle);
        console.log(value + " inserting local storage");
        localStorage.setItem(favtTitle, JSON.stringify(value));
        favtButton[i].style = "color:red";
        updateFavtMovies();
        if (presentPage === "main") {
          main.innerHTML = "";
          render(data.results, main);
        } else {
          favouriteMovies.innerHTML = "";
          render(favtMoviesList, favouriteMovies);
        }
      }
    });
  }
  // Click on the image to get more information
  for (let i = 0; i < moreInfoImg.length; i++) {
    moreInfoImg[i].addEventListener("click", function (e) {
      e.preventDefault();
      main.style.display = "none";
      favouriteMovies.style.display = "none";
      moreInfomation.style.display = "flex";
      var obj = data.results.find(
        (items) => items.title === moreInfoMovieName[i].innerHTML
      );
      console.log("image clicked" + obj.title);
      // create and render more info abt the movieName
      const cardBody = document.createElement("div");
      const cardContainer = document.createElement("div");
      const image = document.createElement("img");
      const imageDiv = document.createElement("div");
      imageDiv.appendChild(image);
      const title = document.createElement("h3");
      const titleDiv = document.createElement("div");
      titleDiv.appendChild(title);
      titleDiv.appendChild(title);
      const overview = document.createElement("h5");
      const overviewDiv = document.createElement("div");
      overviewDiv.appendChild(overview);
      const vote_average = document.createElement("h4");
      vote_average.innerHTML = "Rating:" + obj.vote_average;
      const vote_averageDiv = document.createElement("div");
      vote_averageDiv.appendChild(vote_average);
      const titleRatingDiv = document.createElement("div");
      titleRatingDiv.className = "movieCardRow";
      const RatingOverviewBack = document.createElement("div");
      RatingOverviewBack.className = "movieCardFlexCol";
      const button = document.createElement("button");
      const buttonDiv = document.createElement("div");
      buttonDiv.appendChild(button);
      buttonDiv.className = "buttonplacement";
      const backButton = document.createElement("button");
      const backButtonDiv = document.createElement("div");
      backButtonDiv.appendChild(backButton);
      cardContainer.style = "width: 50rem";
      cardBody.style = "width: 80rem";
      cardBody.styles = "margin-bottom:2rem ";
      button.className = "favt-button";
      button.type = "submit";
      button.class = "btn";
      backButton.class = "btn";
      button.styles = "width:10rem heigth:10rem";
      backButton.styles = "width:30rem heigth:20rem";
      title.styles = "width:auto";
      title.innerHTML = obj.title;
      overview.innerHTML = obj.overview;
      image.className = "moreInfoImg";
      image.src = IMGPATH + obj.poster_path;
      image.style.width = "20rem";
      image.style.height = "20rem";
      image.type = "submit";
      image.class = "btn";
      button.innerHTML = '<i class="fa-regular fa-heart"></i>';
      backButton.innerHTML = "GO BACK";
      console.log(localStorage.getItem(obj.title) + " localstorage content");
      if (localStorage.getItem(obj.title) !== null) {
        button.style = "color:red";
      }
      titleRatingDiv.appendChild(titleDiv);
      titleRatingDiv.appendChild(buttonDiv);
      RatingOverviewBack.appendChild(vote_averageDiv);
      RatingOverviewBack.appendChild(overviewDiv);
      RatingOverviewBack.appendChild(backButton);
      cardContainer.appendChild(titleRatingDiv);
      cardContainer.appendChild(RatingOverviewBack);
      cardBody.appendChild(imageDiv);
      cardBody.appendChild(cardContainer);
      moreInfomation.innerHTML = "";
      moreInfomation.appendChild(cardBody);
      cardContainer.className = "movieCardFlexCol";
      cardBody.className = "movieCardFlexRow ";
      backButton.addEventListener("click", function () {
        updateFavtMovies();
        moreInfomation.innerHTML = "";
        if (presentPage === "main") {
          main.style.display = "flex";
          favouriteMovies.style.display = "none";
          main.innerHTML = "";
          render(data.results, main);
        } else {
          main.style.display = "none";
          favouriteMovies.style.display = "flex";
          favouriteMovies.innerHTML = "";
          render(favtMoviesList, favouriteMovies);
        }

        moreInfomation.style.display = "none";
      });
      button.addEventListener("click", function () {
        console.log(title.innerHTML);
        if (localStorage.getItem(title.innerHTML) !== null) {
          console.log("movie is removed from favt list");
          localStorage.removeItem(title.innerHTML);
          button.style = "color:black";
          console.log(favtButton[i].parentElement.id);
          updateFavtMovies();
        } else {
          var value = data.results.find(
            (item) => item.title === title.innerHTML
          );
          button.style = "color:red";

          localStorage.setItem(title.innerHTML, JSON.stringify(value));
          updateFavtMovies();
        }
      });
    });
  }
}

function closeAllLists(elmnt) {
  /*close all autocomplete lists in the document*/
  var x = document.getElementsByClassName("autocomplete-items");
  for (var i = 0; i < x.length; i++) {
    if (elmnt !== x[i]) {
      x[i].parentNode.removeChild(x[i]);
    }
  }
}
// click anywhere on the DOM to close the autocomplete div
document.addEventListener("click", function (e) {
  closeAllLists(e.target);
});
