class User {
    constructor(name, gender, birth, country, email, password, admin, photo, id){

        this._id = id;
        this._name = name;
        this._gender = gender;
        this._birth = birth;
        this._country = country;
        this._email = email;
        this._password = password;
        this._admin = admin;
        this._photo = photo;
        this._dateRegister = new Date();

    }
    // END //

    loadFromJSON(json){
        for(let name in json){
            if(name == '_dateRegister'){
                this[name] = new Date(json[name]);
            } else {
                this[name] = json[name];
            };
        };
    };

    static getItemSssionStorage(){

        let dataArray = [];

        // if(sessionStorage.getItem('data')){
        //     dataArray = JSON.parse(sessionStorage.getItem('data'));
        // }; // if de armazenamento da dados da sessão atual.


        if(localStorage.getItem('data')){
            dataArray = JSON.parse(localStorage.getItem('data'));
        }; // if de armazenamento da dados da sessão em modo local.


        return dataArray;

    }; // closed getItemSssionStorage

    getNewID(){

        let idCaunt = parseInt(localStorage.getItem('idCaunt'))
        if(!idCaunt > 0) {
            idCaunt = 0;
        }
        idCaunt++;
        localStorage.setItem('idCaunt', idCaunt)
        return idCaunt;
    };

    saveData(){
        let user = User.getItemSssionStorage();
        if(this.id > 0){
            user.map(u=>{
  
                if(u._id === this._id){
                    Object.assign(u, this);
                };

                return u;
            });

        } else {
            this._id = (this.getNewID()).toString();

            user.push(this);
            
        } ;

        localStorage.setItem("data", JSON.stringify(user)); 

    };

    remoceData(){
        let users = User.getItemSssionStorage();
        users.forEach((data, index) =>{
            if(this._id == data._id){
                users.splice(index, 1);
            }
        });
        localStorage.setItem("data", JSON.stringify(users)); 

    }

    // Get & Set de _id
    get id(){
        return this._id
    }


    // END //

    // Get & Set de _name
    get name(){
        return this._name
    }

    set name(value){
        this._name = value
    }

    // END //

    // Get & Set de _gender
    get gender(){
        return this._gender
    }

    set gender(value){
        this._gender = value
    }

    // END //

    // Get & Set de _birth
    get birth(){
        return this._birth
    }

    set birth(value){
        this._birth = value
    }

    // END //

    // Get & Set de _dateRegister
    get dateRegister(){
        return this._dateRegister
    }

    set dateRegister(value){
        this._dateRegister = value
    }

    // END //

    // Get & Set de _country
    get country(){
        return this._country
    }

    set country(value){
        this._country = value
    }

    // END //

    // Get & Set de _email
    get email(){
        return this._email
    }

    set email(value){
        this._email = value
    }

    // END //

    // Get & Set de _password
    get password(){
        return this._password
    }

    set password(value){
        this._password = value
    }

    // END //

    // Get & Set de _admin
    get admin(){
        return this._admin
    }

    set admin(value){
        this._admin = value
    }

    // END //

    // Get & Set de _photo
    get photo(){
        return this._photo
    }

    set photo(value){
        this._photo = value
    }

    // END //
 
}