import { html, css, LitElement } from 'lit';

//import sound from "./unlock.mp3"

export class LockscreenComponent extends LitElement {
  static get styles() {
    return css`

    .lockscreen-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      font-family: 'Press Start 2P', cursive;
      -webkit-text-stroke: 0.5px black;
    }

    .time{
      font-size: 50px;
      color: white;
      max-height: 90px;
      font-family: monospace;
    }

    .date {
      font-size: 30px;
      font-family: monospace;
    }

    .alerts-container {
      display: flex;
      flex-direction: column;
      flex-wrap: wrap;
      gap: 25px;
      margin: 20px 20px;
      align-items: center;
      justify-content: center;
      cursor: pointer;
    }

    .alerts {
      display: flex;
      flex-direction: column;
      backdrop-filter: blur(50px);
      border-radius: 20px;
      padding: 15px;
      width: 290px;
      font-family: sans-serif;
    }

    .row-alerts{
      display: flex;
      flex-direction: row;
      gap: 15px;
    }

    .notification-description{
      display: flex;
      flex-wrap: wrap;
      font-size: 17px;
    }

    .notification {
      display: flex;
      justify-content: center;
      align-items: center;
      font-family: tahoma;
      color: white;
      font-size: 18px;
    }

    .icon {
      width: 70px;
      cursor: pointer;
      transition: all .2s ease-in-out;
    }

    .unlock-icon{
      display: flex;
      bottom: 40px;
      flex-direction: column;
      align-items: center;
    }

    .vaadin-container{
      padding: 20px;
      cursor: pointer;
    }

    .vaadin-container:hover{
      animation: shake 0.5s;
      animation-iteration-count: 3s;
    }

    @keyframes shake {
      0% { transform: translate(1px, 1px) rotate(0deg); }
      10% { transform: translate(-1px, -2px) rotate(-1deg); }
      20% { transform: translate(-3px, 0px) rotate(1deg); }
      30% { transform: translate(3px, 2px) rotate(0deg); }
      40% { transform: translate(1px, -1px) rotate(1deg); }
      50% { transform: translate(-1px, 2px) rotate(-1deg); }
      60% { transform: translate(-3px, 1px) rotate(0deg); }
      70% { transform: translate(3px, 1px) rotate(-1deg); }
      80% { transform: translate(-1px, -1px) rotate(1deg); }
      90% { transform: translate(1px, 2px) rotate(0deg); }
      100% { transform: translate(1px, -2px) rotate(-1deg); }
    }

    `;
  }

  static get properties() {
    return {
      title: { type: String },
      date: { type: String },
      showNotifications: {type: Boolean},
      alerts: {type: Array},
      limit: { type: Number },
      unlockDrag: {type: Boolean},
      isLocked: {type: Boolean},
      audio: {type: Object},
    };
  }

  constructor() {
    super();
    this.showNotifications = true;
    this.alerts = [];
    this.limit = 0;
    this.isLocked = true;
    this.audio = {};
  }

  onLockscreenAlertClick(event) {
    const lockscreenAlertSelected = event.currentTarget.lockscreenAlert;
    const customEvent = new CustomEvent('lockscreenAlert-selected', {
      detail: lockscreenAlertSelected
    });
    this.dispatchEvent(customEvent);
  }


  /* firstUpdated() {
    const unlock = this.shadowRoot.getElementById('unlock');
    this.limit = (this.shadowRoot.querySelector('.unlock-icon').clientWidth - unlock.clientWidth);

    unlock.addEventListener('touchstart', this.touchStart);
    unlock.addEventListener('touchmove', this.touchMove);
    unlock.addEventListener('touchend', this.touchEnd);
  }

  touchStart(event) {
    console.log('touchstart');
    console.log(event);
  }
  touchMove(event){
    console.log("touchMove");
    console.log(`${event.changedTouches[0].clientX}px`);
    console.log(event);
    this.style.left = `${event.changedTouches[0].clientX}px`;
  }
  touchEnd(event){
    console.log("touchEnd");
    const unlockScreen = event.currentTarget.unlockScreen;
    const customEvent = new CustomEvent('unlockScreen-drag', {
      detail: unlockScreen,
    });
    this.dispatchEvent(customEvent);
  }
 */
  onToggleLock() {
    this.isLocked = !this.isLocked;
  }

  playUnlocked(){
    console.log("click")
    this.audio = new Audio("./unlock.mp3");
    this.audio.play();
  }

  render() {
    return html`
    
    <div class="lockscreen-container">
      <div class="vaadin-container">
      <p>
                ${this.isLocked
                  ? html`
                      <iron-icon icon="icons:lock-outline" @click="${() => {
              this.onToggleLock();
            }}"></iron-icon>
                    `
                  : html` <iron-icon icon="icons:lock-open" @click="${this.playUnlocked}"></iron-icon> `}
              </p>
      
      </div>
    
      <div class="time">
      <p>
                ${`${this.date.getHours()} : ${
                  this.date.getMinutes() < 10 ? "0" : ""
                }${this.date.getMinutes()}`}
              </p>
      </div>
      <div class="date-container">
              <p class="date">${`${this.date.toDateString()}`}</p>
            </div>
            <div class="alerts-container">
              ${this.alerts.map((alert) => {
                return this.showNotifications ? html` <div class="alerts" @click="${this.onLockscreenAlertClick}"
                .lockscreenAlert="${alert}">
                  <div class="row-alerts">
                    <img class="icon" src="${alert.image}" />
                  <p class="notification">${alert.name}</p>
                  </div>
                  <div class="notification-description">
                    <p>${alert.description}</p>
                  </div>
                </div>
                ` : null;
              })}
            </div>
            <!-- <div 
            class="unlock-icon" 
            @click="${this.touchEnd}" 
            .unlockScreen="${this.unlockScreen}"
            data-limit="${this.limit}"
            >
              <p 
              id="unlock" 
              draggable="true"
              >Unlock phone</p>
              <iron-icon
                        icon="hardware:keyboard-arrow-up" id="unlock"
                      ></iron-icon>
            </div> -->
            
            </div>
    `;
  }
}