import { LitElement, html, css } from "lit";

const logo = new URL("../assets/open-wc-logo.svg", import.meta.url).href;

import "@minsait/login-component";
import "@minsait/register-component";
import "@minsait/navbar-component";
import "@minsait/profile-component";
import "@minsait/search-component";
import "@minsait/site-component";
import "@minsait/category-component";
import "@minsait/movie-component";

export class StreamingApp extends LitElement {
  static get properties() {
    return {
      page: {
        type: Boolean,
      },
      movies: {
        type: Array,
      },
      users: {
        type: Array,
      },
      userId: {
        type: String,
      },
    };
  }

  static get styles() {
    return css``;
  }

  constructor() {
    super();
    this.page = sessionStorage.getItem("token") ? "site" : "register";
    this.movies = [];
    this.users = [];
    this.userId = "";
  }

  _gotoLogin = (event) => {
    const loginPage = event.detail;
    this.page = "login";
  };

  _gotoRegister(event) {
    const registerPage = event.detail;
    this.page = "register";
  }

 /*  updated(){
    this.getUsers();
  }
 */

  async newAccount(event) {
    //for user registration
    console.log(event.detail);

    try {
      const response = await fetch(
        "https://centraal.sfi.digital/api/v1/account",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: event.detail.name,
            username: event.detail.username,
            email: event.detail.email,
            password: event.detail.password,
          }),
        }
      );

      if (response.status === 200) {
        alert("Usuario registrado con éxito");
        this._toLogin();
      }
    } catch (error) {
      console.log(error);
    }
  }

  async loggedUser(event) {
    //authenticating user and redirecting to main
    try {
      const response = await fetch(
        "https://centraal.sfi.digital/api/v1/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: event.detail.username,
            password: event.detail.password,
          }),
        }
      );

      if (response.status === 200) {
        const payload = await response.json();
        if (payload.success) {
          this.page = "profile";
          /* console.log(payload); */
          sessionStorage.setItem("token", payload.data);
          sessionStorage.setItem("account", payload.account);
        }
      }
    } catch (error) {
      console.log(error);
    }
  }

  


  /* async createUser(event) {
    try {
      const token = sessionStorage.getItem("token");
      const response = await fetch(
        `https://centraal.sfi.digital/api/v1/profile`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-access-token": token,
          },
          body: JSON.stringify({
            name: event.detail.name,
            avatar: event.detail.avatar,
            admin: event.detail.admin,
            account: "633ab4ba159aa66ebce0e83c",
          }),
        }
      );

      if (response.status === 200) {
        const payload = await response.json();
        if (payload.success) {
          console.log(payload);
          this.getUsers();
          sessionStorage.setItem("token", payload.data);
          this.page = "profile";
        }
      }
    } catch (error) {
      console.log(error);
    }
  } */

/*   async getUsers() {
    try {
      const token = sessionStorage.getItem("token");
      const account = sessionStorage.getItem("account");
      const response = await fetch(
        `https://centraal.sfi.digital/api/v1/profile?where[account]=${account}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "x-access-token": token,
          },
        }
      );

      if (response.status === 200) {
        const payload = await response.json();
        if (payload.success) {
          console.log(payload);
          this.users = payload.data; //WHY????
        }
      }
    } catch (error) {
      console.log(error);
    }
  } */

  _logout() {
    sessionStorage.removeItem("token");
    this.page = "login";
    //this would remove the token from the session storage in order to log out of the app and go back to login
  }

  _gotoProfile() {
    this.page = "profile";
  }

  _gotoSite() {
    //window.location.replace("site")
    this.page = "site"
    //window.location.reload();
    //this function reloads the page so it would go back to the site component.
  }

  selectUser = (event) => {
    const userSelected = event.detail;
    this.page = 'site';
  }


  render() {
    return html`
      ${this.page === "register"
        ? html`
            <register-component
              @goto-login="${this._gotoLogin}"
              @create-account="${this.newAccount}"
            ></register-component>
          `
        : html``}
      ${this.page === "login"
        ? html`
            <login-component
              @goto-register="${this._gotoRegister}"
              @user-login="${this.loggedUser}"
            ></login-component>
          `
        : html``}
      ${this.page === "profile"
        ? html` <profile-component
            @select-user=${this.selectUser}
            .userId=${this.userId}
            .account=${sessionStorage.getItem("account")}
            .token=${sessionStorage.getItem("token")}
          ></profile-component>`
        : html``}
      ${this.page === "site"
        ? html`
            <site-component
              @user-logout="${this._logout}"
              @user-profile="${this._gotoProfile}"
              @goto-site="${this._gotoSite}"
            ></site-component>
          `
        : html``}
      ${this.page === "moviedetail"
        ? html` <movie-component></movie-component> `
        : html``}
      ${this.page === "category"
        ? html` <category-component></category-component> `
        : html``}
    `;
  }
}
