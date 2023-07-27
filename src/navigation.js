import { html } from "../node_modules/lit-html/lit-html.js";
import { isLogged } from "./utils.js";

const navTemplate = () => html`
    <nav>
        <img src="./images/headphones.png">
        <a href="/">Home</a>
        <ul>
            <li><a href="/catalog">Catalog</a></li>
            <li><a href="/search">Search</a></li>
            ${isLogged()
                ? html`
                    <li><a href="/create">Create Album</a></li>
                    <li><a href="/logout">Logout</a></li>
                `
                : html`
                    <li><a href="/login">Login</a></li>
                    <li><a href="/register">Register</a></li>
                `
            }
        </ul>
    </nav>
`;

export function nav (ctx) {
    return navTemplate();
}