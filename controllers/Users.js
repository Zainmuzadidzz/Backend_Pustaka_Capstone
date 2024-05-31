import Users from "../models/UserModel.js";
import argon2 from 'argon2';



export const getUsers = async(req, res) => {
    try{
        const response = await Users.findAll({
            attributes: ['uuid', 'name', 'email', 'jenisKelamin', 'noTlp', 'alamat', 'role']
        });
        res.status(200).json(response);
    }catch(error){
        res.status(500).json({msg: error.message});
    }   
}

export const getUserById = async(req, res) => {
 try{
        const response = await Users.findOne({
            attributes: ['uuid', 'name', 'email', 'jenisKelamin', 'noTlp', 'alamat', 'role'],
            where: {
                uuid: req.params.id
            }
        });
        res.status(200).json(response);
    }catch(error){
        res.status(500).json({msg: error.message});
    }
}

export const createUser = async(req, res) => {

    const {name, email, password, jenisKelamin, noTlp, alamat,  role} = req.body;
    const hashPassword = await argon2.hash(password);
    try {
        await Users.create({
            name: name,
            email: email,
            password: hashPassword,
            jenisKelamin: jenisKelamin,
            noTlp: noTlp,
            alamat: alamat,
            role: role
        });
        res.status(201).json({msg: "User Createed"});
    } catch (error) {
        res.status(400).json({msg: error.message});
    }    
}

export const updateUser = async(req, res) => {
    const users = await Users.findOne({       
        where: {
            uuid: req.params.id
        }
    });

    if(!users) return res.status(404).json({msg: "User Tidak Ditemukan"});
    const {name, email, password, confPassword, jenisKelamin, noTlp, alamat,  role} = req.body;
    let hashPassword;
    if(password === "" || password === null){
        hashPassword = users.password;
    }else{
       
        hashPassword = await argon2.hash(password);
    }
    if(password !== confPassword) return res.status(400).json({msg: "Password dan Confirm Password tidak cocok"});

    
    try {
        await Users.update({
            name: name,
            email: email,
            password: hashPassword,
            jenisKelamin: jenisKelamin,
            noTlp: noTlp,
            alamat: alamat,
            role: role
        },{
            where:{
                id: users.id
            }
        });
        res.status(200).json({msg: "User Updated"});
    } catch (error) {
        res.status(400).json({msg: error.message});
    }    

}

export const deleteUser = async(req, res) => {

    const users = await Users.findOne({       
        where: {
            uuid: req.params.id
        }
    });

    if(!users) return res.status(404).json({msg: "User Tidak Ditemukan"});   
    
    try {
        await Users.destroy({
            where:{
                id: users.id
            }
        });
        res.status(200).json({msg: "User Deleted"});
    } catch (error) {
        res.status(400).json({msg: error.message});
    }    

}