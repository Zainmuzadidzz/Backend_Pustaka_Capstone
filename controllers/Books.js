import Books from "../models/BookModel.js";
import Kategori from "../models/KategoriModel.js";

export const getBooks = async(req, res) => {
    try {
        const response = await Books.findAll({
            attributes: ['uuid', 'id', 'judul', 'penulis', 'penerbit', 'cover', 'sinopsis', 'tahun_terbit', 'qty', 'kategoriId'],
            include:[{
                model: Kategori,
                attributes: ['name']
            }]
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}

export const getBookById = async(req, res) => {
    try {
        const response = await Books.findOne({
            where: {
                uuid: req.params.id
            },
            attributes: ['uuid', 'judul', 'penulis', 'penerbit', 'cover', 'sinopsis', 'tahun_terbit', 'qty', 'kategoriId'],
            include:[{
                model: Kategori,
                attributes: ['name']
            }]
        });
        
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}

export const createBook = async(req, res) => {
    const {judul, penulis, penerbit, cover, sinopsis, tahun_terbit, qty, kategoriId} = req.body;
    try {
        await Books.create({
            judul: judul,
            penulis: penulis,
            penerbit: penerbit,
            cover: cover,
            sinopsis: sinopsis,
            tahun_terbit: tahun_terbit,
            qty: qty,
            kategoriId: kategoriId
        });
        res.status(201).json({msg: "Book Created"});
    } catch (error) {
        res.status(400).json({msg: error.message});
    }
}

export const updateBook = async (req, res) => {
    
    const book = await Books.findOne({
        where: {
            uuid: req.params.id
        }
    });
    
    if(!book) return res.status(404).json({msg: "No Data Found"});
    const {judul, penulis, penerbit, cover, sinopsis, tahun_terbit, qty, kategoriId} = req.body;

    try {
        await book.update({
            judul: judul,
            penulis: penulis,
            penerbit: penerbit,
            cover: cover,
            sinopsis: sinopsis,
            tahun_terbit: tahun_terbit,
            qty: qty,
            kategoriId: kategoriId
        }); 

        res.status(200).json({msg: "Book Updated"});
    } catch (error) {
        res.status(400).json({msg: error.message});
    }
}

export const deleteBook = async (req, res) => {
   const book = await Books.findOne({
        where: {
            uuid: req.params.id
        }
    });

    if(!book) return res.status(404).json({msg: "Book Tidak Ditemukan"});   
    
    try {
        await Books.destroy({
            where:{
                id: book.id
            }
        });
        res.status(200).json({msg: "Book Deleted"});
    } catch (error) {
        res.status(400).json({msg: error.message});
    }    
}