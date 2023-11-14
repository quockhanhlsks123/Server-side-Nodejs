import db from "../models"

let createNewClinic = (inputData) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!inputData.name || !inputData.address || !inputData.description) {
                resolve({
                    errCode: 1,
                    errMessage: "Missing parameters!"
                })
            }

            else {
                await db.Clinic.create({
                    name: inputData.name,
                    address: inputData.address,
                    description: inputData.description
                })

                resolve({
                    errCode: 0,
                    errMessage: "Create clinic completed"
                })
            }

        } catch (error) {
            reject(error)
        }
    })
}

let getAllClinic = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let respone = await db.Clinic.findAll()
            if (respone) {
                resolve({
                    errCode: 0,
                    respone
                })
            }
            else {
                resolve({
                    errCode: 1,
                    errMessage: "Can not get data! Please try again."
                })
            }

        } catch (error) {
            reject(error)
        }
    })
}

let getOneClinic = (clinicId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let response = await db.Clinic.findOne({
                where: { id: clinicId }
            })
            if (response) {
                resolve({
                    errCode: 0,
                    response
                })
            }
            else {
                resolve({
                    errCode: 1,
                    errMessage: "Can not get data! Please try again."
                })
            }
        } catch (error) {
            reject(error)
        }
    })
}

module.exports = {
    createNewClinic: createNewClinic,
    getAllClinic: getAllClinic,
    getOneClinic: getOneClinic
}