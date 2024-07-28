<template>
    <div>
        <h1 class="mt-4 mb-8">Equipe</h1>
        <p v-if="!currentMembers.length"> Não existem membros alocados para a equipe desse evento</p>
        <v-select
            class="mb-4"
            variant="outlined"
            v-if="isAdminOrStaffLeader"
            v-model="currentMembers"
            :items="usersNotInTeam"
            hint="Escolha usuários para fazerem parte da equipe!"
            item-title="name"
            multiple
            persistent-hint
            return-object
          ></v-select>
        <StaffCard
          v-for="member in currentMembers"
          :key="`${member.id}_${member.permissions}`"
          :staff="member"
          :mode="member.mode"
          :hasEditingPermissions="isAdminOrStaffLeader"
          @edit-member="editMember"
          @remove-from-team="removeFromTeam"/>
        <v-btn class="mt-8" variant="flat" v-if="isAdminOrStaffLeader" :disabled="!hasChangesToConfirm" @click="updateTeam()">Confirmar Mudanças</v-btn>
        <TeamMemberDialog v-model="dialogUpdate" :member="selectedMember" @closeDialog="closeUpdateDialog"/>
    </div>
</template>
<script>
import EventService from "../services/event.service";
import UserService from "../services/user.service";
import StaffCard from "../components/StaffCard.vue"
import TeamMemberDialog from "../components/TeamMemberDialog.vue";
export default {
    components: {
        StaffCard,
        TeamMemberDialog,
    },
    data() {
        return {
            currentMembers: [],
            originalMembers: [],
            users: [],
            isAdminOrStaffLeader: false,
            dialogUpdate: false,
            selectedMember: null,
        }
    },
    methods: {
        updateTeam() {
            let user_ids = this.currentMembers.filter((member) => member.mode !== "remove").map((member) => member.id)
            EventService.updateTeam(this.team_id, user_ids, this.$route.params.slug).then((team) => {
                this.currentMembers = team.users.map((member) => ({ ...member, mode: "current" }));
                this.originalMembers = team.users.map((member) => ({ ...member, mode: "current" }));
            });
        },
        editMember(member) {
            this.selectedMember = member;
            this.dialogUpdate = true;
        },
        closeUpdateDialog(member) {
            this.dialogUpdate = false;

            let idx = this.currentMembers.findIndex((a) => a.id === member.id)
            this.currentMembers[idx] = { ...member, mode: 'current' };
            idx = this.originalMembers.findIndex((a) => a.id === member.id)
            this.originalMembers[idx] = { ...member, mode: 'current' };

            this.selectedMember = null;
        },
        removeFromTeam(member) {
            const idx = this.currentMembers.indexOf(member);
            if (member.mode === "current") this.currentMembers[idx].mode = "remove";
            else if (member.mode === "remove") this.currentMembers[idx].mode = "current";
            else if (member.mode === "add") this.currentMembers.splice(idx, 1);
        },
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
<style scoped>
.v-btn{
    color: white;
    background-color: #FF7A00;
}
.v-select {
    width: 320px;
}
</style>