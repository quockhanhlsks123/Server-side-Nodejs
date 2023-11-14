import bcrypt from 'bcryptjs';
import db from '../models';
import { raw } from 'body-parser';
import { request } from 'express';
const salt = bcrypt.genSaltSync(10);

let createNewUser = async (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let hashPasswordFromBycrypt = await hashUserPassword(data.password)
            await db.User.create({
                email: data.email,
                password: data.password,
                firstName: data.firstName,
                lastName: data.lastName,
                address: data.address,
                phonenumber: data.phonenumber,
                gender: data.gender === "1" ? true : false,
                roleId: data.roleId,
            })
            resolve("create new user succeed")

            // console.log("data from service")
            // console.log(data)
            // console.log("Hash password: ", hashPasswordFromBycrypt)
        } catch (e) {
            reject(e)
        }
    })


}

let hashUserPassword = (password) => {
    return new Promise(async (resolve, reject) => {
        try {
            let hashPassword = await bcrypt.hashSync(password, salt);
            resolve(hashPassword)
        } catch (e) {
            reject(e);
        }
    })
}

let getAllUser = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let data = await db.User.findAll({
                raw: true
            })
            resolve(data)
        } catch (error) {
            reject(error)
        }
    })
}

let getOneUser = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let data = await db.User.findAll({
                where: { id: 1 },
                raw: true
            })
            resolve(data)
        } catch (error) {
            reject(error)
        }
    })
}

let getUserInforById = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { id: userId },
                raw: true
            })
            if (user) {
                resolve(user);
            }
            else {
                resolve([])
            }

        } catch (error) {
            reject(error)
        }
    })
}

let updateUserData = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { id: data.id }
            })
            if (user) {
                user.firstName = data.firstName;
                user.lastName = data.lastName;
                user.address = data.address;

                await user.save()
                resolve()
            }
            else {
                resolve()
            }
        } catch (error) {
            console.log("ERROR: ", error)
        }
    })
}

let deleteUserById = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            let deleteUser = await db.User.findOne({
                where: { id: id }
            })
            if (deleteUser) {
                await deleteUser.destroy();
            }
            resolve()
        } catch (error) {
            reject(error)
        }



    })
}

let deleteUserByIdWithQuery = (id) => {
    return new Promise((resolve, reject) => {
        let connectSQL = require("mysql2")

        let con = connectSQL.createConnection({
            host: "127.0.0.1",
            user: "root",
            password: null,
            database: "hoidanit"
        })

        try {
            con.query(`DELETE FROM users where id = ${id}`, function (err, result, field) {
                if (err) throw console.log("Check err: ", err);
                console.log(`delete user ${id} completed`);

            })
            resolve()
        } catch (error) {
            reject(error)
        }
    })
}
// try {
//     con.query("select*from users where id = 2", function (err, result, field) {
//         if (err) throw console.log("check err: ", err);
//         console.log("-----------------------------")
//         console.log("check data", result);
//         return res.render("test/displayOneCRUD.ejs", {
//             data: JSON.stringify(result)
//         })
//     });
// } catch (error) {
//     console.log("check error:", error);
// }

module.exports = {
    createNewUser: createNewUser,
    getAllUser: getAllUser,
    getOneUser: getOneUser,
    getUserInforById: getUserInforById,
    updateUserData: updateUserData,
    deleteUserById: deleteUserById,
    deleteUserByIdWithQuery: deleteUserByIdWithQuery
}