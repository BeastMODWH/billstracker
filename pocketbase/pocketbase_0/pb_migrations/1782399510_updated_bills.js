/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_3912360763")

  // add field
  collection.fields.addAt(8, new Field({
    "help": "",
    "hidden": false,
    "id": "number3807202642",
    "max": null,
    "min": null,
    "name": "amount_per_period",
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
    "id": "select3317178062",
    "maxSelect": 0,
    "name": "period",
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
  collection.fields.removeById("number3807202642")

  // remove field
  collection.fields.removeById("select3317178062")

  return app.save(collection)
})
