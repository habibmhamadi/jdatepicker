# jdatepicker
=====

A javascript solar (jalali) datepicker for HTML.

<img src="https://firebasestorage.googleapis.com/v0/b/flutterapp-5c015.appspot.com/o/demo_images%2Fjdatepicker.png?alt=media&token=e9a39bc0-c611-4173-8b35-c2ac1ec88c00" style="width:60%" alt="jdatepicker demo" />

## Installation

Install via NPM:

`npm install jdatepicker`

Install via CDN

```javascript
<script src="https://unpkg.com/jdatepicker@1.0.0/src/jdatepicker.js"></script>
```

## Usage

- You do not need to `require` if you are using via CDN.

```javascript
const { jDatePicker } = require('jdatepicker')

jDatePicker('inputID') // inputID is the id of the input element in HTML.
```

- You can pass a second optional paramater for customizing background colors and month names.

```javascript
jDatePicker('inputID', {
    headerColor: '#f44336',
    bodyColor: '#fff',
    dariMonth: false     // to show iranian month names.
})
```

## Contribute

Report bugs and suggest feature in [issue tracker](https://github.com/habibmhamadi/jdatepicker/issues). Feel free to `Fork` and send `Pull Requests`.


## License

[MIT](https://github.com/habibmhamadi/jdatepicker/blob/main/LICENSE)