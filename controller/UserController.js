class UserController {
    constructor(formIdCreat,formIdUpdate, tableId){
        this.formIdCreat = document.getElementById(formIdCreat);
        this.formIdUpdate = document.getElementById(formIdUpdate);
        this.tableEl = document.getElementById(tableId);

        this.btnCencelEdit = document.querySelector('.btn-canceled-edit')
        this.btnSaveEdit = document.querySelector('.btn-saved-edit')

        this.displayCreat = document.getElementById('box-user-creat')
        this.displayUpdata = document.getElementById('box-user-updata')

        this.formSubmit();
        this.formSubmitUpdate();

    }; // closed constructor
    
    btnToggleSubmit(btnSubmit){
        let btnsubmit = btnSubmit.querySelector('[type=submit]');
        btnsubmit.disabled = (btnsubmit.disabled)? false : true;
    }; // closed btnToggleSubmit

    reshowPhoto(form){
        let filephoto = form.querySelector('[name=photo]');
        filephoto.addEventListener('change', e=>{
            this.getPhoto(form).then((result) =>{
                this.showPhotoEdit(form, result)
            })
        });
    }

    formSubmitUpdate(){

        this.btnCencelEdit.addEventListener('click',()=>{
            this.togglePainelForm();
        });

        this.reshowPhoto(this.formIdUpdate);
        this.formIdUpdate.addEventListener('submit', e =>{
            e.preventDefault();
            this.btnToggleSubmit(this.formIdUpdate)

            this.getValues(this.formIdUpdate).then((sucesso)=>{
                this.getPhoto(this.formIdUpdate).then(
                    (sucess) =>{
                        sucesso.photo = sucess;
                        let indexTr = this.formIdUpdate.dataset.trIndex
                        let tr = this.tableEl.rows[indexTr];
                        let axPhoto = JSON.parse(tr.dataset.datauser)._photo
                        
                        if(axPhoto != sucesso.photo && sucesso.photo == "dist/img/person.png"){
                            sucesso.photo = axPhoto;
                        };


                        tr.dataset.datauser = JSON.stringify(sucesso)

                        tr.innerHTML = `

                            <td>
                                <img src="${sucesso.photo}" alt="User Image" class="img-circle img-sm">
                            </td>
                                <td>${sucesso.name}</td>
                                <td>${sucesso.email}</td>
                                <td>${(sucesso.admin == true)? "Sim" : "Não"}</td>
                                <td>${this.formatDate(sucesso.dateRegister)}</td>
                            <td>
                                <button type="button" class="btn btn-primary btn-updata btn-xs btn-flat">Editar</button>
                                <button type="button" class="btn btn-danger btn-delet btn-xs btn-flat">Excluir</button>
                            </td>

                        `;

                        this.addEventsTr(tr);
    
                        

                        this.countUpdata();

                }, 
                (error) =>{
                    console.error(error);
                });

            }, (error)=>{
                console.log(error)
            });
            this.btnToggleSubmit(this.formIdUpdate);
            this.togglePainelForm();
            this.showPhotoEdit(this.formIdUpdate)
            
        });
        
    };

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

        this.reshowPhoto(this.formIdCreat);

        this.formIdCreat.addEventListener('submit',event=>{

            event.preventDefault();

            this.btnToggleSubmit(this.formIdCreat);

            this.getValues(this.formIdCreat).then((sucesso)=>{
                this.getPhoto(this.formIdCreat).then(
                    (sucess) =>{
                        sucesso.photo = sucess;
                        this.showDataUser(sucesso);
    
                        this.formIdCreat.reset()
                }, 
                (error) =>{
                    console.error(error);
                });

            }, (error)=>{
                console.log(error)
            });

            

            this.btnToggleSubmit(this.formIdCreat);
            this.showPhotoEdit(this.formIdCreat)

        });


    }; // closed formSubmit

    getPhoto(form){

        return new Promise((resolve, reject)=>{

            let fileReader = new FileReader();

            let onPhoto = [...form.elements].filter(item=>{
                if (item.name == 'photo') {return item};
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

        }); // END Promise

        
    }; // closed getPhoto

    getValues(formEl){
        return new Promise((resolve, reject)=>{
            
        let userData = {};
        let isValid = true;
        
        [...formEl.elements].forEach(function(field, index){
            
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

        tr.dataset.datauser = JSON.stringify(datauser);

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

        this.addEventsTr(tr);

        this.tableEl.appendChild(tr);

        this.countUpdata();
        
    }; // closed showDataUser 

    addEventsTr(tr){
        tr.querySelector('.btn-updata').addEventListener('click', e =>{
            let json = JSON.parse(tr.dataset.datauser)
            let formUpata = document.querySelector('#form-user-updata')

            formUpata.dataset.trIndex = tr.sectionRowIndex;

            for ( let element in json){
                let elementP = element.replace('_','');

                let field = formUpata.querySelector("[name=" + elementP + "]");

                if(field){

                    switch (field.type){
                        case 'file':
                            continue;
                        break;
                        
                        case 'radio':
                            field = formUpata.querySelector("[name=" + elementP + 
                            "][value=" + json[element] + "]");

                            field.checked = true
                        break;
                        
                        case 'checkbox':
                            field.checked = json[element]
                        break;
                        
                        default:
                            field.value = json[element];

                    };
                    
                };

            };
            this.showPhotoEdit(this.formIdUpdate, json._photo);
            this.togglePainelForm();
            
        });

    }; // Closed addEventsTr

    showPhotoEdit(form, photo){
        if(photo){
            form.querySelector('.photo').src = photo;
        } else {
            form.querySelector('.photo').src = "dist/img/person.png" ;

        }

    }

    countUpdata(){

        let countUsers = 0;
        let countAdmins = 0;

        [...this.tableEl.children].forEach(tr => {
            countUsers++;
            let data = JSON.parse(tr.dataset.datauser)

            if(data._admin){
                countAdmins++;
            };
        });

        document.getElementById('count-users').innerHTML = countUsers;
        document.getElementById('count-admins').innerHTML = countAdmins;

    }; // closed countUpdata

}; // closed UserController


// form-user-updata -updata