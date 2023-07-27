import { html, render } from "../node_modules/lit-html/lit-html.js";
import { request, isLogged } from "./utils.js";

const searchTemplate = () => html`
    <section id="searchPage">
        <h1>Search by Name</h1>

        <div class="search">
            <input id="search-input" type="text" name="search" placeholder="Enter desired albums's name">
            <button class="button-list">Search</button>
        </div>

        <h2>Results:</h2>

        <div class="search-result"></div>
    
    </section>
`;

export function searchPage (ctx) {
    ctx.render(searchTemplate());

    const root = document.querySelector('.search-result');
    const input = document.querySelector('#search-input');
    const searchBtn = document.querySelector('.button-list');

    searchBtn.addEventListener('click', search);

    async function search (e) {
        e.preventDefault();

        const data = await request(`http://localhost:3030/data/albums?where=name%20LIKE%20%22${input.value}%22`);
        let resultTemplate;
        
        if (data.length > 0) {
            resultTemplate = (data) => html`
                ${data.map(e => html`
                    <div class="card-box">
                        <img src=${e.imgUrl}>
                        <div>
                            <div class="text-center">
                                <p class="name">Name: ${e.name}</p>
                                <p class="artist">Artist: ${e.artist}</p>
                                <p class="genre">Genre: ${e.genre}</p>
                                <p class="price">Price: ${e.price}</p>
                                <p class="date">Release Date: ${e.releaseDate}</p>
                            </div>
                            ${isLogged(e._ownerId)
                                ? html`
                                    <div class="btn-group">
                                        <a href="/details/${e._id}" id="details">Details</a>
                                    </div>
                                `
                                : ''
                            }
                        </div>
                    </div>
                `)}
            `;
        } else {
            resultTemplate = () => html`
                <p class="no-result">No result.</p>
            `;
        }

        input.value = '';
        render(resultTemplate(data), root);
    }
}