import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import Kategori from "./KategoriModel.js";

const { DataTypes } = Sequelize;

const Books = db.define('books',{
    uuid:{
        type: DataTypes.STRING,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        validate:{
            notEmpty: true
        }
    },
    judul:{
        type: DataTypes.STRING,        
        allowNull: false,
        validate:{
            notEmpty: true,
            len: [3, 100]
        }
    },
    penulis:{
        type: DataTypes.STRING,        
        allowNull: false,
        validate:{
            notEmpty: true,   
        }
    },
    penerbit:{
        type: DataTypes.STRING,        
        allowNull: false,
        validate:{
            notEmpty: true,            
        }
    },
    cover:{
        type: DataTypes.STRING,        
        allowNull: false,
        validate:{
            notEmpty: true,
            len: [3, 400]     
        }
    },
    sinopsis:{
        type: DataTypes.STRING,        
        allowNull: false,
        validate:{
            notEmpty: true,            
        }
    },
    tahun_terbit:{
        type: DataTypes.INTEGER,        
        allowNull: false,
        validate:{
            notEmpty: true,            
        }
    },
    qty:{
        type: DataTypes.INTEGER,        
        allowNull: false,
        validate:{
            notEmpty: true,            
        }
    },
    kategoriId:{
        type: DataTypes.INTEGER,
        allowNull: false,
        validate:{
            notEmpty: true
        }
    }
},{
    freezeTableName: true
});

Kategori.hasMany(Books);
Books.belongsTo(Kategori), {foreignKey: 'kategoriId'};

export default Books;