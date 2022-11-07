import { html, css, LitElement } from "lit-element";

import "@vanillawc/wc-carousel-lite";

export class GalleryComponent extends LitElement {
  static styles = [
    css`
      .title {
        font-family: monospace;
        -webkit-text-stroke: 0.5px black;
        padding-bottom: 20px;
        font-size: 30px;
        padding-top: 30px;
      }

      button {
        background: rgb(96, 9, 240);
        background: linear-gradient(
          0deg,
          rgba(96, 9, 240, 0.14) 0%,
          rgb(135, 162, 159) 100%
        );
        border: none;
        color: #e8e8e8;
        font-size: 25px;
        font-family: "Cormorant Garamond", serif;
        border-radius: 10px;
        padding: 8px;
        width: 250px;
      }

      button:before {
        height: 0%;
        width: 2px;
      }

      button:hover {
        box-shadow: 4px 4px 6px 0 rgba(255, 255, 255, 0.5),
          -4px -4px 6px 0 rgba(116, 125, 136, 0.5),
          inset -4px -4px 6px 0 rgba(255, 255, 255, 0.2),
          inset 4px 4px 6px 0 rgba(0, 0, 0, 0.4);
      }

      .grid {
        position: abolute;
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 7px;
        overflow: hidden scroll;
        max-height: 505px;
      }

      img {
        border-radius: 10px;
        transition: all 0.2s ease-in-out;
        cursor: pointer;
        -webkit-transition-property: all;
        -webkit-transition-duration: 0.3s;
        -webkit-transition-timing-function: ease;
      }

      img:hover {
        transform: scale(1.1);
      }

      .bg-container {
        background-image: url("https://i.pinimg.com/originals/b6/48/4c/b6484ca31c5e40a76702b191ecea2548.gif");
        background-size: cover;
        border-radius: 0px 0px 40px 40px;
      }

      .gallery-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        height: 785px;
        width: 400px;
        backdrop-filter: blur(4px);
        border-radius: 0px 0px 40px 40px;
        overflow: hidden scroll;
      }

      .photo-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 20px;
        padding-top: 20px;
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

      .item {
        margin-left: 10px;
        margin-right: 10px;
      }

      wc-carousel-lite {
        height: 200px;
      }

      .fullscreen {
        height: 100%;
      }
    `,
  ];
  static get properties() {
    return {
      photos: {
        type: Array,
      },
      catPhotos: {
        type: Array,
      },
      showPhotos: {
        type: Boolean,
      },
      showCats: {
        type: Boolean,
      },
      page: {
        type: String,
      },
    };
  }
  constructor() {
    super();
    this.photos = [];
    this.catPhotos = [];
    this.showPhotos = true;
    this.showCats = true;
    this.page = "";
  }

  async _handlePhotos() {
    const response = await fetch(
      "https://picsum.photos/v2/list?page=3&limit=10"
    );
    // fetch('https://swapi.dev/api/people/1/')
    // .then(response => response.json())
    // .then(data => console.log(data))
    // .catch(error => console.log(error));
    const results = await response.json();
    const data = await results;
    this.photos = [...data];
    this.showPhotos = !this.showPhotos;
  }

  async _catPhotos() {
    const response = await fetch(
      "https://api.thecatapi.com/v1/images/search?limit=10"
    );
    // fetch('https://swapi.dev/api/people/1/')
    // .then(response => response.json())
    // .then(data => console.log(data))
    // .catch(error => console.log(error));
    const results = await response.json();
    const data = await results;
    this.catPhotos = [...data];
    this.showCats = !this.showCats;
  }

  toFullScreen() {
    this.shadowRoot.getElementById("MyImage").classList.add("fullscreen");
  }

  render() {
    return html`
      <div class="bg-container">
        <div class="gallery-container">
          <h1 class="title">Galería de fotos</h1>
          <div class="photo-container">
            <button
              @click="${() => {
                this._handlePhotos();
              }}"
            >
              ${this.showPhotos ? "Fotos de paisajes" : "Cerrar álbum"}
            </button>
            <div class="grid">
              ${!this.showPhotos
                ? html``
                : html`
                    ${this.photos.map(
                      (photo) =>
                        html`<img
                          id="MyImage"
                          width="180px"
                          height="120px"
                          src="${photo.download_url}"
                          @click="${this.toFullScreen}"
                        />`
                    )}
                  `}
            </div>

            <div class="carousel-container">
              <wc-carousel-lite autoplay>
                <img
                  src="https://media.istockphoto.com/photos/crazy-looking-black-and-white-border-collie-dog-say-looking-intently-picture-id1213516345?k=20&m=1213516345&s=612x612&w=0&h=_XUSwcrXe5HjI2QEby0ex6Tl1fB_YJUzUU8o2cUt0YA="
                  class="item"
                  width="250"
                />
                <img
                  src="https://media.istockphoto.com/photos/happy-black-and-white-border-collie-dog-picture-id1031312912?k=20&m=1031312912&s=170667a&w=0&h=rIjy_rnpiDQnnaDSB3hDisIz5mEAPCUm23zFvYGA6OQ="
                  class="item"
                  width="250"
                />
                <img
                  src="https://media.istockphoto.com/photos/crazy-looking-black-and-white-border-collie-dog-say-looking-intently-picture-id1213516351?k=20&m=1213516351&s=170667a&w=0&h=NP3HtDTRQaKSWZDARl75_rnDOUFuokZGBkEiQtr74-8="
                  class="item"
                  width="250"
                />
                <img
                  src="https://img.freepik.com/premium-photo/cute-domestic-dog-color-background_488220-33386.jpg"
                  class="item"
                  width="250"
                />
                <img
                  src="https://t4.ftcdn.net/jpg/01/99/00/79/360_F_199007925_NolyRdRrdYqUAGdVZV38P4WX8pYfBaRP.jpg"
                  class="item"
                  width="250"
                />
                <img
                  src="https://t4.ftcdn.net/jpg/02/10/42/63/360_F_210426379_IXwqcnx2FLeRzysHJN70fVoWHfdJluvt.jpg"
                  class="item"
                  width="250"
                />
              </wc-carousel-lite>
            </div>

            <button
              @click="${() => {
                this._catPhotos();
              }}"
            >
              ${this.showCats ? "Fotos de gatitos" : "Cerrar álbum"}
            </button>
            <div class="grid">
              ${this.showCats
                ? html``
                : html`
                    ${this.catPhotos.map(
                      (photo) =>
                        html`<img
                          width="180px"
                          height="120px"
                          src="${photo.url}"
                        />`
                    )}
                  `}
            </div>
          </div>
        </div>
      </div>
    `;
  }
}
