//
//  This model is used to submit new requests to api-service.
//
export class CreateRequest {
  textToTranslate: string;
  languageOriginId: number;
  languageTargetId: number;
}

