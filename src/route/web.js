import express from "express";
import homeController from "../controllers/homeController";
import userController from "../controllers/userController";
import doctorController from '../controllers/doctorController'
import clinicController from "../controllers/clinicController"


let router = express.Router();

let InitWebRouter = (app) => {
    router.get('/', homeController.getHomePage);
    router.get('/about', homeController.getAbout)
    router.get('/crud', homeController.getCRUD)
    router.post('/post-crud', homeController.postCRUD)
    router.get('/get-crud', homeController.getAllUser)
    router.get('/edit-crud', homeController.getEditCRUD)
    router.post('/put-crud', homeController.putCRUD)
    router.get('/delete-crud', homeController.deleteCRUD)


    router.post('/api/login', userController.handleLogin)
    router.get('/api/get_all_users', userController.handleGetAllUser)
    router.post('/api/create_New_User', userController.handleCreateNewUser)
    router.delete('/api/delete_User', userController.handleDeleteUser)
    router.put('/api/update_User', userController.handleUpdateUser)
    router.get('/api/allcode', userController.getAllCode)

    router.get('/api/top_doctor_home', doctorController.getTopDoctorHome)
    router.get('/api/getAllDoctor', doctorController.getAllDoctors)
    router.post('/api/save-infor-doctors', doctorController.postInforDoctors)
    router.get('/api/get-detail-doctor-by-id', doctorController.getDetailDoctorById)

    router.post('/api/create_new_clinic', clinicController.handleCreateNewClinic)
    router.get('/api/get_all_clinic', clinicController.handleGetAllClinic)
    router.get('/api/get_one_clinic', clinicController.handleGetOneClinic)

    //get one user(No instructions)
    router.post('/api/getOneUser', userController.handleGetOneUser)

    router.get('/get-one-crud', homeController.connection)
    return app.use("/", router);
}

module.exports = InitWebRouter;
