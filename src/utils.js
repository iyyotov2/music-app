export async function request(url, options) {
    const response = await fetch(url, options);

    if (response.ok != true) {
        const error = await response.json();
        alert(error.message);
        throw new Error(error.message);
    }

    const data = await response.json();
    return data;
}

export function isLogged () {
    if (localStorage.getItem('user')) {
        return true;
    } else {
        return false;
    }
}

export function isOwner (ownerId) {
    if (JSON.parse(localStorage.getItem('user'))._id == ownerId) {
        return true;
    } else {
        return false;
    }
}

export function regValidation (email, password, confPass) {
    if (
        email.trim().length == 0 ||
        password.trim().length == 0 ||
        confPass.trim().length == 0
    ) {
        alert('All fields are required!');
        return false;
    } else if (password !== confPass) {
        alert('The passwords do not match!');
        return false;
    } else {
        return true;
    }
}

export function createAndEditValidation (name, imgUrl, price, releaseDate, artist, genre, description) {
    if (
        name.trim().length == 0 ||
        imgUrl.trim().length == 0 ||
        price.trim().length == 0 ||
        releaseDate.trim().length == 0 ||
        artist.trim().length == 0 ||
        genre.trim().length == 0 ||
        description.trim().length == 0
    ) {
        alert('All fields are required!');
        return false;
    } else {
        return true;
    }
}