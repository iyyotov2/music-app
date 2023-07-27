export async function logoutPage (ctx) {
    await fetch('http://localhost:3030/users/logout', {
        headers: { 'X-Authorization': JSON.parse(localStorage.getItem('user')).accessToken } 
    });
    
    localStorage.removeItem('user');
    ctx.page.redirect('/');
}