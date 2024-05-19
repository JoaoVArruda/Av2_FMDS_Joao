<template>

  <v-row>
    <v-col cols="4">
      <v-card title="Anotações Públicas">
        <v-card-text>
          <v-skeleton-loader type="list-item-two-line" v-if="loading" />
          <v-list v-else>
            <v-list-item v-for="note in notes" :key="note.id">
              <v-list-item-title>{{ note.title }}</v-list-item-title>
              <v-list-item-subtitle>{{ note.text }}</v-list-item-subtitle>
            </v-list-item>
          </v-list>
        </v-card-text>
      </v-card>
    </v-col>
    <v-col cols="4">
      <v-card title="Adicionar Anotação">
        <v-card-text>
          <v-text-field v-model="note.title" label="Titulo" />
          <v-text-field v-model="note.text" label="Anotação" />
          <v-btn block @click="addNote">Adicionar</v-btn>
          <v-list>
            <v-skeleton-loader type="list-item-two-line" v-if="loading" />
            <v-list-item v-else v-for="note in notes" :key="note.id">
              <v-list-item-title>{{ note.title }}</v-list-item-title>
              <v-list-item-subtitle>{{ note.text }}</v-list-item-subtitle>
              <template v-slot:append>
                <v-icon @click="noteDelete(note.id)">mdi-delete</v-icon>
              </template>
            </v-list-item>
          </v-list>
        </v-card-text>
      </v-card>
    </v-col>
    <v-col cols="4">
      <v-card title="Dono">
        <v-card-text>
          <v-text-field label="uid" v-model="userStore.user.uid" />
          <v-text-field label="id" v-model="shortBio.id" />
          <v-textarea v-model="shortBio.shortbio" label="Short bio"></v-textarea>
          <v-btn block @click="updateUser">Salvar</v-btn>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>

</template>

<script setup>
import { collection, addDoc, onSnapshot, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { ref, onMounted } from 'vue'
import { useUserStore } from '@/stores/user'
import db from '@/plugins/firebase'

const userStore = useUserStore();

const usersCollection = collection(db, 'users');
const notesCollection = collection(db, 'notes');
const users = ref([]);
const notes = ref([]);
const note = ref({})

const shortBio = ref({});

const loading = ref(true);

onMounted(() => {

  onSnapshot(notesCollection, (snapshot) => {
    notes.value = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
    loading.value = false;
  });
  onSnapshot(usersCollection, (snapshot) => {
    users.value = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
    shortBio.value = users.value[0]
  }); 
});

const noteDelete = async (id) => {
  await deleteDoc(doc(notesCollection, id))
}

const addNote = async () => {
  await addDoc(notesCollection, { ...note.value })
  note.value = {}
}

const updateUser = async () => {
  await updateDoc(doc(usersCollection, users.value[0].id), { shortbio: shortBio.value.shortbio })
}






</script>
