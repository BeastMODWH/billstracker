/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_47834323")

  // add field
  collection.fields.addAt(1, new Field({
    "cascadeDelete": false,
    "collectionId": "pbc_667105198",
    "help": "",
    "hidden": false,
    "id": "relation1643930532",
    "maxSelect": 0,
    "minSelect": 0,
    "name": "biller_id",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "relation"
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_47834323")

  // remove field
  collection.fields.removeById("relation1643930532")

  return app.save(collection)
})
