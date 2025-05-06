const Event = require("../models/Event");
const User = require("../models/User");

const eventController = {
    createEvent: async (req, res) => {
        try {
            const addby = req.params.email

            const {
                title,
                date,
                description,
                link
            } = req.body

            const image = req.file?.filename;

            const user = await User.findOne({ email: addby })

            const newEvent = new Event({
                title: title,
                date: date,
                description: description,
                link: link,
                image: image,
                addby: user._id
            })

            const resultEvent = await newEvent.save()

            if (resultEvent) {
                return res.json({ Status: "Success", Message: "Event Created Success" })
            }
            else {
                return res.json({ Error: "Internal Server Error while Creating Event" })
            }

        }
        catch (err) {
            console.log(err)
        }
    },

    getallEvent: async (req, res) => {
        try {
            const eventall = await Event.find()

            return res.json({ Result: eventall })
        }
        catch (err) {
            console.log(err)
        }
    },

    geteventaddby: async (req, res) => {
        try {
            const email = req.params.email

            const events = await Event.find({ email: email })

            return res.json({ Result: events })
        }
        catch (err) {
            console.log(err)
        }
    },

    acceptRejectEvent: async (req, res) => {
        try {
            const id = req.params.id

            const findEventUpdate = await Event.findByIdAndUpdate(
                { id },
                [
                    { $set: { 
                        isAccepted: { $not: "$isAccepted" },
                        isActive: true
                     } }
                ],
                { new: true }
            )

            if (findEventUpdate) {
                return res.json({ Status: "Success", Message: "Event Update Success" })
            }
            else {
                return res.json({ Error: "Internal Server Error While Updating the Event" })
            }
        }
        catch (err) {
            console.log(err)
        }
    },

    updateEvent: async (req, res) => {
        try {
            const id = req.params.id

            const {
                title,
                date,
                description,
                link
            } = req.body

            const image = req.file?.filename;

            if (
                ('title' in req.body && !title.trim()) ||
                ('date' in req.body && !date.trim()) ||
                ('description' in req.body && !description.trim()) ||
                ('link' in req.body && !link.trim())
            ) {
                return res.status(400).json({ Error: "One or more required fields are empty" });
            }

            const updateFields = {};
            if (title) updateFields.title = title;
            if (date) updateFields.date = date;
            if (description) updateFields.description = description;
            if (link) updateFields.link = link;
            if (image) updateFields.image = image;

            const updatedEvent = await Event.findByIdAndUpdate(id, updateFields, { new: true });

            if (updatedEvent) {
                return res.json({ Status: "Success", Message: "Event Updated Success" })
            }
            else{
                return res.json({ Error: "Inteanl Server Error whitle updating the Event" })
            }
        }
        catch (err) {
            console.log(err)
        }
    },

    activeEvents: async(req, res) => {
        try{
            const events = await Event.find({
                $and: [
                    { isActive: true },
                    { isAccepted: true },
                ]
            })

            return res.json({ Result: events })
        }
        catch(err){
            console.log(err)
        }
    }
};

module.exports = eventController;   