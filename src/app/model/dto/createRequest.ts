//
//  This model is used to submit new requests to api-service.
//
export class CreateRequest {
  textToTranslate: string;
  languageOrigin: string;
  languageTarget: string;
}

