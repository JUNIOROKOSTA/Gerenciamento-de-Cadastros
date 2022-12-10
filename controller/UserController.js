class UserController {
    constructor(formId, tableId){
        this.formElById = document.getElementById(formId);
        this.tableEl = document.getElementById(tableId);

        this.btnCencelEdit = document.querySelector('.btn-canceled-edit')
        this.btnSaveEdit = document.querySelector('.btn-saved-edit')

        this.displayCreat = document.getElementById('box-user-creat')
        this.displayUpdata = document.getElementById('box-user-updata')

        this.formSubmit();

    }; // closed constructor
    
    btnToggleSubmit(){
        let btnsubmit = this.formElById.querySelector('[type=submit]');
        btnsubmit.disabled = (btnsubmit.disabled)? false : true;
    }; // closed btnToggleSubmit

    togglePainelForm(){
        let btnUp =  document.querySelectorAll('.btn-updata');
        let btnDel =  document.querySelectorAll('.btn-delet');

        if(this.displayCreat.style.display == 'none'){
            this.displayCreat.style.display = 'block';
            this.displayUpdata.style.display = 'none';

            btnUp.forEach((e)=>{e.disabled = false});
            btnDel.forEach((e)=>{e.disabled = false});
            
        } else {
            this.displayCreat.style.display = 'none';
            this.displayUpdata.style.display = 'block';

            btnUp.forEach((e)=>{e.disabled = true});
            btnDel.forEach((e)=>{e.disabled = true});
            
        }
        // document.getElementById('box-user-creat').style.display = 'none'
        // document.getElementById('box-user-updata').style.display = 'block'

    }; // closed togglePainelForm

    formSubmit(){

        this.btnCencelEdit.addEventListener('click',()=>{
            this.togglePainelForm();
        });

        this.formElById.addEventListener('submit',event=>{

            event.preventDefault();

            this.btnToggleSubmit();

            this.getValues().then((sucesso)=>{
                this.getPhoto().then(
                    (sucess) =>{
                        sucesso.photo = sucess;
                        this.showDataUser(sucesso);
    
                        this.formElById.reset()
                }, 
                (error) =>{
                    console.error(error);
                });

            }, (error)=>{
                console.log(error)
            });

            

            this.btnToggleSubmit();

        });

        

    }; // closed formSubmit

    getPhoto(){

        return new Promise((resolve, reject)=>{

            let fileReader = new FileReader();

            let onPhoto = [...this.formElById.elements].filter(item=>{
                if (item.name === 'photo') {return item};
            });

            let currentFile = (onPhoto[0].files[0]);

            fileReader.onload = ()=>{
                resolve(fileReader.result);
                
            };

            fileReader.onerror = (e) =>{
                reject(e);
            }
            if(currentFile){
                fileReader.readAsDataURL(currentFile);
            } else{
                resolve("dist/img/person.png");
            }

        }); // END Primise

        
    }; // closed getPhoto

    getValues(){
        return new Promise((resolve, reject)=>{
            
        let userData = {};
        let isValid = true;
        
        [...this.formElById.elements].forEach(function(field, index){
            
            if(['name','email','password'].indexOf(field.name) > -1 && !field.value){
                field.parentElement.classList.add('has-error')
                isValid = false
            } else {

                if(field.name === "gender"){
                    if(field.checked){
                        userData[field.name] = field.value
                    };
                } else if(field.name == 'admin'){
                    userData[field.name] = field.checked
    
                } else {
                    userData[field.name] = field.value
            };

            }

            
        });
        
        if(!isValid){
            reject()
        }
        resolve(new User(
            userData.name, 
            userData.gender, 
            userData.birth, 
            userData.country, 
            userData.email, 
            userData.password, 
            userData.admin, 
            userData.photo))
        

        })
    }; // closed getValues

    formatDate(date){
        return date.toLocaleDateString();
    }; // closed formatDate


    
    
    showDataUser(datauser){
        let tr = document.createElement('tr')

        tr.dataset.data = JSON.stringify(datauser);

        tr.innerHTML = `

                <td>
                    <img src="${datauser.photo}" alt="User Image" class="img-circle img-sm">
                </td>
                    <td>${datauser.name}</td>
                    <td>${datauser.email}</td>
                    <td>${(datauser.admin == true)? "Sim" : "Não"}</td>
                    <td>${this.formatDate(datauser.dateRegister)}</td>
                <td>
                    <button type="button" class="btn btn-primary btn-updata btn-xs btn-flat">Editar</button>
                    <button type="button" class="btn btn-danger btn-delet btn-xs btn-flat">Excluir</button>
                </td>

        `;

        tr.querySelector('.btn-updata').addEventListener('click', e =>{
            let json = JSON.parse(tr.dataset.data)
            let formUpata = document.querySelector('#form-user-updata')

            for ( let element in json){
                let elementP = element.replace('_','');

                if(json[element] == ''){continue}

                let field = formUpata.querySelector("[name=" + elementP + "]");

                if(field){
                    if(field.type == 'file') continue;
                    field.value = json[element];
                };

            };


            this.togglePainelForm();
        });

        this.tableEl.appendChild(tr);

        this.countUpdata();
        
    }; // closed showDataUser 

    countUpdata(){

        let countUsers = 0;
        let countAdmins = 0;

        [...this.tableEl.children].forEach(tr => {
            countUsers++;
            let data = JSON.parse(tr.dataset.data)

            if(data._admin){
                countAdmins++;
            };
        });

        document.getElementById('count-users').innerHTML = countUsers;
        document.getElementById('count-admins').innerHTML = countAdmins;

    }; // closed countUpdata

}; // closed UserController


// form-user-updata -updata