import { html, css, LitElement } from "lit";

import "@polymer/paper-input/paper-input";

export class MusicplayerComponent extends LitElement {
  static get styles() {
    return css`
    @media screen and (min-width: 900px) {
      .music-container {
        display: flex;
        flex-direction: row;
        border-radius: 50px;
        height: 784px;
      }
    }

      .left-container{
        display: flex;
        flex-direction: column;
        justify-content: center;
        width: 144.4px;
        color: white;
        font-size: 18px;
        text-align: center;
        overflow: hidden scroll;
        backdrop-filter: blur(10px);
        border-radius: 0px 0px 0px 40px;
        margin-left: -1px;
      }

      .artist-name p{
        cursor: pointer;
        font-family: 'DotGothic16', sans-serif;
        text-transform: uppercase;
        transition: all 1s ease;
      }

      .artist-name p:hover{
        text-shadow: 0 0 10px orange,
        0 0 20px orange,
        0 0 30px orange,
        0 0 40px orange,
        0 0 50px orange,
        0 0 60px orange,
        0 0 70px orange;
      }

      .cover{
        width: 135px;
        height: 135px;
        border-radius: 100px;
        object-fit: cover;
      }

      .right-container{
        align-items: center;
        text-align: center;
        justify-content: center;
        width: 255px;
        overflow: hidden scroll;
        font-size: 20px;
        backdrop-filter: blur(10px);
        border-radius: 0px 0px 40px;
        background: linear-gradient(0deg, rgba(59,126,186,0.5) 0%, rgba(82,24,107,0.5) 100%);
        scroll-behavior: smooth;
      }

      .songs{
        display: flex;
        flex-flow: row wrap;
        gap: 23px;
        justify-content: center;
      }

      .clickedsong{
        margin-top: 150px;
      }

      audio {
        width: 215px;
        height: 30px;
    }

    .back{
    margin-top: 50px;
    background: linear-gradient(0deg, rgb(255 255 255 / 89%) 0%, rgb(107 37 199 / 20%) 100%);
    border: none;
    color: rgb(232, 232, 232);
    font-size: 25px;
    font-family: "Cormorant Garamond", serif;
    border-radius: 10px;
    padding: 8px;
    width: 80px;
    cursor: pointer;
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

      .song-title{
        color: orange;
        font-family: monospace;
      }

      .songs-container {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items; center;
        align-content: center;
        font-family: 'DotGothic16', sans-serif;
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

    audio::-webkit-media-controls-seek-forward-button
    
    `;
  }

  static get properties() {
    return {
      songs: {
        type: Array,
      },
      songList: {
        type: Array,
      },
      song: {
        type: Object,
      },
      page: {
        type: String,
      },
      inputText: {
        type: String,
      },
      showSong: {
        type: Boolean,
      },
    };
  }

