import supertest from "supertest";
import httpStatus from "http-status";
import AWS from "aws-sdk";
import { Types } from "mongoose";
import { faker } from "@faker-js/faker";
import { connectDB, disconnectDB } from "../../config/db.config";
import app from "../../app";

const sqs = new AWS.SQS();

describe("Product Controller", () => {
  const ownerId = new Types.ObjectId().toString();
  const categoryMock = {
    title: faker.commerce.department(),
    description: faker.commerce.productDescription(),
    ownerId,
  };

  const productMock = {
    title: faker.commerce.productName(),
    description: faker.commerce.productDescription(),
    price: +faker.commerce.price(),
    ownerId,
  };

  beforeAll(async () => {
    await connectDB();
  });

  beforeEach(async () => {
    sqs.sendMessage = jest.fn();
  });

  afterAll(async () => {
    disconnectDB();
  });

  it("should create a product and return status code 201 with the product object", async () => {
    // Create category
    const categoryRes = await supertest(app)
      .post("/category")
      .send(categoryMock);

    const res = await supertest(app)
      .post("/product")
      .send({ ...productMock, category: categoryRes.body._id });

    expect(res.statusCode).toBe(httpStatus.CREATED);

    const { _id, title, description, price } = res.body;

    expect(_id).toBeDefined();
    expect(title).toBe(productMock.title);
    expect(description).toBe(productMock.description);
    expect(price).toBeCloseTo(productMock.price);

    await supertest(app).delete(`/product/${res.body._id}`);
    await supertest(app).delete(`/category/${categoryRes.body._id}`);
  });

  it("should update a product and return status code 200 with the product object", async () => {
    // Create category
    const categoryRes = await supertest(app)
      .post("/category")
      .send(categoryMock);

    const resInsert = await supertest(app)
      .post("/product")
      .send({ ...productMock, category: categoryRes.body._id });

    const { _id, price, description } = resInsert.body;
    const updatedDescription = `${description}-update-test`;
    const updatedPrice = price + 10.6;

    const resUpdate = await supertest(app)
      .put(`/product/${_id}`)
      .send({
        ...resInsert.body,
        description: updatedDescription,
        price: updatedPrice,
      });

    expect(resUpdate.statusCode).toBe(httpStatus.OK);
    expect(resUpdate.body.description).toBe(updatedDescription);
    expect(resUpdate.body.price).toBe(updatedPrice);

    await supertest(app).delete(`/product/${resUpdate.body._id}`);
    await supertest(app).delete(`/category/${categoryRes.body._id}`);
  });

  it("should delete a product and return statu code 204", async () => {
    // Create category
    const categoryRes = await supertest(app)
      .post("/category")
      .send(categoryMock);

    const resInsert = await supertest(app)
      .post("/product")
      .send({ ...productMock, category: categoryRes.body._id });

    const { _id } = resInsert.body;

    const resDelete = await supertest(app).delete(`/product/${_id}`);

    expect(resDelete.statusCode).toBe(httpStatus.NO_CONTENT);

    await supertest(app).delete(`/category/${categoryRes.body._id}`);
  });
});
