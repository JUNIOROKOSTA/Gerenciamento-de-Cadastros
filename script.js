var fields = document.querySelectorAll('#form-user-create [name]')

var userData = {};

fields.forEach((field, index)=>{
    if(field.name === "gender" && field.checked){
        userData[field.name] = field.value
    } else {
        userData[field.name] = field.value
}
});


document.getElementById('form-user-create').addEventListener('submit',(event)=>{
    event.preventDefault();
})