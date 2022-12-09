class UserController {
    constructor(formId, tableId){
        this.formElById = document.getElementById(formId);
        this.tableEl = document.getElementById(tableId);

        this.formSubmit();

    }; // closed constructor
    
    btnToggleSubmit(){
        let btnsubmit = this.formElById.querySelector('[type=submit]');
        btnsubmit.disabled = (btnsubmit.disabled)? false : true;
    }

    formSubmit(){

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
    }
    
    showDataUser(datauser){
        let tr = document.createElement('tr')
        tr.innerHTML = `

                <td>
                    <img src="${datauser.photo}" alt="User Image" class="img-circle img-sm">
                </td>
                    <td>${datauser.name}</td>
                    <td>${datauser.email}</td>
                    <td>${(datauser.admin == true)? "Sim" : "Não"}</td>
                    <td>${this.formatDate(datauser.dateRegister)}</td>
                <td>
                    <button type="button" class="btn btn-primary btn-xs btn-flat">Editar</button>
                    <button type="button" class="btn btn-danger btn-xs btn-flat">Excluir</button>
                </td>

        `;

        this.tableEl.appendChild(tr);
        
    }; // closed showDataUser

}; // closed UserController