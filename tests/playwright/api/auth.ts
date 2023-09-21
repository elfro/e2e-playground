// export async function getToken() {
//     const response = await fetch('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
//     const html = await response.text();
//     const token = html.match(':token="&quot;(.*)&quot;');
//
//     return token[1];
// }
//
// export async function getCookies(token: string) {
//     const responseGetCookies = await fetch('https://opensource-demo.orangehrmlive.com/web/index.php/auth/validate', {
//         method: 'POST',
//         body: {
//             "_token": token,
//             username: 'Admin',
//             password: 'admin123'
//         }
//     });
//
//     const setCookies = responseGetCookies.headers.getSetCookie();
//
//     console.log(setCookies);
// }
