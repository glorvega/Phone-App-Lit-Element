import { html, css, LitElement } from "lit";

import "@polymer/iron-icons/device-icons";
import "@polymer/iron-icons/hardware-icons";
import "@polymer/iron-icons/av-icons";
import "@polymer/iron-icons/social-icons";
import "@polymer/iron-icons/communication-icons";
import "@polymer/iron-icons";

import "@polymer/paper-input/paper-input.js";

export class SiteComponent extends LitElement {
  static get styles() {
    return css`
      header {
        display: flex;
        flex-direction: row;
        justify-content: space-around;
        align-items: flex-end;
        background-color: #111;
        color: #db202c;
        position: sticky;
        height: 50px;
        font-size: 20px;
        font-weight: bold;
        width: 400px;
        padding-bottom: 10px;
      }

      .logo,
      .account-profile,
      .logout {
        cursor: pointer;
      }

      .logo:hover,
      .account-profile:hover,
      .logout:hover {
        text-decoration: underline;
      }

      .mov-cover{
        width: 300px;
      }

      .logo{
        background-image: url("/src/icon/web-house.png");
      }

    `;
  }

  static get properties() {
    return {
      movies: { type: Array },
      movieList: { type: Array },
      page: { type: String },
      selectedMovie: { type: Object },
      inputText: { type: String },
      url: { type: String },
    };
  }

  constructor() {
    super();
    this.movies = [];
    this.movieList = [];
    this.page = "categories";
    this.selectedMovie = {};
    this.inputText = "";
    //this.url = "https://centraal.sfi.digital";
  }

  async onFilter(event) {
    this.inputText = event.currentTarget.value;
    
    /* if (inputText.length < 2) {
      this.movieList = [];
      return
    }

    this.movieList = this.movies.filter(movie=> movie.title.toLowerCase().trim().includes(inputText.toLowerCase().trim())); */
/*     const filterApi = await fetch(
      `${this.url}/api/v1/movie?populate=category&like[title]=${inputText}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "x-access-token": sessionStorage.getItem("token"),
        },
      }
    );
    const searchJSON = await filterApi.json();
    this.movieList = searchJSON.data;
    console.log(this.movieList);
    console.log(searchJSON) */
  }

  firstUpdated(_changedProperties) {
    super.firstUpdated(_changedProperties);
    this.movieList = [...this.movies];
}

  _gotoMovie(event) {
    this.selectedMovie = event.detail;
    this.page = "moviedetail";
    console.log(event);
    console.log("click");
  }

  _logout() {
    this.dispatchEvent(new CustomEvent("user-logout", {}));
  }

  _gotoProfile() {
    this.dispatchEvent(new CustomEvent("user-profile", {}));
  }

  _gotoSite() {
    this.dispatchEvent(new CustomEvent("goto-site", {}));
  }
  

 /*  ${this.movieList.map(mov => html `
      <p>${mov.title}</p>
      <img class="mov-cover" src="${mov.cover}"/>
      `)} */

  render() {
    return html`
      <header>
        <div class="logo" @click="${this._gotoSite}">
        <iron-icon icon="icons:home"></iron-icon>
      </div>
        <paper-input
          type="text"
          label="Buscar"
          @input="${this.onFilter}"
        ></paper-input>
        <div class="account-profile" @click="${this._gotoProfile}">
        <iron-icon icon="social:person"></iron-icon>
        </div>
        <div class="logout" @click="${this._logout}">
        <iron-icon icon="icons:exit-to-app"></iron-icon>
      </div>
      </header>
      


      ${this.page === "moviedetail"
        ? html`
            <movie-component
              .selectedMovie="${this.selectedMovie}"
            ></movie-component>
          `
        : html` <category-component
            .onFilter="${this.inputText}"
            @movie-selected="${this._gotoMovie}"
          >
        </category-component>`}
    `;
  }
}
