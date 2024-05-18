<template>
    <v-app-bar>
        <v-app-bar-title>FMDS-Aula 10</v-app-bar-title>
        <v-spacer />
        
        <span class="mr-3">
            {{ userStore.user.displayName }} {{ userStore.user.email }}
        </span> 
        <v-btn v-if="!!userStore.isAuthenticated" @click="userStore.signOut">Logout</v-btn>
        <v-btn v-else @click="userStore.signIn">Login</v-btn>
    </v-app-bar>
</template>
<script setup>

import { useUserStore } from '@/stores/user'

const userStore = useUserStore();

</script>