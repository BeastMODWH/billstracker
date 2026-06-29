/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_667105198")

  // update collection data
  unmarshal({
    "name": "billers"
  }, collection)

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_667105198")

  // update collection data
  unmarshal({
    "name": "PocketBase_management"
  }, collection)

  return app.save(collection)
})
