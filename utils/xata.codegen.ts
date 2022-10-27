// Generated by Xata Codegen 0.18.0. Please do not edit.
import {
  BaseClientOptions,
  buildClient,
  SchemaInference,
  XataRecord,
} from "@xata.io/client";

const tables = [
  {
    name: "clients",
    columns: [
      { name: "title", type: "string" },
      { name: "description", type: "string" },
      { name: "name", type: "string" },
      { name: "occupation", type: "string" },
    ],
  },
] as const;

export type SchemaTables = typeof tables;
export type InferredTypes = SchemaInference<SchemaTables>;

export type NextjsWithXataExample = InferredTypes["clients"];
export type NextjsWithXataExampleRecord = NextjsWithXataExample & XataRecord;

export type DatabaseSchema = {
  clients: NextjsWithXataExampleRecord;
};

const DatabaseClient = buildClient();

const defaultOptions = {
  databaseURL: "https://annietah-70hp76.xata.sh/db/with-xata-app",
};

export class XataClient extends DatabaseClient<DatabaseSchema> {
  constructor(options?: BaseClientOptions) {
    super({ ...defaultOptions, ...options }, tables);
  }
}

let instance: XataClient | undefined = undefined;

export const getXataClient = () => {
  if (instance) return instance;

  instance = new XataClient();
  return instance;
};
