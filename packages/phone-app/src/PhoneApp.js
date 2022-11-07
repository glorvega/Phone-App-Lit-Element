import { LitElement, html, css } from "lit";

import "@minsait/homepage-component";
import "@minsait/lockscreen-component";
import "@minsait/homescreen-component";
import "@minsait/gallery-component";
import "@minsait/musicplayer-component";
import "@minsait/chat-app";
import "@minsait/streaming-app";
import "@minsait/todo-component";

export class PhoneApp extends LitElement {
  static get properties() {
    return {
      page: {
        type: String,
      },
      time: {
        type: String,
      },
      date: {
        type: String,
      },
      isCharging: {
        type: Boolean,
      },
      wifiSignal: {
        type: Boolean,
      },
      showCharging: {
        type: Boolean,
      },
      airplaneMode: {
        type: Boolean,
      },
      showAirplaneMode: {
        type: Boolean,
      },
      showNotifications: {
        type: Number,
      },
      name: {
        type: String,
      },
      image: {
        type: String,
      },
      apps: {
        type: Array,
      },
      footerApps: {
        type: Array,
      },
      alerts: {
        type: Array,
      },
      songSelected: {
        type: Object,
      },
      airplaneAlert: {
        type: String,
      },
      showAirplaneAlert: {
        type: Boolean,
      },
    };
  }

  static get styles() {
    return css`
      .phone-container {
        display: flex;
        flex-direction: row;
        align-items: center;
        gap: 100px;
        justify-content: center;
      }

      .container {
        border: 8px solid #d9dbdc;
        border-radius: 50px;
        width: 400px;
        height: 850px;
        backdrop-filter: blur(3px);
        background-image: url("/src/img/wpg1.gif");
        background-size: cover;
        border-radius: 50px;
        -webkit-box-shadow: 29px 28px 56px -10px rgba(0, 0, 0, 0.6);
        -moz-box-shadow: 29px 28px 56px -10px rgba(0, 0, 0, 0.6);
        box-shadow: 29px 28px 56px -10px rgba(0, 0, 0, 0.6);
      }

      .container .header {
        display: flex;
        justify-content: space-around;
        backdrop-filter: blur(50px);
        border-radius: 45px 45px 0px 0px;
        gap: 150px;
        height: 65px;
      }

      .container .header .right-header {
        display: flex;
        justify-content: space-around;
        gap: 5px;
        margin-right: 5px;
      }
      .container .header .left-header {
        display: flex;
        justify-content: space-between;
        gap: 5px;
        margin-left: 5px;
        font-size: 20px;
      }

      .container .header .middle-header {
        display: flex;
        flex-direction: row;
        align-items: center;
        gap: 10px;
        position: fixed;
        top: 30px;
      }

      .container .header .middle-header .camera {
        border: 6px solid black;
        width: 1px;
        height: 1px;
        border-radius: 50px;
      }

      .container .header .middle-header .speaker {
        border: 6px solid black;
        border-radius: 30px;
        width: 50px;
      }

      .container .screen {
        display: flex;
        align-items: center;
        flex-direction: column;
        gap: 50px;
      }

      .bottom {
        cursor: pointer;
      }

      .home {
        position: absolute;
        width: 145px;
        height: 7px;
        background: #fff;
        left: 50%;
        transform: translateX(-50%);
        transition: 0.5s;
        border-radius: 50px;
        bottom: 26px;
        cursor: pointer;
      }

      .bottom:hover .home {
        animation: homebtn 0.8s ease 0.1s 3;
      }

      @keyframes homebtn {
        from {
          bottom: 26px;
        }
        to {
          bottom: 36px;
        }
      }

      .volume {
        margin: 0px;
        padding: 0px;
        position: absolute;
        top: 130px;
        left: -12px;
      }

      .volume li {
        list-style: none;
        width: 3px;
        height: 45px;
        background: #ccc;
        margin: 15px 0;
      }

      .lock-button {
        margin: 0;
        padding: 0;
        position: absolute;
        top: 150px;
        right: -12px;
        cursor: pointer;
      }

      .lock-button li {
        list-style: none;
        width: 3px;
        height: 60px;
        background: #ccc;
        margin: 10px 0;
        border-top-right-radius: 4px;
        border-bottom-right-radius: 4px;
      }

      .buttons {
        display: flex;
        flex-direction: column;
        gap: 5px;
      }

      button {
        background: rgb(96, 9, 240);
        background: linear-gradient(
          0deg,
          rgba(96, 9, 240, 1) 0%,
          rgba(129, 5, 240, 1) 100%
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

      .gallery-style {
        background-image: none;
      }

      .airplaneAlert {
        font-size: 30px;
        margin-top: 200px;
        text-align: center;
        backdrop-filter: blur(30px);
        width: 300px;
        border-radius: 25px;
        color: lightgray;
        padding-bottom: 15px;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 20px;
      }
    `;
  }

