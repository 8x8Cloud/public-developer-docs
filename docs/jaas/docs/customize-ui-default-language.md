# How to set default language

You can set the default language for the conference through the `lang` property. Please see below a snippet on how to set the UI language to German:

```javascript
const domain = '8x8.vc';
const options = {
    roomName: 'ExampleRoomName',
    width: 700,
    height: 700,
    parentNode: document.querySelector('#meet'),
    lang: 'de'
};
const api = new JitsiMeetExternalAPI(domain, options);

```
