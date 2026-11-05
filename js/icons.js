"use strict";
/* Shared line-icon set. Every icon is a 24x24 SVG so it takes the colour and
   size of whatever text surrounds it. Use GMI("name") to get an SVG string. */
(function () {
  const P = {
    /* Subjects and lessons */
    computer: '<rect x="3" y="4" width="18" height="12" rx="2"/><path d="M9 20h6M12 16v4"/>',
    monitor: '<rect x="2" y="4" width="20" height="13" rx="2"/><path d="M8 21h8M12 17v4"/>',
    keyboard: '<rect x="2" y="7" width="20" height="10" rx="2"/><path d="M6 11h.01M10 11h.01M14 11h.01M18 11h.01M7 14h10"/>',
    mouse: '<rect x="8" y="3" width="8" height="18" rx="4"/><path d="M12 7v4"/>',
    folder: '<path d="M3 8a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>',
    document: '<path d="M6 3h8l4 4v14H6z"/><path d="M14 3v4h4M9 13h6M9 17h4"/>',
    file: '<path d="M6 3h8l4 4v14H6z"/><path d="M14 3v4h4"/>',
    spreadsheet: '<rect x="3" y="4" width="18" height="16" rx="2"/><path d="M3 9h18M9 9v11M15 9v11"/>',
    globe: '<circle cx="12" cy="12" r="9"/><path d="M3 12h18"/><path d="M12 3c3.5 3 3.5 15 0 18M12 3c-3.5 3-3.5 15 0 18"/>',
    shield: '<path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z"/><path d="M9 12l2 2 4-4"/>',
    target: '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1.4"/>',
    book: '<path d="M12 6C10 4 7 4 4 5v14c3-1 6-1 8 1 2-2 5-2 8-1V5c-3-1-6-1-8 1z"/><path d="M12 6v14"/>',
    hand: '<path d="M8 11V6a2 2 0 0 1 4 0v5M12 11V5a2 2 0 0 1 4 0v6M16 11V8a2 2 0 0 1 4 0v7a6 6 0 0 1-6 6h-2a6 6 0 0 1-6-6V9a2 2 0 0 1 4 0"/>',
    dice: '<rect x="3" y="3" width="18" height="18" rx="4"/><path d="M8 8h.01M16 8h.01M12 12h.01M8 16h.01M16 16h.01"/>',
    image: '<rect x="3" y="4" width="18" height="16" rx="2"/><circle cx="8" cy="9" r="1.5"/><path d="M4 18l5-5 3 3 3-4 5 6"/>',
    music: '<path d="M9 18V6l10-2v12"/><circle cx="6" cy="18" r="3"/><circle cx="16" cy="16" r="3"/>',
    mail: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/>',
    link: '<path d="M10 14a4 4 0 0 0 6 0l2-2a4 4 0 0 0-6-6l-1 1"/><path d="M14 10a4 4 0 0 0-6 0l-2 2a4 4 0 0 0 6 6l1-1"/>',
    lock: '<rect x="5" y="10" width="14" height="10" rx="2"/><path d="M8 10V8a4 4 0 0 1 8 0v2"/>',
    user: '<circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/>',

    /* Mouse and interface actions */
    pointer: '<path d="M6 3l13 7-5.5 2L11 18z"/>',
    click: '<path d="M9 4l10 6-4 1.5L13 16z"/><path d="M4 10a4 4 0 0 1 3-4M20 14a4 4 0 0 1-3 4"/>',
    menu: '<path d="M4 7h16M4 12h16M4 17h10"/>',
    drag: '<path d="M9 5l3-3 3 3M9 19l3 3 3-3M5 9l-3 3 3 3M19 9l3 3-3 3M12 2v20M2 12h20"/>',
    scroll: '<rect x="7" y="3" width="10" height="18" rx="5"/><path d="M12 7v4"/>',
    select: '<path d="M4 4h6M4 4v6M20 4h-6M20 4v6M4 20h6M4 20v-6M20 20h-6M20 20v-6"/>',
    arrowDown: '<path d="M12 4v15M6 13l6 6 6-6"/>',
    resize: '<path d="M15 3h6v6M3 15v6h6M21 3L3 21"/>',
    eye: '<path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7-10-7-10-7z"/><circle cx="12" cy="12" r="3"/>',
    chevronDown: '<path d="M6 9l6 6 6-6"/>',
    copy: '<rect x="9" y="9" width="11" height="11" rx="2"/><path d="M5 15V6a2 2 0 0 1 2-2h9"/>',
    paste: '<path d="M9 4h6v3H9z"/><path d="M7 5H5a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2"/>',
    trash: '<path d="M4 7h16M9 7V5h6v2M6 7l1 13h10l1-13"/>',
    pencil: '<path d="M4 20l4-1 11-11-3-3L5 16z"/><path d="M14 5l3 3"/>',
    bold: '<path d="M7 4h6a4 4 0 0 1 0 8H7zM7 12h7a4 4 0 0 1 0 8H7z"/>',
    italic: '<path d="M10 4h8M6 20h8M14 4l-4 16"/>',
    underline: '<path d="M7 4v7a5 5 0 0 0 10 0V4M5 20h14"/>',
    checkbox: '<rect x="3" y="3" width="18" height="18" rx="3"/><path d="M8 12l3 3 5-6"/>',
    radio: '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="3.5"/>',
    palette: '<path d="M12 3a9 9 0 1 0 0 18c1.5 0 2-1 1.5-2.2-.6-1.5.5-2.8 2-2.8H18a3 3 0 0 0 3-3c0-5-4-10-9-10z"/><path d="M7 11h.01M10 7.5h.01M14.5 7h.01"/>',
    gift: '<rect x="4" y="10" width="16" height="10" rx="2"/><path d="M12 10v10M4 14h16"/><path d="M12 10C10 7 7 7 7 9s3 3 5 1M12 10c2-3 5-3 5-1s-3 3-5 1"/>',
    check: '<path d="M4 12.5l5 5L20 6.5"/>',
    cross: '<path d="M6 6l12 12M18 6L6 18"/>',
    star: '<path d="M12 3l2.7 5.6 6.1.9-4.4 4.3 1 6.1-5.4-2.9-5.4 2.9 1-6.1L3.2 9.5l6.1-.9z"/>',
    trophy: '<path d="M8 4h8v5a4 4 0 0 1-8 0z"/><path d="M8 6H5v1a3 3 0 0 0 3 3M16 6h3v1a3 3 0 0 1-3 3M12 13v4M8 21h8"/>',
    thumbsUp: '<path d="M7 11v9H4V11zM7 11l4-7a2 2 0 0 1 3 1v4h5a2 2 0 0 1 2 2l-2 7a2 2 0 0 1-2 2H7"/>',
    muscle: '<path d="M6 9a4 4 0 0 1 7-2v2h2a4 4 0 0 1 4 4v3a4 4 0 0 1-4 4H9a4 4 0 0 1-4-4z"/><path d="M9 13a3 3 0 0 1 4 0"/>',
    clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
    search: '<circle cx="11" cy="11" r="7"/><path d="M16 16l5 5"/>',
    flag: '<path d="M5 21V4M5 5h11l-1.5 3L16 11H5"/>',
    play: '<path d="M8 5l11 7-11 7z"/>',
    home: '<path d="M3 11l9-8 9 8"/><path d="M5 10v10h14V10"/>',

    /* Shapes */
    circle: '<circle cx="12" cy="12" r="8"/>',
    square: '<rect x="4" y="4" width="16" height="16" rx="2"/>',
    triangle: '<path d="M12 4l9 16H3z"/>'
  };

  const NAMES = {
    computer: "computer", monitor: "monitor", keyboard: "keyboard", mouse: "mouse",
    folder: "folder", document: "document", file: "file", spreadsheet: "spreadsheet",
    globe: "globe", shield: "shield", target: "target", book: "lesson",
    hand: "hand", dice: "dice", image: "picture", music: "music", mail: "email",
    link: "link", lock: "lock", user: "person", pointer: "pointer", click: "click",
    menu: "menu", drag: "drag", scroll: "scroll", select: "text selection",
    resize: "resize handle", eye: "eye", copy: "copy", paste: "paste",
    trash: "delete", pencil: "rename", circle: "circle", square: "square",
    triangle: "triangle", star: "star", gift: "gift", check: "tick",
    radio: "radio button", checkbox: "checkbox", palette: "colour"
  };

  window.GMI_NAMES = NAMES;
  window.GMI_HAS = function (name) { return Object.prototype.hasOwnProperty.call(P, name); };
  window.GMI = function (name, cls) {
    const body = P[name] || P.target;
    return '<svg class="icon-svg' + (cls ? " " + cls : "") + '" viewBox="0 0 24 24" ' +
      'fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" ' +
      'stroke-linejoin="round" aria-hidden="true" focusable="false">' + body + "</svg>";
  };
})();
