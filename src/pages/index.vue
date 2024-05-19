<template>
  <v-row>
    <v-col cols="4">
      <v-card title="Anotações Públicas">
        <v-card-text>
          <v-skeleton-loader type="list-item-two-line" v-if="loading" />
          <v-list v-else>
            <v-list-item v-for="note in publicNotes" :key="note.id">
              <v-list-item-content>
                <v-list-item-title>{{ note.title }}</v-list-item-title>
                <div class="texto-anotacao">{{ note.text }}</div>
              </v-list-item-content>
              <template v-slot:append>
                <v-icon @click="noteDelete(note.id)">mdi-delete</v-icon>
              </template>
            </v-list-item>
          </v-list>
        </v-card-text>
      </v-card>
    </v-col>
    <v-col cols="4">
      <v-card title="Anotações Privadas" v-if="user">
        <v-card-text>
          <v-skeleton-loader type="list-item-two-line" v-if="loading" />
          <v-list v-else>
            <v-list-item v-for="note in privateNotes" :key="note.id">
              <v-list-item-content>
                <v-list-item-title>{{ note.title }}</v-list-item-title>
                <div class="texto-anotacao">{{ note.text }}</div>
              </v-list-item-content>
              <template v-slot:append>
                <v-icon @click="noteDelete(note.id)">mdi-delete</v-icon>
              </template>
            </v-list-item>
          </v-list>
        </v-card-text>
      </v-card>
    </v-col>
    <v-col cols="4">
      <v-card title="Adicionar Anotação">
        <v-card-text>
          <v-text-field v-model="note.title" label="Titulo" />
          <v-textarea v-model="note.text" label="Anotação" />
          <v-checkbox v-model="note.private" label="Anotação Privada" />
          <v-btn block @click="addNote" :disabled="!note.title && !note.text">Adicionar</v-btn>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>


<script setup>
import { collection, addDoc, onSnapshot, deleteDoc, doc} from 'firebase/firestore';
import { ref, onMounted, computed, watch } from 'vue';
import { useUserStore } from '@/stores/user';
import db from '@/plugins/firebase';

const userStore = useUserStore();

const notesCollection = collection(db, 'notes');
const notes = ref([]);
const note = ref({
  title: '',
  text: '',
  private: false
});

const loading = ref(true);
const user = ref(null);

watch(() => userStore.user, (newUser) => {
  user.value = newUser;
  fetchNotes();
});

const fetchNotes = () => {
  loading.value = true;

  onSnapshot(notesCollection, (snapshot) => {
    notes.value = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    loading.value = false;
  });
};

onMounted(() => {
  user.value = userStore.user;
  fetchNotes();
});

const noteDelete = async (id) => {
  if (!user.value) return;
  await deleteDoc(doc(notesCollection, id));
};

const addNote = async () => {
  if (!user.value) return;
  await addDoc(notesCollection, {
    ...note.value,
    uid: user.value.uid,
    createdAt: new Date()
  });
  note.value = { title: '', text: '', private: false };
};

const publicNotes = computed(() => notes.value.filter(note => !note.private));
const privateNotes = computed(() => notes.value.filter(note => note.private && note.uid === user.value.uid));
</script>

<style scoped>
.texto-anotacao {
  color: rgb(132, 128, 128);
  font-size: 0.85rem;
  white-space: pre-wrap;
}
</style>
