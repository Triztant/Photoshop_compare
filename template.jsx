// Web-generated Photoshop XI Script using layer-based replacement
var desktop = Folder('~/Desktop');

// Your 8 positions
var positions = ['ST_BW','LAM_BW','RAM_BW','CAM_BW','ST','LAM','RAM','CAM'];

// Injected by the web UI
var imageFiles  = {{IMAGE_FILES}};
var teamFiles   = {{TEAM_FILES}};
var nationFiles = {{NATION_FILES}};

// Recursive finder for any ArtLayer or LayerSet by name
function findLayerByNameRecursive(parent, name) {
  for (var i = 0; i < parent.artLayers.length; i++) {
    if (parent.artLayers[i].name === name) return parent.artLayers[i];
  }
  for (var i = 0; i < parent.layerSets.length; i++) {
    if (parent.layerSets[i].name === name) return parent.layerSets[i];
    var found = findLayerByNameRecursive(parent.layerSets[i], name);
    if (found) return found;
  }
  return null;
}

function findClippedLayerAbove(baseName) {
  var doc = app.activeDocument;
  var layers = doc.artLayers;
  for (var i = 0; i < layers.length; i++) {
    if (layers[i].isClipped && layers[i].grouped && layers[i].name.indexOf(baseName) > -1) {
      return layers[i];
    }
  }
  return null;
}

if (!app.documents.length) {
  alert('Open your template PSD first!');
  throw 'No document open.';
}
var doc = app.activeDocument;

// --- 1) Players ---
for (var p = 0; p < positions.length; p++) {
  var posName = positions[p],
      baseName = posName.indexOf('_BW') > -1 ? posName.replace('_BW','') + '_base_BW' : posName + '_base',
      imgName  = imageFiles[p],
      file     = new File(desktop + '/PLAYER PF/' + imgName);

  if (!file.exists) {
    alert('Missing player image: ' + imgName);
    continue;
  }

  var lastName = (function(file) {
    var base = file.name.replace(/\.[^\.]+$/,'');
    var parts = base.split('-');
    return parts.length > 1 ? parts.pop() : base;
  })(file);

  var oldLayer = findLayerByNameRecursive(doc, posName) || findClippedLayerAbove(baseName);
  if (!oldLayer) {
    alert('Could not find player layer ' + posName);
    continue;
  }
  var b = oldLayer.bounds,
      ol = b[0].as('px'), ot = b[1].as('px'),
      ow = b[2].as('px') - ol, oh = b[3].as('px') - ot;
  oldLayer.remove();

  var base = findLayerByNameRecursive(doc, baseName);
  if (!base) {
    alert('Could not find base ' + baseName);
    continue;
  }

  var nd = app.open(file);
  nd.selection.selectAll(); nd.selection.copy();
  nd.close(SaveOptions.DONOTSAVECHANGES);
  doc.paste();
  var nl = doc.activeLayer;
  nl.name = posName;
  nl.move(base, ElementPlacement.PLACEBEFORE);

  var nb = nl.bounds;
  var scale = Math.min(
    ow / (nb[2].as('px') - nb[0].as('px')),
    oh / (nb[3].as('px') - nb[1].as('px'))
  ) * 100;
  nl.resize(scale, scale, AnchorPosition.TOPLEFT);
  var rb = nl.bounds;
  nl.translate(ol - rb[0].as('px'), ot - rb[1].as('px'));
  nl.grouped = true;

  var txt = findLayerByNameRecursive(doc, posName + '_text');
  if (txt && txt.kind == LayerKind.TEXT) {
    txt.textItem.contents = lastName;
  }
}

// --- 2) Teams ---
for (var p = 0; p < positions.length; p++) {
  var posName   = positions[p],
      layerName = posName + '_team',
      baseName  = posName + '_team_base',
      imgName   = teamFiles[p],
      file      = new File(desktop + '/TEAMS/' + imgName);

  if (!file.exists) {
    alert('Missing team badge: ' + imgName);
    continue;
  }

  var oldLayer = findLayerByNameRecursive(doc, layerName) || findClippedLayerAbove(baseName);
  if (!oldLayer) {
    alert('Could not find team layer ' + layerName);
    continue;
  }
  var b = oldLayer.bounds,
      ol = b[0].as('px'), ot = b[1].as('px'),
      ow = b[2].as('px') - ol, oh = b[3].as('px') - ot;
  oldLayer.remove();

  var base = findLayerByNameRecursive(doc, baseName);
  if (!base) {
    alert('Could not find team base ' + baseName);
    continue;
  }

  var nd = app.open(file);
  nd.selection.selectAll(); nd.selection.copy();
  nd.close(SaveOptions.DONOTSAVECHANGES);
  doc.paste();
  var nl = doc.activeLayer;
  nl.name = layerName;
  nl.move(base, ElementPlacement.PLACEBEFORE);

  var nb = nl.bounds;
  var scale = Math.min(
    ow / (nb[2].as('px') - nb[0].as('px')),
    oh / (nb[3].as('px') - nb[1].as('px'))
  ) * 100;
  nl.resize(scale, scale, AnchorPosition.TOPLEFT);
  var rb = nl.bounds;
  nl.translate(ol - rb[0].as('px'), ot - rb[1].as('px'));
  nl.grouped = true;
}

// --- 3) Nations ---
for (var p = 0; p < positions.length; p++) {
  var posName   = positions[p],
      layerName = posName + '_nation',
      baseName  = posName + '_nation_base',
      imgName   = nationFiles[p],
      file      = new File(desktop + '/NATIONS/' + imgName);

  if (!file.exists) {
    alert('Missing flag: ' + imgName);
    continue;
  }

  var oldLayer = findLayerByNameRecursive(doc, layerName) || findClippedLayerAbove(baseName);
  if (!oldLayer) {
    alert('Could not find nation layer ' + layerName);
    continue;
  }
  var b = oldLayer.bounds,
      ol = b[0].as('px'), ot = b[1].as('px'),
      ow = b[2].as('px') - ol, oh = b[3].as('px') - ot;
  oldLayer.remove();

  var base = findLayerByNameRecursive(doc, baseName);
  if (!base) {
    alert('Could not find nation base ' + baseName);
    continue;
  }

  var nd = app.open(file);
  nd.selection.selectAll(); nd.selection.copy();
  nd.close(SaveOptions.DONOTSAVECHANGES);
  doc.paste();
  var nl = doc.activeLayer;
  nl.name = layerName;
  nl.move(base, ElementPlacement.PLACEBEFORE);

  var nb = nl.bounds;
  var scale = Math.min(
    ow / (nb[2].as('px') - nb[0].as('px')),
    oh / (nb[3].as('px') - nb[1].as('px'))
  ) * 100;
  nl.resize(scale, scale, AnchorPosition.TOPLEFT);
  var rb = nl.bounds;
  nl.translate(ol - rb[0].as('px'), ot - rb[1].as('px'));
  nl.grouped = true;
}

alert('All 8 positions, teams & nations have been updated!');
