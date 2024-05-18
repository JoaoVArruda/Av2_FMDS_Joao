# VueJS 3 + Firebase SDK (Firestore)
- Aula 10 em 30-04-2024
- Exemplo de uso do vuejs 3 (composition api) com o Firebase SDK usando o Firestore com regras de acesso às coleções para usuários autenticados com GoogleProvider

# Regras no Firebase
```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
		match /products/{document=**}{
    	allow read: if true;
      allow write: if request.auth != null;
    }
    match /users/{userId}/{documents=**}{
    	allow read: if true;
      allow write: if request.auth != null && request.auth.uid == userId
    }
  }
}
```

# Disciplina
- Frameworks Modernos para Desenvolvimento de Sistemas
- Bacharelado em Sistemas de Informação - UNEMAT/Sinop
- Professor Ivan Pires

