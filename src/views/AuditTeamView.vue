<template>
    <div>
        <h1>Logs de Auditoria</h1>
        <pre>
        {{ currentLog }}
        </pre>
    </div>
</template>
<script>
import eventService from '@/services/event.service';
// import store from '@/store';
import { DateTime } from 'luxon';
export default {
    data() {
        return {
            currentLog: null,
        }
    },
    mounted() {
        const date = DateTime.now().toFormat('dd-MM-yyyy');
        eventService.getAuditLogsFromDay(this.$route.params.slug, date).then((response) => {
            this.currentLog = response;
        }).catch(() => { this.currentLog = ''; })
    }
}
</script>
<style scoped>
    
</style>
