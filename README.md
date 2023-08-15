# Catalog App Test README

REST API to manage catalog of products.

There is a Postman json file on the root directory for import the requests using the Postman App, but I will let some exmples on this README.

## How to start?

1. Make sure that exists a mondodb server instance running. If already, jump for the next stop. In another case run `docker run --name mongo -p 27017:27017 -d mongo`
1. `git clone git@github.com:dyegocruz/new-test-backend-nodejs.git`
1. `git checkout dyego-cruz`
1. `npm install`
1. Create a .env file with real values following the .env.example file.
1. `npm run start:dev`

## How to run tests?

- `npm run test`

## Requests examples

- Create Category

```
curl --location 'localhost:3000/category' \
--header 'Content-Type: application/json' \
--data '{
    "ownerId": "64d912c80a5474c97e9ce855",
    "title": "Categoria título teste",
    "description": "Descrição da categoria de teste"
}'
```

- Update Category

```
curl --location --request PUT 'localhost:3000/category/64da5fe1a35308a0b420257c' \
--header 'Content-Type: application/json' \
--data '{
    "ownerId": "64d912c80a5474c97e9ce855",
    "title": "Categoria título teste atualizado",
    "description": "Descrição atualizada"
}'
```

- Delete Category

```
curl --location --request DELETE 'localhost:3000/categories/64d7c5d20e03abc8491b5ae7'
```

- Create Product

```
curl --location 'localhost:3000/product' \
--header 'Content-Type: application/json' \
--data '{
    "title": "Novo produto de teste",
    "description": "Descrição do novo produto de teste",
    "price": 67.9,
    "category": "64da5fe1a35308a0b420257c",
    "ownerId": "64d912c80a5474c97e9ce855"
}'
```

- Update Product

```
curl --location --request PUT 'localhost:3000/product/64db88474a1c1a101d93d308' \
--header 'Content-Type: application/json' \
--data '{
    "title": "Novo produto atualizado",
    "description": "Descrição do produto atualizado",
    "price": 78,
    "ownerId": "64d912c80a5474c97e9ce855"
}'
```

- Delete Product

```
curl --location --request DELETE 'localhost:3000/product/64db8a5d4a1c1a101d93d30e'
```

