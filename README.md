
Joi validators for ISO 8601 Date, Time, DateTime, and YearMonth strings.

This differs from `Joi.string().isoDate()` by supporting a fuller set of ISO 8601 date formats.  It differs from `Joi.date()` by returning a string rather than a Date object.

The inspiration for this package came from validating schema objects for an API specification written in OpenAPI.  This specification includes a schema object defined this way:

```yaml
dateTime:
  type: string
  format: date-time
  description: datetime in ISO 8601 format
  example: 2023-06-15T09:30:00Z
```

This is specified as a `string`, and not a `Date` object.  The `openapi-to-joi` package currently converts the above into the Joi schema: `Joi.date()`.  That relies on using the JavaScript Date object to determine validity, and the resulting object contains a JavaScript Date object rather than a String.  Having a Date breaks compatibility with the specification.

An additional issue is that, while its simple to implement validation using the Date object, it does not support many of the ISO 8601 formats.

This package is a Joi wrapper around the [`iso-datestring-validator`](https://www.npmjs.com/package/iso-datestring-validator) package.  It handles Date, Time, DateTime, and YearMonth validation, while supporting a larger number of ISO 8601 formats than the Date object.

## Installation

```
$ npm install joi joi-iso-datestring --save
$ npm install @types/hapi__joi --save-dev
```

This package requires that your application has already installed Joi.  The `@types/hapi__joi` package is required for using Joi with TypeScript.

## Usage

```js
// ES Modules or TypeScript
import _Joi from 'joi';
import {
    isoDate, isoDateTime, isoTime, isoYearMonth
} from 'joi-iso-datestring';

// CommonJS
const _Joi = require('joi');
const {
    isoDate, isoDateTime, isoTime, isoYearMonth
} = require('joi-iso-datestring');

// Install Joi extensions
const Joi = _Joi
    .extend(isoDate)
    .extend(isoDateTime)
    .extend(isoTime)
    .extend(isoYearMonth);
```

The first `.extend` may have to be written, in TypeScript, as ([`stackoverflow`](https://stackoverflow.com/questions/67132969/typescript-joi-date-validation)):

```js
const Joi = _Joi.extend(isoDate as unknown as Extension)
```

That's to avoid an error while compiling TypeScript code:

```
error TS2345: Argument of type '(joi: Root) => Extension | ExtensionFactory' is not assignable to parameter of type 'Extension | ExtensionFactory'.
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

// ISO Date Slash
const joiIsoDate = Joi.isoDate().separator('/');
const result = joiIsoDate.validate('2023/12/22');

// ISO Time
const joiIsoTime = Joi.isoTime();
const result = joiIsoTime.validate('23:26:00');

// ISO DateTime
const joiIsoDateTime = Joi.isoDateTime();
const result = joiIsoDateTime.validate('2023-12-22T23:26:00Z');

// ISO YearMonth
const joiIsoYearMonth = Joi.isoYearMonth();
const result = joiIsoYearMonth.validate('2023-12');

// ISO YearMonth with slashes
const joiIsoYearMonthSlashes = Joi.isoYearMonth().separator('/');
const result = joiIsoYearMonthSlashes.validate('2023/12');
```

In Joi, the `result` is an object where `result.error` indicates an error, and `result.value` contains the resulting value.  In this case `result.value` is a String.

## Completeness

ISO 8601 specifies a lot of date, time, and date/time formats which are apparently not in wide use.  The [Wikipedia page](https://en.wikipedia.org/wiki/ISO_8601) goes over many possible formats.  Many are simply not supported by the JavaScript Date object.  Some are not supported by the `iso-datestring-validator` package either.

The test suite for this package runs over 1600 tests.  But, the source code contains commented code for formats described on the Wikipedia page which are not supported by `iso-datestring-validator`, and are therefore not supported by `joi-iso-datestring`.

