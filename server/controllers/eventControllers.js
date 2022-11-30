import EventModel from "../models/eventModel";


// CREATE

export const addNewEvent = async (req, res) => {
    console.log(req.body);
    const newEvent = new EventModel(req.body);
    console.log(newEvent);
    try {
        await newEvent.save();
        res.send(newEvent);
    } catch(err) {
        res.send(err);
    }
};


// READ ALL

export const getEvents = async (req, res) => {
    try {
        const data = await EventModel.find({});
        res.send(data);
    } catch(err) {
        res.send(err);
    }
};


// READ

export const getEventById = async (req, res) => {
    try {
        const data = await EventModel.findById(req.params.eventID);
        res.send(data);
    } catch(err) {
        res.status(404).json({message: "Not found"});
    }
}


// UPDATE

export const updateEventById = async (req, res) => {
    try {
        const data = await EventModel.findByIdAndUpdate(
            {_id: req.params.eventID},
            req.body,
            {new: true}
        );
        res.send(data);
    } catch(err) {
        res.status(404).json({message: "Not found"});
    }
}


// DELETE

export const deleteEvent = async (req, res) => {
    try {
        await EventModel.deleteOne({_id: req.params.eventID});
        res.json({message: "Record removed"});
    } catch(err) {
        res.send(err);
    }
}



