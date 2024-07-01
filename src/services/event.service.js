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

    enroll(talk_ids, event_slug){
        return axios
        .post(API_URL + 'participate' , {talk_ids, event_slug}, { headers: authHeader() })
    }

    getUserAgenda(event_slug){
        return axios
        .get(API_URL + 'vacancies/me', { headers: authHeader(), params: {event_slug} })
        .then(response => response.data)
    }

    getEventMerchandise(event_slug){
        return axios
        .get(API_URL + 'events/' + event_slug + '/merches')
        .then(response => response.data)
    }
}

export default new EventService();