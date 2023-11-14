import db from "../models"
import CRUDService from "../services/CRUDService";


let getHomePage = async (req, res) => {
    try {
        let data = await db.User.findAll();
        return res.render('homePage.ejs', {
            data: JSON.stringify(data)
        })
    } catch (error) {
        console.log(error)
    }

}

let getAbout = (req, res) => {
    return res.render('test/about.ejs')
}

let getCRUD = (req, res) => {
    return res.render('crud.ejs');
}

let postCRUD = async (req, res) => {
    let message = await CRUDService.createNewUser(req.body)
    console.log("message: ", message)
    return res.send("post crud from server")
}

let getAllUser = async (req, res) => {
    let data = await CRUDService.getAllUser()
    // console.log("check data asasdasd: ", data)
    return res.render('test/displayCRUD.ejs', {
        dataTable: data
    })

}

let getOneCRUD = async (req, res) => {
    let data = await CRUDService.getOneUser()
    console.log("check one data: ", data)
    return res.render("test/displayOneCRUD.ejs", {
        dataTable1: data
    })

}

let getEditCRUD = async (req, res) => {
    let userId = req.query.id;
    console.log(userId)
    if (userId) {
        let userData = await CRUDService.getUserInforById(userId)
        return res.render("test/editCRUD.ejs", {
            user: userData
        })
    }
    else {
        return res.send("Users not found")
    }

}

let putCRUD = async (req, res) => {
    let data = req.body;
    await CRUDService.updateUserData(data)
    return res.send("Update done")
}

let deleteCRUD = async (req, res) => {
    let id = req.query.id;
    await CRUDService.deleteUserByIdWithQuery(id);

    return res.redirect('back')
}


let connection = (req, res) => {
    let mysql = require('mysql2')

    let con = mysql.createConnection({
        host: "127.0.0.1",
        user: "root",
        password: null,
        database: "hoidanit"
    })
    try {
        con.query("select*from users where id = 2", function (err, result, field) {
            if (err) throw console.log("check err: ", err);
            console.log("-----------------------------")
            console.log("check data", result);
            return res.render("test/displayOneCRUD.ejs", {
                data: JSON.stringify(result)
            })
        });
    } catch (error) {
        console.log("check error:", error);
    }
}


module.exports = {
    getHomePage: getHomePage,
    getAbout: getAbout,

    getCRUD: getCRUD,
    postCRUD: postCRUD,
    getAllUser: getAllUser,
    getOneCRUD: getOneCRUD,
    getEditCRUD: getEditCRUD,
    putCRUD: putCRUD,
    deleteCRUD: deleteCRUD,

    connection: connection
}