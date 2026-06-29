/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_47834323")

  // remove field
  collection.fields.removeById("text1643930532")

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_47834323")

  // add field
  collection.fields.addAt(1, new Field({
    "autogeneratePattern": "",
    "help": "",
    "hidden": false,
    "id": "text1643930532",
    "max": 0,
    "min": 0,
    "name": "biller_id",
    "pattern": "",
    "presentable": false,
    "primaryKey": false,
    "required": false,
    "system": false,
    "type": "text"
  }))

  return app.save(collection)
})
