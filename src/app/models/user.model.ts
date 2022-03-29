
        export class User{

            static isFirebaseUser(firebaseUser:any){

                return new User(firebaseUser.uid,firebaseUser.correo,firebaseUser.nombre);
            }
            
            constructor(

                    public uid : string,
                    public correo : string,
                    public nombre : string


                    ){}


        }