import Feedback from "../models/feedback.js";

/**
 * create feedback
 */
export const createFeedback = async (req, res) => {
    const {name, email, message, phone} = req.body;
    const newFeedback = new Feedback({
        name,
        email,
        message,
        phone
    });
    try {
        await newFeedback.save();
        res.status(200).json({message: 'Feedback sent successfully'});
    } catch (err) {
        res.status(500).json(err);
    }
}

/**
 * get feedback list
 */

export const getFeedbackList = async (req, res) => {
    try {
        const feedbacks = await Feedback.find().sort({createdAt: -1});
        res.status(200).json(feedbacks);
    } catch (err) {
        res.status(500).json(err);
    }
}

/**
 * update feedback status
 */
export const updateFeedbackStatus = async (req, res) => {
    try {
        const {status} = req.body;
        if (status === 'resolved') {
            await Feedback.findByIdAndUpdate(req.params.id, {
                status: 'resolved'
            });
        } else if (status === 'rejected') {
            await Feedback.findByIdAndUpdate(req.params.id, {
                status: 'rejected'
            });
        }
        res.status(200).json({message: 'Feedback status updated successfully'});
    } catch (err) {
        res.status(500).json(err);
    }
}
