import { response } from "express"
import db from "../models"



let handleUserLogin = (email, password) => {
    return new Promise(async (resolve, reject) => {
        try {
            let userData = {}
            let isEmailTrue = await checkEmailUser(email)
            if (isEmailTrue) {
                let user = await db.User.findOne({
                    attributes: ['email', 'firstName', 'lastName', 'password'],
                    where: { email: email },
                    raw: true
                })
                if (user) {
                    let check = password === user.password
                    if (check) {
                        userData.errCode = 0,
                            userData.errorMessage = "OK";
                        delete user.password,
                            userData.user = user
                    }
                    else {
                        userData.errCode = 3
                        userData.errorMessage = "Password is wrong!"
                    }
                }
                else {
                    userData.errCode = 2,
                        userData.errorMessage = "User doesn't exist in the system!"
                }
            }
            else {
                userData.errCode = 1,
                    userData.errorMessage = "Your email is wrong.Plz try again!"
            }
            resolve(userData)
        } catch (error) {
            reject(error)
        }

    })
}

let checkEmailUser = (userEmail) => {
    return new Promise(async (resolve, reject) => {
        try {
            let Email = await db.User.findOne({
                where: { email: userEmail }
            })
            if (Email) {
                resolve(true)
            }
            else {
                resolve(false)
            }
        } catch (error) {
            reject(error)
        }
    })
}

let getAllUsers = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let users;
            if (userId == "ALL") {
                users = await db.User.findAll()

                resolve(users)
            }
            if (userId !== "ALL") {
                users = await db.User.findOne({
                    where: { id: userId },
                    attributes: {
                        exclude: ['password']
                    }
                })
                console.log("check all usersss: ", users)
            }
            resolve(users)
        } catch (error) {
            reject(error)
        }

    })
}

let createNewUser = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let isExist = await db.User.findOne({
                where: { email: data.email },
                raw: false
            })
            if (isExist) {
                resolve({
                    errCode: 1,
                    errorMessage: "Email is already existed!"
                })
            }
            else {
                let user = await db.User.create({
                    email: data.email,
                    password: data.password,
                    firstName: data.firstName,
                    lastName: data.lastName,
                    address: data.address,
                    phonenumber: data.phonenumber,
                    gender: data.gender,
                    typeRole: data.typeRole,
                    keyRole: data.keyRole,
                    image: data.avatar
                })
                resolve({
                    errCode: 0,
                    message: "OK",
                    user
                })
            }
        } catch (error) {
            reject(error)
        }
    })
}

let deleteUser = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!userId) {
                resolve({
                    errCode: 1,
                    errorMessage: "Missing required parameters!"
                })
            }
            else {
                let isExist = await db.User.findOne({
                    where: { id: userId },
                    raw: false
                })
                if (!isExist) {
                    resolve({
                        errCode: 1,
                        errorMessage: "User doesn't exist in the system"
                    })
                }
                else {
                    await isExist.destroy()
                    resolve({
                        errCode: 0,
                        message: "Delete completed!"
                    })
                }
            }


        } catch (error) {
            reject(error)
        }
    })
}

let updateUser = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            console.log("check data:", data.avatar)
            if (!data.email || !data.id || !data.typeRole || !data.keyRole || !data.gender) {
                resolve({
                    errCode: 1,
                    errorMessage: "Missing required parameters!"
                })
            }
            else {
                let isExist = await db.User.findOne({
                    where: { email: data.email },
                    raw: false
                })
                if (isExist) {
                    isExist.firstName = data.firstName,
                        isExist.lastName = data.lastName,
                        isExist.address = data.address,
                        isExist.gender = data.gender,
                        isExist.phonenumber = data.phonenumber,
                        isExist.typeRole = data.typeRole,
                        isExist.keyRole = data.keyRole;
                    if (data.avatar) {
                        isExist.image = data.avatar
                    }


                    await isExist.save()
                    resolve({
                        errCode: 0,
                        message: "Update completed!"
                    })
                }
                else {
                    resolve({
                        errCode: 1,
                        errorMessage: "Email doesn't exist in the system!"
                    })
                }
            }

        } catch (error) {
            reject(error)
        }
    })
}

let getOneUser = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (userId) {
                let user = await db.User.findOne({
                    where: { id: userId }
                })
                if (user) {
                    resolve({
                        errCode: 0,
                        user
                    })
                }
                else {
                    resolve({
                        errCode: 1,
                        errorMessage: "User doesn't exist."
                    })
                }
            }
            else {
                resolve({
                    errCode: 1,
                    errorMessage: "Missing required parameter!"
                })
            }
        } catch (error) {
            reject(error)
        }
    })
}

let getAllCodeService = (typeInput) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!typeInput) {
                resolve({
                    errCode: 1,
                    errorMessage: "Missing required parameters!"
                })
            }
            else {
                let res = {};
                let allcode = await db.Allcode.findAll({
                    where: { type: typeInput }
                })
                res.errCode = 0;
                res.data = allcode;
                resolve(res)
            }


        } catch (error) {
            reject(error)
        }
    })
}


module.exports = {
    handleUserLogin: handleUserLogin,
    checkEmailUser: checkEmailUser,
    getAllUsers: getAllUsers,
    createNewUser: createNewUser,
    deleteUser: deleteUser,
    updateUser: updateUser,
    getOneUser: getOneUser,
    getAllCodeService: getAllCodeService

}