import axios from 'axios';
import authHeader from './auth-header';

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

    enroll(talk_ids){
        return axios
        .post(API_URL + 'participate' , {talk_ids}, { headers: authHeader() })
    }
}

export default new EventService();