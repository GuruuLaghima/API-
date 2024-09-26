
# API Albums et Photos

## Vue d'ensemble
Cette API permet la gestion des albums et des photos à travers une architecture REST. Elle permet de créer, lire, mettre à jour et supprimer des albums ainsi que des photos associées. Chaque album peut contenir plusieurs photos, et chaque photo est associée à un album.

---

### Endpoints de l'API

#### [POST] Créer un album
Permet de créer un nouvel album.

|                            |                  |
|----------------------------|------------------|
| Authentification requise ?  | Non              |
| Qui peut l'utiliser ?       | Tous les utilisateurs |
| Format de réponse           | application/json |

* Requête HTTP : POST → `/albums`

##### Paramètres :
```json
{
  "title": "String",          // Requis
  "description": "String"      // Optionnel
}
```

##### Réponse :
```json
{
  "id": "Object_ID",
  "title": "String",
  "description": "String",
  "photos": []                  // Liste vide par défaut
}
```

---

#### [GET] Récupérer tous les albums
Récupère la liste de tous les albums disponibles.

|                            |                  |
|----------------------------|------------------|
| Authentification requise ?  | Non              |
| Qui peut l'utiliser ?       | Tous les utilisateurs |
| Format de réponse           | application/json |

* Requête HTTP : GET → `/albums`

##### Réponse :
```json
[
  {
    "id": "Object_ID",
    "title": "String",
    "description": "String",
    "photos": []                  // Contient les ID des photos associées
  }
]
```

---

#### [GET] Récupérer un album par son ID
Récupère les détails d'un album spécifique, y compris les photos associées.

|                            |                  |
|----------------------------|------------------|
| Authentification requise ?  | Non              |
| Qui peut l'utiliser ?       | Tous les utilisateurs |
| Format de réponse           | application/json |

* Requête HTTP : GET → `/albums/:id`

##### Réponse :
```json
{
  "id": "Object_ID",
  "title": "String",
  "description": "String",
  "photos": [
    {
      "id": "Object_ID",
      "title": "String",
      "url": "String",
      "description": "String"
    }
  ]
}
```

---

#### [PUT] Mettre à jour un album
Met à jour un album existant.

|                            |                  |
|----------------------------|------------------|
| Authentification requise ?  | Non              |
| Qui peut l'utiliser ?       | Tous les utilisateurs |
| Format de réponse           | application/json |

* Requête HTTP : PUT → `/albums/:id`

##### Paramètres :
```json
{
  "title": "String",          // Optionnel
  "description": "String"      // Optionnel
}
```

##### Réponse :
```json
{
  "id": "Object_ID",
  "title": "String",
  "description": "String",
  "photos": []                  // Liste des photos associées
}
```

---

#### [DELETE] Supprimer un album
Supprime un album spécifique par son ID.

|                            |                  |
|----------------------------|------------------|
| Authentification requise ?  | Non              |
| Qui peut l'utiliser ?       | Tous les utilisateurs |
| Format de réponse           | application/json |

* Requête HTTP : DELETE → `/albums/:id`

##### Réponse :
```json
{
  "message": "Album supprimé avec succès"
}
```

---

### Routes CRUD pour les Photos

#### [POST] Ajouter une photo à un album
Permet d'ajouter une nouvelle photo à un album spécifique.

|                            |                  |
|----------------------------|------------------|
| Authentification requise ?  | Non              |
| Qui peut l'utiliser ?       | Tous les utilisateurs |
| Format de réponse           | application/json |

* Requête HTTP : POST → `/albums/:albumId/photos`

##### Paramètres :
```json
{
  "title": "String",          // Requis
  "url": "String",            // Requis
  "description": "String"      // Optionnel
}
```

##### Réponse :
```json
{
  "id": "Object_ID",
  "title": "String",
  "url": "String",
  "description": "String",
  "album": "Album_ID"
}
```

---

#### [GET] Récupérer toutes les photos d'un album
Récupère toutes les photos associées à un album spécifique.

|                            |                  |
|----------------------------|------------------|
| Authentification requise ?  | Non              |
| Qui peut l'utiliser ?       | Tous les utilisateurs |
| Format de réponse           | application/json |

* Requête HTTP : GET → `/albums/:albumId/photos`

##### Réponse :
```json
[
  {
    "id": "Object_ID",
    "title": "String",
    "url": "String",
    "description": "String"
  }
]
```

---

#### [GET] Récupérer une photo spécifique d'un album
Récupère une photo spécifique dans un album.

|                            |                  |
|----------------------------|------------------|
| Authentification requise ?  | Non              |
| Qui peut l'utiliser ?       | Tous les utilisateurs |
| Format de réponse           | application/json |

* Requête HTTP : GET → `/albums/:albumId/photos/:photoId`

##### Réponse :
```json
{
  "id": "Object_ID",
  "title": "String",
  "url": "String",
  "description": "String",
  "album": "Album_ID"
}
```

---

### Installation

#### Pré-requis :
- Node.js (version 18+)
- npm (ou yarn)
- Git
- MongoDB (Configurer la connexion dans `config.js`)

#### Installation du projet :
```bash
npm install
```

#### Mode de développement :
```bash
npm run dev
```

#### Mode production :
```bash
npm run prod
```

---

