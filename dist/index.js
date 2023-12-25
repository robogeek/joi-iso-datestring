"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isoYearMonth = exports.isoTime = exports.isoDateTime = exports.isoDate = void 0;
const iso_datestring_validator_1 = require("iso-datestring-validator");
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
function isoDate(joi) {
    return {
        type: 'isoDate',
        base: joi.string(),
        validate(value, helpers) {
            const separator = helpers.schema.$_getFlag('separator');
            return validateIsoDateString(value, helpers, separator);
            // console.log(`isoDate ${value}`);
            const isValid = (0, iso_datestring_validator_1.isValidDate)(value);
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
            // isoDateString: {
            //     validate(value, helpers) {
            //         const separator = helpers.schema.$_getFlag('separator');
            //         return validateIsoDateString(value, helpers, separator);
            //     }
            // },
            separator: {
                method: function (enabled = true) {
                    return this.$_setFlag('separator', enabled);
                }
            }
        }
    };
}
exports.isoDate = isoDate;
;
function validateIsoDateString(value, helpers, separator) {
    // console.log(`isoDate ${value}`);
    const isValid = separator
        ? (0, iso_datestring_validator_1.isValidDate)(value, separator)
        : (0, iso_datestring_validator_1.isValidDate)(value);
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
function isoDateTime(joi) {
    return {
        type: 'isoDateTime',
        base: joi.string(),
        validate(value, helpers) {
            const isValid = (0, iso_datestring_validator_1.isValidISODateString)(value);
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
    };
}
exports.isoDateTime = isoDateTime;
;
/**
 * Allows you to do `Joi.isoTime()`
 *
 * @param {Object} joi Joi instance provided by Joi
 * @return {Object} Joi plugin object
 */
function isoTime(joi) {
    return {
        type: 'isoTime',
        base: joi.string(),
        validate(value, helpers) {
            // console.log(`isoTime ${value}`);
            // This uses the default separators, and enables
            // time zone check
            const separator = helpers.schema.$_getFlag('separator');
            const isValid = separator
                ? (0, iso_datestring_validator_1.isValidTime)(value, separator, true)
                : (0, iso_datestring_validator_1.isValidTime)(value, undefined, true);
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
    };
}
exports.isoTime = isoTime;
;
/**
 * Allows you to do `Joi.isoYearMonth()`
 *
 * @param {Object} joi Joi instance provided by Joi
 * @return {Object} Joi plugin object
 */
function isoYearMonth(joi) {
    return {
        type: 'isoYearMonth',
        base: joi.string(),
        validate(value, helpers) {
            const separator = helpers.schema.$_getFlag('separator');
            const isValid = separator
                ? (0, iso_datestring_validator_1.isValidYearMonth)(value, separator)
                : (0, iso_datestring_validator_1.isValidYearMonth)(value);
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
    };
}
exports.isoYearMonth = isoYearMonth;
;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9saWIvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBRUEsdUVBS2tDO0FBRWxDOzs7O0dBSUc7QUFDSCxpRUFBaUU7QUFDakUsZUFBZTtBQUNmLHNCQUFzQjtBQUN0QiwwQkFBMEI7QUFDMUIsa0JBQWtCO0FBQ2xCLDBFQUEwRTtBQUMxRSwwRUFBMEU7QUFDMUUsa0ZBQWtGO0FBQ2xGLGtGQUFrRjtBQUNsRixTQUFTO0FBQ1QsZUFBZTtBQUNmLHFCQUFxQjtBQUNyQixrQ0FBa0M7QUFDbEMsc0VBQXNFO0FBQ3RFLG1FQUFtRTtBQUNuRSxzREFBc0Q7QUFDdEQsc0RBQXNEO0FBQ3RELHFFQUFxRTtBQUVyRSxrQ0FBa0M7QUFDbEMsK0JBQStCO0FBQy9CLGlDQUFpQztBQUNqQyw0RUFBNEU7QUFDNUUseUJBQXlCO0FBQ3pCLG9CQUFvQjtBQUVwQixvQ0FBb0M7QUFDcEMsaUJBQWlCO0FBQ2pCLGFBQWE7QUFDYixxQkFBcUI7QUFDckIsa0NBQWtDO0FBQ2xDLHNFQUFzRTtBQUN0RSxzREFBc0Q7QUFDdEQsbUVBQW1FO0FBQ25FLHFDQUFxQztBQUNyQyx1RUFBdUU7QUFFdkUsaUVBQWlFO0FBRWpFLGtDQUFrQztBQUNsQywrQkFBK0I7QUFDL0IsaUNBQWlDO0FBQ2pDLDRFQUE0RTtBQUM1RSx5QkFBeUI7QUFDekIsb0JBQW9CO0FBRXBCLG9DQUFvQztBQUNwQyxnQkFBZ0I7QUFDaEIsYUFBYTtBQUNiLHlCQUF5QjtBQUN6QixzQ0FBc0M7QUFDdEMsc0VBQXNFO0FBQ3RFLCtEQUErRDtBQUUvRCxrQ0FBa0M7QUFDbEMsK0JBQStCO0FBQy9CLGlDQUFpQztBQUNqQyxnRkFBZ0Y7QUFDaEYseUJBQXlCO0FBQ3pCLG9CQUFvQjtBQUVwQixvQ0FBb0M7QUFDcEMsZ0JBQWdCO0FBQ2hCLGFBQWE7QUFDYiwwQkFBMEI7QUFDMUIsdUNBQXVDO0FBQ3ZDLHNFQUFzRTtBQUN0RSwyREFBMkQ7QUFFM0Qsa0NBQWtDO0FBQ2xDLCtCQUErQjtBQUMvQixpQ0FBaUM7QUFDakMsaUZBQWlGO0FBQ2pGLHlCQUF5QjtBQUN6QixvQkFBb0I7QUFFcEIsb0NBQW9DO0FBQ3BDLGdCQUFnQjtBQUNoQixZQUFZO0FBQ1osUUFBUTtBQUNSLE1BQU07QUFFTjs7Ozs7R0FLRztBQUNILFNBQWdCLE9BQU8sQ0FBRSxHQUFTO0lBQzlCLE9BQU87UUFDSCxJQUFJLEVBQUUsU0FBUztRQUNmLElBQUksRUFBRSxHQUFHLENBQUMsTUFBTSxFQUFFO1FBQ2xCLFFBQVEsQ0FBQyxLQUFVLEVBQUUsT0FBK0I7WUFDaEQsTUFBTSxTQUFTLEdBQUcsT0FBTyxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsV0FBVyxDQUFDLENBQUM7WUFDeEQsT0FBTyxxQkFBcUIsQ0FBQyxLQUFLLEVBQUUsT0FBTyxFQUFFLFNBQVMsQ0FBQyxDQUFDO1lBQ3hELG1DQUFtQztZQUNuQyxNQUFNLE9BQU8sR0FBRyxJQUFBLHNDQUFXLEVBQUMsS0FBSyxDQUFDLENBQUM7WUFDbkMsa0RBQWtEO1lBRWxELElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQztnQkFDWCxPQUFPO29CQUNILEtBQUs7b0JBQ0wsTUFBTSxFQUFFLE9BQU8sQ0FBQyxLQUFLLENBQUMsZUFBZSxFQUFFLEVBQUUsS0FBSyxFQUFFLENBQUM7aUJBQ3BELENBQUM7WUFDTixDQUFDO1lBRUQsT0FBTyxFQUFFLEtBQUssRUFBRSxDQUFDO1FBQ3JCLENBQUM7UUFDRCxRQUFRLEVBQUU7WUFDTixlQUFlLEVBQUUsNkNBQTZDO1NBQ2pFO1FBQ0QsS0FBSyxFQUFFO1lBQ0gsbUJBQW1CO1lBQ25CLGlDQUFpQztZQUNqQyxtRUFBbUU7WUFDbkUsbUVBQW1FO1lBQ25FLFFBQVE7WUFDUixLQUFLO1lBQ0wsU0FBUyxFQUFFO2dCQUNQLE1BQU0sRUFBRSxVQUFVLE9BQU8sR0FBRyxJQUFJO29CQUM1QixPQUFPLElBQUksQ0FBQyxTQUFTLENBQUMsV0FBVyxFQUFFLE9BQU8sQ0FBQyxDQUFDO2dCQUNoRCxDQUFDO2FBQ0o7U0FDSjtLQUNKLENBQUE7QUFDTCxDQUFDO0FBckNELDBCQXFDQztBQUFBLENBQUM7QUFFRixTQUFTLHFCQUFxQixDQUFDLEtBQVUsRUFDN0IsT0FBK0IsRUFDL0IsU0FBa0I7SUFDMUIsbUNBQW1DO0lBQ25DLE1BQU0sT0FBTyxHQUFHLFNBQVM7UUFDYixDQUFDLENBQUMsSUFBQSxzQ0FBVyxFQUFDLEtBQUssRUFBRSxTQUFTLENBQUM7UUFDL0IsQ0FBQyxDQUFDLElBQUEsc0NBQVcsRUFBQyxLQUFLLENBQUMsQ0FBQztJQUNqQyxrREFBa0Q7SUFFbEQsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDO1FBQ1gsT0FBTztZQUNILEtBQUs7WUFDTCxNQUFNLEVBQUUsT0FBTyxDQUFDLEtBQUssQ0FBQyxlQUFlLEVBQUUsRUFBRSxLQUFLLEVBQUUsQ0FBQztTQUNwRCxDQUFDO0lBQ04sQ0FBQztJQUVELE9BQU8sRUFBRSxLQUFLLEVBQUUsQ0FBQztBQUNyQixDQUFDO0FBRUQ7Ozs7O0dBS0c7QUFDSCxTQUFnQixXQUFXLENBQUUsR0FBUztJQUNsQyxPQUFPO1FBQ0gsSUFBSSxFQUFFLGFBQWE7UUFDbkIsSUFBSSxFQUFFLEdBQUcsQ0FBQyxNQUFNLEVBQUU7UUFDbEIsUUFBUSxDQUFDLEtBQUssRUFBRSxPQUFPO1lBQ25CLE1BQU0sT0FBTyxHQUFHLElBQUEsK0NBQW9CLEVBQUMsS0FBSyxDQUFDLENBQUM7WUFFNUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDO2dCQUNYLE9BQU87b0JBQ0gsS0FBSztvQkFDTCxNQUFNLEVBQUUsT0FBTyxDQUFDLEtBQUssQ0FBQyxtQkFBbUIsRUFBRSxFQUFFLEtBQUssRUFBRSxDQUFDO2lCQUN4RCxDQUFDO1lBQ04sQ0FBQztZQUVELE9BQU8sRUFBRSxLQUFLLEVBQUUsQ0FBQztRQUNyQixDQUFDO1FBQ0QsUUFBUSxFQUFFO1lBQ04sbUJBQW1CLEVBQUUsaURBQWlEO1NBQ3pFO0tBQ0osQ0FBQTtBQUNMLENBQUM7QUFwQkQsa0NBb0JDO0FBQUEsQ0FBQztBQUVGOzs7OztHQUtHO0FBQ0gsU0FBZ0IsT0FBTyxDQUFFLEdBQVM7SUFDOUIsT0FBTztRQUNILElBQUksRUFBRSxTQUFTO1FBQ2YsSUFBSSxFQUFFLEdBQUcsQ0FBQyxNQUFNLEVBQUU7UUFDbEIsUUFBUSxDQUFDLEtBQUssRUFBRSxPQUFPO1lBQ25CLG1DQUFtQztZQUNuQyxnREFBZ0Q7WUFDaEQsa0JBQWtCO1lBQ2xCLE1BQU0sU0FBUyxHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLFdBQVcsQ0FBQyxDQUFDO1lBQ3hELE1BQU0sT0FBTyxHQUFHLFNBQVM7Z0JBQ2pCLENBQUMsQ0FBQyxJQUFBLHNDQUFXLEVBQUMsS0FBSyxFQUFFLFNBQVMsRUFBRSxJQUFJLENBQUM7Z0JBQ3JDLENBQUMsQ0FBQyxJQUFBLHNDQUFXLEVBQUMsS0FBSyxFQUFFLFNBQVMsRUFBRSxJQUFJLENBQUMsQ0FBQztZQUU5Qyw4Q0FBOEM7WUFFOUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDO2dCQUNYLE9BQU87b0JBQ0gsS0FBSztvQkFDTCxNQUFNLEVBQUUsT0FBTyxDQUFDLEtBQUssQ0FBQyxlQUFlLEVBQUUsRUFBRSxLQUFLLEVBQUUsQ0FBQztpQkFDcEQsQ0FBQztZQUNOLENBQUM7WUFFRCxPQUFPLEVBQUUsS0FBSyxFQUFFLENBQUM7UUFDckIsQ0FBQztRQUNELFFBQVEsRUFBRTtZQUNOLGVBQWUsRUFBRSw2Q0FBNkM7U0FDakU7UUFDRCxLQUFLLEVBQUU7WUFDSCxTQUFTLEVBQUU7Z0JBQ1AsTUFBTSxFQUFFLFVBQVUsT0FBTyxHQUFHLElBQUk7b0JBQzVCLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQyxXQUFXLEVBQUUsT0FBTyxDQUFDLENBQUM7Z0JBQ2hELENBQUM7YUFDSjtTQUNKO0tBQ0osQ0FBQTtBQUNMLENBQUM7QUFuQ0QsMEJBbUNDO0FBQUEsQ0FBQztBQUVGOzs7OztHQUtHO0FBQ0gsU0FBZ0IsWUFBWSxDQUFFLEdBQVM7SUFDbkMsT0FBTztRQUNILElBQUksRUFBRSxjQUFjO1FBQ3BCLElBQUksRUFBRSxHQUFHLENBQUMsTUFBTSxFQUFFO1FBQ2xCLFFBQVEsQ0FBQyxLQUFLLEVBQUUsT0FBTztZQUNuQixNQUFNLFNBQVMsR0FBRyxPQUFPLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxXQUFXLENBQUMsQ0FBQztZQUN4RCxNQUFNLE9BQU8sR0FBRyxTQUFTO2dCQUNqQixDQUFDLENBQUMsSUFBQSwyQ0FBZ0IsRUFBQyxLQUFLLEVBQUUsU0FBUyxDQUFDO2dCQUNwQyxDQUFDLENBQUMsSUFBQSwyQ0FBZ0IsRUFBQyxLQUFLLENBQUMsQ0FBQztZQUVsQyxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7Z0JBQ1gsT0FBTztvQkFDSCxLQUFLO29CQUNMLE1BQU0sRUFBRSxPQUFPLENBQUMsS0FBSyxDQUFDLG9CQUFvQixFQUFFLEVBQUUsS0FBSyxFQUFFLENBQUM7aUJBQ3pELENBQUM7WUFDTixDQUFDO1lBRUQsT0FBTyxFQUFFLEtBQUssRUFBRSxDQUFDO1FBQ3JCLENBQUM7UUFDRCxRQUFRLEVBQUU7WUFDTixvQkFBb0IsRUFBRSxpREFBaUQ7U0FDMUU7UUFDRCxLQUFLLEVBQUU7WUFDSCxTQUFTLEVBQUU7Z0JBQ1AsTUFBTSxFQUFFLFVBQVUsT0FBTyxHQUFHLElBQUk7b0JBQzVCLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQyxXQUFXLEVBQUUsT0FBTyxDQUFDLENBQUM7Z0JBQ2hELENBQUM7YUFDSjtTQUNKO0tBRUosQ0FBQTtBQUNMLENBQUM7QUEvQkQsb0NBK0JDO0FBQUEsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIlxuaW1wb3J0IEpvaSwgeyBFeHRlbnNpb24sIEV4dGVuc2lvbkZhY3RvcnksIFJvb3QgfSBmcm9tICdqb2knO1xuaW1wb3J0IHtcbiAgICBpc1ZhbGlkRGF0ZSxcbiAgICBpc1ZhbGlkSVNPRGF0ZVN0cmluZyxcbiAgICBpc1ZhbGlkVGltZSxcbiAgICBpc1ZhbGlkWWVhck1vbnRoLFxufSBmcm9tICdpc28tZGF0ZXN0cmluZy12YWxpZGF0b3InO1xuXG4vKlxuICogVGhpcyBpcyBhbiBhdHRlbXB0IHRvIGluc3RlYWQgaW1wbGVtZW50XG4gKiAgICAgICBKb2kuc3RyaW5nKCkuaXNvRGF0ZSgpXG4gKiBhbmQgdGhlIGxpa2UuICBCdXQsIEpvaSBrZXB0IHNheWluZyAndHlwZScgaXMgcmVxdWlyZWQuXG4gKi9cbi8vIGV4cG9ydCBkZWZhdWx0IChqb2k6IFJvb3QpOiBFeHRlbnNpb24gfCBFeHRlbnNpb25GYWN0b3J5ICA9PiB7XG4vLyAgICAgcmV0dXJuIHtcbi8vICAgICB0eXBlOiAnc3RyaW5nJyxcbi8vICAgICBiYXNlOiBqb2kuc3RyaW5nKCksXG4vLyAgICAgbWVzc2FnZXM6IHtcbi8vICAgICAgICAgJ2lzb0RhdGUuZXJyb3InOiAnYHt7I3ZhbHVlfX1gIGlzIG5vdCBhIHZhbGlkIElTTyBEYXRlIHN0cmluZycsXG4vLyAgICAgICAgICdpc29UaW1lLmVycm9yJzogJ2B7eyN2YWx1ZX19YCBpcyBub3QgYSB2YWxpZCBJU08gVGltZSBzdHJpbmcnLFxuLy8gICAgICAgICAnaXNvRGF0ZVRpbWUuZXJyb3InOiAnYHt7I3ZhbHVlfX1gIGlzIG5vdCBhIHZhbGlkIElTTyBEYXRlVGltZSBzdHJpbmcnLFxuLy8gICAgICAgICAnaXNvWWVhck1vbnRoLmVycm9yJzogJ2B7eyN2YWx1ZX19YCBpcyBub3QgYSB2YWxpZCBJU08gRGF0ZVRpbWUgc3RyaW5nJ1xuLy8gICAgIH0sXG4vLyAgICAgcnVsZXM6IHtcbi8vICAgICAgICAgaXNvRGF0ZToge1xuLy8gICAgICAgICAgICAgLy8gdHlwZTogJ2lzb0RhdGUnLFxuLy8gICAgICAgICAgICAgdmFsaWRhdGUodmFsdWU6IGFueSwgaGVscGVyczogSm9pLkN1c3RvbUhlbHBlcnM8YW55Pikge1xuLy8gICAgICAgICAgICAgICAgIC8vIHJldHVybiB2YWxpZGF0ZUlzb0RhdGVTdHJpbmcodmFsdWUsIGhlbHBlcnMpO1xuLy8gICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKGBpc29EYXRlICR7dmFsdWV9YCk7XG4vLyAgICAgICAgICAgICAgICAgY29uc3QgaXNWYWxpZCA9IGlzVmFsaWREYXRlKHZhbHVlKTtcbi8vICAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhgaXNvRGF0ZSAke3ZhbHVlfSA9PT4gJHtpc1ZhbGlkfWApO1xuICAgIFxuLy8gICAgICAgICAgICAgICAgIGlmICghaXNWYWxpZCkge1xuLy8gICAgICAgICAgICAgICAgICAgICByZXR1cm4ge1xuLy8gICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWUsXG4vLyAgICAgICAgICAgICAgICAgICAgICAgICBlcnJvcnM6IGhlbHBlcnMuZXJyb3IoJ2lzb0RhdGUuZXJyb3InLCB7IHZhbHVlIH0pXG4vLyAgICAgICAgICAgICAgICAgICAgIH07XG4vLyAgICAgICAgICAgICAgICAgfVxuICAgIFxuLy8gICAgICAgICAgICAgICAgIHJldHVybiB7IHZhbHVlIH07XG4vLyAgICAgICAgICAgICB9LFxuLy8gICAgICAgICB9LFxuLy8gICAgICAgICBpc29UaW1lOiB7XG4vLyAgICAgICAgICAgICAvLyB0eXBlOiAnaXNvVGltZScsXG4vLyAgICAgICAgICAgICB2YWxpZGF0ZSh2YWx1ZTogYW55LCBoZWxwZXJzOiBKb2kuQ3VzdG9tSGVscGVyczxhbnk+KSB7XG4vLyAgICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coYGlzb1RpbWUgJHt2YWx1ZX1gKTtcbi8vICAgICAgICAgICAgICAgICAvLyBUaGlzIHVzZXMgdGhlIGRlZmF1bHQgc2VwYXJhdG9ycywgYW5kIGVuYWJsZXNcbi8vICAgICAgICAgICAgICAgICAvLyB0aW1lIHpvbmUgY2hlY2tcbi8vICAgICAgICAgICAgICAgICBjb25zdCBpc1ZhbGlkID0gaXNWYWxpZFRpbWUodmFsdWUsIHVuZGVmaW5lZCwgdHJ1ZSk7XG5cbi8vICAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhgaXNvVGltZSAke3ZhbHVlfSAke2lzVmFsaWR9YCk7XG5cbi8vICAgICAgICAgICAgICAgICBpZiAoIWlzVmFsaWQpIHtcbi8vICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHtcbi8vICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlLFxuLy8gICAgICAgICAgICAgICAgICAgICAgICAgZXJyb3JzOiBoZWxwZXJzLmVycm9yKCdpc29UaW1lLmVycm9yJywgeyB2YWx1ZSB9KVxuLy8gICAgICAgICAgICAgICAgICAgICB9O1xuLy8gICAgICAgICAgICAgICAgIH1cblxuLy8gICAgICAgICAgICAgICAgIHJldHVybiB7IHZhbHVlIH07XG4vLyAgICAgICAgICAgICB9XG4vLyAgICAgICAgIH0sXG4vLyAgICAgICAgIGlzb0RhdGVUaW1lOiB7XG4vLyAgICAgICAgICAgICAvLyB0eXBlOiAnaXNvRGF0ZVRpbWUnLFxuLy8gICAgICAgICAgICAgdmFsaWRhdGUodmFsdWU6IGFueSwgaGVscGVyczogSm9pLkN1c3RvbUhlbHBlcnM8YW55Pikge1xuLy8gICAgICAgICAgICAgICAgIGNvbnN0IGlzVmFsaWQgPSBpc1ZhbGlkSVNPRGF0ZVN0cmluZyh2YWx1ZSk7XG4gICAgXG4vLyAgICAgICAgICAgICAgICAgaWYgKCFpc1ZhbGlkKSB7XG4vLyAgICAgICAgICAgICAgICAgICAgIHJldHVybiB7XG4vLyAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZSxcbi8vICAgICAgICAgICAgICAgICAgICAgICAgIGVycm9yczogaGVscGVycy5lcnJvcignaXNvRGF0ZVRpbWUuZXJyb3InLCB7IHZhbHVlIH0pXG4vLyAgICAgICAgICAgICAgICAgICAgIH07XG4vLyAgICAgICAgICAgICAgICAgfVxuICAgIFxuLy8gICAgICAgICAgICAgICAgIHJldHVybiB7IHZhbHVlIH07XG4vLyAgICAgICAgICAgICB9XG4vLyAgICAgICAgIH0sXG4vLyAgICAgICAgIGlzb1llYXJNb250aDoge1xuLy8gICAgICAgICAgICAgLy8gdHlwZTogJ2lzb1llYXJNb250aCcsXG4vLyAgICAgICAgICAgICB2YWxpZGF0ZSh2YWx1ZTogYW55LCBoZWxwZXJzOiBKb2kuQ3VzdG9tSGVscGVyczxhbnk+KSB7XG4vLyAgICAgICAgICAgICAgICAgY29uc3QgaXNWYWxpZCA9IGlzVmFsaWRZZWFyTW9udGgodmFsdWUpO1xuICAgIFxuLy8gICAgICAgICAgICAgICAgIGlmICghaXNWYWxpZCkge1xuLy8gICAgICAgICAgICAgICAgICAgICByZXR1cm4ge1xuLy8gICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWUsXG4vLyAgICAgICAgICAgICAgICAgICAgICAgICBlcnJvcnM6IGhlbHBlcnMuZXJyb3IoJ2lzb1llYXJNb250aC5lcnJvcicsIHsgdmFsdWUgfSlcbi8vICAgICAgICAgICAgICAgICAgICAgfTtcbi8vICAgICAgICAgICAgICAgICB9XG4gICAgXG4vLyAgICAgICAgICAgICAgICAgcmV0dXJuIHsgdmFsdWUgfTtcbi8vICAgICAgICAgICAgIH1cbi8vICAgICAgICAgfVxuLy8gICAgIH1cbi8vIH19O1xuXG4vKipcbiAqIEFsbG93cyB5b3UgdG8gZG8gYEpvaS5pc29EYXRlKClgXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IGpvaSBKb2kgaW5zdGFuY2UgcHJvdmlkZWQgYnkgSm9pXG4gKiBAcmV0dXJuIHtPYmplY3R9IEpvaSBwbHVnaW4gb2JqZWN0XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBpc29EYXRlIChqb2k6IFJvb3QpIDogRXh0ZW5zaW9uIHwgRXh0ZW5zaW9uRmFjdG9yeSB7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgdHlwZTogJ2lzb0RhdGUnLFxuICAgICAgICBiYXNlOiBqb2kuc3RyaW5nKCksXG4gICAgICAgIHZhbGlkYXRlKHZhbHVlOiBhbnksIGhlbHBlcnM6IEpvaS5DdXN0b21IZWxwZXJzPGFueT4pIHtcbiAgICAgICAgICAgIGNvbnN0IHNlcGFyYXRvciA9IGhlbHBlcnMuc2NoZW1hLiRfZ2V0RmxhZygnc2VwYXJhdG9yJyk7XG4gICAgICAgICAgICByZXR1cm4gdmFsaWRhdGVJc29EYXRlU3RyaW5nKHZhbHVlLCBoZWxwZXJzLCBzZXBhcmF0b3IpO1xuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coYGlzb0RhdGUgJHt2YWx1ZX1gKTtcbiAgICAgICAgICAgIGNvbnN0IGlzVmFsaWQgPSBpc1ZhbGlkRGF0ZSh2YWx1ZSk7XG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhgaXNvRGF0ZSAke3ZhbHVlfSA9PT4gJHtpc1ZhbGlkfWApO1xuXG4gICAgICAgICAgICBpZiAoIWlzVmFsaWQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgICAgICB2YWx1ZSxcbiAgICAgICAgICAgICAgICAgICAgZXJyb3JzOiBoZWxwZXJzLmVycm9yKCdpc29EYXRlLmVycm9yJywgeyB2YWx1ZSB9KVxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiB7IHZhbHVlIH07XG4gICAgICAgIH0sXG4gICAgICAgIG1lc3NhZ2VzOiB7XG4gICAgICAgICAgICAnaXNvRGF0ZS5lcnJvcic6ICdge3sjdmFsdWV9fWAgaXMgbm90IGEgdmFsaWQgSVNPIERhdGUgc3RyaW5nJ1xuICAgICAgICB9LFxuICAgICAgICBydWxlczoge1xuICAgICAgICAgICAgLy8gaXNvRGF0ZVN0cmluZzoge1xuICAgICAgICAgICAgLy8gICAgIHZhbGlkYXRlKHZhbHVlLCBoZWxwZXJzKSB7XG4gICAgICAgICAgICAvLyAgICAgICAgIGNvbnN0IHNlcGFyYXRvciA9IGhlbHBlcnMuc2NoZW1hLiRfZ2V0RmxhZygnc2VwYXJhdG9yJyk7XG4gICAgICAgICAgICAvLyAgICAgICAgIHJldHVybiB2YWxpZGF0ZUlzb0RhdGVTdHJpbmcodmFsdWUsIGhlbHBlcnMsIHNlcGFyYXRvcik7XG4gICAgICAgICAgICAvLyAgICAgfVxuICAgICAgICAgICAgLy8gfSxcbiAgICAgICAgICAgIHNlcGFyYXRvcjoge1xuICAgICAgICAgICAgICAgIG1ldGhvZDogZnVuY3Rpb24gKGVuYWJsZWQgPSB0cnVlKTogYW55IHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuJF9zZXRGbGFnKCdzZXBhcmF0b3InLCBlbmFibGVkKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG59O1xuXG5mdW5jdGlvbiB2YWxpZGF0ZUlzb0RhdGVTdHJpbmcodmFsdWU6IGFueSxcbiAgICAgICAgICAgIGhlbHBlcnM6IEpvaS5DdXN0b21IZWxwZXJzPGFueT4sXG4gICAgICAgICAgICBzZXBhcmF0b3I/OiBzdHJpbmcpIHtcbiAgICAvLyBjb25zb2xlLmxvZyhgaXNvRGF0ZSAke3ZhbHVlfWApO1xuICAgIGNvbnN0IGlzVmFsaWQgPSBzZXBhcmF0b3JcbiAgICAgICAgICAgICAgICA/IGlzVmFsaWREYXRlKHZhbHVlLCBzZXBhcmF0b3IpXG4gICAgICAgICAgICAgICAgOiBpc1ZhbGlkRGF0ZSh2YWx1ZSk7XG4gICAgLy8gY29uc29sZS5sb2coYGlzb0RhdGUgJHt2YWx1ZX0gPT0+ICR7aXNWYWxpZH1gKTtcblxuICAgIGlmICghaXNWYWxpZCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgdmFsdWUsXG4gICAgICAgICAgICBlcnJvcnM6IGhlbHBlcnMuZXJyb3IoJ2lzb0RhdGUuZXJyb3InLCB7IHZhbHVlIH0pXG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgcmV0dXJuIHsgdmFsdWUgfTtcbn1cblxuLyoqXG4gKiBBbGxvd3MgeW91IHRvIGRvIGBKb2kuaXNvRGF0ZVRpbWUoKWBcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gam9pIEpvaSBpbnN0YW5jZSBwcm92aWRlZCBieSBKb2lcbiAqIEByZXR1cm4ge09iamVjdH0gSm9pIHBsdWdpbiBvYmplY3RcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGlzb0RhdGVUaW1lIChqb2k6IFJvb3QpOiBFeHRlbnNpb24gfCBFeHRlbnNpb25GYWN0b3J5IHtcbiAgICByZXR1cm4ge1xuICAgICAgICB0eXBlOiAnaXNvRGF0ZVRpbWUnLFxuICAgICAgICBiYXNlOiBqb2kuc3RyaW5nKCksXG4gICAgICAgIHZhbGlkYXRlKHZhbHVlLCBoZWxwZXJzKSB7XG4gICAgICAgICAgICBjb25zdCBpc1ZhbGlkID0gaXNWYWxpZElTT0RhdGVTdHJpbmcodmFsdWUpO1xuXG4gICAgICAgICAgICBpZiAoIWlzVmFsaWQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgICAgICB2YWx1ZSxcbiAgICAgICAgICAgICAgICAgICAgZXJyb3JzOiBoZWxwZXJzLmVycm9yKCdpc29EYXRlVGltZS5lcnJvcicsIHsgdmFsdWUgfSlcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4geyB2YWx1ZSB9O1xuICAgICAgICB9LFxuICAgICAgICBtZXNzYWdlczoge1xuICAgICAgICAgICAgJ2lzb0RhdGVUaW1lLmVycm9yJzogJ2B7eyN2YWx1ZX19YCBpcyBub3QgYSB2YWxpZCBJU08gRGF0ZVRpbWUgc3RyaW5nJ1xuICAgICAgICB9XG4gICAgfVxufTtcblxuLyoqXG4gKiBBbGxvd3MgeW91IHRvIGRvIGBKb2kuaXNvVGltZSgpYFxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBqb2kgSm9pIGluc3RhbmNlIHByb3ZpZGVkIGJ5IEpvaVxuICogQHJldHVybiB7T2JqZWN0fSBKb2kgcGx1Z2luIG9iamVjdFxuICovXG5leHBvcnQgZnVuY3Rpb24gaXNvVGltZSAoam9pOiBSb290KTogRXh0ZW5zaW9uIHwgRXh0ZW5zaW9uRmFjdG9yeSB7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgdHlwZTogJ2lzb1RpbWUnLFxuICAgICAgICBiYXNlOiBqb2kuc3RyaW5nKCksXG4gICAgICAgIHZhbGlkYXRlKHZhbHVlLCBoZWxwZXJzKSB7XG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhgaXNvVGltZSAke3ZhbHVlfWApO1xuICAgICAgICAgICAgLy8gVGhpcyB1c2VzIHRoZSBkZWZhdWx0IHNlcGFyYXRvcnMsIGFuZCBlbmFibGVzXG4gICAgICAgICAgICAvLyB0aW1lIHpvbmUgY2hlY2tcbiAgICAgICAgICAgIGNvbnN0IHNlcGFyYXRvciA9IGhlbHBlcnMuc2NoZW1hLiRfZ2V0RmxhZygnc2VwYXJhdG9yJyk7XG4gICAgICAgICAgICBjb25zdCBpc1ZhbGlkID0gc2VwYXJhdG9yXG4gICAgICAgICAgICAgICAgICAgID8gaXNWYWxpZFRpbWUodmFsdWUsIHNlcGFyYXRvciwgdHJ1ZSlcbiAgICAgICAgICAgICAgICAgICAgOiBpc1ZhbGlkVGltZSh2YWx1ZSwgdW5kZWZpbmVkLCB0cnVlKTtcblxuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coYGlzb1RpbWUgJHt2YWx1ZX0gJHtpc1ZhbGlkfWApO1xuXG4gICAgICAgICAgICBpZiAoIWlzVmFsaWQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgICAgICB2YWx1ZSxcbiAgICAgICAgICAgICAgICAgICAgZXJyb3JzOiBoZWxwZXJzLmVycm9yKCdpc29UaW1lLmVycm9yJywgeyB2YWx1ZSB9KVxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiB7IHZhbHVlIH07XG4gICAgICAgIH0sXG4gICAgICAgIG1lc3NhZ2VzOiB7XG4gICAgICAgICAgICAnaXNvVGltZS5lcnJvcic6ICdge3sjdmFsdWV9fWAgaXMgbm90IGEgdmFsaWQgSVNPIFRpbWUgc3RyaW5nJ1xuICAgICAgICB9LFxuICAgICAgICBydWxlczoge1xuICAgICAgICAgICAgc2VwYXJhdG9yOiB7XG4gICAgICAgICAgICAgICAgbWV0aG9kOiBmdW5jdGlvbiAoZW5hYmxlZCA9IHRydWUpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuJF9zZXRGbGFnKCdzZXBhcmF0b3InLCBlbmFibGVkKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG59O1xuXG4vKipcbiAqIEFsbG93cyB5b3UgdG8gZG8gYEpvaS5pc29ZZWFyTW9udGgoKWBcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gam9pIEpvaSBpbnN0YW5jZSBwcm92aWRlZCBieSBKb2lcbiAqIEByZXR1cm4ge09iamVjdH0gSm9pIHBsdWdpbiBvYmplY3RcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGlzb1llYXJNb250aCAoam9pOiBSb290KTogRXh0ZW5zaW9uIHwgRXh0ZW5zaW9uRmFjdG9yeSB7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgdHlwZTogJ2lzb1llYXJNb250aCcsXG4gICAgICAgIGJhc2U6IGpvaS5zdHJpbmcoKSxcbiAgICAgICAgdmFsaWRhdGUodmFsdWUsIGhlbHBlcnMpIHtcbiAgICAgICAgICAgIGNvbnN0IHNlcGFyYXRvciA9IGhlbHBlcnMuc2NoZW1hLiRfZ2V0RmxhZygnc2VwYXJhdG9yJyk7XG4gICAgICAgICAgICBjb25zdCBpc1ZhbGlkID0gc2VwYXJhdG9yXG4gICAgICAgICAgICAgICAgICAgID8gaXNWYWxpZFllYXJNb250aCh2YWx1ZSwgc2VwYXJhdG9yKVxuICAgICAgICAgICAgICAgICAgICA6IGlzVmFsaWRZZWFyTW9udGgodmFsdWUpO1xuXG4gICAgICAgICAgICBpZiAoIWlzVmFsaWQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgICAgICB2YWx1ZSxcbiAgICAgICAgICAgICAgICAgICAgZXJyb3JzOiBoZWxwZXJzLmVycm9yKCdpc29ZZWFyTW9udGguZXJyb3InLCB7IHZhbHVlIH0pXG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIHsgdmFsdWUgfTtcbiAgICAgICAgfSxcbiAgICAgICAgbWVzc2FnZXM6IHtcbiAgICAgICAgICAgICdpc29ZZWFyTW9udGguZXJyb3InOiAnYHt7I3ZhbHVlfX1gIGlzIG5vdCBhIHZhbGlkIElTTyBEYXRlVGltZSBzdHJpbmcnXG4gICAgICAgIH0sXG4gICAgICAgIHJ1bGVzOiB7XG4gICAgICAgICAgICBzZXBhcmF0b3I6IHtcbiAgICAgICAgICAgICAgICBtZXRob2Q6IGZ1bmN0aW9uIChlbmFibGVkID0gdHJ1ZSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy4kX3NldEZsYWcoJ3NlcGFyYXRvcicsIGVuYWJsZWQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgfVxufTtcbiJdfQ==