/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_631030571")

  // update field
  collection.fields.addAt(5, new Field({
    "help": "",
    "hidden": false,
    "id": "text1582905952",
    "maxSelect": 0,
    "name": "method",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "select",
    "values": [
      "Direct Debit",
      "Bank Transfer",
      "Card",
      "Cash",
      "Standing Order",
      "Other"
    ]
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_631030571")

  // update field
  collection.fields.addAt(5, new Field({
    "help": "",
    "hidden": false,
    "id": "text1582905952",
    "maxSelect": 0,
    "name": "method",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "select",
    "values": [
      "(select: Direct Debit, Bank Transfer, Card, Cash, Standing Order, Other)"
    ]
  }))

  return app.save(collection)
})
