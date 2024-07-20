<template>
    <div>
        <v-snackbar v-model="snackbar" :timeout="2000">{{ message }}</v-snackbar>
        <v-btn color="#FF7A00" size="large" variant="flat" @click='openNewDialog'>
            Adicionar categoria
        </v-btn>
        <v-card v-for="category in categories" :key='category.id' variant="outlined" class="my-8 pa-2 text-left">
            <v-card-title>{{category.name}}</v-card-title>
            <v-card-subtitle class="mb-4">Cor: {{ category.color }}</v-card-subtitle>
            <v-card-actions class="d-flex justify-space-evenly">
                <v-btn text="Editar" variant="flat" @click='openUpdateDialog(category)'></v-btn>
                <v-btn text="Excluir" variant="text" @click='openDeleteDialog(category)'></v-btn>
            </v-card-actions>
        </v-card>
        <DeleteItemDialog 
        :showDialog='dialogDelete'
        @cancel-deletion='dialogDelete = false'
        @delete-item='deleteCategory(selectedCategory)'
        />
        <NewCategoryDialog v-model='dialogNew' :willCreate='willCreate' :selectedCategory='selectedCategory' @closeDialog='closeNewDialog'/>
    </div>
</template>
<script>
import DeleteItemDialog from '../components/DeleteItemDialog.vue'
import EventService from '@/services/event.service';
import NewCategoryDialog from '@/components/NewCategoryDialog.vue';
export default {
    data(){
        return{
            dialogDelete: false,
            categories: [],
            selectedCategory: null,
            dialogNew: false,
            snackbar: false,
            message: '',
            willCreate: true
        }
    },
    components: {
        DeleteItemDialog,
        NewCategoryDialog
    },
    methods:{
        deleteCategory(category) {
            EventService.deleteEventCategory(this.$route.params.slug, category.id).then((response) => {
                this.categories.splice(this.categories.indexOf(category),1);
                this.message = response.message;
                this.snackbar = true;
                this.dialogDelete = false;
            })
        },

        openDeleteDialog(category) {
            this.selectedCategory = category;
            this.dialogDelete = true;
        },

        openNewDialog() {
            this.selectedCategory = null;
            this.willCreate = true;
            this.dialogNew = true;
        },

        openUpdateDialog(category) {
            this.selectedCategory = category;
            this.willCreate = false;
            this.dialogNew = true;
        },

        closeNewDialog() {
            this.dialogNew = false;
            EventService.getCategories(this.$route.params.slug).then(
                (response)=>this.categories = response
            )
        }
    },
    mounted(){
        EventService.getCategories(this.$route.params.slug).then(
            (response) =>{
                this.categories = response;
            }
        )
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
</style>