  constructor() {
    super();
    this.songs = [
      {
        id: 1,
        title: "Fast Lane",
        artist: "Ghostrifter",
        cover: "../assets/images/lofi.jpg",
        mp3: "../assets/mp3/Fast Lane (feat. Devyzed) Ghostrifter Official (No Copyright Music) [TubeRipper.com].mp3",
      },
      {
        id: 2,
        title: "Lost in Thought",
        artist: "Chase",
        cover: "../assets/images/lofi1.jpg",
        mp3: "../assets/mp3/Ghostrifter Official - Lost In Thought [Calm Lofi Beats] [TubeRipper.com].mp3",
      },
      {
        id: 3,
        title: "Lost Memories",
        artist: "Danny Scott",
        cover: "../assets/images/lofi2.jpg",
        mp3: "../assets/mp3/Ghostrifter Official - Lost Memories [Chillstep] [TubeRipper.com].mp3",
      },
      {
        id: 4,
        title: "Rainy Night",
        artist: "Jewels",
        cover: "../assets/images/lofi3.jpg",
        mp3: "../assets/mp3/雨の夜 (rainy night) Luke Hall (No Copyright Music) [TubeRipper.com].mp3",
      },
      {
        id: 5,
        title: "Dystopia",
        artist: "Pitch",
        cover: "../assets/images/lofi4.jpg",
        mp3: "../assets/mp3/Dystopia - Luke Hall Free Copyright [No Copyright Music] 2020 [TubeRipper.com].mp3",
      },
      {
        id: 6,
        title: "Skyline",
        artist: "Liam Dane",
        cover: "../assets/images/lofi5.jpg",
        mp3: "../assets/mp3/Skyline - Luke Hall (Free Copyright-safe Music) [TubeRipper.com].mp3",
      },
      {
        id: 7,
        title: "Come On, Let's Go",
        artist: "Sugar",
        cover: "../assets/images/lofi6.jpg",
        mp3: "../assets/mp3/[No Copyright lofi hip hop music] - [ Le Gang-Come OnLets Go](Free lofi Type beat for Profit use) [TubeRipper.com].mp3",
      },
      {
        id: 8,
        title: "On My Way",
        artist: "Luke Hall",
        cover: "../assets/images/lofi7.jpg",
        mp3: "../assets/mp3/[No Copyright lo-fi hip hop music] - [On My Way - Ghostrifter](Free lofi Type beat for Profit use) [TubeRipper.com].mp3",
      },
      {
        id: 9,
        title: "Sleep",
        artist: "Lo-Fi Beats",
        cover: "../assets/images/lofi8.jpg",
        mp3: "../assets/mp3/Sleep - [No copyright lofi music] Free Lofi Type Beat for Profit [TubeRipper.com].mp3",
      },
    ];
    this.song = {};
    this.songList = [];
    this.page = "songList";
    this.inputText = "";
    this.showSong = true;
  }

  onFilter(event) {
    const inputText = event.currentTarget.value;
    this.inputText = inputText;
    this.songList = this.songs.filter((song) =>
      song.title.toLowerCase().trim().includes(inputText.toLowerCase().trim())
    );
  }

  firstUpdated(_changedProperties) {
    super.firstUpdated(_changedProperties);
    this.songList = [...this.songs];
  }

  artistOnClick(song) {
    this.song = song;
    this.showSong = false;
    console.log(this.song);
  }

  goNext(e) {
    let index;
    if (e.detail + 1 > this.songs.length) {
      index = 1;
    } else {
      index = e.songs + 1;
    }
    this.mp3 = this.songs.find((song) => song.id === index);
  }

  onNextSong() {
    this.dispatchEvent(
      new CustomEvent("play-next", {
        detail: this.music.id,
      })
    );

    this.onLoad();
  }

  gotoList() {
    this.showSong = true;
  }

  render() {
    return html`
      <div class="music-container">
        <div class="left-container">
          ${this.songs?.map(
            (song) => html`
              <div class="artist-name">
                <p
                  @click="${() => {
                    this.artistOnClick(song);
                  }}"
                >
                  ${song.artist}
                </p>
              </div>
            `
          )}
        </div>

        <div class="right-container">
          <div class="songs-container">
            <div class="input-container">
              <paper-input
                type="text"
                label="Busca tu canción"
                @input="${this.onFilter}"
              ></paper-input>
            </div>

            <div class="songs">
              ${this.showSong === true
                ? html`
                    ${this.songList.map(
                      (song) => html`
                        <div class="song">
                          <img class="cover" src="${song.cover}" />
                          <p class="song-title">
                            ${song.title} - ${song.artist}
                          </p>
                          <audio src="${song.mp3}" controls></audio>
                          <!-- <button class="next" @click="${this.goNext}">
                            next
                          </button> -->
                        </div>
                      `
                    )}
                  `
                : html`
                    <div class="clickedsong">
                      <img class="cover" src=${this.song.cover} />
                      <p class="song-title">
                        ${this.song.title} - ${this.song.artist}
                      </p>

                      <audio src="${this.song.mp3}" controls></audio>
                      <button class="back" @click="${this.gotoList}">🔙</button>
                    </div>
                  `}
            </div>
          </div>
        </div>
      </div>
    `;
  }
}
