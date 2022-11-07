import { html, css, LitElement } from "lit";

import "@polymer/iron-icons/device-icons";
import "@polymer/iron-icons/hardware-icons";
import "@polymer/iron-icons/av-icons";
import "@polymer/iron-icons/social-icons";
import "@polymer/iron-icons/communication-icons";

//import "@polymer/iron-icons/icons";

import "@polymer/iron-icon";

export class HomepageComponent extends LitElement {
  static get styles() {
    return css`
      .welcome {
        font-size: 30px;
        text-align: center;
        font-family: monospace;
        -webkit-text-stroke: 0.5px black;
        padding: 19px;
        backdrop-filter: blur(30px);
      }

      .homepage-container {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
      }

      .apps-container {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        gap: 25px;
        margin: 45px 20px;
        align-items: center;
        justify-content: center;
      }

      .footerapps-container {
        display: flex;
        flex-direction: row;
        gap: 25px;
        /* margin: 45px 20px; */
        align-items: center;
        justify-content: center;
        backdrop-filter: blur(50px);
        border-radius: 40px;
        padding: 15px;
      }

      .apps {
        display: flex;
        flex-direction: column;
      }

      .footerApps {
        display: flex;
        flex-direction: column;
      }

      .notification {
        transform: translate(45px, -35px);
        position: absolute;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: #cc3401;
        border-radius: 100px;
        min-width: 40px;
        min-height: 40px;
        font-family: tahoma;
        color: white;
        font-size: 18px;
      }

      .icon {
        width: 70px;
        cursor: pointer;
        transition: all 0.2s ease-in-out;
      }

      .icon:hover {
        transform: scale(1.1);
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

      .container {
        display: flex;
        justify-content: center;
        align-items: center;
        padding-top: 20px;
      }

      .time-container {
        position: relative;
        overflow: hidden;
        padding: 10px;
        box-shadow: 0 1px 2px rgba(0, 0, 0, 0.07), 0 2px 4px rgba(0, 0, 0, 0.07),
          0 4px 8px rgba(0, 0, 0, 0.07), 0 8px 16px rgba(0, 0, 0, 0.07),
          0 16px 32px rgba(0, 0, 0, 0.07), 0 32px 64px rgba(0, 0, 0, 0.07);
        border-radius: 40px;
        z-index: 1;
        backdrop-filter: blur(6px);
        width: 200px;
      }

      #time {
        display: flex;
        flex-direction: column;
        align-items: center;
        position: relative;
        overflow: hidden;
        padding: 0px 10px;
      }

      .date {
        font-size: 25px;
        word-wrap: break-word;
        margin-top: 0;
      }

      .clock {
        width: 80px;
        height: 80px;
        border: 7px solid #282828;
        box-shadow: -4px -4px 10px rgba(67, 67, 67, 0.5),
          inset 4px 4px 10px rgba(0, 0, 0, 0.5),
          inset -4px -4px 10px rgba(67, 67, 67, 0.5),
          4px 4px 10px rgba(0, 0, 0, 0.3);
        border-radius: 50%;
        margin: 10px auto;
        position: relative;
      }

      .outer-clock-face {
        position: relative;
        width: 100%;
        height: 100%;
        border-radius: 100%;
        background: #282828;

        overflow: hidden;
      }

      .outer-clock-face::after {
        -webkit-transform: rotate(90deg);
        -moz-transform: rotate(90deg);
        transform: rotate(90deg);
      }

      .outer-clock-face::before,
      .outer-clock-face::after,
      .outer-clock-face .marking {
        content: "";
        position: absolute;
        width: 5px;
        height: 100%;
        background: rgb(181 107 219 / 58%);
        z-index: 0;
        left: 49%;
      }

      .outer-clock-face .marking {
        background: #bdbdcb;
        width: 3px;
      }

      .outer-clock-face .marking.marking-one {
        -webkit-transform: rotate(30deg);
        -moz-transform: rotate(30deg);
        transform: rotate(30deg);
      }

      .outer-clock-face .marking.marking-two {
        -webkit-transform: rotate(60deg);
        -moz-transform: rotate(60deg);
        transform: rotate(60deg);
      }

      .outer-clock-face .marking.marking-three {
        -webkit-transform: rotate(120deg);
        -moz-transform: rotate(120deg);
        transform: rotate(120deg);
      }

      .outer-clock-face .marking.marking-four {
        -webkit-transform: rotate(150deg);
        -moz-transform: rotate(150deg);
        transform: rotate(150deg);
      }

      .inner-clock-face {
        position: absolute;
        top: 10%;
        left: 10%;
        width: 80%;
        height: 80%;
        background: #282828;
        -webkit-border-radius: 100%;
        -moz-border-radius: 100%;
        border-radius: 100%;
        z-index: 1;
      }

      .inner-clock-face::before {
        content: "";
        position: absolute;
        top: 50%;
        left: 50%;
        width: 16px;
        height: 16px;
        border-radius: 18px;
        margin-left: -9px;
        margin-top: -6px;
        background: #4d4b63;
        z-index: 11;
      }

      .hand {
        width: 50%;
        right: 50%;
        height: 6px;
        background: #61afff;
        position: absolute;
        top: 50%;
        border-radius: 6px;
        transform-origin: 100%;
        transform: rotate(90deg);
        transition-timing-function: cubic-bezier(0.1, 2.7, 0.58, 1);
      }

      .hand.hour-hand {
        width: 30%;
        z-index: 3;
      }

      .hand.min-hand {
        height: 3px;
        z-index: 10;
        width: 40%;
      }

      .hand.second-hand {
        background: #ee791a;
        width: 45%;
        height: 2px;
      }
    `;
  }

