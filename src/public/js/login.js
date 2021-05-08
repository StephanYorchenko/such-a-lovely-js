async function tryLogin(){
    const data = {userid: document.forms.login.userid.value};
    const result = await sendRequest("tryLogin", data);
    if (result.success)
        window.location.href = '/';
}