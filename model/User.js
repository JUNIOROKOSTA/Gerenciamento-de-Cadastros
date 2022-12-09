class User {
    constructor(name, gender, birth, country, email, password, admin, photo){
        this._name = name;
        this._gender = gender;
        this._birth = birth;
        this._dateRegister = new Date();
        this._country = country;
        this._email = email;
        this._password = password;
        this._admin = admin;
        this._photo = photo;
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