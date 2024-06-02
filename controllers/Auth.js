import Users from "../models/UserModel.js";
import argon2 from 'argon2';

export const Login = async (req, res) => {
    const users = await Users.findOne({       
        where: {
            email: req.body.email
        }
    });

    if(!users) return res.status(404).json({msg: "User Tidak Ditemukan"});
    
    const match = await argon2.verify(users.password, req.body.password);
    if(!match) return res.status(400).json({msg: "Wrong Password"});
    req.session.userId = users.uuid;
    const uuid = users.uuid;
    const name = users.name;
    const email = users.email;
    const role = users.role;
    res.status(200).json({uuid, name, email, role});    
          
}

export const me = async (req, res) => {
    if(!req.session.userId) return res.status(401).json({msg: "Mohon login terlebih dahulu"});
    const user = await Users.findOne({
        where: {
            uuid: req.session.userId
        },
        attributes: ['uuid', 'name', 'email', 'jenisKelamin', 'noTlp', 'alamat', 'role'],
    });
    if(!user) return res.status(404).json({msg: "User Tidak Ditemukan"});
    res.status(200).json(user);
}
export const Logout = (req, res) => {
    req.session.destroy((err) => {
        if(err) return res.status(400).json({msg: "Tidak Dapat Logout"});
        res.status(200).json({msg: "Anda Telah Logout"});
    });
    
}


export const test = (req, res) => {
    res.json({msg: "Hello"});
}