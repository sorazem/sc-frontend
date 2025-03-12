<template>
    <div>
        <v-snackbar v-model="snackbar" :timeout="2000">{{ message }}</v-snackbar>
        <v-btn color="#FF7A00" size="large" variant="flat" @click='openNewDialog'>
            Adicionar mercadoria
        </v-btn>
        <v-card v-for="merch in merches" :key='merch.id' variant="outlined" class="my-8 pa-2 text-left">
            <img :src="merchImage(merch)" alt="">
            <v-card-title>{{merch.name}}</v-card-title>
            <v-card-text>
                <p>{{ formatPrice(merch.price) }}</p>
                <p>{{ merch.reservations }} reservas</p>
                <p>{{ merch.stock - merch.reservations }} em estoque</p>
                <p>{{ merch.stock }} estoque total</p>
            </v-card-text>
            <v-card-actions class="d-flex justify-space-evenly">
                <v-btn text="Editar" variant="flat" @click='openUpdateDialog(merch)'></v-btn>
                <v-btn text="Excluir" variant="text" @click='openDeleteDialog(merch)'></v-btn>
            </v-card-actions>
        </v-card>
        <DeleteItemDialog 
        :showDialog='dialogDelete'
        @cancel-deletion='dialogDelete = false'
        @delete-item='deleteMerch(selectedMerch)'
        />
        <NewMerchandiseDialog v-model='dialogNew' :willCreate='willCreate' :selectedMerch='selectedMerch' @closeDialog='closeNewDialog' @changeMessage='changeMessage'/>
    </div>
</template>
<script>
import DeleteItemDialog from '../components/DeleteItemDialog.vue'
import EventService from '../services/event.service.js';
import NewMerchandiseDialog from '../components/NewMerchandiseDialog.vue'
export default {
    components: {
        DeleteItemDialog,
        NewMerchandiseDialog,
    },
    data() {
        return {
            merches: [],
            selectedMerch: null,
            dialogDelete: false,
            dialogNew: false,
            snackbar: false,
            message: '',
            willCreate: true
        }
    },
    methods: {
        merchImage(merch) {
            if (merch.image_url) {
                return `${process.env.VUE_APP_API_URL}${merch.image_url}`;
            } else return '';
        },

        deleteMerch(merch) {
            EventService.deleteMerch(this.$route.params.slug, merch.id).then((response) => {
                this.merches.splice(this.merches.indexOf(merch),1);
                this.message = response.message;
                this.snackbar = true;
                this.dialogDelete = false;
            })
        },

        formatPrice(cents) {
            return `R$ ${(cents / 100).toFixed(2)}`;
        },

        openDeleteDialog(merch) {
            this.selectedMerch = merch;
            this.dialogDelete = true;
        },

        openNewDialog() {
            this.selectedMerch = null;
            this.willCreate = true;
            this.dialogNew = true;
        },

        openUpdateDialog(merch) {
            this.selectedMerch = merch;
            this.willCreate = false;
            this.dialogNew = true;
        },

        closeNewDialog() {
            this.dialogNew = false;
            EventService.getEventMerchandise(this.$route.params.slug).then(
                (response)=>this.merches = response
            )
        },
        changeMessage(message){
            this.message = message;
            this.snackbar = true;
        }
    },
    mounted() {
        EventService.getEventMerchandise(this.$route.params.slug).then((response) => {
            this.merches = response;
        })
    }
}
</script>
<style scoped>
    .v-card-actions > .v-btn{
        color: white;
        background-color: #FF7A00;
    }
    .v-card{
        width: 320px;
        border-radius: 16px;
        border-color: lightgray;
    }
    img {
        width: 100%;
    }
</style>
