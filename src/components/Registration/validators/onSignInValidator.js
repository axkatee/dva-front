export function OnSignInValidator (input, setPText, setLText, setPClass, setLClass){
    const login = input.email;
    const password = input.password;
    let count = 0;
    console.log(input)

    if(password.search(/\d/) === -1){
        count+=1;
        setPClass('pPassword');
        setPText('Пароль должен содержать цифры')
    }
    if(/[а-яё]/i.test(password)){
        count+=1;
        setPClass('pPassword');
        setPText('Допустимы только латинские символы')
    }
    if(login.length < 6){
        count+=1;
        setLClass('pLogin');
        setLText('Логин должен быть не менее 6 символов!')
    }
    if(password.length < 6){
        count+=1;
        setPClass('pPassword');
        setPText('Пароль должен быть не менее 6 символов!')
    }
    if(password.trim() === ''){
        count+=1;
        setPClass('pPassword');
        setPText('Поле с паролем должно быть заполнено')
    }
    if(login.trim() === ''){
        count+=1;
        setLClass('pLogin');
        setLText('Поле с логином должно быть заполнено')
    }
    if(login.length >= 6 && login.trim() !== ''){
        setLClass('pLogin-none');
    }
    if(password.trim() !== '' && password.length >= 6 && password.search(/\d/) !== -1){
        setPClass('pPassword-none');
    }
    if(count === 0){
        setLClass('pLogin-none');
        setPClass('pPassword-none');
        return true
    }
}
