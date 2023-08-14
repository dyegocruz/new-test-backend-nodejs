import supertest from "supertest";
import AWSMock from "aws-sdk-mock";
import AWS from "aws-sdk";
import { Types } from "mongoose";
import httpStatus from "http-status";
import { faker } from "@faker-js/faker";
import app from "../../app";
import { connectDB, disconnectDB } from "../../config/db.config";

describe("Category Controller", () => {
  const ownerId = new Types.ObjectId().toString();
  const categoryMock = {
    title: faker.commerce.department(),
    description: faker.commerce.productDescription(),
    ownerId,
  };

  beforeAll(async () => {
    await connectDB();

    AWSMock.setSDKInstance(AWS);
    AWSMock.mock("SQS", "sendMessage", () => {
      return;
    });
  });

  afterAll(async () => {
    disconnectDB();
  });

  it("should create a category and return status code 201 with the category object", async () => {
    const res = await supertest(app).post("/category").send(categoryMock);

    expect(res.statusCode).toBe(httpStatus.CREATED);

    const { _id, title, description } = res.body;

    expect(_id).toBeDefined();
    expect(title).toBe(categoryMock.title);
    expect(description).toBe(categoryMock.description);

    await supertest(app).delete(`/category/${res.body._id}`);
  });

  it("should update a category and return status code 200 with the category object", async () => {
    const resInsert = await supertest(app).post("/category").send(categoryMock);

    const { _id, description } = resInsert.body;
    const updatedDescription = `${description}-update-test`;

    const resUpdate = await supertest(app)
      .put(`/category/${_id}`)
      .send({ ...resInsert.body, description: updatedDescription });

    expect(resUpdate.statusCode).toBe(httpStatus.OK);
    expect(resUpdate.body.description).toBe(updatedDescription);

    await supertest(app).delete(`/category/${_id}`);
  });

  it("should delete a category and return statu code 204", async () => {
    const resInsert = await supertest(app).post("/category").send(categoryMock);

    const { _id } = resInsert.body;

    const resDelete = await supertest(app).delete(`/category/${_id}`);

    expect(resDelete.statusCode).toBe(httpStatus.NO_CONTENT);
  });
});
