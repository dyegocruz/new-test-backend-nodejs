import { Message } from "@aws-sdk/client-sqs";
import * as catalogService from "../../modules/catalog/catalog.service";
import * as storageService from "../../modules/storage/storage.service";
import logger from "../../logger";

const generateCatalogJsonHandler = async (messages: Message[]) => {
  for (const message of messages) {
    if (message.Body) {
      const messageBody = JSON.parse(message.Body);

      const catalog = await catalogService.generateCatalog(messageBody.ownerId);

      if (catalog.length > 0)
        await storageService.uploadFile(`${messageBody.ownerId}.json`, catalog);
    }
  }
  logger.info(`${messages.length} processed messages`);
};

export default generateCatalogJsonHandler;
