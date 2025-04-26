
document.getElementById('button').addEventListener('click',function (event){
    
    const password = document.getElementById('floatingPassword').value;
    const con_password = document.getElementById('floatingPasswordconfirm').value;

  if(password!==con_password){
      event.preventDefault();
      document.getElementById('error_msg').innerHTML="Password does't match"
  }
});