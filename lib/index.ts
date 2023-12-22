
import Joi, { Extension, ExtensionFactory, Root } from 'joi';
import {
    isValidDate,
    isValidISODateString,
    isValidTime,
    isValidYearMonth,
} from 'iso-datestring-validator';

/**
 * Allows you to do `Joi.isoDate()`
 *
 * @param {Object} joi Joi instance provided by Joi
 * @return {Object} Joi plugin object
 */
export function isoDate (joi: Root): Extension | ExtensionFactory {
    return {
        type: 'isoDate',
        base: joi.string(),
        validate(value, helpers) {
            // console.log(`isoDate ${value}`);
            const isValid = isValidDate(value);
            // console.log(`isoDate ${value} ==> ${isValid}`);

            if (!isValid) {
                return {
                    value,
                    errors: helpers.error('isoDate.error', { value })
                };
            }

            return { value };
        },
        messages: {
            'isoDate.error': '`{{#value}}` is not a valid ISO Date string'
        }
    }
};


/**
 * Allows you to do `Joi.isoDateTime()`
 *
 * @param {Object} joi Joi instance provided by Joi
 * @return {Object} Joi plugin object
 */
export function isoDateTime (joi: Root): Extension | ExtensionFactory {
    return {
        type: 'isoDateTime',
        base: joi.string(),
        validate(value, helpers) {
            const isValid = isValidISODateString(value);

            if (!isValid) {
                return {
                    value,
                    errors: helpers.error('isoDateTime.error', { value })
                };
            }

            return { value };
        },
        messages: {
            'isoDateTime.error': '`{{#value}}` is not a valid ISO DateTime string'
        }
    }
};

/**
 * Allows you to do `Joi.isoTime()`
 *
 * @param {Object} joi Joi instance provided by Joi
 * @return {Object} Joi plugin object
 */
export function isoTime (joi: Root): Extension | ExtensionFactory {
    return {
        type: 'isoTime',
        base: joi.string(),
        validate(value, helpers) {
            // console.log(`isoTime ${value}`);
            // This uses the default separators, and enables
            // time zone check
            const isValid = isValidTime(value, undefined, true);

            // console.log(`isoTime ${value} ${isValid}`);

            if (!isValid) {
                return {
                    value,
                    errors: helpers.error('isoTime.error', { value })
                };
            }

            return { value };
        },
        messages: {
            'isoTime.error': '`{{#value}}` is not a valid ISO Time string'
        }
    }
};

/**
 * Allows you to do `Joi.isoYearMonth()`
 *
 * @param {Object} joi Joi instance provided by Joi
 * @return {Object} Joi plugin object
 */
export function isoYearMonth (joi: Root): Extension | ExtensionFactory {
    return {
        type: 'isoYearMonth',
        base: joi.string(),
        validate(value, helpers) {
            const isValid = isValidYearMonth(value);

            if (!isValid) {
                return {
                    value,
                    errors: helpers.error('isoYearMonth.error', { value })
                };
            }

            return { value };
        },
        messages: {
            'isoYearMonth.error': '`{{#value}}` is not a valid ISO DateTime string'
        }
    }
};
