import "../styles/NewEventForm.css";

const NewEventForm = (props) => {
    return (
        <div className="new-event-form">
        <h3>Add new event</h3>
        <br/>
        <form action="#" encType="multipart/form-data">
            <label htmlFor="type">Event type</label>
            <br/>
            <select id="type" name="event-type">
                <option>Meet-up</option>
                <option>Point Of Interest</option>
                <option>Marker</option>
            </select>
            <br/>
            <label htmlFor="title">Title</label>
            <input type="text" id="title" name="event-title" />
            <br/>
            <label htmlFor="description">Description</label>
            <input type="text" id="description" name="event-description" />
            <br/>
            <label htmlFor="upload">Select Image:</label>
            <input type="file" id="upload" name="event-image" accept="image/*" />
            <br/>
            <img src="#" alt="event image" />
            <br/>
            <input type="button" value="Create" onClick={() => {props.add()}} />
            <input type="button" value="Cancel" onClick={() => {props.cancel()}}/>
        </form>
        </div>
    );
};

export default NewEventForm;