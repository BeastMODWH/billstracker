/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_3325380259")

  // update collection data
  unmarshal({
    "createRule": "1 = 1",
    "deleteRule": "1 = 1",
    "listRule": "1 = 1",
    "updateRule": "1 = 1",
    "viewRule": "1 = 1"
  }, collection)

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_3325380259")

  // update collection data
  unmarshal({
    "createRule": "@request.auth.id != \"\"",
    "deleteRule": "@request.auth.id != \"\" || @request.auth.id = \"\"",
    "listRule": "@request.auth.id != \"\" || @request.auth.id = \"\"",
    "updateRule": "@request.auth.id != \"\" || @request.auth.id = \"\"",
    "viewRule": "@request.auth.id != \"\" || @request.auth.id = \"\""
  }, collection)

  return app.save(collection)
})