  static get properties() {
    return {
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
        type: Boolean,
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
    };
  }

  constructor() {
    super();
    this.time = new Date();
    this.date = new Date();
    this.airplaneMode = false;
    this.showAirplaneMode = true;
    this.isCharging = false;
    this.showCharging = true;
    this.showNotifications = true;
    this.wifiSignal = false;
  }

  onApplicationClick(event) {
    //console.log(event);
    const applicationSelected = event.name;
    //console.log(applicationSelected);
    const customEvent = new CustomEvent("application-selected", {
      detail: applicationSelected,
    });
    this.dispatchEvent(customEvent);
  }

  onFooterapplicationClick(event) {
    const footerAppSelected = event.currentTarget.footerApplication;
    const customEvent = new CustomEvent("footerApplication-selected", {
      detail: footerAppSelected,
    });
    this.dispatchEvent(customEvent);
  }

  firstUpdated() {
    this.updateClock();
    setInterval(this.updateClock.bind(this), 1000);
  }

  updateClock() {
    const secondHand = this.shadowRoot.querySelector(".second-hand");
    const minsHand = this.shadowRoot.querySelector(".min-hand");
    const hourHand = this.shadowRoot.querySelector(".hour-hand");

    const now = new Date();

    const seconds = now.getSeconds();
    const secondsDegrees = (seconds / 60) * 360 + 90;
    secondHand.style.transform = `rotate(${secondsDegrees}deg)`;

    const mins = now.getMinutes();
    const minsDegrees = (mins / 60) * 360 + (seconds / 60) * 6 + 90;
    minsHand.style.transform = `rotate(${minsDegrees}deg)`;

    const hour = now.getHours();
    const hourDegrees = (hour / 12) * 360 + (mins / 60) * 30 + 90;
    hourHand.style.transform = `rotate(${hourDegrees}deg)`;

    /* requestAnimationFrame(this.updateClock);
    this.requestUpdate(); */
  }

  render() {
    //EL IF EVITA EL RENDER CON UNDEFINED EN LA REASIGNACION DE LAS NOTIFICACIONES

    if (this.apps[0] !== undefined) {
      return html`
        <div class="homepage-header">
          <!-- <p class="welcome">Welcome back, ${this.name}</p> -->
          <div class="container">
            <div class="time-container">
              <div id="time">
                <div class="clock">
                  <div class="outer-clock-face">
                    <div class="marking marking-one"></div>
                    <div class="marking marking-two"></div>
                    <div class="marking marking-three"></div>
                    <div class="marking marking-four"></div>
                    <div class="inner-clock-face">
                      <div class="hand hour-hand"></div>
                      <div class="hand min-hand"></div>
                      <div class="hand second-hand"></div>
                    </div>
                  </div>
                </div>
                <p class="date">${`${this.date.toDateString()}`}</p>
              </div>
            </div>
          </div>
        </div>
        <div class="homepage-container">
          <div class="apps-container">
            ${this.apps.map((app) => {
              return html`
                <div
                  class="apps"
                  @click="${() => {
                    this.onApplicationClick(app);
                  }}"
                  .application="${app}"
                >
                  <img class="icon" src="${app.image}" />
                  ${app.notifications !== 0 && this.showNotifications
                    ? html` <p class="notification">${app.notifications}</p> `
                    : ""}
                </div>
              `;
            })}
          </div>
          <div class="footerapps-container">
            ${this.footerApps.map((footerApp) => {
              return html`
                <div
                  class="footerApps"
                  @click="${this.onFooterapplicationClick}"
                  .footerApplication="${footerApp}"
                >
                  <img class="icon" src="${footerApp.image}" />
                  ${footerApp.notifications !== 0 && this.showNotifications
                    ? html`
                        <p class="notification">${footerApp.notifications}</p>
                      `
                    : ""}
                </div>
              `;
            })}
          </div>
        </div>
      `;
    }
  }
}
