import { Storage } from '@google-cloud/storage';
import 'fs';

const storage = new Storage();

export interface GCSOptionsType {
  bucketName: string;
  folderName: string;
  fileName: string;
  contentType?: string;
}

export async function getDataFromGCS(options: GCSOptionsType) {
  //serprate env var for GCS_tips_bucket
  //create this global read json function to read both GCS and Q&A data

  try {
    const bucket = storage.bucket(options.bucketName!);
    const getObjectResponse: any = await bucket.file(`${options.folderName}/${options.fileName}`).download();
    const recommendations_json = getObjectResponse.toString();
    return recommendations_json;
  } catch (error) {
    return '{}';
  }
}
