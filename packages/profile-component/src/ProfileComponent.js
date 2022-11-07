import { html, css, LitElement } from "lit";

export class ProfileComponent extends LitElement {
  static get styles() {
    return css`    
      .bg-container {
        position: fixed;
        left: 0;
        right: 0;
        display: block;
        background-image: url("https://flashbak.com/wp-content/uploads/2014/07/collage-copy-1024x494.jpg");
        height: 783px;
        -webkit-filter: blur(5px);
        -moz-filter: blur(5px);
        -o-filter: blur(5px);
        -ms-filter: blur(5px);
        filter: blur(2px);
        border-radius: 0px 0px 50px 50px;
      }

      .title{
        font-size: 30px;
        font-weight: bold;
        font-family: Tahoma;
      }

      .user-container {
        position: fixed;
        z-index: 9999;
        width: 400px;
        margin: 50px auto;
        margin-top: 50px;
        text-align: center;
        position: relative;
        background: white;
        border: 0 none;
        border-radius: 20px;
        box-shadow: 0 0 15px 1px rgba(0, 0, 0, 0.4);
        padding: 20px 30px;
        box-sizing: border-box;
        width: 80%;
        max-height: 700px;
        overflow: hidden scroll;
        margin: 50px 10%;
        justify-content: center
        flex-wrap: wrap;
        align-items: center;
        color: darkslategray;
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

      img {
        width: 200px;
      }

      .userpage{
        display: flex;
        flex-direction: row;
        justify-content: center;
        flex-wrap: wrap;
        align-items: center;
        gap: 20px;
        margin-bottom: 20px;
      }

      .user{
        display: flex;
        flex-direction: column;
      }

      h4{
        font-size: 25px;
        font-family: tahoma;
      }

      .new-user {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 10px;
      }

      .avatar-img{
        width: 200px;
    border: 1px solid black;
    border-radius: 20px;
    height: 200px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 10px;
      }

      .avatar{
        width: 170px;
        cursor: pointer;
        position: relative;
        -webkit-filter: brightness(50%);
        -webkit-transition: all 1s ease;
        -moz-transition: all 1s ease;
        -o-transition: all 1s ease;
        -ms-transition: all 1s ease;
        transition: all 1s ease;
      }

      .avatar:hover {
        -webkit-filter: brightness(100%);
        }

      button{
        width: 100px;
        background: rgb(8, 61, 119);
        font-weight: bold;
        font-size: 15px;
        color: white;
        border: 0px none;
        border-radius: 1px;
        cursor: pointer;
        padding: 10px 5px;
        margin: 10px 5px;
      }

      .userprofile{
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 15px;
      }



    `;
  }

  static get properties() {
    return {
      users: {
        type: Array,
      },
      page: {
        type: String,
      },
      view: {
        type: String,
      },
      users: {
        type: Array,
      },
      userId: {
        type: String,
      },
    };
  }

  constructor() {
    super();
    this.page = "";
    this.view = "userpage";
    this.userId = "";
    this.users = [];
  }

  firstUpdated() {
    this.getUsers();
  }

  userFormView() {
    this.view = "user-form";
  }

  editUser() {
    this.view = "edit-form";
  }

  userAvatar() {
    const avatarImg = this.shadowRoot.querySelector(".avatar");
    avatarImg.addEventListener("change", function () {
      this.shadowRoot.querySelector(".avatar-img").src = this.value;
    });
  }

  async createUser(event) {
    event.preventDefault();
    const name = this.shadowRoot.querySelector(".name");
    const avatar = this.shadowRoot.querySelector(".avatar");
    const admin = this.shadowRoot.querySelector(".admin");
    await fetch("https://centraal.sfi.digital/api/v1/profile", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": sessionStorage.getItem("token"),
      },
      body: JSON.stringify({
        name: name.value,
        avatar: avatar.value,
        admin: admin.value,
        account: sessionStorage.getItem("account"),
      }),
    })
      .then((response) => {
        return response.json();
      })
      .then((payload) => {
        console.log(payload.data);
        this.getUsers();
        this.view = "userpage";
      })
      .catch((error) => {
        console.log("Not working", error);
      });
  }

  async getUsers() {
    await fetch(
      `https://centraal.sfi.digital/api/v1/profile?where[account]=${this.account}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "x-access-token": sessionStorage.getItem("token"),
        },
      }
    )
      .then((response) => {
        return response.json();
      })
      .then((payload) => {
        this.users = payload.data;
      })
      .catch((error) => {
        console.log("Not working", error);
      });
  }

  async deleteUser(id) {
    this.userId = id;
    await fetch(`https://centraal.sfi.digital/api/v1/profile/${this.userId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": sessionStorage.getItem("token"),
      },
    }).then((res) => {
      res.json();
    });
    this.getUsers();
  }

  selectUser(event) {
    const selectUser = event.currentTarget.selectUser;
    const customEvent = new CustomEvent("select-user", { detail: selectUser });
    this.dispatchEvent(customEvent);
  }

  render() {
    return html`
      <div class="bg-container"></div>
      <div class="user-container">
        <p class="title">Who's watching?</p>

        ${this.view === "userpage"
          ? html`<div class="userpage">
                ${this.users.map((user) => {
                  return html`
                    <div class="user">
                      <h4>${user.name}</h4>
                      <div class="userprofile">
                        <div class="avatar-img">
                          <img
                            class="avatar"
                            src="${user.avatar}"
                            @click="${this.selectUser}"
                          />
                        </div>
                        <button
                          @click="${() => {
                            this.deleteUser(user._id);
                          }}"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  `;
                })}
              </div>
              <button class="create-user" @click="${this.userFormView}">
                New User
              </button>`
          : html``}
        ${this.view === "user-form"
          ? html`
              <form class="new-user" @submit=${this.createUser}>
                <img
                  class="avatar-img"
                  name="avatar-img"
                  src="https://cdn2.iconfinder.com/data/icons/user-actions-15/24/user_movie_video_account_profile-512.png"
                />
                <input
                  class="name"
                  name="name"
                  type="text"
                  placeholder="Ingresa un nombre"
                  required
                />
                <input
                  class="avatar"
                  name="avatar"
                  type="url"
                  placeholder="Ingresa la URL de una imagen"
                  required
                />
                <label>¿Es administrador?</label>
                <input class="admin" name="admin" type="checkbox" />
                <input type="submit" class="addUser-btn" value="Añadir" />
              </form>
            `
          : html``}
      </div>
    `;
  }
}
