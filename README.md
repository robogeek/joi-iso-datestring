# joi-iso-datestring

Joi validator for ISO 8601 dates/times.

This differs from `Joi.string().isoDate()` by supporting a fuller set of ISO 8601 date formats.  It differs from `Joi.date()` by returning a string rather than a Date object.

The inspiration for this package came from validating schema objects for an API specification written in OpenAPI.  Some of the objects specified a value of type `string` and format of `date-time`.  None of the existing Joi validators for date strings maintained the resulting value as a string.

An additional issue is validation performed by parsing the string with the JavaScript Date object.  While that's simple to implement, the Date object does not support many of the ISO 8601 formats.

This package is a Joi wrapper around the [`iso-datestring-validator
`](https://www.npmjs.com/package/iso-datestring-validator) package.  It handles Date, Time, DateTime, and YearMonth validation, while supporting a larger number of ISO 8601 formats than the Date object.

## Installation

```
npm install joi joi-iso-datestring --save
```

This package requires that your application has already installed Joi.

## Usage

```js
// ES Modules or TypeScript
import Joi from 'joi';
import {
    isoDate, isoDateTime, isoTime, isoYearMonth
} from 'joi-iso-datestring';

// CommonJS
const Joi = require('joi');
const {
    isoDate, isoDateTime, isoTime, isoYearMonth
} = require('joi-iso-datestring');

// Install Joi extensions
Joi
    .extend(isoDate)
    .extend(isoDateTime)
    .extend(isoTime)
    .extend(isoYearMonth);
```

Four Joi extensions are exported from the package.  They handle:

* `isoDateString` -- Date formats like `YYYY-MM-DD`.
* `isoTime` -- Time formats like `HH:MM:SS.NNN`, as well as time zone offsets like `+10:00` or `Z`.
* `isoDateTime` -- DateTime formats like `YYYY-MM-DDTHH:MM:SS.NNNZ`
* `isoYearMonth` -- YearTime formats like `YYYY-MM`.

Validation is handled as so:

```js
// ISO Date
const joiIsoDate = Joi.isoDate();
const result = joiIsoDate.validate('2023-12-22');

// ISO Time
const joiIsoTime = Joi.isoTime();
const result = joiIsoTime.validate('23:26:00');

// ISO DateTime
const joiIsoDateTime = Joi.isoDateTime();
const result = joiIsoDateTime.validate('2023-12-22T23:26:00Z');

// ISO YearMonth
const joiIsoYearMonth = Joi.isoYearMonth();
const result = joiIsoYearMonth.validate('2023-12');
```

In Joi, the `result` is an object where `result.error` indicates an error, and `result.value` contains the resulting value.

