import { Message } from "@aws-sdk/client-sqs";
import * as catalogService from "../../modules/catalog/catalog.service";
import * as storageService from "../../modules/storage/storage.service";

const generateCatalogJsonHandler = async (messages: Message[]) => {
  for (const message of messages) {
    if (message.Body) {
      const messageBody = JSON.parse(message.Body);

      const catalog = await catalogService.generateCatalog(messageBody.ownerId);

      await storageService.uploadFile(`${messageBody.ownerId}.json`, catalog);
    }
  }
};

export default generateCatalogJsonHandler;
