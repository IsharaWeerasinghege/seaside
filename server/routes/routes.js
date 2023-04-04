import express from 'express';
import {signIn, signUp} from "./auth.js";
import {viewProfile} from "./client.js";
import {deleteYacht, filterYacht, updateYacht, viewYacht, viewYachtList} from "./admin.js";
import {verifyToken} from "../middleware/auth.js";
import {deleteCrewMember, getCrewMember, updateCrewMember, viewCrewList} from "./crew.js";
import {viewSupplier} from "./supplier.js";
import {
    createReservation,
    getReservationList,
    getReservationListByUser,
    updateReservationStatus
} from "./reservation.js";
import {createFeedback, getFeedbackList, updateFeedbackStatus} from "./feedback.js";

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


/**
 * crew routes
 */
router.get('/crew/list', verifyToken,  viewCrewList);
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






export default router;