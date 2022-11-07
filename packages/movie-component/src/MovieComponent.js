import { html, css, LitElement } from "lit";

export class MovieComponent extends LitElement {
  static get styles() {
    return css`
      .moviedet-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        background-color: #313638;
        height: 735px;
        border-radius: 0px 0px 50px 50px;
        overflow: hidden scroll;
      }

      .moviedet {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-top: 50px;
        margin-bottom: 50px;
        width: 355px;
        background-color: hsl(222deg 21% 66% / 22%);
        border-radius: 20px;
        justify-content: center;
        color: darkgrey;
      }

      .left-container{
        display: flex;
        flex-direction: column;
      }

      .right-container{
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-bottom: 40px;
      }

      img {
        width: 230px;
        margin: 20px;
        border-radius: 20px;
      }

      p,
      h1 {
        margin-left: 30px;
        margin-right: 30px;
        text-align: justify;
      }
      
      p{
        font-size: 20px;
      }
    ::-webkit-scrollbar {
        width: 10px;;
    }
     
    ::-webkit-scrollbar-track {
        border-radius: 10px;;
        background-color: rgba(25,147,147,0.1);
    }
     
    ::-webkit-scrollbar-thumb {
        border-radius: 10px;;
        background-color: rgba(25,147,147,0.2);
    }
    `;
  }

  static get properties() {
    return {
      selectedMovie: { type: Object },
    };
  }

  constructor() {
    super();
    this.selectedMovie = {};
  }

//const url = data.url + "&output=embed"; window.location.replace(url); for the videos

  render() {
    return html`
      <div class="moviedet-container">
        <div class="moviedet">
          <div class="left-container">
            <img src="${this.selectedMovie.movie.cover}" />
          </div>
          <div class="right-container">
            <span
            ><h1>
              ${this.selectedMovie.movie.title},
              ${this.selectedMovie.movie.year}
            </h1></span
          >
          <p>Género: ${this.selectedMovie.category.title}</p>
          <p>Sinopsis: ${this.selectedMovie.movie.description}</p>
          <iframe class="video" width="320" height="240" src="https://www.youtube.com/embed/Yj2iELI6OeI?controls=0&playsinline=1&loop=1&playlist=${this.selectedMovie.movie.preview.substring(this.selectedMovie.movie.preview.length - 11)}" allow="autoplay"></iframe>
          <!-- <p>Elenco: ${this.selectedMovie.movie.characters}</p> -->
          </div>

          
          
<!--           <iframe width="100%" height="90%" src="${this.selectedMovie.movie.preview}" allowfullscreen>
</iframe> -->

          <!-- <video width="320" height="240" controls="controls" autoplay>
      <source src="${this.selectedMovie.movie.preview}" type="video/webm">
      </video> -->
        </div>
      </div>
    `;
  }
}
