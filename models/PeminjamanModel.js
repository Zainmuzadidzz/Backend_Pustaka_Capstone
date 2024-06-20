import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import Users from "./UserModel.js";
import Books from "./BookModel.js";

const { DataTypes } = Sequelize;

const Peminjaman = db.define('peminjaman',{
    uuid:{
        type: DataTypes.STRING,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        validate:{
            notEmpty: true
        }
    },  
    tanggal_pinjam:{
        type: DataTypes.DATE,        
        allowNull: false,
        validate:{
            notEmpty: true,   
        }
    },
    tanggal_kembali:{
        type: DataTypes.DATE,        
        allowNull: true,
    },
    status:{
        type: DataTypes.STRING,        
        allowNull: false,
        validate:{
            notEmpty: true,                
        }
    }, 
    userId:{
        type: DataTypes.INTEGER,
        allowNull: false,
        validate:{
            notEmpty: true
        }
    },
    bookId:{
        type: DataTypes.INTEGER,
        allowNull: false,
        validate:{
            notEmpty: true
        }
    }
},{
    freezeTableName: true
});

Books.hasMany(Peminjaman);
Peminjaman.belongsTo(Books), {foreignKey: 'bookId'};

Users.hasMany(Peminjaman);
Peminjaman.belongsTo(Users), {foreignKey: 'userId'};

export default Peminjaman;