import dotenv from "dotenv";
import { OpenFgaClient } from "@openfga/sdk";
import { readFile, writeFile } from "fs/promises";
import { getBrandDisplayName } from "./branding.mjs";

dotenv.config({ debug: false, path: "./.env.local" });

export const openFga = new OpenFgaClient({
  apiUrl: process.env.FGA_API_URL,
});

export async function setupOpenFGA() {
  const brandName = getBrandDisplayName();
  const driveStoreName = "FGA Drive";
  const bankStoreName = "FGA Bank";
  const healthStoreName = "FGA Health";
  let driveStore;
  let bankStore;
  let healthStore;
  let driveModel;
  let bankModel;
  let healthModel;

  try {
    const createStore = async (name) => {
      console.log(`- Creating a new ${brandName} store (${name})`);
      const store = await openFga.createStore({
        name: name,
      });
      console.log(
        `- ${brandName} store (${name}) created: ${store.name} - ${store.id}`
      );
      return store?.id;
    };

    const createModel = async (store, json, name) => {
      console.log(`- Creating ${brandName} Model for ${name}, ${store}`);
      const model = await openFga.writeAuthorizationModel(json, {
        storeId: store,
      });
      console.log(
        `- ${brandName} model created for ${name}: ${model?.authorization_model_id}`
      );
      return model?.authorization_model_id;
    };

    const writeInitialTuples = async (store, model, name, tuples, context) => {
      console.log(
        `- Writing initial tuples for ${name}, store: ${store} model: ${model}`
      );
      return await openFga.writeTuples(tuples, {
        storeId: store,
        authorizationModelId: model,
      });
    };

    const calculateYearDuration = (years) => {
      return years * 24 * 365;
    };

    const stores = await openFga.listStores();
    if (stores.stores.length > 0) {
      driveStore = stores.stores.find(
        (store) => store.id === process.env.FGA_DRIVE_STORE
      )?.id;
      console.log(`- ${brandName} Drive store: ${driveStore}`);
      bankStore = stores.stores.find(
        (store) => store.id === process.env.FGA_BANK_STORE
      )?.id;
      console.log(`- ${brandName} Bank store: ${bankStore}`);
      healthStore = stores.stores.find(
        (store) => store.id === process.env.FGA_HEALTH_STORE
      )?.id;
      console.log(`- ${brandName} Health store: ${healthStore}`);
    } else {
      driveStore = await createStore(driveStoreName);
      bankStore = await createStore(bankStoreName);
      healthStore = await createStore(healthStoreName);
    }

    const driveModels = await openFga.readAuthorizationModels({
      storeId: driveStore,
    });
    if (driveModels.authorization_models.length > 0) {
      driveModel = driveModels.authorization_models[0]?.id;
      console.log(`- ${brandName} Drive model: ${driveModel}`);
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
        { user: "user:sam", relation: "owner", object: "file:1" },
        { user: "user:sam", relation: "owner", object: "file:2" },
        { user: "user:sam", relation: "owner", object: "file:3" },
        { user: "user:sam", relation: "owner", object: "file:4" },
        { user: "user:sam", relation: "owner", object: "file:5" },
      ]);
    }

    const bankModels = await openFga.readAuthorizationModels({
      storeId: bankStore,
    });
    if (bankModels.authorization_models.length > 0) {
      bankModel = bankModels.authorization_models[0]?.id;
      console.log(`- ${brandName} Bank model: ${bankModel}`);
    } else {
      const bankModelJSON = await readFile(
        process.cwd() + "/openfga/bank.model.json",
        "utf8"
      );

      bankModel = await createModel(bankStore, bankModelJSON, bankStoreName);
      await writeInitialTuples(bankStore, bankModel, bankStoreName, [
        { user: "user:sam", relation: "owner", object: "account:1" },
        { user: "user:sam", relation: "owner", object: "account:2" },
        { user: "user:chiara", relation: "owner", object: "account:3" },
        { user: "user:chiara", relation: "owner", object: "account:4" },
        { user: "user:jane", relation: "owner", object: "account:5" },
        {
          user: "user:sam",
          relation: "guardian",
          object: "user:jane",
          condition: {
            name: "date_based_grant",
            context: {
              birth_date: new Date("2025-01-01"),
              grant_duration: `${calculateYearDuration(18)}h`,
            },
          },
        },
      ]);
    }

    const healthModels = await openFga.readAuthorizationModels({
      storeId: healthStore,
    });
    if (healthModels.authorization_models.length > 0) {
      healthModel = healthModels.authorization_models[0]?.id;
      console.log(`- ${brandName} Health model: ${healthModel}`);
    } else {
      const healthModelJSON = await readFile(
        process.cwd() + "/openfga/health.model.json",
        "utf8"
      );

      healthModel = await createModel(
        healthStore,
        healthModelJSON,
        healthStoreName
      );

      await writeInitialTuples(healthStore, healthModel, healthStoreName, [
        {
          user: "doctor:sam",
          relation: "doctor",
          object: "jurisdiction:belgium",
        },
        {
          user: "jurisdiction:belgium",
          relation: "jurisdiction",
          object: "record:1",
        },
        { user: "patient:chiara", relation: "owner", object: "record:1" },
        {
          user: "jurisdiction:belgium",
          relation: "jurisdiction",
          object: "record:2",
        },
        { user: "patient:chiara", relation: "owner", object: "record:2" },
        {
          user: "jurisdiction:belgium",
          relation: "jurisdiction",
          object: "record:3",
        },
        { user: "patient:chiara", relation: "owner", object: "record:3" },
        {
          user: "jurisdiction:belgium",
          relation: "jurisdiction",
          object: "record:4",
        },
        { user: "patient:jane", relation: "owner", object: "record:4" },
        {
          user: "jurisdiction:belgium",
          relation: "jurisdiction",
          object: "record:5",
        },
        { user: "patient:jane", relation: "owner", object: "record:5" },
        {
          user: "jurisdiction:belgium",
          relation: "jurisdiction",
          object: "record:6",
        },
        { user: "patient:john", relation: "owner", object: "record:6" },
        {
          user: "jurisdiction:belgium",
          relation: "jurisdiction",
          object: "record:7",
        },
        { user: "patient:john", relation: "owner", object: "record:7" },
        {
          user: "patient:chiara",
          relation: "guardian",
          object: "patient:jane",
        },
      ]);
    }

    await writeFile(
      "./.env.local",
      `FGA_API_URL=${process.env.FGA_API_URL}\nFGA_BRAND=${process.env.FGA_BRAND || 'OpenFGA'}\nFGA_DRIVE_STORE=${driveStore}\nFGA_DRIVE_MODEL=${driveModel}\nFGA_BANK_STORE=${bankStore}\nFGA_BANK_MODEL=${bankModel}\nFGA_HEALTH_STORE=${healthStore}\nFGA_HEALTH_MODEL=${healthModel}`
    );
  } catch (error) {
    console.error(error);
  }
}

(async () => {
  console.log("Starting FGA Setup");
  return await setupOpenFGA();
})();
