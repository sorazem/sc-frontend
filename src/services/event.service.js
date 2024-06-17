import axios from 'axios';

const API_URL = 'http://localhost:3000/';

class EventService{
    listEvents(){
        return axios
        .get(API_URL + 'events', {})
        .then(response => response.data
        );
    }

    getEventSchedule(eventSlug){
        return axios
        .get(API_URL + 'events/' + eventSlug)
        .then(response => response.data);
    }
}

export default new EventService();