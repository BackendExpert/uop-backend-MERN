const mongoose = require('mongoose');

const EventSchema = new mongoose.Schema({
    title: { type: String, required: true, trim: true },
    date: { type: Date, required: true },
    description: { type: String, required: true, trim: true },
    link: { type: String, required: true, trim: true },
    image: { type: String, required: true, trim: true },
    isActive: { type: Boolean, default: true },
    isAccepted: { type: Boolean, default: false },
    addby: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, { timestamps: true });

// Middleware to set isActive = false if the date is in the past (before saving)
EventSchema.pre('save', function (next) {
    if (this.date < new Date()) {
        this.isActive = false;
    } else {
        this.isActive = true;
    }
    next();
});

// Middleware to handle isActive during updates (findByIdAndUpdate, findOneAndUpdate, etc.)
EventSchema.pre('findOneAndUpdate', function (next) {
    const update = this.getUpdate();

    // Ensure proper handling of nested $set updates
    const newDate = update.date || (update.$set ? update.$set.date : null);

    if (newDate) {
        const eventDate = new Date(newDate);
        const isPast = eventDate < new Date();

        if (update.$set) {
            update.$set.isActive = !isPast;
        } else {
            update.isActive = !isPast;
        }
    }

    next();
});

const Event = mongoose.model('Event', EventSchema);

module.exports = Event;
