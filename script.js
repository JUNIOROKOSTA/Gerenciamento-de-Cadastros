var fields = document.querySelectorAll('#form-user-create [name]')

var userData = {};

function showDataUser(datauser){

    console.log(datauser)

    document.getElementById('table-datauser').innerHTML = `
            <tr>
            <td>
                <img src="dist/img/user1-128x128.jpg" alt="User Image" class="img-circle img-sm"></td>
                <td>${datauser.name}</td>
                <td>${datauser.email}</td>
                <td>${datauser.admin}</td>
                <td>${datauser.birth}</td>
                <td>
                    <button type="button" class="btn btn-primary btn-xs btn-flat">Editar</button>
                    <button type="button" class="btn btn-danger btn-xs btn-flat">Excluir</button>
            </td>
            </tr>
    `
    
}


document.getElementById('form-user-create').addEventListener('submit',(event)=>{
    event.preventDefault();

    fields.forEach((field, index)=>{
        if(field.name === "gender"){
            if(field.checked){
                userData[field.name] = field.value
            }
        } else {
            userData[field.name] = field.value
    }
    });

    var objectUser = new User(
        userData.name, 
        userData.gender, 
        userData.birth, 
        userData.country, 
        userData.email, 
        userData.password, 
        userData.admin, 
        userData.photo)

    showDataUser(objectUser)
})