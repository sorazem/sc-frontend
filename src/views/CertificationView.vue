<template>
    <div>
        <h1 class="my-4">Certificados</h1>
    </div>
</template>
<script>
import UserService from '@/services/user.service';
export default {
    created(){
        UserService.getUserCertifications().then(
            (response)=>console.log(response)
        )
    }
}
</script>
<style scoped>
    
</style>