<template>
    <div class="pa-4 content text-left">
        <v-form v-model="form">
            <v-img class="hidden-sm-and-down" src="../../src/assets/profile2.png" :width="280" />
            <h3>Nome</h3>
            <v-text-field 
                v-model="user.name" 
                :readonly="!editMode" 
                variant="outlined" 
                density="compact"
                :rules="[required]"
            ></v-text-field>
            <h3>Email</h3>
            <v-text-field 
                v-model="user.email" 
                :readonly="!editMode" 
                variant="outlined" 
                density="compact"
                :rules="[required]"
            ></v-text-field>
            <h3>Ocupação</h3>
            <v-text-field 
                v-if="!editMode" 
                :readonly="!editMode" 
                variant="outlined" 
                density="compact"
            >
                {{ user.ocupation }}
            </v-text-field>
            <v-select 
                v-if="editMode" 
                v-model="user.ocupation" 
                :items="ocupacaoItems" 
                variant="outlined" 
                density="compact" 
                @update:model-value="resetInstitution"
                :rules="[required]"
            ></v-select>
            <h3>Instituição</h3>
            <v-text-field 
                v-if="!editMode" 
                :readonly="!editMode" 
                variant="outlined" 
                density="compact"
            >
                {{ user.institution }}
            </v-text-field>
            <v-select 
                v-if="editMode" 
                v-model="user.institution" 
                :items="user.ocupation == 'Estudante de ensino médio'? instituicaoMedioItems : instituicaoSuperiorItems" 
                variant="outlined" 
                density="compact" 
                @update:model-value="resetDRE"
                :rules="[required]">
            </v-select>
            <h3 v-if="user?.dre || user.institution == 'UFRJ'">DRE</h3>
            <v-text-field 
                v-if="user?.dre || user.institution == 'UFRJ'" 
                v-model="user.dre" 
                :readonly="!editMode" 
                variant="outlined" 
                density="compact"
                :rules="[required]">
            </v-text-field>
            <v-divider class="my-8"></v-divider>
            <v-btn v-if="!editMode" variant='flat' color="#9C66BD" @click='editMode=true'>Editar dados</v-btn>
            <v-btn v-if="editMode" variant='outlined' color="#9C66BD" @click='editAccount()' :disabled="!form">Salvar alterações</v-btn>
            <v-btn class="d-block mt-8" variant='flat' color="#9C66BD" @click='showDialog=true'>Deletar conta</v-btn>
        </v-form>
        <v-dialog :modelValue="showDialog" width="auto">
            <v-card max-width="400" text="Quer mesmo excluir sua conta? Você não pode voltar atrás nesta ação" >
                <template v-slot:actions>
                    <v-btn class="mx-auto" text="Não" @click="showDialog=false"></v-btn>
                    <v-btn class="mx-auto" text="Sim" @click="deleteAccount()"></v-btn>
                </template>
            </v-card>
        </v-dialog>
    </div>
</template>
<script>
import UserService from '@/services/user.service';
export default {
    data(){
        return{
            form: false,
            showDialog: false,
            editMode: false,
            user: null,
            ocupacaoItems: ['Estudante de ensino superior', 'Estudante de ensino médio', 'Professor', 'Outro'],
            instituicaoSuperiorItems: ['UFRJ', 'UFF', 'UERJ', 'UFRRJ', 'PUC', 'UNIRIO', 'UVA', 'Estácio de Sá', 'CEFET', 'FAETEC', 'Pedro II', 'Outros'],
            instituicaoMedioItems: ['Pedro II', 'CEFET', 'CAp UFRJ', 'Outros']
        }
    },
    computed:{
        currentUser(){
            return JSON.parse(localStorage.getItem("user"))?.user;
        }
    },
    methods:{
        required (v) {
            return !!v || 'Este campo é obrigatório'
        },
        resetInstitution(){
            this.user.institution = '';
            this.user.dre = null;
        },
        resetDRE(){
            this.user.dre = null;
        },
        deleteAccount(){
            UserService.deleteAccount(this.currentUser.id).then(
                ()=>{
                    localStorage.removeItem('user');
                    this.$router.push('/');
                }
            );
        },
        editAccount(){
            UserService.editAccount(this.user).then(
                (response)=>{
                    let edittedUser = JSON.parse(localStorage.getItem("user"));
                    edittedUser.user = response;
                    localStorage.setItem('user', JSON.stringify(edittedUser));
                }
            );
            this.editMode = false;
        }
    },
    created(){
        this.user = JSON.parse(localStorage.getItem("user"))?.user;
    }
}
</script>
<style scoped>
h3{
    color: #9C66BD;
}
p{
    margin-bottom: 16px;
}
.v-card-actions > .v-btn{
    color: white;
    background-color: #9C66BD;
}
.v-text-field{
    width: 320px;
}
.v-img{
    position: absolute;
    right: 15%;
    top: 30%;
}
</style>