
import Joi, { Extension, ExtensionFactory, Root } from 'joi';
import {
    isValidDate,
    isValidISODateString,
    isValidTime,
    isValidYearMonth,
} from 'iso-datestring-validator';

/*
 * This is an attempt to instead implement
 *       Joi.string().isoDate()
 * and the like.  But, Joi kept saying 'type' is required.
 */
// export default (joi: Root): Extension | ExtensionFactory  => {
//     return {
//     type: 'string',
//     base: joi.string(),
//     messages: {
//         'isoDate.error': '`{{#value}}` is not a valid ISO Date string',
//         'isoTime.error': '`{{#value}}` is not a valid ISO Time string',
//         'isoDateTime.error': '`{{#value}}` is not a valid ISO DateTime string',
//         'isoYearMonth.error': '`{{#value}}` is not a valid ISO DateTime string'
//     },
//     rules: {
//         isoDate: {
//             // type: 'isoDate',
//             validate(value: any, helpers: Joi.CustomHelpers<any>) {
//                 // return validateIsoDateString(value, helpers);
//                 // console.log(`isoDate ${value}`);
//                 const isValid = isValidDate(value);
//                 // console.log(`isoDate ${value} ==> ${isValid}`);
    
//                 if (!isValid) {
//                     return {
//                         value,
//                         errors: helpers.error('isoDate.error', { value })
//                     };
//                 }
    
//                 return { value };
//             },
//         },
//         isoTime: {
//             // type: 'isoTime',
//             validate(value: any, helpers: Joi.CustomHelpers<any>) {
//                 // console.log(`isoTime ${value}`);
//                 // This uses the default separators, and enables
//                 // time zone check
//                 const isValid = isValidTime(value, undefined, true);

//                 // console.log(`isoTime ${value} ${isValid}`);

//                 if (!isValid) {
//                     return {
//                         value,
//                         errors: helpers.error('isoTime.error', { value })
//                     };
//                 }

//                 return { value };
//             }
//         },
//         isoDateTime: {
//             // type: 'isoDateTime',
//             validate(value: any, helpers: Joi.CustomHelpers<any>) {
//                 const isValid = isValidISODateString(value);
    
//                 if (!isValid) {
//                     return {
//                         value,
//                         errors: helpers.error('isoDateTime.error', { value })
//                     };
//                 }
    
//                 return { value };
//             }
//         },
//         isoYearMonth: {
//             // type: 'isoYearMonth',
//             validate(value: any, helpers: Joi.CustomHelpers<any>) {
//                 const isValid = isValidYearMonth(value);
    
//                 if (!isValid) {
//                     return {
//                         value,
//                         errors: helpers.error('isoYearMonth.error', { value })
//                     };
//                 }
    
//                 return { value };
//             }
//         }
//     }
// }};

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
            const separator = helpers.schema.$_getFlag('separator');
            return validateIsoDateString(value, helpers, separator);
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
        },
        rules: {
            isoDateString: {
                validate(value, helpers) {
                    const separator = helpers.schema.$_getFlag('separator');
                    return validateIsoDateString(value, helpers, separator);
                }
            },
            separator: {
                method: function (enabled = true) {
                    return this.$_setFlag('separator', enabled);
                }
            }
        }
    }
};

function validateIsoDateString(value: any,
            helpers: Joi.CustomHelpers<any>,
            separator?: string) {
    // console.log(`isoDate ${value}`);
    const isValid = separator
                ? isValidDate(value, separator)
                : isValidDate(value);
    // console.log(`isoDate ${value} ==> ${isValid}`);

    if (!isValid) {
        return {
            value,
            errors: helpers.error('isoDate.error', { value })
        };
    }

    return { value };
}

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
            const separator = helpers.schema.$_getFlag('separator');
            const isValid = separator
                    ? isValidTime(value, separator, true)
                    : isValidTime(value, undefined, true);

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
        },
        rules: {
            separator: {
                method: function (enabled = true) {
                    return this.$_setFlag('separator', enabled);
                }
            }
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
            const separator = helpers.schema.$_getFlag('separator');
            const isValid = separator
                    ? isValidYearMonth(value, separator)
                    : isValidYearMonth(value);

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
        },
        rules: {
            separator: {
                method: function (enabled = true) {
                    return this.$_setFlag('separator', enabled);
                }
            }
        }

        // rules: {
        //     isoYearMonth: {
        //         validate(value, helpers) {
        //             return validateIsoYearMonth(value, helpers);
        //         }
        //     }
        // }
    }
};

// function validateIsoYearMonth(value: any, helpers: Joi.CustomHelpers<any>) {
//     // console.log(`isoDate ${value}`);
//     const isValid = isValidYearMonth(value);
//     // console.log(`isoDate ${value} ==> ${isValid}`);

//     if (!isValid) {
//         return {
//             value,
//             errors: helpers.error('isoYearMonth.error', { value })
//         };
//     }

//     return { value };
// }
