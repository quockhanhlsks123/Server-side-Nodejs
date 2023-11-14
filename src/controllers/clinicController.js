import { response } from 'express'
import clinicService from '../services/clinicService'


let handleCreateNewClinic = async (req, res) => {
    try {
        let data = req.body
        let respone = await clinicService.createNewClinic(data)
        return res.status(200).json(respone)
    } catch (error) {
        console.log(error)
        return res.status(200).json({
            errCode: -1,
            errMessage: "Error from server"
        })
    }

}

let handleGetAllClinic = async (req, res) => {
    try {
        let respone = await clinicService.getAllClinic()
        return res.status(200).json(respone)
    } catch (error) {
        console.log(error)
        return res.status(200).json({
            errCode: -1,
            errMessage: "Error from server"
        })
    }
}

let handleGetOneClinic = async (req, res) => {
    try {
        let id = req.query.id
        let response = await clinicService.getOneClinic(id)
        return res.status(200).json(response)
    } catch (error) {
        return res.status(200).json({
            errCode: -1,
            errMessage: "Error from server"
        })
    }

}

module.exports = {
    handleCreateNewClinic: handleCreateNewClinic,
    handleGetAllClinic: handleGetAllClinic,
    handleGetOneClinic: handleGetOneClinic
}