"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isoYearMonth = exports.isoTime = exports.isoDateTime = exports.isoDate = void 0;
const iso_datestring_validator_1 = require("iso-datestring-validator");
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
        }
    };
}
exports.isoDate = isoDate;
;
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
            const isValid = (0, iso_datestring_validator_1.isValidTime)(value, undefined, true);
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
            const isValid = (0, iso_datestring_validator_1.isValidYearMonth)(value);
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
    };
}
exports.isoYearMonth = isoYearMonth;
;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9saWIvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBRUEsdUVBS2tDO0FBRWxDOzs7OztHQUtHO0FBQ0gsU0FBZ0IsT0FBTyxDQUFFLEdBQVM7SUFDOUIsT0FBTztRQUNILElBQUksRUFBRSxTQUFTO1FBQ2YsSUFBSSxFQUFFLEdBQUcsQ0FBQyxNQUFNLEVBQUU7UUFDbEIsUUFBUSxDQUFDLEtBQUssRUFBRSxPQUFPO1lBQ25CLG1DQUFtQztZQUNuQyxNQUFNLE9BQU8sR0FBRyxJQUFBLHNDQUFXLEVBQUMsS0FBSyxDQUFDLENBQUM7WUFDbkMsa0RBQWtEO1lBRWxELElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQztnQkFDWCxPQUFPO29CQUNILEtBQUs7b0JBQ0wsTUFBTSxFQUFFLE9BQU8sQ0FBQyxLQUFLLENBQUMsZUFBZSxFQUFFLEVBQUUsS0FBSyxFQUFFLENBQUM7aUJBQ3BELENBQUM7WUFDTixDQUFDO1lBRUQsT0FBTyxFQUFFLEtBQUssRUFBRSxDQUFDO1FBQ3JCLENBQUM7UUFDRCxRQUFRLEVBQUU7WUFDTixlQUFlLEVBQUUsNkNBQTZDO1NBQ2pFO0tBQ0osQ0FBQTtBQUNMLENBQUM7QUF0QkQsMEJBc0JDO0FBQUEsQ0FBQztBQUdGOzs7OztHQUtHO0FBQ0gsU0FBZ0IsV0FBVyxDQUFFLEdBQVM7SUFDbEMsT0FBTztRQUNILElBQUksRUFBRSxhQUFhO1FBQ25CLElBQUksRUFBRSxHQUFHLENBQUMsTUFBTSxFQUFFO1FBQ2xCLFFBQVEsQ0FBQyxLQUFLLEVBQUUsT0FBTztZQUNuQixNQUFNLE9BQU8sR0FBRyxJQUFBLCtDQUFvQixFQUFDLEtBQUssQ0FBQyxDQUFDO1lBRTVDLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQztnQkFDWCxPQUFPO29CQUNILEtBQUs7b0JBQ0wsTUFBTSxFQUFFLE9BQU8sQ0FBQyxLQUFLLENBQUMsbUJBQW1CLEVBQUUsRUFBRSxLQUFLLEVBQUUsQ0FBQztpQkFDeEQsQ0FBQztZQUNOLENBQUM7WUFFRCxPQUFPLEVBQUUsS0FBSyxFQUFFLENBQUM7UUFDckIsQ0FBQztRQUNELFFBQVEsRUFBRTtZQUNOLG1CQUFtQixFQUFFLGlEQUFpRDtTQUN6RTtLQUNKLENBQUE7QUFDTCxDQUFDO0FBcEJELGtDQW9CQztBQUFBLENBQUM7QUFFRjs7Ozs7R0FLRztBQUNILFNBQWdCLE9BQU8sQ0FBRSxHQUFTO0lBQzlCLE9BQU87UUFDSCxJQUFJLEVBQUUsU0FBUztRQUNmLElBQUksRUFBRSxHQUFHLENBQUMsTUFBTSxFQUFFO1FBQ2xCLFFBQVEsQ0FBQyxLQUFLLEVBQUUsT0FBTztZQUNuQixtQ0FBbUM7WUFDbkMsZ0RBQWdEO1lBQ2hELGtCQUFrQjtZQUNsQixNQUFNLE9BQU8sR0FBRyxJQUFBLHNDQUFXLEVBQUMsS0FBSyxFQUFFLFNBQVMsRUFBRSxJQUFJLENBQUMsQ0FBQztZQUVwRCw4Q0FBOEM7WUFFOUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDO2dCQUNYLE9BQU87b0JBQ0gsS0FBSztvQkFDTCxNQUFNLEVBQUUsT0FBTyxDQUFDLEtBQUssQ0FBQyxlQUFlLEVBQUUsRUFBRSxLQUFLLEVBQUUsQ0FBQztpQkFDcEQsQ0FBQztZQUNOLENBQUM7WUFFRCxPQUFPLEVBQUUsS0FBSyxFQUFFLENBQUM7UUFDckIsQ0FBQztRQUNELFFBQVEsRUFBRTtZQUNOLGVBQWUsRUFBRSw2Q0FBNkM7U0FDakU7S0FDSixDQUFBO0FBQ0wsQ0FBQztBQXpCRCwwQkF5QkM7QUFBQSxDQUFDO0FBRUY7Ozs7O0dBS0c7QUFDSCxTQUFnQixZQUFZLENBQUUsR0FBUztJQUNuQyxPQUFPO1FBQ0gsSUFBSSxFQUFFLGNBQWM7UUFDcEIsSUFBSSxFQUFFLEdBQUcsQ0FBQyxNQUFNLEVBQUU7UUFDbEIsUUFBUSxDQUFDLEtBQUssRUFBRSxPQUFPO1lBQ25CLE1BQU0sT0FBTyxHQUFHLElBQUEsMkNBQWdCLEVBQUMsS0FBSyxDQUFDLENBQUM7WUFFeEMsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDO2dCQUNYLE9BQU87b0JBQ0gsS0FBSztvQkFDTCxNQUFNLEVBQUUsT0FBTyxDQUFDLEtBQUssQ0FBQyxvQkFBb0IsRUFBRSxFQUFFLEtBQUssRUFBRSxDQUFDO2lCQUN6RCxDQUFDO1lBQ04sQ0FBQztZQUVELE9BQU8sRUFBRSxLQUFLLEVBQUUsQ0FBQztRQUNyQixDQUFDO1FBQ0QsUUFBUSxFQUFFO1lBQ04sb0JBQW9CLEVBQUUsaURBQWlEO1NBQzFFO0tBQ0osQ0FBQTtBQUNMLENBQUM7QUFwQkQsb0NBb0JDO0FBQUEsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIlxuaW1wb3J0IEpvaSwgeyBFeHRlbnNpb24sIEV4dGVuc2lvbkZhY3RvcnksIFJvb3QgfSBmcm9tICdqb2knO1xuaW1wb3J0IHtcbiAgICBpc1ZhbGlkRGF0ZSxcbiAgICBpc1ZhbGlkSVNPRGF0ZVN0cmluZyxcbiAgICBpc1ZhbGlkVGltZSxcbiAgICBpc1ZhbGlkWWVhck1vbnRoLFxufSBmcm9tICdpc28tZGF0ZXN0cmluZy12YWxpZGF0b3InO1xuXG4vKipcbiAqIEFsbG93cyB5b3UgdG8gZG8gYEpvaS5pc29EYXRlKClgXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IGpvaSBKb2kgaW5zdGFuY2UgcHJvdmlkZWQgYnkgSm9pXG4gKiBAcmV0dXJuIHtPYmplY3R9IEpvaSBwbHVnaW4gb2JqZWN0XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBpc29EYXRlIChqb2k6IFJvb3QpOiBFeHRlbnNpb24gfCBFeHRlbnNpb25GYWN0b3J5IHtcbiAgICByZXR1cm4ge1xuICAgICAgICB0eXBlOiAnaXNvRGF0ZScsXG4gICAgICAgIGJhc2U6IGpvaS5zdHJpbmcoKSxcbiAgICAgICAgdmFsaWRhdGUodmFsdWUsIGhlbHBlcnMpIHtcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKGBpc29EYXRlICR7dmFsdWV9YCk7XG4gICAgICAgICAgICBjb25zdCBpc1ZhbGlkID0gaXNWYWxpZERhdGUodmFsdWUpO1xuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coYGlzb0RhdGUgJHt2YWx1ZX0gPT0+ICR7aXNWYWxpZH1gKTtcblxuICAgICAgICAgICAgaWYgKCFpc1ZhbGlkKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICAgICAgdmFsdWUsXG4gICAgICAgICAgICAgICAgICAgIGVycm9yczogaGVscGVycy5lcnJvcignaXNvRGF0ZS5lcnJvcicsIHsgdmFsdWUgfSlcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4geyB2YWx1ZSB9O1xuICAgICAgICB9LFxuICAgICAgICBtZXNzYWdlczoge1xuICAgICAgICAgICAgJ2lzb0RhdGUuZXJyb3InOiAnYHt7I3ZhbHVlfX1gIGlzIG5vdCBhIHZhbGlkIElTTyBEYXRlIHN0cmluZydcbiAgICAgICAgfVxuICAgIH1cbn07XG5cblxuLyoqXG4gKiBBbGxvd3MgeW91IHRvIGRvIGBKb2kuaXNvRGF0ZVRpbWUoKWBcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gam9pIEpvaSBpbnN0YW5jZSBwcm92aWRlZCBieSBKb2lcbiAqIEByZXR1cm4ge09iamVjdH0gSm9pIHBsdWdpbiBvYmplY3RcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGlzb0RhdGVUaW1lIChqb2k6IFJvb3QpOiBFeHRlbnNpb24gfCBFeHRlbnNpb25GYWN0b3J5IHtcbiAgICByZXR1cm4ge1xuICAgICAgICB0eXBlOiAnaXNvRGF0ZVRpbWUnLFxuICAgICAgICBiYXNlOiBqb2kuc3RyaW5nKCksXG4gICAgICAgIHZhbGlkYXRlKHZhbHVlLCBoZWxwZXJzKSB7XG4gICAgICAgICAgICBjb25zdCBpc1ZhbGlkID0gaXNWYWxpZElTT0RhdGVTdHJpbmcodmFsdWUpO1xuXG4gICAgICAgICAgICBpZiAoIWlzVmFsaWQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgICAgICB2YWx1ZSxcbiAgICAgICAgICAgICAgICAgICAgZXJyb3JzOiBoZWxwZXJzLmVycm9yKCdpc29EYXRlVGltZS5lcnJvcicsIHsgdmFsdWUgfSlcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4geyB2YWx1ZSB9O1xuICAgICAgICB9LFxuICAgICAgICBtZXNzYWdlczoge1xuICAgICAgICAgICAgJ2lzb0RhdGVUaW1lLmVycm9yJzogJ2B7eyN2YWx1ZX19YCBpcyBub3QgYSB2YWxpZCBJU08gRGF0ZVRpbWUgc3RyaW5nJ1xuICAgICAgICB9XG4gICAgfVxufTtcblxuLyoqXG4gKiBBbGxvd3MgeW91IHRvIGRvIGBKb2kuaXNvVGltZSgpYFxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBqb2kgSm9pIGluc3RhbmNlIHByb3ZpZGVkIGJ5IEpvaVxuICogQHJldHVybiB7T2JqZWN0fSBKb2kgcGx1Z2luIG9iamVjdFxuICovXG5leHBvcnQgZnVuY3Rpb24gaXNvVGltZSAoam9pOiBSb290KTogRXh0ZW5zaW9uIHwgRXh0ZW5zaW9uRmFjdG9yeSB7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgdHlwZTogJ2lzb1RpbWUnLFxuICAgICAgICBiYXNlOiBqb2kuc3RyaW5nKCksXG4gICAgICAgIHZhbGlkYXRlKHZhbHVlLCBoZWxwZXJzKSB7XG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhgaXNvVGltZSAke3ZhbHVlfWApO1xuICAgICAgICAgICAgLy8gVGhpcyB1c2VzIHRoZSBkZWZhdWx0IHNlcGFyYXRvcnMsIGFuZCBlbmFibGVzXG4gICAgICAgICAgICAvLyB0aW1lIHpvbmUgY2hlY2tcbiAgICAgICAgICAgIGNvbnN0IGlzVmFsaWQgPSBpc1ZhbGlkVGltZSh2YWx1ZSwgdW5kZWZpbmVkLCB0cnVlKTtcblxuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coYGlzb1RpbWUgJHt2YWx1ZX0gJHtpc1ZhbGlkfWApO1xuXG4gICAgICAgICAgICBpZiAoIWlzVmFsaWQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgICAgICB2YWx1ZSxcbiAgICAgICAgICAgICAgICAgICAgZXJyb3JzOiBoZWxwZXJzLmVycm9yKCdpc29UaW1lLmVycm9yJywgeyB2YWx1ZSB9KVxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiB7IHZhbHVlIH07XG4gICAgICAgIH0sXG4gICAgICAgIG1lc3NhZ2VzOiB7XG4gICAgICAgICAgICAnaXNvVGltZS5lcnJvcic6ICdge3sjdmFsdWV9fWAgaXMgbm90IGEgdmFsaWQgSVNPIFRpbWUgc3RyaW5nJ1xuICAgICAgICB9XG4gICAgfVxufTtcblxuLyoqXG4gKiBBbGxvd3MgeW91IHRvIGRvIGBKb2kuaXNvWWVhck1vbnRoKClgXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IGpvaSBKb2kgaW5zdGFuY2UgcHJvdmlkZWQgYnkgSm9pXG4gKiBAcmV0dXJuIHtPYmplY3R9IEpvaSBwbHVnaW4gb2JqZWN0XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBpc29ZZWFyTW9udGggKGpvaTogUm9vdCk6IEV4dGVuc2lvbiB8IEV4dGVuc2lvbkZhY3Rvcnkge1xuICAgIHJldHVybiB7XG4gICAgICAgIHR5cGU6ICdpc29ZZWFyTW9udGgnLFxuICAgICAgICBiYXNlOiBqb2kuc3RyaW5nKCksXG4gICAgICAgIHZhbGlkYXRlKHZhbHVlLCBoZWxwZXJzKSB7XG4gICAgICAgICAgICBjb25zdCBpc1ZhbGlkID0gaXNWYWxpZFllYXJNb250aCh2YWx1ZSk7XG5cbiAgICAgICAgICAgIGlmICghaXNWYWxpZCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgICAgIHZhbHVlLFxuICAgICAgICAgICAgICAgICAgICBlcnJvcnM6IGhlbHBlcnMuZXJyb3IoJ2lzb1llYXJNb250aC5lcnJvcicsIHsgdmFsdWUgfSlcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4geyB2YWx1ZSB9O1xuICAgICAgICB9LFxuICAgICAgICBtZXNzYWdlczoge1xuICAgICAgICAgICAgJ2lzb1llYXJNb250aC5lcnJvcic6ICdge3sjdmFsdWV9fWAgaXMgbm90IGEgdmFsaWQgSVNPIERhdGVUaW1lIHN0cmluZydcbiAgICAgICAgfVxuICAgIH1cbn07XG4iXX0=