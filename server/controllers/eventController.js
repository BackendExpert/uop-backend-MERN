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
            const eventall = await Event.find().populate('addby')

            return res.json({ Result: eventall })
        }
        catch (err) {
            console.log(err)
        }
    },

    geteventaddby: async (req, res) => {
        try {
            const email = req.params.email

            const events = await Event.find({ email: email }).populate('addby')

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
                id,
                [
                    {
                        $set: {
                            isAccepted: { $not: "$isAccepted" },
                        }
                    }
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
            const id = req.params.id;

            const {
                title,
                date,
                description,
                link
            } = req.body;

            const image = req.file?.filename;

            // Fetch the existing event from DB
            const event = await Event.findById(id);
            if (!event) {
                return res.status(404).json({ Error: "Event not found" });
            }

            // Optional field validation if present but empty
            if (
                ('title' in req.body && !title.trim()) ||
                ('date' in req.body && !date.trim()) ||
                ('description' in req.body && !description.trim()) ||
                ('link' in req.body && !link.trim())
            ) {
                return res.status(400).json({ Error: "One or more required fields are empty" });
            }

            // Update only the fields that are provided
            if (title) event.title = title;
            if (date) event.date = date;
            if (description) event.description = description;
            if (link) event.link = link;
            if (image) event.image = image;

            // Save updated document
            await event.save();

            return res.json({ Status: "Success", Message: "Event Updated Successfully" });

        } catch (err) {
            console.error("Update Error:", err);
            return res.status(500).json({ Error: "Internal Server Error", Details: err.message });
        }
    },



    activeEvents: async (req, res) => {
        try {
            const events = await Event.find({ isAccepted: true })

            return res.json({ Result: events })
        }
        catch (err) {
            console.log(err)
        }
    }
};

module.exports = eventController;   