const dbconfig = require('../../config').dbConfig;
const common_service = require('../../services/commonService');

const url = "https://ill-gray-barnacle-cape.cyclic.app/customers";

module.exports = {
    signup: async(req,h) =>{
        try{

            const users = req.getDb(dbconfig.DB).getModel("users");

            let user_check = await users.findOne({
                where: {
                    email: req.payload.email
                }
            });
            if(user_check)
            {
                return h.response({error : "user already exists"}).code(400);
            }
            let user_payload = {
                name : req.payload.name,
                email : req.payload.email,
                password: req.payload.password,
                gender: req.payload.gender,
                address : req.payload.address,
                pincode: req.payload.pincode,
                photo : req.payload.photo,
                created_date : Date.now()
            }

            let create_user = await users.create(user_payload);

            if(create_user)
            {
            let token = await common_service.jwt_Sign_token({id : "myself"});
            create_user = JSON.parse(JSON.stringify(create_user));
            let send_paylaod = {
                id : create_user.id,
                name : create_user.name,
                email: create_user.email
            }
              let send_data = await common_service.fetch_request("POST",token,url,null,send_paylaod);
              console.log(send_data);
             }
            return h.response({message : "user created successfully"}).code(200);
            
        }catch(error)
        {
            console.log("add users error: ",error);
            return h.response({error: "internal server error",reason: error}).code(500);
        }
    },
    login: async(req,h) =>{
        try{

            const users = req.getDb(dbconfig.DB).getModel("users");

            let login_check = await users.findOne({
                where: {
                    email: req.payload.email,
                    password: req.payload.password,
                }
            });

            if(!login_check)
            {
                return h.response({error: "invalid username or password"}).code(400);
            }

            let token_payload = {
                id: login_check.id,
                name: login_check.name
            }

            let auth_token = await common_service.jwt_Sign_token(token_payload);

            let response_payload = {
                auth_token,
                message : "login successfull"
            }

            return h.response(response_payload).code(200);

        }catch(error)
        {
            console.log("loginerror: ",error);
            return h.response({error: "internal server error",reason: error}).code(500);

        }
    },
    getuser: async(req,h)=>{
        try{

        let access_token = req.headers.authorization;
            if(!access_token)
            {
                return h.response({message: "authorization header missisng"}).code(403);
            }

            let token_data = await common_service.jwt_verify_token(access_token);
            

            if(!token_data)
            {
                return h.response({message: "invalid crediantls"}).code(403);
            }
            const users = req.getDb(dbconfig.DB).getModel("users");

            let check_user = await users.findOne({
                where: {
                    id : req.payload.id
                }
            });

            if(!check_user)
            {
                return h.response({message :"no user found"}).code(400);
            }

            let response_payload = {
                id : check_user.id,
                name: check_user.name,
                email: check_user.email
            }

            return h.response(response_payload).code(200);

        }catch(error)
        {
            console.log("get user error: ",error);
            return h.response({error: "internal server error",reason: error}).code(500);
        }

    }
}