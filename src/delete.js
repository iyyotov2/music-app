import { request } from "./utils.js";

export async function deletePage (ctx) {
    if (confirm('Do you want to delete this entry?')) {
        await request(`http://localhost:3030/data/albums/${ctx.params.id}`, {
            method: 'DELETE',
            headers: {
                'content-type': 'application/json',
                'X-Authorization': JSON.parse(localStorage.getItem('user')).accessToken
            },
        });

        ctx.page.redirect('/catalog');
    }
}