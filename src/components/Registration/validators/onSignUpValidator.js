export function OnSignUpValidator(regInput, setLRegText, setPRegText, setPRepeatPassText, setPRegClass, setLRegClass, setRepeatPassClass){
    const login = regInput.regEmail;
    const password = regInput.regPassword;
    const repeatPassword = regInput.repeatPassword;

    let count = 0;
    let matchPasswords = false;

    console.log(regInput);

    if(/[а-яё]/i.test(password) || /[а-яё]/i.test(repeatPassword)){
        count+=1;
        setPRegClass('pPassword');
        setPRegText('Допустимы только латинские символы');
    }
    if(password.search(/\d/) === -1){
        count+=1;
        setPRegClass('pPassword');
        setPRegText('Пароль должен содержать цифры');
    }
    if(login.length < 6){
        count+=1;
        setLRegClass('pLogin');
        setLRegText('Логин должен быть не менее 6 символов!');
    }
    if(password.length < 6){
        count+=1;
        setPRegClass('pPassword');
        setPRegText('Пароль должен быть не менее 6 символов!');
    }
    if(password.trim() === ''){
        count+=1;
        setPRegClass('pPassword');
        setPRegText('Поле с паролем должно быть заполнено');
    }
    if(login.trim() === ''){
        count+=1;
        setLRegClass('pLogin');
        setLRegText('Поле с логином должно быть заполнено');
    }
    if(login.length >= 6 && login.trim() !== ''){
        setLRegClass('pLogin-none');
    }
    if(password.trim() !== '' && password.length >= 6 && password.search(/\d/) !== -1){
        setPRegClass('pPassword-none');
    }
    if(password !== repeatPassword){
        matchPasswords = false;
        setPRepeatPassText('Пароли не совпадают!');
        setRepeatPassClass('pPassword');
    }else{
        matchPasswords = true;
        setRepeatPassClass('pPassword-none');
    }
    if(count === 0 && matchPasswords === true){
        setLRegClass('pLogin-none');
        setPRegClass('pPassword-none');
        setRepeatPassClass('pPassword-none');
        return true
    }
}