  constructor() {
    super();
    this.page = "lockscreen";
    this.name = "Gloria";
    this.airplaneMode = false;
    this.showAirplaneMode = true;
    this.isCharging = false;
    this.showCharging = true;
    this.showNotifications = true;
    this.wifiSignal = true;
    this.songSelected = {};
    this.airplaneAlert =
      "Para acceder a la app, debes desactivar el modo avión";
    this.showAirplaneAlert = false;
    this.alerts = [
      {
        name: "Messages",
        description: "You have 24 unopened messages from Mom",
        image: "/src/img/icons/messages.png",
      },
      {
        name: "Facetime",
        description: "You have 2 missed calls from Tim",
        image: "/src/img/icons/facetime.png",
      },
    ];
    this.apps = [
      {
        name: "Apple store",
        notifications: 0,
        image: "/src/img/icons/apple-store.png",
      },
      {
        name: "Photos",
        notifications: 0,
        image: "/src/img/icons/photos.png",
      },
      {
        name: "Weather",
        notifications: 0,
        image: "/src/img/icons/weather.png",
      },
      {
        name: "Books",
        notifications: 0,
        image: "/src/img/icons/books.png",
      },
      {
        name: "Movies",
        notifications: 0,
        image: "/src/img/icons/movies.png",
      },
      {
        name: "Calculator",
        notifications: 0,
        image: "/src/img/icons/calculator.png",
      },
      {
        name: "Camera",
        notifications: 0,
        image: "/src/img/icons/camera.png",
      },
      {
        name: "Clock",
        notifications: 0,
        image: "/src/img/icons/clock.png",
      },
      {
        name: "Notes",
        notifications: 0,
        image: "/src/img/icons/notes.png",
      },
      {
        name: "Podcasts",
        notifications: 0,
        image: "/src/img/icons/podcasts.png",
      },
      {
        name: "Settings",
        notifications: 0,
        image: "/src/img/icons/settings.png",
      },
      {
        name: "Music",
        notifications: 0,
        image: "/src/img/icons/music.png",
      },
      {
        name: "Whatsapp",
        notifications: 0,
        image: "/src/img/icons/chat.png",
      },
      {
        name: "Apple Tv",
        notifications: 0,
        image: "/src/img/icons/appletv.png",
      },
      {
        name: "Files",
        notifications: 0,
        image: "/src/img/icons/files.png",
      },
      {
        name: "Contacts",
        notifications: 0,
        image: "/src/img/icons/contacts.png",
      },
    ];
    this.footerApps = [
      {
        name: "Facetime",
        notifications: 2,
        image: "/src/img/icons/facetime.png",
      },
      {
        name: "Safari",
        notifications: 0,
        image: "/src/img/icons/safari.png",
      },
      {
        name: "Messages",
        notifications: 24,
        image: "/src/img/icons/messages.png",
      },
      {
        name: "Mail",
        notifications: 259,
        image: "/src/img/icons/mail.png",
      },
    ];
    this.date = new Date();
  }

  gotoPage(page) {
    this.page = page;
  }

  gotoHomepage() {
    this.page = "homepage";
  }

  /*  appearP2() { 
    let homepage = this.shadowRoot.querySelector("homepage-component")
    let lockscreen = this.shadowRoot.querySelector("lockscreen-component")

    setTimeout(function() { 
        loader.style.left = "-100%";
        homepage.style.display = "none";
        page2.style.display = 'block';
     }, 1500)
 } */

