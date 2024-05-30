import Kategori from "../models/KategoriModel.js";

export const getKategoris = async (req, res) => {
    try {
        const kategoris = await Kategori.findAll();
        res.json(kategoris);
    } catch (error) {
        console.log(error);
    }
}

export const getKategoriById = async (req, res) => {
    try {
        const kategori = await Kategori.findOne({
            where: {
                id: req.params.id
            }
        });
        res.json(kategori);
    } catch (error) {
        console.log(error);
    }
}

export const createKategori = async (req, res) => {
    try {
        await Kategori.create(req.body);
        res.json({
            message: "Kategori created successfully"
        });
    } catch (error) {
        console.log(error);
    }
}

export const updateKategori = async (req, res) => {
    try {
        await Kategori.update(req.body, {
            where: {
                id: req.params.id
            }
        });
        res.json({
            message: "Kategori updated successfully"
        });
    } catch (error) {
        console.log(error);
    }
}

export const deleteKategori = async (req, res) => {
    try {
        await Kategori.destroy({
            where: {
                id: req.params.id
            }
        });
        res.json({
            message: "Kategori deleted successfully"
        });
    } catch (error) {
        console.log(error);
    }
}