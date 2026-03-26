/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_1620100901")

  // add field
  collection.fields.addAt(5, new Field({
    "autogeneratePattern": "",
    "hidden": false,
    "id": "text1132266815",
    "max": 0,
    "min": 0,
    "name": "prev_color_primary",
    "pattern": "",
    "presentable": false,
    "primaryKey": false,
    "required": false,
    "system": false,
    "type": "text"
  }))

  // add field
  collection.fields.addAt(6, new Field({
    "autogeneratePattern": "",
    "hidden": false,
    "id": "text2795842200",
    "max": 0,
    "min": 0,
    "name": "prev_color_primary_hover",
    "pattern": "",
    "presentable": false,
    "primaryKey": false,
    "required": false,
    "system": false,
    "type": "text"
  }))

  // add field
  collection.fields.addAt(7, new Field({
    "autogeneratePattern": "",
    "hidden": false,
    "id": "text3835893899",
    "max": 0,
    "min": 0,
    "name": "prev_color_bg_main",
    "pattern": "",
    "presentable": false,
    "primaryKey": false,
    "required": false,
    "system": false,
    "type": "text"
  }))

  // add field
  collection.fields.addAt(8, new Field({
    "autogeneratePattern": "",
    "hidden": false,
    "id": "text1302285628",
    "max": 0,
    "min": 0,
    "name": "prev_color_bg_card",
    "pattern": "",
    "presentable": false,
    "primaryKey": false,
    "required": false,
    "system": false,
    "type": "text"
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_1620100901")

  // remove field
  collection.fields.removeById("text1132266815")

  // remove field
  collection.fields.removeById("text2795842200")

  // remove field
  collection.fields.removeById("text3835893899")

  // remove field
  collection.fields.removeById("text1302285628")

  return app.save(collection)
})
