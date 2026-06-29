/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_1308224162")

  // update collection data
  unmarshal({
    "createRule": "@request.auth.id != \"\"",
    "deleteRule": "@request.auth.id != \"\" && @request.auth.id = user_id",
    "listRule": "@request.auth.id != \"\" && (@request.auth.id = user_id || user_id = \"\")",
    "updateRule": "@request.auth.id != \"\" && @request.auth.id = user_id",
    "viewRule": "@request.auth.id != \"\" && (@request.auth.id = user_id || user_id = \"\")"
  }, collection)

  // add field
  collection.fields.addAt(4, new Field({
    "cascadeDelete": false,
    "collectionId": "_pb_users_auth_",
    "help": "",
    "hidden": false,
    "id": "relation2809058197",
    "maxSelect": 0,
    "minSelect": 0,
    "name": "user_id",
    "presentable": false,
    "required": true,
    "system": false,
    "type": "relation"
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_1308224162")

  // update collection data
  unmarshal({
    "createRule": null,
    "deleteRule": null,
    "listRule": null,
    "updateRule": null,
    "viewRule": null
  }, collection)

  // remove field
  collection.fields.removeById("relation2809058197")

  return app.save(collection)
})
