/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_631030571")

  // add field
  collection.fields.addAt(7, new Field({
    "help": "",
    "hidden": false,
    "id": "file1402582597",
    "maxSelect": 0,
    "maxSize": 0,
    "mimeTypes": [
      "image/png",
      "image/jpeg",
      "application/pdf",
      "image/webp"
    ],
    "name": "receipt",
    "presentable": false,
    "protected": false,
    "required": false,
    "system": false,
    "thumbs": null,
    "type": "file"
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_631030571")

  // remove field
  collection.fields.removeById("file1402582597")

  return app.save(collection)
})
