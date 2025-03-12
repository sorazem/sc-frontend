import axios from 'axios';
import authHeader from './auth-header';

class EventService{
    listEvents(){
        return axios
        .get(process.env.VUE_APP_API_URL + '/events', { headers: authHeader() })
        .then(response => response.data
        );
    }

    getEventSchedule(eventSlug){
        return axios
        .get(process.env.VUE_APP_API_URL + '/events/' + eventSlug)
        .then(response => response.data);
    }

    enroll(talk_ids, event_slug){
        return axios
        .post(process.env.VUE_APP_API_URL + '/participate' , {talk_ids, event_slug}, { headers: authHeader() })
    }

    enrollAsStaff(talk_id, user_ids, event_slug) {
        return axios
        .post(process.env.VUE_APP_API_URL + '/enroll', { talk_id, user_ids, event_slug }, { headers: authHeader() })
        .then((response) => response.data);
    }

    getUserAgenda(event_slug){
        return axios
        .get(process.env.VUE_APP_API_URL + '/vacancies/me', { headers: authHeader(), params: {event_slug} })
        .then(response => response.data)
    }

    getEventMerchandise(event_slug){
        return axios
        .get(process.env.VUE_APP_API_URL + '/events/' + event_slug + '/merches', { headers: authHeader() })
        .then(response => response.data)
    }

    deleteMerch(event_slug, merch_id) {
        return axios
        .delete(process.env.VUE_APP_API_URL + '/events/' + event_slug + '/merches/' + merch_id, { headers: authHeader() })
        .then(response => response.data)
    }

    getEventNoticesForUser(event_slug){
        return axios
        .get(process.env.VUE_APP_API_URL + '/events/' + event_slug + '/notifications', { headers: authHeader() })
        .then(response => response.data)
    }

    getEventStaffNotices(event_slug){
        return axios
        .get(process.env.VUE_APP_API_URL + '/events/' + event_slug + '/notifications/staff', { headers: authHeader() })
        .then(response => response.data)
    }

    isEventStaff(event_slug){
        return axios
        .get(process.env.VUE_APP_API_URL + '/events/' + event_slug + '/staff', { headers: authHeader() })
        .then(response => response.data)
    }

    emitEventCertifications(event_slug){
        return axios
        .post(process.env.VUE_APP_API_URL + '/certificates' , {}, { headers: authHeader(), params: { emit_from: "event", event_slug } })
    }

    emitUserEventCertifications(event_slug, user_id){
        return axios
        .post(process.env.VUE_APP_API_URL + '/certificates' , {}, { headers: authHeader(), params: { emit_from: "user", event_slug, user_id } })
    }

    getEventTalks(event_slug){
        return axios
        .get(process.env.VUE_APP_API_URL + '/events/' + event_slug + '/talks', { headers: authHeader() })
        .then(response => response.data)
    }

    getEventSpeakers(event_slug){
        return axios
        .get(process.env.VUE_APP_API_URL + '/events/' + event_slug + '/speakers', { headers: authHeader() })
        .then(response => response.data)
    }

    getTypes(){
        return axios
        .get(process.env.VUE_APP_API_URL + '/type', { headers: authHeader() })
        .then(response => response.data)
    }

    getCategories(event_slug){
        return axios
        .get(process.env.VUE_APP_API_URL + '/events/' + event_slug + '/category', { headers: authHeader() })
        .then(response => response.data)
    }

    getLocations(){
        return axios
        .get(process.env.VUE_APP_API_URL + '/location', { headers: authHeader() })
        .then(response => response.data)
    }

    deleteEventTalk(talk_id){
        return axios
        .delete(process.env.VUE_APP_API_URL + '/talks/' + talk_id, { headers: authHeader() })
        .then(response => response.data)
    }

    deleteEventNotice(event_slug, notification_id) {
        return axios
        .delete(process.env.VUE_APP_API_URL + '/events/' + event_slug + '/notifications/' + notification_id, { headers: authHeader() })
        .then((response) => response.data);
    }

    deleteEventSpeaker(speaker_id, event_slug){
        return axios
        .delete(process.env.VUE_APP_API_URL + '/speaker/' + speaker_id, { headers: authHeader(), params: {event_slug} })
        .then(response => response.data)
    }

    deleteEventCategory(event_slug, category_id){
        return axios
        .delete(process.env.VUE_APP_API_URL + '/events/' + event_slug + '/category/' + category_id, { headers: authHeader() })
        .then(response => response.data)
    }

    getEventReservations(event_slug) {
        return axios
        .get(process.env.VUE_APP_API_URL + '/events/' + event_slug + '/reservations', { headers: authHeader() })
        .then(response => response.data)
    }

    deliverReservation(event_slug, reservation_id) {
        return axios
        .put(process.env.VUE_APP_API_URL + '/events/' + event_slug + '/reservations/' + reservation_id, { delivered: true }, { headers: authHeader() })
        .then(response => response.data)
    }

    deleteReservation(event_slug, reservation_id) {
        return axios
        .delete(process.env.VUE_APP_API_URL + '/events/' + event_slug + '/reservations/' + reservation_id, { headers: authHeader() })
        .then(response => response.data)
    }

    createTalk(body){
        return axios
        .post(process.env.VUE_APP_API_URL + '/talks', body, { headers: authHeader() })
        .then(response => response.data)
    }

