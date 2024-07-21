<template>
    <div>
        <h1>Equipe</h1>
        <p v-if="!currentMembers.length"> Não existem membros alocados para a equipe desse evento</p>
        <v-select
            v-if="isAdminOrStaffLeader"
            v-model="currentMembers"
            :items="usersNotInTeam"
            hint="Escolha usuários para fazerem parte da equipe!"
            label="Escolha"
            item-title="name"
            multiple
            persistent-hint
            return-object
          ></v-select>
        <StaffCard
          v-for="member in currentMembers"
          :key="member.id"
          :staff="member"
          :mode="member.mode"
          :hasEditingPermissions="isAdminOrStaffLeader"
          @edit-member="editMember"
          @remove-from-team="removeFromTeam"/>
        <v-btn v-if="isAdminOrStaffLeader" :disabled="!hasChangesToConfirm" @click="updateTeam()">Confirmar Mudanças</v-btn>
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
            currentMembers: [],
            originalMembers: [],
            users: [],
            isAdminOrStaffLeader: false,
        }
    },
    methods: {
        updateTeam() {
            let user_ids = this.currentMembers.filter((member) => member.mode !== "remove").map((member) => member.id)
            EventService.updateTeam(this.team_id, user_ids, this.$route.params.slug);
        },
        editMember(member) {
            console.log(`Tenho membro pra editar!!! ${member.name}`)
        },
        removeFromTeam(member) {
            console.log(`Tenho membro pra remover!!! ${member.name}`)
            const idx = this.currentMembers.indexOf(member);
            if (member.mode === "current") this.currentMembers[idx].mode = "remove";
            else if (member.mode === "remove") this.currentMembers[idx].mode = "current";
            else if (member.mode === "add") this.currentMembers.splice(idx, 1);
        }
    },
    computed: {
        hasChangesToConfirm() {
            for (const member of this.currentMembers) {
                if (member.mode !== 'current') {
                    return true;
                }
            }
            return false;
        },

        usersNotInTeam() {
            let teamIDS = this.currentMembers.map((member) => member.id);
            return this.users.filter((user) => !teamIDS.includes(user.id)).map((user) => ({ ...user, mode: 'add'}));
        }
    },
    mounted() {
        EventService.getTeamByEvent(this.$route.params.slug).then((members) => {
            this.team_id = members.id;
            this.currentMembers = members.users.map((member) => ({ ...member, mode: "current" }));
            this.originalMembers = members.users.map((member) => ({ ...member, mode: "current" }));
        });
        UserService.listUsers(this.$route.params.slug).then((users) => {
            this.isAdminOrStaffLeader = true;
            this.users = users;
        }).catch((err) => {
            if (err.response.status === 401)  {
                this.isAdminOrStaffLeader = false;
            } else {
                throw err;
            }
        })
    }
}
</script>
