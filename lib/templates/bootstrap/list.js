var React = require('react');
var { View, Text, TouchableHighlight } = require('react-native');

function renderRowWithoutButtons(item) {
  return <View key={item.key}>{item.input}</View>;
}

function renderRowButton(button, stylesheet, style) {
  return (
    <TouchableHighlight key={button.type} style={[stylesheet.button, style]} onPress={button.click}>
      <Text style={stylesheet.buttonText}>{button.label}</Text>
    </TouchableHighlight>
  );
}

function renderButtonGroup(buttons, stylesheet) {
  return (
    <View style={{flexDirection: 'row'}}>
      {buttons.map(button => renderRowButton(button, stylesheet, { width: 42, marginLeft: 10, marginBottom: 16 }))}
    </View>
  );
}

function renderRow(item, stylesheet) {
  return (
    <View key={item.key} style={{flexDirection: 'row', alignItems:'flex-end', paddingTop: 12, paddingLeft: 10, marginBottom: 3, backgroundColor: 'rgba(0, 0, 0, 0.03)'}}>
      <View style={{flex: 1}}>
        {item.input}
      </View>
      <View style={{flex: 1}}>
        {renderButtonGroup(item.buttons, stylesheet)}
      </View>
    </View>
  );
}

function list(locals) {
  if (locals.hidden) {
    return null;
  }

  var stylesheet = locals.stylesheet;
  var fieldsetStyle = stylesheet.fieldset;
  var controlLabelStyle = stylesheet.controlLabel.normal;

  if (locals.hasError) {
    controlLabelStyle = stylesheet.controlLabel.error;
  }

  var label = locals.label ? <Text style={[controlLabelStyle, {marginTop: 20, marginBottom: 20}]}>{locals.label}</Text> : null;
  var error = locals.hasError && locals.error ? <Text accessibilityLiveRegion="polite" style={stylesheet.errorBlock}>{locals.error}</Text> : null;

  var rows = locals.items.map(function (item) {
    return item.buttons.length === 0 ?
      renderRowWithoutButtons(item) :
      renderRow(item, stylesheet);
  });
  var addButton = locals.add ?
    renderRowButton(locals.add, stylesheet) :
    null;

  return (
    <View style={[fieldsetStyle, {marginBottom: 15}]}>
      {label}
      {error}
      {rows}
      <View  style={{paddingTop: 12, paddingHorizontal: 10, marginBottom: 1, backgroundColor: 'rgba(0, 0, 0, 0.03)'}}>
        {addButton}
      </View>

    </View>
  );
}

module.exports = list;