  goBack(event) {
    const home = event.detail;
    this.page = "homepage";
  }

  onToggleCharging() {
    this.isCharging = !this.isCharging;
  }

  onToggleAirplaneMode() {
    this.airplaneMode = !this.airplaneMode;
  }

  onToggleNotifications() {
    this.showNotifications = !this.showNotifications;
  }

  onApplicationSelected(event) {
    const appSelected = event.detail;
    console.log(event.detail);
    //console.log(appSelected);
    const component = this.renderRoot.querySelector("homepage-component");
    this.page = appSelected;
    component.apps = component.apps.map((app) => {
      if (app.name === appSelected.name) {
        app.notifications =
          app.notifications > 0 ? app.notifications - 1 : app.notifications;
        app.image = app.image;
      }
      if (appSelected === "Photos") {
        //this.page = "gallery";
        this.gotoPage("gallery");
      }
      if (appSelected === "Music") {
        //this.page = "musicplayer";
        this.gotoPage("musicplayer");
      }
      if (appSelected === "Whatsapp") {
        //this.page = "musicplayer";
        this.gotoPage("chat-app");
      }
      if (appSelected === "Movies") {
        //this.page = "musicplayer";
        this.gotoPage("streaming-app");
      }
      if (appSelected === "Notes") {
        //this.page = "musicplayer";
        this.gotoPage("todo");
      }
    });

    this.requestUpdate();
  }

  onFooterapplicationSelected(event) {
    const footerAppSelected = event.detail;

    const footerComponent = this.renderRoot.querySelector("homepage-component");

    footerComponent.footerApps = footerComponent.footerApps.map((footerApp) => {
      if (footerApp.name === footerAppSelected.name) {
        footerApp.notifications =
          footerApp.notifications > 0
            ? footerApp.notifications - 1
            : footerApp.notifications;
        footerApp.image = footerApp.image;
      }
    });

    this.requestUpdate();
  }

  onLockscreenAlerts(event) {
    const lockscreenAlertSelected = event.detail;
    const lockscreenComponent = this.renderRoot.querySelector(
      "lockscreen-component"
    );

    let index = lockscreenComponent.alerts.findIndex(
      (notification) => notification.name === lockscreenAlertSelected.name
    );

    lockscreenComponent.alerts = lockscreenComponent.alerts.splice(index, 1);

    /* lockscreenComponent.alerts = lockscreenComponent.alerts.map((lockscreenAlert) => {
      if(lockscreenAlert.name === lockscreenAlertSelected.name){
        lockscreenAlert == []
      }
    }) */
    this.requestUpdate();
  }

  //FUNCION

  /*   onUnlockScreenDrag = (event) => {
    const page = event.detail;
    this.page = "homepage";
  }; */

