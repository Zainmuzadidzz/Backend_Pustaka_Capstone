import Peminjaman from "../models/PeminjamanModel.js";
import Books from "../models/BookModel.js";
import Users from "../models/UserModel.js";
import Kategori from "../models/KategoriModel.js";
import {Op} from "sequelize"
export const getPeminjamans = async (req, res) => {
    try {
        let response;

        if(req.role === "admin") {
            response = await Peminjaman.findAll({
                attributes: ['uuid', 'tanggal_pinjam', 'tanggal_kembali', 'status'],
                include:[{
                    model: Users,
                    attributes: ['uuid', 'name', 'email', 'jenisKelamin', 'noTlp', 'alamat', 'role']
                },
                {
                    model: Books,
                    attributes: ['uuid', 'judul', 'penulis', 'penerbit', 'cover', 'sinopsis', 'tahun_terbit', 'qty', 'kategoriId'],
                    include:[{
                        model: Kategori,
                        attributes: ['name']
                    }]
                }
            ],
            
            });
        }else{
            response = await Peminjaman.findAll({
                where: {
                    userId: req.userId
                },
                attributes: ['uuid', 'tanggal_pinjam', 'tanggal_kembali', 'status'],
                include:[{
                    model: Users,
                    attributes: ['uuid', 'name', 'email', 'jenisKelamin', 'noTlp', 'alamat', 'role']
                },
                {
                    model: Books,
                    attributes: ['uuid', 'judul', 'penulis', 'penerbit', 'cover', 'sinopsis', 'tahun_terbit', 'qty', 'kategoriId'],
                    include:[{
                        model: Kategori,
                        attributes: ['name']
                    }]
                }
            ],
            
            });
        }
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}

export const getPeminjamanById = async (req, res) => {
 try {
    let peminjaman = await Peminjaman.findOne({
        where: {
            uuid: req.params.id
        },              
    });
    if (!peminjaman) return res.status(404).json({msg: "Peminjaman not found"});

    if(req.role === "admin") {
        peminjaman = await Peminjaman.findOne({
            where: {
                uuid: req.params.id
            },
            attributes: ['uuid', 'tanggal_pinjam', 'tanggal_kembali', 'status', 'userId', 'bookId'],
            include:[{
                model: Users,
                attributes: ['uuid', 'name', 'email', 'jenisKelamin', 'noTlp', 'alamat', 'role']
            },
            {
                model: Books,
                attributes: ['uuid', 'judul', 'penulis', 'penerbit', 'cover', 'sinopsis', 'tahun_terbit', 'qty', 'kategoriId'],
                include:[{
                    model: Kategori,
                    attributes: ['name']
                }]
            }
        ],
            
        });
    }else{
        peminjaman = await Peminjaman.findOne({
            where: {
                [Op.and]:[{id:peminjaman.id}, { userId: req.userId}]   
            },
            attributes: ['uuid', 'tanggal_pinjam', 'tanggal_kembali', 'status', 'userId', 'bookId'],
            include:[{
                model: Users,
                attributes: ['uuid', 'name', 'email', 'jenisKelamin', 'noTlp', 'alamat', 'role']
            },
            {
                model: Books,
                attributes: ['uuid', 'judul', 'penulis', 'penerbit', 'cover', 'sinopsis', 'tahun_terbit', 'qty', 'kategoriId'],
                include:[{
                    model: Kategori,
                    attributes: ['name']
                }]
            }
        ],
            
        });
    }
    res.status(200).json(peminjaman);
 } catch (error) {
    res.status(500).json({msg: error.message});
 }
    
}

export const createPeminjaman = async (req, res) => {
    const {tanggal_pinjam, tanggal_kembali, status, userId, bookId} = req.body;
    try {
        await Peminjaman.create({
            tanggal_pinjam: tanggal_pinjam,
            tanggal_kembali: tanggal_kembali,
            status: status,
            userId: userId,
            bookId: bookId
        });
        res.status(201).json({msg: "Peminjaman Created"});
    } catch (error) {
        res.status(400).json({msg: error.message});
    }
}

export const updatePeminjaman = async (req, res) => {
    try {
        const peminjaman = await Peminjaman.findOne({
            where: {
                uuid: req.params.id
            },                       
        });
    
        if (!peminjaman) return res.status(404).json({msg: "Peminjaman not found"});

        const {tanggal_kembali, status} = req.body;
        await peminjaman.update(
            {
                tanggal_kembali: tanggal_kembali,
                status: status,
            }
        );
        res.status(200).json({msg: "Peminjaman Updated"});
     } catch (error) {
        res.status(500).json({msg: error.message});
     }
}

export const deletePeminjaman = async (req, res) => {
    try {
        const peminjaman = await Peminjaman.findOne({
            where: {
                uuid: req.params.id
            },                       
        });
    
        if (!peminjaman) return res.status(404).json({msg: "Peminjaman not found"});

  
        await peminjaman.destroy();
        res.status(200).json("Peminjaman Deleted");
     } catch (error) {
        res.status(500).json({msg: error.message});
     }
}