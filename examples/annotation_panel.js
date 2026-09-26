// Selected Annotation panel: assigns a class and a colour to box volumes and to
// line measurements, and keeps every annotation of a class the same colour.
//
// SHARED FILE. This is the labelling UI of the PotreeDesktop app. It is loaded by
// both:
//
//   potree/examples/potree_desktop_index.html   browser preview, npm start
//   PotreeDesktop/src/annotation_panel.js       copied here by tools/sync-potree.js
//
// Edit it HERE, in the potree repo. PotreeDesktop picks the change up on its next
// launch, because PotreeDesktop.bat runs the sync before starting Electron. Do not
// edit the copy inside PotreeDesktop - it is overwritten.
//
// Expects jQuery and Potree as globals, and a `#menu_appearance` section to insert
// itself before. Call it from inside viewer.loadGUI().

	const _colorKeywords = {
		'aliceblue': 0xF0F8FF, 'antiquewhite': 0xFAEBD7, 'aqua': 0x00FFFF, 'aquamarine': 0x7FFFD4, 'azure': 0xF0FFFF,
		'beige': 0xF5F5DC, 'bisque': 0xFFE4C4, 'black': 0x000000, 'blanchedalmond': 0xFFEBCD, 'blue': 0x0000FF, 'blueviolet': 0x8A2BE2,
		'brown': 0xA52A2A, 'burlywood': 0xDEB887, 'cadetblue': 0x5F9EA0, 'chartreuse': 0x7FFF00, 'chocolate': 0xD2691E, 'coral': 0xFF7F50,
		'cornflowerblue': 0x6495ED, 'cornsilk': 0xFFF8DC, 'crimson': 0xDC143C, 'cyan': 0x00FFFF, 'darkblue': 0x00008B, 'darkcyan': 0x008B8B,
		'darkgoldenrod': 0xB8860B, 'darkgray': 0xA9A9A9, 'darkgreen': 0x006400, 'darkgrey': 0xA9A9A9, 'darkkhaki': 0xBDB76B, 'darkmagenta': 0x8B008B,
		'darkolivegreen': 0x556B2F, 'darkorange': 0xFF8C00, 'darkorchid': 0x9932CC, 'darkred': 0x8B0000, 'darksalmon': 0xE9967A, 'darkseagreen': 0x8FBC8F,
		'darkslateblue': 0x483D8B, 'darkslategray': 0x2F4F4F, 'darkslategrey': 0x2F4F4F, 'darkturquoise': 0x00CED1, 'darkviolet': 0x9400D3,
		'deeppink': 0xFF1493, 'deepskyblue': 0x00BFFF, 'dimgray': 0x696969, 'dimgrey': 0x696969, 'dodgerblue': 0x1E90FF, 'firebrick': 0xB22222,
		'floralwhite': 0xFFFAF0, 'forestgreen': 0x228B22, 'fuchsia': 0xFF00FF, 'gainsboro': 0xDCDCDC, 'ghostwhite': 0xF8F8FF, 'gold': 0xFFD700,
		'goldenrod': 0xDAA520, 'gray': 0x808080, 'green': 0x008000, 'greenyellow': 0xADFF2F, 'grey': 0x808080, 'honeydew': 0xF0FFF0, 'hotpink': 0xFF69B4,
		'indianred': 0xCD5C5C, 'indigo': 0x4B0082, 'ivory': 0xFFFFF0, 'khaki': 0xF0E68C, 'lavender': 0xE6E6FA, 'lavenderblush': 0xFFF0F5, 'lawngreen': 0x7CFC00,
		'lemonchiffon': 0xFFFACD, 'lightblue': 0xADD8E6, 'lightcoral': 0xF08080, 'lightcyan': 0xE0FFFF, 'lightgoldenrodyellow': 0xFAFAD2, 'lightgray': 0xD3D3D3,
		'lightgreen': 0x90EE90, 'lightgrey': 0xD3D3D3, 'lightpink': 0xFFB6C1, 'lightsalmon': 0xFFA07A, 'lightseagreen': 0x20B2AA, 'lightskyblue': 0x87CEFA,
		'lightslategray': 0x778899, 'lightslategrey': 0x778899, 'lightsteelblue': 0xB0C4DE, 'lightyellow': 0xFFFFE0, 'lime': 0x00FF00, 'limegreen': 0x32CD32,
		'linen': 0xFAF0E6, 'magenta': 0xFF00FF, 'maroon': 0x800000, 'mediumaquamarine': 0x66CDAA, 'mediumblue': 0x0000CD, 'mediumorchid': 0xBA55D3,
		'mediumpurple': 0x9370DB, 'mediumseagreen': 0x3CB371, 'mediumslateblue': 0x7B68EE, 'mediumspringgreen': 0x00FA9A, 'mediumturquoise': 0x48D1CC,
		'mediumvioletred': 0xC71585, 'midnightblue': 0x191970, 'mintcream': 0xF5FFFA, 'mistyrose': 0xFFE4E1, 'moccasin': 0xFFE4B5, 'navajowhite': 0xFFDEAD,
		'navy': 0x000080, 'oldlace': 0xFDF5E6, 'olive': 0x808000, 'olivedrab': 0x6B8E23, 'orange': 0xFFA500, 'orangered': 0xFF4500, 'orchid': 0xDA70D6,
		'palegoldenrod': 0xEEE8AA, 'palegreen': 0x98FB98, 'paleturquoise': 0xAFEEEE, 'palevioletred': 0xDB7093, 'papayawhip': 0xFFEFD5, 'peachpuff': 0xFFDAB9,
		'peru': 0xCD853F, 'pink': 0xFFC0CB, 'plum': 0xDDA0DD, 'powderblue': 0xB0E0E6, 'purple': 0x800080, 'rebeccapurple': 0x663399, 'red': 0xFF0000, 'rosybrown': 0xBC8F8F,
		'royalblue': 0x4169E1, 'saddlebrown': 0x8B4513, 'salmon': 0xFA8072, 'sandybrown': 0xF4A460, 'seagreen': 0x2E8B57, 'seashell': 0xFFF5EE,
		'sienna': 0xA0522D, 'silver': 0xC0C0C0, 'skyblue': 0x87CEEB, 'slateblue': 0x6A5ACD, 'slategray': 0x708090, 'slategrey': 0x708090, 'snow': 0xFFFAFA,
		'springgreen': 0x00FF7F, 'steelblue': 0x4682B4, 'tan': 0xD2B48C, 'teal': 0x008080, 'thistle': 0xD8BFD8, 'tomato': 0xFF6347, 'turquoise': 0x40E0D0,
		'violet': 0xEE82EE, 'wheat': 0xF5DEB3, 'white': 0xFFFFFF, 'whitesmoke': 0xF5F5F5, 'yellow': 0xFFFF00, 'yellowgreen': 0x9ACD32
	};

