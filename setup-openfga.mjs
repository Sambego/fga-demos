import dotenv from "dotenv";
import { OpenFgaClient } from "@openfga/sdk";
import { readFile, writeFile } from "fs/promises";

dotenv.config({ debug: false, path: "./.env.local" });

export const openFga = new OpenFgaClient({
  apiUrl: process.env.FGA_API_URL,
});

export async function setupOpenFGA() {
  const driveStoreName = "FGA Drive";
  const bankStoreName = "FGA Bank";
  let driveStore;
  let bankStore;
  let driveModel;
  let bankModel;

  try {
    const createStore = async (name) => {
      console.log(`- Creating a new OpenFGA store (${name})`);
      const store = await openFga.createStore({
        name: name,
      });
      console.log(
        `- OpenFGA store (${name}) created: ${store.name} - ${store.id}`
      );
      return store?.id;
    };

    const createModel = async (store, json, name) => {
      console.log(`- Creating OpenFGA Model for ${name}, ${store}`);
      const model = await openFga.writeAuthorizationModel(json, {
        storeId: store,
      });
      console.log(
        `- OpenFGA model created for ${name}: ${model?.authorization_model_id}`
      );
      return model?.authorization_model_id;
    };

    const writeInitialTuples = async (store, model, name, tuples) => {
      console.log(
        `- Writing initial tuples for ${name}, store: ${store} model: ${model}`
      );
      return await openFga.writeTuples(tuples, {
        storeId: store,
        authorizationModelId: model,
      });
    };

    const stores = await openFga.listStores();
    if (stores.stores.length > 0) {
      driveStore = stores.stores.find(
        (store) => store.id === process.env.FGA_DRIVE_STORE
      )?.id;
      console.log(`- OpenFGA Drive store: ${driveStore}`);
      bankStore = stores.stores.find(
        (store) => store.id === process.env.FGA_BANK_STORE
      )?.id;
      console.log(`- OpenFGA Bank store: ${bankStore}`);
    } else {
      driveStore = await createStore(driveStoreName);
      bankStore = await createStore(bankStoreName);
    }

    const driveModels = await openFga.readAuthorizationModels({
      storeId: driveStore,
    });
    if (driveModels.authorization_models.length > 0) {
      driveModel = driveModels.authorization_models[0]?.id;
      console.log(`- OpenFGA Drive model: ${driveModel}`);
    } else {
      const driveModelJSON = await readFile(
        process.cwd() + "/openfga/drive.model.json",
        "utf8"
      );

      driveModel = await createModel(
        driveStore,
        driveModelJSON,
        driveStoreName
      );

      await writeInitialTuples(driveStore, driveModel, driveStoreName, [
        { user: "user:1", relation: "owner", object: "file:1" },
        { user: "user:1", relation: "owner", object: "file:2" },
        { user: "user:1", relation: "owner", object: "file:3" },
        { user: "user:1", relation: "owner", object: "file:4" },
        { user: "user:1", relation: "owner", object: "file:5" },
      ]);
    }

    const bankModels = await openFga.readAuthorizationModels({
      storeId: bankStore,
    });
    if (bankModels.authorization_models.length > 0) {
      bankModel = bankModels.authorization_models[0]?.id;
      console.log(`- OpenFGA Bank model: ${bankModel}`);
    } else {
      const bankModelJSON = await readFile(
        process.cwd() + "/openfga/bank.model.json",
        "utf8"
      );

      bankModel = await createModel(bankStore, bankModelJSON, bankStoreName);
      await writeInitialTuples(bankStore, bankModel, bankStoreName, [
        { user: "user:1", relation: "owner", object: "account:1" },
      ]);
    }

    await writeFile(
      "./.env.local",
      `FGA_API_URL=${process.env.FGA_API_URL}\nFGA_DRIVE_STORE=${driveStore}\nFGA_DRIVE_MODEL=${driveModel}\nFGA_BANK_STORE=${bankStore}\nFGA_BANK_MODEL=${bankModel}`
    );
  } catch (error) {
    console.error(error);
  }
}

(async () => {
  console.log("Starting OpenFGA Setup");
  return await setupOpenFGA();
})();