  render() {
    return html`
      <div class="phone-container">
        <div class="container">
          <div class="header">
            <div class="left-header">
              <p>
                ${`${this.date.getHours()} : ${
                  this.date.getMinutes() < 10 ? "0" : ""
                }${this.date.getMinutes()}`}
              </p>
              <p>
                ${this.airplaneMode
                  ? html`
                      <!-- <iron-icon
                        icon="device:airplanemode-inactive"
                      ></iron-icon> -->
                    `
                  : html`
                      <iron-icon icon="device:airplanemode-active"></iron-icon>
                    `}
              </p>
            </div>

            <div class="middle-header">
              <div class="camera"></div>
              <div class="speaker"></div>
            </div>
            <div class="right-header">
              <p>
                <iron-icon icon="device:signal-cellular-1-bar"></iron-icon>
              </p>
              <p>
                ${this.wifiSignal
                  ? html`
                      <iron-icon icon="device:signal-wifi-4-bar"></iron-icon>
                    `
                  : html`
                      <iron-icon icon="device:signal-wifi-off"></iron-icon>
                    `}
              </p>
              <p>
                ${this.isCharging
                  ? html`
                      <iron-icon icon="device:battery-charging-20"></iron-icon>
                    `
                  : html` <iron-icon icon="device:battery-full"></iron-icon> `}
              </p>
            </div>
          </div>
          <div class="screen">
            ${this.page === "lockscreen"
              ? html`
                  <lockscreen-component
                    .alerts="${this.alerts}"
                    .showNotifications="${this.showNotifications}"
                    .date="${this.date}"
                    @lockscreenAlert-selected="${this.onLockscreenAlerts}"
                    @unlockScreen-drag="${this.onUnlockScreenDrag}"
                  ></lockscreen-component>
                `
              : html``}
            ${this.page === "homepage"
              ? html`
                  <homepage-component
                    .name="${this.name}"
                    .showNotifications="${this.showNotifications}"
                    .apps="${this.apps}"
                    .footerApps="${this.footerApps}"
                    @application-selected="${this.onApplicationSelected}"
                    @footerApplication-selected="${this
                      .onFooterapplicationSelected}"
                  ></homepage-component>
                `
              : html``}
            ${this.page === "gallery"
              ? html` <gallery-component></gallery-component> `
              : html``}
            ${this.page === "musicplayer"
              ? this.airplaneMode
                ? html` <musicplayer-component></musicplayer-component>`
                : html` <div class="airplaneAlert">
                    <img
                      src="https://64.media.tumblr.com/2e8986a1b1c062623cea1b9edaddcc52/tumblr_mup3qzOPsX1rk0k2jo1_500.gif"
                      width="200px"
                    />
                    ${this.airplaneAlert}
                  </div>`
              : ""}
            ${this.page === "chat-app"
              ? this.airplaneMode
                ? html` <chat-app></chat-app>`
                : html`<div class="airplaneAlert">
                    <img
                      src="https://64.media.tumblr.com/2e8986a1b1c062623cea1b9edaddcc52/tumblr_mup3qzOPsX1rk0k2jo1_500.gif"
                      width="200px"
                    />${this.airplaneAlert}
                  </div>`
              : ""}
            ${this.page === "streaming-app"
              ? this.airplaneMode
                ? html` <streaming-app></streaming-app>`
                : html`<div class="airplaneAlert">
                    <img
                      src="https://64.media.tumblr.com/2e8986a1b1c062623cea1b9edaddcc52/tumblr_mup3qzOPsX1rk0k2jo1_500.gif"
                      width="200px"
                    />${this.airplaneAlert}
                  </div>`
              : ""}
            ${this.page === "todo"
              ? this.airplaneMode
                ? html` <todo-component></todo-component>`
                : html`<div class="airplaneAlert">
                    <img
                      src="https://64.media.tumblr.com/2e8986a1b1c062623cea1b9edaddcc52/tumblr_mup3qzOPsX1rk0k2jo1_500.gif"
                      width="200px"
                    />${this.airplaneAlert}
                  </div>`
              : ""}
          </div>

          <ul class="volume">
            <li></li>
            <li></li>
          </ul>
          <ul
            class="lock-button"
            @click="${() => {
              this.gotoPage("lockscreen");
            }}"
          >
            <li></li>
          </ul>
          <div class="bottom">
            <span class="home" @click="${this.gotoHomepage}"></span>
          </div>
        </div>

        <div class="buttons">
          <button
            @click="${() => {
              this.onToggleCharging();
            }}"
          >
            ${this.isCharging ? "Cargar Batería" : "Batería cargada"}
          </button>
          <button
            @click="${() => {
              this.onToggleAirplaneMode();
            }}"
          >
            ${this.airplaneMode
              ? "Activar modo avión"
              : "Desactivar modo avión"}
          </button>

          <button
            @click="${() => {
              this.onToggleNotifications();
            }}"
          >
            ${this.showNotifications
              ? "Ocultar notificaciones"
              : "Activar notificaciones"}
          </button>
          <!-- INTENTAR HACER LLAMADA UNICAMENTE CUANDO EL MODO AVIÓN ESTÉ DESACTIVADO. HOMESCREEN = PANTALLA DE LLAMADA -->
        </div>
      </div>
    `;
  }
}
