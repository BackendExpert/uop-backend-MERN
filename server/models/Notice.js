const mongoose = require('mongoose');

const NoticeSchema = new mongoose.Schema({
    notice_title: {
        type: String,
        required: true,
    },
    notice_link: {
        type: String,
        required: true,
    },
    notice_desc: {
        type: String,
        required: true,
    },
    notice_date: {
        type: Date,
        required: true
    },
    is_accepted: {
        type: Boolean,
        default: false 
    },
    is_active: {
        type: Boolean,
        default: true
    },
    addby: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, {timestamps: true});

const Notice = mongoose.model('Notice', NoticeSchema);

module.exports = Notice;