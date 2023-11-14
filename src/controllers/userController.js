import userService from "../services/userService"


let handleLogin = async (req, res) => {
    let email = req.body.email
    let password = req.body.password
    let userData = await userService.handleUserLogin(email, password)
    console.log(userData)
    if (!email || !password) {
        return res.status(400).json({
            errorCode: 1,
            message: "missing parameters!"
        })
    }

    return res.status(200).json({
        errorCode: userData.errCode,
        message: userData.errorMessage,
        user: userData.user ? userData.user : { "value": "No user information" }
    })
}

let handleGetAllUser = async (req, res) => {
    let id = req.query.id

    if (!id) {
        return res.status(200).json({
            errCode: 1,
            errorMessage: "Missing required parameters"
        })
    }
    let users = await userService.getAllUsers(id)

    return res.status(200).json({
        errCode: 0,
        errorMessage: "OK",
        users
    })
}

let handleCreateNewUser = async (req, res) => {
    let user = req.body
    let response = await userService.createNewUser(user)
    return res.status(200).json({
        response
    })
}

let handleDeleteUser = async (req, res) => {
    let id = req.body.id
    let response = await userService.deleteUser(id)
    console.log(response)
    return res.status(200).json({
        response
    })
}

let handleUpdateUser = async (req, res) => {
    let response = await userService.updateUser(req.body)

    return res.status(200).json({
        response
    })
}

let handleGetOneUser = async (req, res) => {
    let id = req.body.id
    let response = await userService.getOneUser(id)
    return res.status(200).json({
        response
    })
}

let getAllCode = async (req, res) => {
    try {

        let data = await userService.getAllCodeService(req.query.type)
        return res.status(200).json(data)

    } catch (error) {
        console.log("get allcode error: ", error)
        return res.status(200).json({
            errCode: -1,
            errorMessage: "Error from server!"
        })
    }
}


module.exports = {
    handleLogin: handleLogin,
    handleGetAllUser: handleGetAllUser,
    handleCreateNewUser: handleCreateNewUser,
    handleDeleteUser: handleDeleteUser,
    handleUpdateUser: handleUpdateUser,
    handleGetOneUser: handleGetOneUser,
    getAllCode: getAllCode
}