/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_250839877")

  // add field
  collection.fields.addAt(6, new Field({
    "hidden": false,
    "id": "number3520875647",
    "max": null,
    "min": null,
    "name": "intervention_radius",
    "onlyInt": false,
    "presentable": false,
    "required": true,
    "system": false,
    "type": "number"
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_250839877")

  // remove field
  collection.fields.removeById("number3520875647")

  return app.save(collection)
})
