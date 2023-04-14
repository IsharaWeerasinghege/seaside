import express from 'express';
import {signIn, signUp} from "./auth.js";
import {viewProfile} from "./client.js";
import {
    addMaintenance,
    deleteYacht,
    filterYacht,
    fuelRefill,
    getAllYachtMaintenanceDetails,
    updateYacht,
    viewYacht,
    viewYachtList
} from "./admin.js";
import {verifyToken} from "../middleware/auth.js";
import {deleteCrewMember, getCrewMember, updateCrewMember, viewCrewList} from "./crew.js";
import {viewSupplier} from "./supplier.js";
import {
    createBooking,
    createReservation,
    getBookingList,
    getBookingListByUser,
    getReservationList,
    getReservationListByUser,
    updateBookingStatus,
    updateReservationStatus
} from "./reservation.js";
import {createFeedback, getFeedbackList, updateFeedbackStatus} from "./feedback.js";
import {createPackage, deletePackage, getPackages, readPackage} from "./package.js";
import {addInventoryItems, getInventory, getInventoryById} from "./inventory.js";

const router = express.Router();

/**
 * auth routes
 */
router.post('/signup', signUp)
router.post('/signin', signIn)


/**
 * reservation routes
 */
router.post('/reservation/create', verifyToken, createReservation)
router.get('/reservation/list', verifyToken, getReservationList)
router.put('/reservation/update/:id', verifyToken, updateReservationStatus)
router.get('/reservation/list/:id', verifyToken, getReservationListByUser);

// package routes
router.post('/booking/create', verifyToken, createBooking);
router.get('/booking/list', verifyToken, getBookingList)
router.put('/booking/update/:id', verifyToken, updateBookingStatus)
router.get('/booking/list/:id', verifyToken, getBookingListByUser);


/**
 * crew routes
 */
router.get('/crew/list', verifyToken, viewCrewList);
router.delete('/crew/delete/:id', verifyToken, deleteCrewMember);
router.put('/crew/update/:id', verifyToken, updateCrewMember);
router.get('/crew/:id', verifyToken, getCrewMember);

/**
 * supplier routes
 */
router.get('/supplier/list', verifyToken, viewSupplier);
router.delete('/supplier/delete/:id', verifyToken, deleteCrewMember);


/**
 * yacht routes
 */
router.get('/yacht/list', viewYachtList);
router.post('/yacht/filter', filterYacht);
router.get('/yacht/:id', viewYacht);
router.delete('/yacht/delete/:id', verifyToken, deleteYacht);
router.put('/yacht/update/:id', verifyToken, updateYacht)
router.post('/yacht/refill', verifyToken, fuelRefill);
router.post('/yacht/maintenance/add', verifyToken, addMaintenance);
router.get('/yacht/maintenance/list', getAllYachtMaintenanceDetails);

/**
 * feedback routes
 */
router.post('/feedback/create', createFeedback)
router.get('/feedback/list', verifyToken, getFeedbackList)
router.put('/feedback/update/:id', verifyToken, updateFeedbackStatus)


/**
 * client routes
 */
router.get('/profile', viewProfile)

/**
 * package routes
 */
router.post('/package/create', verifyToken, createPackage);
router.get('/package/list', getPackages);
router.get('/package/:id', readPackage);
router.delete('/package/delete/:id', verifyToken, deletePackage);

/**
 * inventory routes
 */
router.get('/inventory/list', verifyToken, getInventory);
router.get('/inventory/list/:id', verifyToken, getInventoryById);
router.post('/inventory/update', verifyToken, addInventoryItems);


export default router;