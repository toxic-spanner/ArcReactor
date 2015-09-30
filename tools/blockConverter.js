var fs = require('fs');
var blocks = require('./blocks.json');

var blockNames = {}, blockIds = {}, longestBlockName = 0;
var itemNames = {}, itemIds = {}, longestItemName = 0;

for (var i = 0; i < blocks.length; i++) {
    var block = blocks[i];

    var macroName, nameLength;

    if (block.type >= 256) {
        macroName = "ITEM_" + block.text_type.toUpperCase();

        // skip multiple of the same item
        if (itemNames[macroName]) continue;

        nameLength = macroName.length;
        if (nameLength > longestItemName) longestItemName = nameLength;

        itemNames[macroName] = "minecraft:" + block.text_type;
        itemIds[macroName] = block.type;
    } else {
        macroName = "BLOCK_" + block.text_type.toUpperCase();

        // skip multiple of the same block
        if (blockNames[macroName]) continue;

        nameLength = macroName.length;
        if (nameLength > longestBlockName) longestBlockName = nameLength;

        blockNames[macroName] = "minecraft:" + block.text_type;
        blockIds[macroName] = block.type;
    }
}

var header = ["// DO NOT MODIFY - Generated with tools/blockConverter.js"];

var blockNameResult = header.slice();
var itemNameResult = header.slice();
var blockIdResult = header.concat([
    'import "./blocklist.mca";',
    "#BLOCK_IDS ["
]);
var itemIdResult = header.concat([
    'import "./itemlist.mca";',
    "#ITEM_IDS ["
]);

var item, spaceLength, spaces;
for (item in blockNames) {
    if (!blockNames.hasOwnProperty(item)) continue;

    spaceLength = longestBlockName - item.length;
    spaces = Array(spaceLength + 2).join(' ');

    blockNameResult.push("#" + item + spaces + '"' + blockNames[item] + '"');
    blockIdResult.push("\t" + item + ":" + spaces + blockIds[item] + ",");
}
for (item in itemNames) {
    if (!itemNames.hasOwnProperty(item)) continue;

    spaceLength = longestItemName - item.length;
    spaces = Array(spaceLength + 2).join(' ');

    itemNameResult.push("#" + item + spaces + '"' + itemNames[item] + '"');
    itemIdResult.push("\t" + item + ":" + spaces + itemIds[item] + ",");
}

blockIdResult.push("];");
itemIdResult.push("];");

fs.writeFileSync('../blocks/blocklist.mca', blockNameResult.join("\n"), 'utf8');
fs.writeFileSync('../blocks/block_id.mca', blockIdResult.join("\n"), 'utf8');
fs.writeFileSync('../items/itemlist.mca', itemNameResult.join("\n"), 'utf8');
fs.writeFileSync('../items/item_id.mca', itemIdResult.join("\n"), 'utf8');