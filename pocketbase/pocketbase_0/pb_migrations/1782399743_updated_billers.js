/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_667105198")

  // add field
  collection.fields.addAt(8, new Field({
    "help": "",
    "hidden": false,
    "id": "number1777367825",
    "max": null,
    "min": null,
    "name": "default_amount",
    "onlyInt": false,
    "presentable": false,
    "required": false,
    "system": false,
    "type": "number"
  }))

  // add field
  collection.fields.addAt(9, new Field({
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
      "weekly ",
      "monthly,",
      "yearly",
      "one_off"
    ]
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_667105198")

  // remove field
  collection.fields.removeById("number1777367825")

  // remove field
  collection.fields.removeById("select645904403")

  return app.save(collection)
})
