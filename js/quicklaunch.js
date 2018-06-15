var quicklaunchInjected = false;
var menuElements = [];

function injectQuicklaunch() {
  var menuItems = [];
  CRM.$('#civicrm-menu li a').each(function(index, item) {
    if (menuItems.indexOf(item.innerText) === -1) {
      menuItems.push(item.innerText);
      menuElements[item.innerText] = item;
    }
  });
  CRM.$('.menu-item a').each(function(index, item) {
    if (menuItems.indexOf(item.innerText) === -1) {
      menuItems.push(item.innerText);
      menuElements[item.innerText] = item;
    }
  });
  CRM.$('html').append(
    CRM.$('<div id="quicklaunch-box" class="ui-front">')
      .append(
        CRM.$('<input id="quicklaunch-input">').attr('placeHolder', 'Type to show suggestions')
          .autocomplete({
            source: menuItems,
            autoFocus: true,
            classes: {
              'ui-autocomplete': 'quicklaunch-autocomplete'
            },
            select: function(event, item) {
              menuElements[item.item.value].click();
            },
            delay: 0
          }).focusout(function() {
            hideQuicklaunch();
          })
      )
  );
  CRM.$('#quicklaunch-box').dialog({
    width: 430,
    height: 300,
    title: 'QuickLaunch',
    resizable: false,
    draggable: false
  });
  CRM.$('#quicklaunch-input').autocomplete('option', 'appendTo', '#quicklaunch-box');
  quicklaunchInjected = true;
}

function showQuicklaunch() {
  CRM.$('#quicklaunch-box').dialog('open');
}

function hideQuicklaunch() {
  CRM.$('#quicklaunch-box').dialog('close');
  CRM.$('#quicklaunch-input').val('');
}

CRM.$(document).keypress(function(e) {
  var menu = CRM.$('#civicrm-menu');
  if (menu && !CRM.$(document.activeElement).is(":input, [contenteditable]")) {
    var char = String.fromCharCode(e.which);
    if (/[a-z0-9]/i.test(char)) {
      if (!quicklaunchInjected) {
        injectQuicklaunch();
      }
      showQuicklaunch();
      CRM.$('#quicklaunch-input').focus();
    }
  }
});