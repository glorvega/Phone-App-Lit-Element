import { html, css, LitElement } from "lit";
import "@polymer/paper-input/paper-input.js";
export class CategoryComponent extends LitElement {
  static get styles() {
    return css`
      .categories-container {
        background-color: #313638;
        display: flex;
        flex-direction: column;
        padding-left: 30px;
        padding-right: 30px;
        height: 725px;
        overflow: hidden scroll;
        border-radius: 0px 0px 50px 50px;
        width: 340px;
      }

      .category {
        display: flex;
        flex-direction: column;
        text-align: center;
        max-width: 338px;
      }

      .movie-card {
        display: flex;
        flex-direction: column;
        list-style: none;
        justify-content: center;
        gap: 20px;
        width: 200px;
        align-items: center;
      }

      img {
        width: 200px;
        height: 300px;
        transition: all 0.2s ease-in-out;
        cursor: pointer;
      }

      img:hover {
        transform: scale(1.1);
      }

      .movie-row {
        display: flex;
        flex-direction: row;
        gap: 20px;
        overflow-x: scroll;
        height: 400px;
      }

      .title {
        color: whitesmoke;
        font-size: 30px;
      }

      ::-webkit-scrollbar {
        width: 10px;
      }

      ::-webkit-scrollbar-track {
        border-radius: 10px;
        background-color: rgba(25, 147, 147, 0.1);
      }

      ::-webkit-scrollbar-thumb {
        border-radius: 10px;
        background-color: rgba(25, 147, 147, 0.2);
      }
    `;
  }

  static get properties() {
    return {
      categories: { type: Array },
      movies: { type: Map },
      findMovie: {type: String},
      inputText: { type: String },
      movieList: { type: Array },
      onFilter: {type: String}
    };
  }

  constructor() {
    super();
    this.categories = [];
    this.movies = new Map();
    this.movieList = [];
    this.findMovie = "";
    this.inputText = "";
    this.onFilter = "";
  }

  

/*   update(changedProperties){
    console.log(this.onFilter)
    if(this.onFilter !== ""){
      for(var [key, value] of this.movies){
        value = value.filter(movie => movie.title.toLowerCase().trim().includes(this.onFilter.toLowerCase().trim()))
        console.log(value);
      }
    }else {
    }
    super.update(changedProperties);
  } */

  async loadMoviesByCategory() {
    for (const category of this.categories) {
      try {
        const response = await fetch(
          `https://centraal.sfi.digital/api/v1/movie?where[category]=${category._id}`,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const payload = await response.json();
        this.movies.set(category.title, payload.data);
        this.requestUpdate();
      } catch (error) {
        // Handle error
      }
    }
  }


   firstUpdated(_changedProperties) {
    super.firstUpdated(_changedProperties);
    this.loadCategories();
    this.onFilter();
    this.movieList = [...this.movies];
  }

  async loadCategories(){
    const response = await fetch(
      `https://centraal.sfi.digital/api/v1/category?sort[title]=ASC`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const payload = await response.json();
    this.categories = [...payload.data];
    await this.loadMoviesByCategory();
  }

  async onMovieSelect(movie, category) {
    this.dispatchEvent(
      new CustomEvent("movie-selected", {
        detail: {
          movie: movie,
          category: category
        }
      })
    );
  }

  async onFilter(event) {
    const inputText = event.currentTarget.value;
    console.log(inputText);
    this.inputText = inputText;
    if (inputText.length < 2) {
      this.movieList = [];
      return
    }

    this.movieList = this.movies.filter(movie=> movie.title.toLowerCase().trim().includes(inputText.toLowerCase().trim()));
  } 

/* firstUpdated(_changedProperties) {
    super.firstUpdated(_changedProperties);
    this.loadMoviesByCategory()
    this.movieList = [...this.movies];
} */
  
        /* ${this.movieList.map((mov) => html`
            <div
              class='movielist'>
              
                <p>${mov.title}</p>
              
              <img src="${mov.cover}">
           
          `)}
        </div> */

  render() {
    return html`

      <div class="categories-container">
 <!--      <paper-input
          type="text"
          label="Buscar"
          @input="${this.onFilter}"
        ></paper-input> -->

        ${this.categories.map(
          (category) => html`
            <div class="category">
              <p class="title">${category.title}</p>
              <div class="movie-row">
                ${this.movies && this.movies.size > 0
                  ? this.movies.get(category.title).map(
                      (movie) => html`
                      <div class="movie-card">
                        <img src="${movie.cover}" @click="${() => {
                        this.onMovieSelect(movie, category);
                      }}"/>
                      </div>
            </div>
                    `
                    )
                  : ""}
              </div>
            </div>
          `
        )}
      </div>

      ${this.page === "moviedetail"
        ? html` <movie-component></movie-component> `
        : html``}
    `;
  }
}
