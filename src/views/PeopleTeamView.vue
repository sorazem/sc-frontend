<template>
    <div>
        <h1>Equipe</h1>
        <p v-if="!members.current.length"> Não existem membros alocados para a equipe desse evento</p>
        <v-select
            v-model="members.add"
            :items="users"
            hint="Escolha usuários para fazerem parte da equipe!"
            label="Escolha"
            item-title="name"
            multiple
            persistent-hint
            return-object
          ></v-select>
        <StaffCard v-for="member in members.current" :key="member.id"  :staff="member" color="default" variant="elevated"/>
        <StaffCard v-for="member in members.add" :key="member.id" :staff="member" color="green" variant="outlined"/>
        <StaffCard v-for="member in members.remove" :key="member.id" :staff="member" color="red" variant="outlined"/>
        <StaffCard v-for="member in members.update" :key="member.id" :staff="member" color="blue" variant="outlined"/>

        <v-btn :disabled="!hasChangesToConfirm" @click="updateTeam()">Confirmar Mudanças</v-btn>
    </div>
</template>
<script>
import EventService from "../services/event.service";
import UserService from "../services/user.service";
import StaffCard from "../components/StaffCard.vue"
export default {
    components: {
        StaffCard,
    },
    data() {
        return {
            members: {
                current: [],
                add: [],
                remove: [],
                update: [],
            },
            users: [],
        }
    },
    methods: {
        updateTeam() {
            EventService.updateTeam(this.team_id, this.members.add.map((member) => member.id)).then((response) => {
                console.log(response);
            })
        }
    },
    computed: {
        hasChangesToConfirm() {
            return Object.keys(this.members).reduce((acc, curr) => { 
                if (curr === "current") return acc;
                return acc + this.members[curr].length;
            }, 0) > 0;
        }
    },
    mounted() {
        EventService.getTeamByEvent(this.$route.params.slug).then((members) => {
            this.team_id = members.id;
            this.members.current = members.users;
        });
        UserService.listUsers().then((users) => {
            this.users = users;
        })
    }
}
</script>
