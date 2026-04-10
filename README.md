# TP API Node.js

## Lancer le projet

npm install
node server.js

## Les routes

### Authors
GET /authors
POST /authors
GET /authors/:id/articles

### Articles
GET /articles
GET /articles/:id
POST /articles
PUT /articles/:id
DELETE /articles/:id

## Exemples

créer un auteur :
{"name": "Sarah"}

créer un article :
{"title": "Mon article", "content": "Contenu de larticle", "author_id": 1}