export function installAnnotationPanel(viewer){
	// ---- Selected Annotation ------------------------------------------

	// An annotation is anything that carries a class and a colour: box volumes
	// and measurements (distance lines, areas) are both handled here.
	const asAnnotation = (object) => {
		const isAnnotation = object instanceof Potree.BoxVolume
			|| object instanceof Potree.Measure;

		return isAnnotation ? object : null;
	};

	const selectedAnnotation = () => {
		const selection = viewer.inputHandler.selection;

		return selection.length === 1 ? asAnnotation(selection[0]) : null;
	};

	// A volume reads its colour back as a keyword string, while a measurement
	// renders from a live THREE.Color, so it is mutated in place - Potree does
	// not export THREE for us to construct a new one.
	const applyColor = (annotation, colorName) => {
		if(annotation instanceof Potree.Measure){
			annotation.color.setHex(_colorKeywords[colorName]);
			annotation.colorName = colorName;
		}else{
			annotation.color = colorName;
		}
	};

	// a single-marker measurement is a labelled point, not a line
	const kindOf = (annotation) => {
		if(!(annotation instanceof Potree.Measure)){
			return 'volume';
		}

		return annotation.maxMarkers === 1 ? 'point' : 'line';
	};

	const colorNameOf = (annotation) => {
		return (annotation instanceof Potree.Measure)
			? annotation.colorName
			: annotation.color;
	};

	// The colour of a class restored from a project is read back off the first
	// annotation carrying it, so a reloaded project keeps the colours it was saved
	// with. A volume that predates colour being saved falls back to a random one.
	const savedColorNameOf = (annotation) => {
		const existing = colorNameOf(annotation);
		if(typeof existing === 'string' && existing in _colorKeywords){
			return existing;
		}

		if(annotation instanceof Potree.Measure){
			const hex = annotation.color.getHex();
			const match = Object.keys(_colorKeywords).find(name => _colorKeywords[name] === hex);

			if(match){
				return match;
			}
		}

		const names = Object.keys(_colorKeywords);

		return names[Math.floor(Math.random() * names.length)];
	};

	let sectionAnnotation = $(`
		<h3 id="menu_annotation" class="accordion-header ui-widget"><span>Selected Annotation</span></h3>
		<div class="accordion-content ui-widget pv-menu-list"></div>
	`);

	let contentAnnotation = sectionAnnotation.last();
	contentAnnotation.html(`
		<div class="pv-menu-list">
			<div id="selectedAnnotationInfo">No annotation selected</div>
		</div>
	`);
	sectionAnnotation.first().click(() => contentAnnotation.slideToggle());
	sectionAnnotation.insertBefore($('#menu_appearance'));

	let classDropdown = $('<select id="classDropdown"></select>');
	let colorDropdown = $('<select id="colorDropdown"></select>');
	let classInput = $('<input type="text" id="classInput" placeholder="Enter new class name"/>');
	let addButton = $('<button id="addClassButton">Add</button>');

	// class name -> colour name. Add your own defaults here.
	let existingClasses = {};

	Object.keys(existingClasses).forEach(cls => {
		classDropdown.append(new Option(cls, cls));
	});
	Object.keys(_colorKeywords).forEach(colorKey => {
		colorDropdown.append(new Option(colorKey, colorKey));
	});

	contentAnnotation.append('<div>Assign Class:</div>');
	contentAnnotation.append(classDropdown);
	contentAnnotation.append(classInput);
	contentAnnotation.append(addButton);
	contentAnnotation.append('<div>Assign Color:</div>');
	contentAnnotation.append(colorDropdown);
	contentAnnotation.append('<div id="annotationHint" style="margin-top: 6px; opacity: 0.8;"></div>');

	// Colour belongs to a class, so it means nothing until a class exists.
	// Without this the dropdown silently writes to existingClasses[null].
	const hasClasses = () => classDropdown.find('option').length > 0;

	const setHint = (text) => $("#annotationHint").text(text);

	const syncColorAvailability = () => {
		colorDropdown.prop('disabled', !hasClasses());
	};

	syncColorAvailability();

	addButton.click(() => {
		let newClass = classInput.val().trim();
		if(!newClass){
			setHint('Type a class name before adding it.');
			return;
		}

		if(existingClasses[newClass] !== undefined || classDropdown.find(`option[value="${newClass}"]`).length){
			setHint(`Class "${newClass}" already exists.`);
			classInput.val('');
			return;
		}

		classDropdown.append(new Option(newClass, newClass));
		classDropdown.val(newClass);
		// a new class starts on the colour currently shown, so it is never undefined
		existingClasses[newClass] = colorDropdown.val() || Object.keys(_colorKeywords)[0];
		classInput.val('');
		syncColorAvailability();

		const annotation = selectedAnnotation();
		if(annotation){
			annotation.class = newClass;
		}
	});

	// assign the selected class to the selected annotation
	classDropdown.change(() => {
		const annotation = selectedAnnotation();
		if(annotation && classDropdown.val()){
			annotation.class = classDropdown.val();
		}
	});

	// a colour belongs to a class, not to a single annotation, so every
	// volume and line carrying that class recolours together
	colorDropdown.change(() => {
		const cls = classDropdown.val();

		if(!cls){
			setHint('Add a class first - colours are assigned per class.');
			return;
		}

		existingClasses[cls] = colorDropdown.val();
		setHint(`Class "${cls}" is now ${colorDropdown.val()}.`);
	});

	viewer.addEventListener("update", (event) => {
		const annotations = [...viewer.scene.volumes, ...viewer.scene.measurements];

		annotations.forEach((annotation) => {
			if(!annotation.class){
				return;
			}

			if(!(annotation.class in existingClasses)){
				// class came back from a loaded project: list it, and keep whatever
				// colour it was saved with. Without syncing availability here the
				// colour dropdown stays greyed out, because it was disabled back when
				// no class existed yet.
				existingClasses[annotation.class] = savedColorNameOf(annotation);
				classDropdown.append(new Option(annotation.class, annotation.class));
				syncColorAvailability();
			}

			const colorName = existingClasses[annotation.class];
			if(colorNameOf(annotation) !== colorName){
				applyColor(annotation, colorName);
			}
		});

		const annotation = selectedAnnotation();

		if(annotation){
			// only adopt a real class; assigning null would leave the annotation
			// looking labelled while never picking up a colour
			if(!annotation.class && classDropdown.val()){
				annotation.class = classDropdown.val();
			}

			const colorName = colorNameOf(annotation);
			if(annotation.class && colorName){
				classDropdown.val(annotation.class);
				colorDropdown.val(colorName);
			}

			const kind = kindOf(annotation);

			if(annotation.class){
				$("#selectedAnnotationInfo").text(`${kind} - class: ${annotation.class}, color: ${colorName}`);
				setHint('');
			}else{
				$("#selectedAnnotationInfo").text(`${kind} - no class`);
				setHint('Add a class to give this annotation a colour.');
			}
		}else{
			$("#selectedAnnotationInfo").text("No annotation selected");
			setHint(hasClasses() ? '' : 'Add a class to start labelling.');
		}
	});
}
