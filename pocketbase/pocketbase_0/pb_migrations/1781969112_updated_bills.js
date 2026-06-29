/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_3912360763")

  // add field
  collection.fields.addAt(7, new Field({
    "help": "",
    "hidden": false,
    "id": "select645904403",
    "maxSelect": 0,
    "name": "frequency",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "select",
    "values": [
      "weekly",
      "fortnightly",
      "monthly",
      "quarterly",
      "annual",
      "one_off"
    ]
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_3912360763")

  // remove field
  collection.fields.removeById("select645904403")

  return app.save(collection)
})
