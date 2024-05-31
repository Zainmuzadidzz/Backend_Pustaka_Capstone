import Kategori from "../models/KategoriModel.js";

export const getKategoris = async (req, res) => {
    try {
        const kategoris = await Kategori.findAll();
        res.status(200).json(kategoris);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}

export const getKategoriById = async (req, res) => {
    try {
        const kategori = await Kategori.findOne({
            where: {
                uuid: req.params.id
            }
        });
        res.status(200).json(kategori);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}

export const createKategori = async (req, res) => {
    const {name} = req.body;
    try {
        await Kategori.create({
            name: name
        });   
        res.status(201).json({msg: "Kategori Created"});     
    } catch (error) {
        res.status(400).json({msg: error.message});
    }
}

export const updateKategori = async (req, res) => {
   const kategori = await Kategori.findOne({
       where: {
           uuid: req.params.id
       }
   });

   const {name} = req.body;
   try {
    await Kategori.update({
        name: name
    }, {
        where: {
            id: kategori.id
        }
    });
    res.status(200).json({msg: "Kategori Updated"});
   } catch (error) {
    res.status(400).json({msg: error.message});
    }

}

export const deleteKategori = async (req, res) => {
    const kategori = await Kategori.findOne({
        where: {
            uuid: req.params.id
        }
    });
  
    try {
     await Kategori.destroy({
         where: {
             id: kategori.id
         }
     });
     res.status(200).json({msg: "Kategori Deleted"});
    } catch (error) {
     res.status(400).json({msg: error.message});
     }
}