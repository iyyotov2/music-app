import { html } from "../node_modules/lit-html/lit-html.js";
import { request, createAndEditValidation } from "./utils.js";

const editTemplate = (data) => html`
    <section class="editPage">
        <form>
            <fieldset>
                <legend>Edit Album</legend>

                <div class="container">
                    <label for="name" class="vhide">Album name</label>
                    <input id="name" name="name" class="name" type="text" value=${data.name}>

                    <label for="imgUrl" class="vhide">Image Url</label>
                    <input id="imgUrl" name="imgUrl" class="imgUrl" type="text" value=${data.imgUrl}>

                    <label for="price" class="vhide">Price</label>
                    <input id="price" name="price" class="price" type="text" value=${data.price}>

                    <label for="releaseDate" class="vhide">Release date</label>
                    <input id="releaseDate" name="releaseDate" class="releaseDate" type="text" value=${data.releaseDate}>

                    <label for="artist" class="vhide">Artist</label>
                    <input id="artist" name="artist" class="artist" type="text" value=${data.artist}>

                    <label for="genre" class="vhide">Genre</label>
                    <input id="genre" name="genre" class="genre" type="text" value=${data.genre}>

                    <label for="description" class="vhide">Description</label>
                    <textarea name="description" class="description" rows="10" cols="10">${data.description}</textarea>

                    <button class="edit-album" type="submit">Edit Album</button>
                </div>
            </fieldset>
        </form>
    </section>
`;

export async function editPage (ctx) {
    const data = await request(`http://localhost:3030/data/albums/${ctx.params.id}`);
    ctx.render(editTemplate(data));

    const form = document.querySelector('form');

    form.addEventListener('submit', edit);

    async function edit (e) {
        e.preventDefault();
    
        const formData = new FormData(e.target);
        const name = formData.get('name');
        const imgUrl = formData.get('imgUrl');
        const price = formData.get('price');
        const releaseDate = formData.get('releaseDate');
        const artist = formData.get('artist');
        const genre = formData.get('genre');
        const description = formData.get('description');
    
        if (createAndEditValidation(name, imgUrl, price, releaseDate, artist, genre, description)) {
            await request(`http://localhost:3030/data/albums/${ctx.params.id}`, {
                method: 'PUT',
                headers: {
                    'content-type': 'application/json',
                    'X-Authorization': JSON.parse(localStorage.getItem('user')).accessToken
                },
                body: JSON.stringify({
                    name,
                    imgUrl,
                    price,
                    releaseDate,
                    artist,
                    genre,
                    description
                })
            });

            ctx.page.redirect('/catalog');
        }
    }
}