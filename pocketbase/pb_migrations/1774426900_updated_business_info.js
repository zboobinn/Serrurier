/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_250839877")

  // update collection data
  unmarshal({
    "listRule": "",
    "viewRule": ""
  }, collection)

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_250839877")

  // update collection data
  unmarshal({
    "listRule": null,
    "viewRule": "@request.auth.id != \"\""
  }, collection)

  return app.save(collection)
})