    updateTalk(talk){
        return axios
        .put(process.env.VUE_APP_API_URL + '/talks/' + talk.id, talk, { headers: authHeader() })
        .then(response => response.data)
    }

    createSpeaker(body, event_slug){
        return axios
        .post(process.env.VUE_APP_API_URL + '/speaker', body, { headers: { ...authHeader(), 'Content-Type': 'multipart/form-data' }, params: { event_slug } })
        .then(response => response.data)
    }

    updateSpeaker(speaker, event_slug){
        return axios
        .put(process.env.VUE_APP_API_URL + '/speaker/' + speaker.id, speaker, { headers: { ...authHeader(), 'Content-Type': 'multipart/form-data' }, params: { event_slug } })
        .then(response => response.data)
    }

    createMerch(event_slug, body) {
        return axios
        .post(process.env.VUE_APP_API_URL + '/events/' + event_slug + '/merches', body, { headers: { ...authHeader(), 'Content-Type': 'multipart/form-data' } })
        .then((response) => response.data);
    }

    updateMerch(event_slug, merch) {
        return axios
        .put(process.env.VUE_APP_API_URL + '/events/' + event_slug + '/merches/' + merch.id, merch, { headers: { ...authHeader(), 'Content-Type': 'multipart/form-data' } })
        .then((response) => response.data);
    }

    createNotice(event_slug, body) {
        return axios
        .post(process.env.VUE_APP_API_URL + '/events/' + event_slug + '/notifications', body, { headers: authHeader() })
        .then((response) => response.data);
    }

    updateNotice(event_slug, notification) {
        return axios
        .put(process.env.VUE_APP_API_URL + '/events/' + event_slug + '/notifications/' + notification.id, notification, { headers: authHeader() })
        .then((response) => response.data);
    }

    createCategory(event_slug, body) {
        return axios
        .post(process.env.VUE_APP_API_URL + '/events/' + event_slug + '/category', body, { headers: authHeader() })
        .then((response) => response.data);
    }

    updateCategory(event_slug, category) {
        return axios
        .put(process.env.VUE_APP_API_URL + '/events/' + event_slug + '/category/' + category.id, category, { headers: authHeader() })
        .then((response) => response.data);
    }

    getEventUsers(event_slug) {
        return axios
        .get(process.env.VUE_APP_API_URL + '/events/' + event_slug + '/users', {headers: authHeader()})
        .then((response) => response.data);
    }

    getAuditLogsFromDay(event_slug, day) {
        return axios
        .get(process.env.VUE_APP_API_URL + '/events/' + event_slug + '/audit', {headers: authHeader(), params: { date: day }})
        .then((response) => response.data)
    }

    createReservation(event_slug, body) {
        return axios
        .post(process.env.VUE_APP_API_URL + '/events/' + event_slug + '/reservations', body, { headers: authHeader()})
        .then((response) => response.data);
    }

    createEvent(event) {
        return axios
        .post(process.env.VUE_APP_API_URL + '/events', event, { headers: { ...authHeader(), 'Content-Type': 'multipart/form-data'}})
        .then((response) => response.data);
    }

    updateEvent(event) {
        return axios
        .put(process.env.VUE_APP_API_URL + '/events/' + event.id, event, { headers:{ ...authHeader(), 'Content-Type': 'multipart/form-data'}})
        .then((response) => response.data);
    }

    updateEventBySlug(event_slug, event) {
        return axios
        .put(process.env.VUE_APP_API_URL + '/events/' + event_slug, event, { headers:{ ...authHeader(), 'Content-Type': 'multipart/form-data'}})
        .then((response) => response.data);
    }

    deleteEvent(event) {
        return axios
        .delete(process.env.VUE_APP_API_URL + '/events/' + event.id, { headers: authHeader()})
        .then((response) => response.data);
    }

    createType(type) {
        return axios
        .post(process.env.VUE_APP_API_URL + '/type', type, { headers: authHeader()})
        .then((response) => response.data);
    }

    updateType(type) {
        return axios
        .put(process.env.VUE_APP_API_URL + '/type/' + type.id, type, { headers: authHeader()})
        .then((response) => response.data);
    }

    deleteType(type) {
        return axios
        .delete(process.env.VUE_APP_API_URL + '/type/' + type.id, { headers: authHeader()})
        .then((response) => response.data);
    }

    getTeamByEvent(event_slug) {
        return axios
        .get(process.env.VUE_APP_API_URL + "/teams/" + event_slug, {headers: authHeader()})
        .then((response) => response.data);
    }

    updateTeam(id, user_ids, slug) {
        return axios
        .put(process.env.VUE_APP_API_URL + '/teams/' + id, { user_ids}, { headers: authHeader(), params: { slug }})
        .then((response) => response.data);
    }

    updateMember(member, event_slug) {
        return axios
        .put(process.env.VUE_APP_API_URL + '/user/' + member.id, member, { headers: authHeader(), params: { event_slug } })
        .then((response) => response.data);
    }

    publishEvent(event_slug) {
        return axios
        .put(process.env.VUE_APP_API_URL + '/events/' + event_slug + '/publish', {}, { headers: authHeader() })
        .then((response) => response.data);
    }

    deleteVacancy(vacancy_id) {
        return axios
        .delete(process.env.VUE_APP_API_URL + '/vacancies/' + vacancy_id, { headers: authHeader() })
        .then((response) => response.data);
    }
}

export default new EventService();
