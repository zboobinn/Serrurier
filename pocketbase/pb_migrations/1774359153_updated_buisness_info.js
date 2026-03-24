/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_250839877")

  // update collection data
  unmarshal({
    "name": "business_info"
  }, collection)

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_250839877")

  // update collection data
  unmarshal({
    "name": "buisness_info"
  }, collection)

  return app.save(collection)
})
