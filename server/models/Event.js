const mongoose = require('mongoose');

const EventSchema = new mongoose.Schema({
    title: { type: String, required: true },
    date: { type: date, required: true },
    description: { type: String, required: true },
    link: { type: String, required: true },
    image: { type: String, required: true },
    isAccepted: { type: Boolean, required: true, default: false },
    addby: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
});

const Event = mongoose.model('Event', EventSchema);

module.exports = Event;