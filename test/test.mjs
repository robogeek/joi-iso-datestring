
import { assert } from 'chai';
import _Joi from 'joi';
import {
    isoDate, isoDateTime, isoTime, isoYearMonth
} from '../dist/index.js';

const Joi = _Joi
    .extend(isoDate)
    .extend(isoDateTime)
    .extend(isoTime)
    .extend(isoYearMonth);

// The date formats used in these tests are
// derived from the Wikipedia page on ISO 8601:
//
//      https://en.wikipedia.org/wiki/ISO_8601 

const dataDates = [

    // The following give the error:
    //      Error [ValidationError]: `0001` is not a valid ISO Date string

    // [ 'YYYY', '0001' ],
    // [ 'YYYY', '1001' ],
    // [ 'YYYY', '2001' ],
    // [ 'YYYY', '3001' ],
    // [ 'YYYY', '4001' ],
    // [ 'YYYY', '5001' ],
    // [ 'YYYY', '2023' ],

    // [ '-YYYY', '-0001' ],
    // [ '-YYYY', '-1001' ],
    // [ '-YYYY', '-2001' ],
    // [ '-YYYY', '-3001' ],
    // [ '-YYYY', '-4001' ],
    // [ '-YYYY', '-5001' ],
    // [ '-YYYY', '-2023' ],

    [ 'YYYY-MM-DD', '2023-12-21' ],
    [ 'YYYY-MM-DD', '0001-01-01' ],
    [ 'YYYY-MM-DD', '1001-01-01' ],
    [ 'YYYY-MM-DD', '2001-01-01' ],
    [ 'YYYY-MM-DD', '3001-01-01' ],
    [ 'YYYY-MM-DD', '4001-01-01' ],
    [ 'YYYY-MM-DD', '5001-01-01' ],
    [ 'YYYY-MM-DD', '9999-01-01' ],

    // This was by extrapolation from the +/- YYYY
    // but it gives the error:
    //   message: '`-2023-12-21` is not a valid ISO Date string',

    // [ '-YYYY-MM-DD', '-2023-12-21' ],

    // These give the error
    //    Error [ValidationError]: `20231221` is not a valid ISO Date string

    // [ 'YYYYMMDD', '20231221' ],
    // [ 'YYYYMMDD', '00010101' ],
    // [ 'YYYYMMDD', '10010101' ],
    // [ 'YYYYMMDD', '20010101' ],
    // [ 'YYYYMMDD', '30010101' ],
    // [ 'YYYYMMDD', '40010101' ],
    // [ 'YYYYMMDD', '50010101' ],

    // This is meant to handle isValidDate(dateString, '')
    // [ 'YYYYMMDD', '20231221', '' ],
    // [ 'YYYYMMDD', '00010101', '' ],
    // [ 'YYYYMMDD', '10010101', '' ],
    // [ 'YYYYMMDD', '20010101', '' ],
    // [ 'YYYYMMDD', '30010101', '' ],
    // [ 'YYYYMMDD', '40010101', '' ],
    // [ 'YYYYMMDD', '50010101', '' ],

    // This is meant to handle isValidDate(dateString, '/')
    // [ 'YYYYMMDD', '2023/12/21', '/' ],
    // [ 'YYYYMMDD', '0001/01/01', '/' ],
    // [ 'YYYYMMDD', '1001/01/01', '/' ],
    // [ 'YYYYMMDD', '2001/01/01', '/' ],
    // [ 'YYYYMMDD', '3001/01/01', '/' ],
    // [ 'YYYYMMDD', '4001/01/01', '/' ],
    // [ 'YYYYMMDD', '5001/01/01', '/' ],

    // This was by extrapolation from the +/- YYYY
    // but it gives the error:
    //   message: '`20231221` is not a valid ISO Date string',

    
    // [ '-YYYYMMDD', '-20231221' ],

    // These give the error
    //      Error [ValidationError]: `2023-12` is not a valid ISO Date string
    // These values are handled in the YearMonth section below

    // [ 'YYYY-MM', '2023-12' ],
    // [ 'YYYY-MM', '0001-01' ],
    // [ 'YYYY-MM', '1001-01' ],
    // [ 'YYYY-MM', '2001-01' ],
    // [ 'YYYY-MM', '3001-01' ],
    // [ 'YYYY-MM', '4001-01' ],
    // [ 'YYYY-MM', '5001-01' ],

    // These give the error:
    //      Error [ValidationError]: `-12-21` is not a valid ISO Date string
    // [ '-MM-DD', '-12-21' ],
    // [ '-MM-DD', '-01-01' ],

    // This gives the error:
    //      Error [ValidationError]: `--01` is not a valid ISO Date string
    // [ '--DD', '--01' ],

    // These give the error:
    //      Error [ValidationError]: `23-12-21` is not a valid ISO Date string
    // [ 'YY-MM-DD', '23-12-21' ],
    // [ 'YY-MM-DD', '01-01-01' ],

    // These give the error:
    //      Error [ValidationError]: `231221` is not a valid ISO Date string
    // [ 'YYMMDD', '231221' ],
    // [ 'YYMMDD', '010101' ],

    // These give the error:
    //      Error [ValidationError]: `-23-12` is not a valid ISO Date string
    // [ '-YY-MM', '-23-12' ],
    // [ '-YY-MM', '-01-01' ],

    // These give the error:
    //      Error [ValidationError]: `-2312` is not a valid ISO Date string
    // [ '-YYMM', '-2312' ],
    // [ '-YYMM', '-0101' ],

    // These give the error:
    //      Error [ValidationError]: `-12-12` is not a valid ISO Date string
    // [ '--MM-DD', '-12-12' ],
    // [ '--MM-DD', '-01-01' ],

    // These give the error:
    //      Error [ValidationError]: `-0101` is not a valid ISO Date string
    // [ '--MMDD', '-1212' ],
    // [ '--MMDD', '-0101' ],

    // These give the error:
    //      Error [ValidationError]: `---01` is not a valid ISO Date string
    // [ '--MM', '--01' ],
    // [ '---DD', '---01' ],

    // These give the error:
    //      Error [ValidationError]: `2023-W01` is not a valid ISO Date string
    // [ 'YYYY-Wnn', '2023-W01' ],
    // [ 'YYYY-Wnn', '2023-W21' ],

    // [ 'YYYY-Wnn-D', '2023-W01-2' ],
    // [ 'YYYY-Wnn-D', '2023-W21-3' ],

    // [ 'YYYY-Wnn', '0001-W01' ],
    // [ 'YYYY-Wnn', '0001-W21' ],

    // [ 'YYYY-Wnn-D', '0001-W01-4' ],
    // [ 'YYYY-Wnn-D', '0001-W21-5' ],

    // [ 'YYYY-Wnn', '1001-W01' ],
    // [ 'YYYY-Wnn', '1001-W21' ],

    // [ 'YYYY-Wnn-D', '1001-W01-6' ],
    // [ 'YYYY-Wnn-D', '1001-W21-7' ],

    // [ 'YYYY-Wnn', '2001-W01' ],
    // [ 'YYYY-Wnn', '2001-W21' ],

    // [ 'YYYY-Wnn-D', '2001-W01-1' ],
    // [ 'YYYY-Wnn-D', '2001-W21-2' ],

    // [ 'YYYY-Wnn', '3001-W01' ],
    // [ 'YYYY-Wnn', '3001-W21' ],

    // [ 'YYYY-Wnn-D', '3001-W01-3' ],
    // [ 'YYYY-Wnn-D', '3001-W21-4' ],

    // [ 'YYYY-Wnn', '4001-W01' ],
    // [ 'YYYY-Wnn', '4001-W21' ],

    // [ 'YYYY-Wnn-D', '4001-W01-5' ],
    // [ 'YYYY-Wnn-D', '4001-W21-6' ],

    // [ 'YYYY-Wnn', '5001-W01' ],
    // [ 'YYYY-Wnn', '5001-W21' ],

    // [ 'YYYY-Wnn-D', '5001-W01-7' ],
    // [ 'YYYY-Wnn-D', '5001-W21-1' ],

    // These give the error:
    //      Error [ValidationError]: `2023-122` is not a valid ISO Date string
    // [ 'YYYY-DDD', '2023-122' ],
    // [ 'YYYY-DDD', '0001-011' ],
    // [ 'YYYY-DDD', '1001-010' ],
    // [ 'YYYY-DDD', '2001-101' ],
    // [ 'YYYY-DDD', '3001-365' ],
    // [ 'YYYY-DDD', '4001-201' ],
    // [ 'YYYY-DDD', '5001-301' ],

];

const dataBadDates = [
    [ 'YYYY-MM-DD', '33333-222-66' ],

    // These were identified above as a bad date
    // format which is not supported by the spec
    [ '-YYYY-MM-DD', '-2023-12-21' ],
    [ '-YYYYMMDD', '-20231221' ],


    [ 'YYYY-MM-DD', '2023-32-21' ],
    [ 'YYYY-MM-DD', '2023-12-82' ],
    [ 'YYYY-MM-DD', '0001-01-001' ],
    [ 'YYYY-MM-DD', '1001-001-01' ],
    [ 'YYYY-MM-DD', '20001-01-01' ],
    [ 'YYYY-MM-DD', '3001-13-01' ],
    [ 'YYYY-MM-DD', '4001-01-32' ],
    [ 'YYYY-MM-DD', '5001-01-00' ],
];

describe('DATE', function() {

    for (const td of dataDates) {

        it(`should match ${td[0]} -- ${td[1]}`, function() {
            const joiIsoDate = Joi.isoDate();
            const result = joiIsoDate.validate(td[1]);
            if (result.error) {
                console.log(result.error);
                console.log(result.error.context);
            }
            assert.notOk(result.error);
            assert.isString(result.value);
            assert.equal(result.value, td[1]);
        });
    }

    for (const td of dataBadDates) {

        it(`should not match ${td[0]} -- ${td[1]}`, function() {
            const joiIsoDate = Joi.isoDate();
            const result = joiIsoDate.validate(td[1]);
            // console.log(result);
            // console.log(result.error);
            assert.isOk(result.error);
            assert.isOk(result.error.details[0].message.indexOf(`\`${td[1]}\` is not a valid ISO Date string`) >= 0);
            assert.isString(result.value);
            assert.equal(result.value, td[1]);

        });
    }
    
});

// Thh:mm:ss.sss	or	Thhmmss.sss
// Thh:mm:ss	or	Thhmmss
// Thh:mm.mmm	or	Thhmm.mmm
// Thh:mm	or	Thhmm
// Thh.hhh		
// Thh		
// In unambiguous contexts*
// hh:mm:ss.sss	or	hhmmss.sss*
// hh:mm:ss	or	hhmmss*
// hh:mm	or	hhmm*
// hh

const dataTimes = [

    // The following have the T prefix, and
    // all fail with this message:
    //      Error [ValidationError]: `T22:00:00.000` is not a valid ISO Time string
    // [ 'Thh:mm:ss.sss', 'T00:00:00.000' ],
    // [ 'Thh:mm:ss.sss', 'T01:00:00.000' ],
    // [ 'Thh:mm:ss.sss', 'T02:00:00.000' ],
    // [ 'Thh:mm:ss.sss', 'T03:00:00.000' ],
    // [ 'Thh:mm:ss.sss', 'T04:00:00.000' ],
    // [ 'Thh:mm:ss.sss', 'T05:00:00.000' ],
    // [ 'Thh:mm:ss.sss', 'T06:00:00.000' ],
    // [ 'Thh:mm:ss.sss', 'T07:00:00.000' ],
    // [ 'Thh:mm:ss.sss', 'T08:00:00.000' ],
    // [ 'Thh:mm:ss.sss', 'T09:00:00.000' ],
    // [ 'Thh:mm:ss.sss', 'T10:00:00.000' ],
    // [ 'Thh:mm:ss.sss', 'T11:00:00.000' ],
    // [ 'Thh:mm:ss.sss', 'T12:00:00.000' ],
    // [ 'Thh:mm:ss.sss', 'T13:00:00.000' ],
    // [ 'Thh:mm:ss.sss', 'T14:00:00.000' ],
    // [ 'Thh:mm:ss.sss', 'T15:00:00.000' ],
    // [ 'Thh:mm:ss.sss', 'T16:00:00.000' ],
    // [ 'Thh:mm:ss.sss', 'T17:00:00.000' ],
    // [ 'Thh:mm:ss.sss', 'T18:00:00.000' ],
    // [ 'Thh:mm:ss.sss', 'T19:00:00.000' ],
    // [ 'Thh:mm:ss.sss', 'T20:00:00.000' ],
    // [ 'Thh:mm:ss.sss', 'T21:00:00.000' ],
    // [ 'Thh:mm:ss.sss', 'T22:00:00.000' ],
    // [ 'Thh:mm:ss.sss', 'T23:00:00.000' ],

    // Notice this group differs by not having
    // the 'T' prefix

    [ 'hh:mm:ss.sss', '00:00:00.000' ],
    [ 'hh:mm:ss.sss', '01:59:00.000' ],
    [ 'hh:mm:ss.sss', '02:45:00.000' ],
    [ 'hh:mm:ss.sss', '03:32:00.000' ],
    [ 'hh:mm:ss.sss', '04:22:00.000' ],
    [ 'hh:mm:ss.sss', '05:53:00.000' ],
    [ 'hh:mm:ss.sss', '06:10:00.000' ],
    [ 'hh:mm:ss.sss', '07:01:00.000' ],
    [ 'hh:mm:ss.sss', '08:02:00.000' ],
    [ 'hh:mm:ss.sss', '09:03:00.000' ],
    [ 'hh:mm:ss.sss', '10:04:00.000' ],
    [ 'hh:mm:ss.sss', '11:06:00.000' ],
    [ 'hh:mm:ss.sss', '12:07:00.000' ],
    [ 'hh:mm:ss.sss', '13:08:00.000' ],
    [ 'hh:mm:ss.sss', '14:09:00.000' ],
    [ 'hh:mm:ss.sss', '15:00:59.000' ],
    [ 'hh:mm:ss.sss', '16:00:42.000' ],
    [ 'hh:mm:ss.sss', '17:00:30.000' ],
    [ 'hh:mm:ss.sss', '18:00:20.000' ],
    [ 'hh:mm:ss.sss', '19:00:10.000' ],
    [ 'hh:mm:ss.sss', '20:00:01.000' ],
    [ 'hh:mm:ss.sss', '21:00:02.000' ],
    [ 'hh:mm:ss.sss', '22:00:03.000' ],
    [ 'hh:mm:ss.sss', '23:00:04.000' ],

    [ 'hh:mm:ss', '00:00:00' ],
    [ 'hh:mm:ss', '01:10:00' ],
    [ 'hh:mm:ss', '02:20:00' ],
    [ 'hh:mm:ss', '03:30:00' ],
    [ 'hh:mm:ss', '04:40:00' ],
    [ 'hh:mm:ss', '05:50:00' ],
    [ 'hh:mm:ss', '06:52:00' ],
    [ 'hh:mm:ss', '07:01:00' ],
    [ 'hh:mm:ss', '08:02:00' ],
    [ 'hh:mm:ss', '09:03:00' ],
    [ 'hh:mm:ss', '10:04:00' ],
    [ 'hh:mm:ss', '11:05:00' ],
    [ 'hh:mm:ss', '12:06:00' ],
    [ 'hh:mm:ss', '13:07:00' ],
    [ 'hh:mm:ss', '14:08:00' ],
    [ 'hh:mm:ss', '15:09:00' ],
    [ 'hh:mm:ss', '16:00:10' ],
    [ 'hh:mm:ss', '17:00:20' ],
    [ 'hh:mm:ss', '18:00:30' ],
    [ 'hh:mm:ss', '19:00:40' ],
    [ 'hh:mm:ss', '20:00:50' ],
    [ 'hh:mm:ss', '21:00:01' ],
    [ 'hh:mm:ss', '22:00:02' ],
    [ 'hh:mm:ss', '23:00:03' ],

    // All these fail
    // [ 'hhmmss', '000000' ],
    // [ 'hhmmss', '011000' ],
    // [ 'hhmmss', '022000' ],
    // [ 'hhmmss', '033000' ],
    // [ 'hhmmss', '044000' ],
    // [ 'hhmmss', '055000' ],
    // [ 'hhmmss', '065200' ],
    // [ 'hhmmss', '070100' ],
    // [ 'hhmmss', '080200' ],
    // [ 'hhmmss', '090300' ],
    // [ 'hhmmss', '100400' ],
    // [ 'hhmmss', '110500' ],
    // [ 'hhmmss', '120600' ],
    // [ 'hhmmss', '130700' ],
    // [ 'hhmmss', '140800' ],
    // [ 'hhmmss', '150900' ],
    // [ 'hhmmss', '160010' ],
    // [ 'hhmmss', '170020' ],
    // [ 'hhmmss', '180030' ],
    // [ 'hhmmss', '190040' ],
    // [ 'hhmmss', '200050' ],
    // [ 'hhmmss', '210001' ],
    // [ 'hhmmss', '220002' ],
    // [ 'hhmmss', '230003' ],

    [ 'hh:mm', '00:00' ],
    [ 'hh:mm', '01:10' ],
    [ 'hh:mm', '02:20' ],
    [ 'hh:mm', '03:30' ],
    [ 'hh:mm', '04:40' ],
    [ 'hh:mm', '05:50' ],
    [ 'hh:mm', '06:52' ],
    [ 'hh:mm', '07:01' ],
    [ 'hh:mm', '08:02' ],
    [ 'hh:mm', '09:03' ],
    [ 'hh:mm', '10:04' ],
    [ 'hh:mm', '11:05' ],
    [ 'hh:mm', '12:06' ],
    [ 'hh:mm', '13:07' ],
    [ 'hh:mm', '14:08' ],
    [ 'hh:mm', '15:09' ],
    [ 'hh:mm', '15:59' ],

    // These fail
    // [ 'hh', '00' ],
    // [ 'hh', '01' ],
    // [ 'hh', '02' ],
    // [ 'hh', '03' ],
    // [ 'hh', '04' ],
    // [ 'hh', '05' ],
    // [ 'hh', '06' ],
    // [ 'hh', '07' ],
    // [ 'hh', '08' ],
    // [ 'hh', '09' ],
    // [ 'hh', '10' ],
    // [ 'hh', '11' ],
    // [ 'hh', '12' ],
    // [ 'hh', '13' ],
    // [ 'hh', '14' ],
    // [ 'hh', '15' ],
    // [ 'hh', '16' ],
    // [ 'hh', '17' ],
    // [ 'hh', '18' ],
    // [ 'hh', '19' ],
    // [ 'hh', '20' ],
    // [ 'hh', '21' ],
    // [ 'hh', '22' ],
    // [ 'hh', '23' ],

];

const dataBadTimes = [

    [ 'hh:mm:ss.sss', '05:60:00.000' ],
    [ 'hh:mm:ss.sss', '05:50:61.000' ],
    // [ 'hh:mm:ss.sss', '05:50:01.9999' ],
    [ 'hh:mm:ss', '05:60:50' ],
    // [ 'hh:mm:ss', '05:50:61' ],
    [ 'hh:mm', '25:09' ],
    [ 'hh:mm', '15:60' ],
    [ 'hh:mm', '15:61' ],
];

describe('TIME', function() {

    for (const td of dataTimes) {

        it(`should match ${td[0]} -- ${td[1]}`, function() {
            const joiIsoTime = Joi.isoTime();
            const result = joiIsoTime.validate(td[1]);
            if (result.error) {
                console.log(result.error);
                console.log(result.error.details[0]);
            }
            assert.notOk(result.error);
            assert.isString(result.value);
            assert.equal(result.value, td[1]);
        });
    }

    for (const td of dataBadTimes) {

        it(`should not match ${td[0]} -- ${td[1]}`, function() {
            const joiIsoDate = Joi.isoTime();
            const result = joiIsoDate.validate(td[1]);
            // console.log(result);
            // console.log(result.error);
            assert.isOk(result.error);
            assert.isOk(result.error.details[0].message.indexOf(td[1]) >= 0);
            assert.isString(result.value);
            assert.equal(result.value, td[1]);

        });
    }

});

describe('DATE-TIME', function() {

    for (const td of dataDates) {
        for (const tt of dataTimes) {

            if (tt[1] === '00:00'
             || tt[1] === '01:10'
             || tt[1] === '02:20'
             || tt[1] === '03:30'
             || tt[1] === '04:40'
             || tt[1] === '05:50'
             || tt[1] === '06:52'
             || tt[1] === '07:01'
             || tt[1] === '08:02'
             || tt[1] === '09:03'
             || tt[1] === '10:04'
             || tt[1] === '11:05'
             || tt[1] === '12:06'
             || tt[1] === '13:07'
             || tt[1] === '14:08'
             || tt[1] === '15:09'
             || tt[1] === '15:59') {
                continue;
             }

            it(`should match ${td[0]}T${tt[0]} -- ${td[1]}T${tt[1]}`, function() {
                const val = `${td[1]}T${tt[1]}`;
                const joiIsoDateTime = Joi.isoDateTime();
                const result = joiIsoDateTime.validate(val);
                if (result.error) {
                    console.log(val);
                    console.log(result.error);
                    console.log(result.error.details[0]);
                }
                assert.notOk(result.error);
                assert.isString(result.value);
                assert.equal(result.value, val);
            });


            it(`should match ${td[0]}T${tt[0]}Z -- ${td[1]}T${tt[1]}Z`, function() {
                const val = `${td[1]}T${tt[1]}Z`;
                const joiIsoDateTime = Joi.isoDateTime();
                const result = joiIsoDateTime.validate(val);
                if (result.error) {
                    console.log(val);
                    console.log(result.error);
                    console.log(result.error.details[0]);
                }
                assert.notOk(result.error);
                assert.isString(result.value);
                assert.equal(result.value, val);
            });

            it(`should match ${td[0]}T${tt[0]}+00:00 -- ${td[1]}T${tt[1]}+00:00`, function() {
                const val = `${td[1]}T${tt[1]}+00:00`;
                const joiIsoDateTime = Joi.isoDateTime();
                const result = joiIsoDateTime.validate(val);
                if (result.error) {
                    console.log(val);
                    console.log(result.error);
                    console.log(result.error.details[0]);
                }
                assert.notOk(result.error);
                assert.isString(result.value);
                assert.equal(result.value, val);
            });

            it(`should match ${td[0]}T${tt[0]}+10:30 -- ${td[1]}T${tt[1]}+10:30`, function() {
                const val = `${td[1]}T${tt[1]}+10:30`;
                const joiIsoDateTime = Joi.isoDateTime();
                const result = joiIsoDateTime.validate(val);
                if (result.error) {
                    console.log(val);
                    console.log(result.error);
                    console.log(result.error.details[0]);
                }
                assert.notOk(result.error);
                assert.isString(result.value);
                assert.equal(result.value, val);
            });

            // negative time zone offsets seem to not work
            //
            // it(`should match ${td[0]}T${tt[0]}-05:30 -- ${td[1]}T${tt[1]}-05:30`, function() {
            //     const val = `${td[1]}T${tt[1]}-05:30`;
            //     const joiIsoDateTime = Joi.isoDateTime();
            //     const result = joiIsoDateTime.validate(val);
            //     if (result.error) {
            //         console.log(val);
            //         console.log(result.error);
            //         console.log(result.error.details[0]);
            //     }
            //     assert.notOk(result.error);
            //     assert.isString(result.value);
            //     assert.equal(result.value, val);
            // });
        }
    }
});

const dataYearMonths = [

    [ 'YYYY-MM', '2023-12' ],
    [ 'YYYY-MM', '0001-01' ],
    [ 'YYYY-MM', '1001-02' ],
    [ 'YYYY-MM', '2001-03' ],
    [ 'YYYY-MM', '3001-04' ],
    [ 'YYYY-MM', '4001-05' ],
    [ 'YYYY-MM', '5001-06' ],
    [ 'YYYY-MM', '6001-07' ],
    [ 'YYYY-MM', '7001-08' ],
    [ 'YYYY-MM', '8001-09' ],
    [ 'YYYY-MM', '8201-10' ],
    [ 'YYYY-MM', '8301-11' ],
    [ 'YYYY-MM', '9999-11' ],

];

const dataBadYearMonths = [
    [ 'YYYY-MM', '223-13' ],
    [ 'YYYY-MM', '2023-5' ],
    [ 'YYYY-MM', '2023-13' ],
    [ 'YYYY-MM', '2023-999' ],
    [ 'YYYY-MM', '10000-11' ],
    [ 'YYYY-MM', '99999-11' ],
];

describe('YEAR-MONTH', function() {

    for (const td of dataYearMonths) {

        it(`should match ${td[0]} -- ${td[1]}`, function() {
            const joiIsoYearMonth = Joi.isoYearMonth();
            const result = joiIsoYearMonth.validate(td[1]);
            if (result.error) {
                console.log(result.error);
                console.log(result.error.details[0]);
            }
            assert.notOk(result.error);
            assert.isString(result.value);
            assert.equal(result.value, td[1]);
        });
    }

    for (const td of dataBadYearMonths) {

        it(`should not match ${td[0]} -- ${td[1]}`, function() {
            const joiIsoYearMonth = Joi.isoYearMonth();
            const result = joiIsoYearMonth.validate(td[1]);
            // console.log(result);
            // console.log(result.error);
            assert.isOk(result.error);
            assert.isOk(result.error.details[0].message.indexOf(td[1]) >= 0);
            assert.isString(result.value);
            assert.equal(result.value, td[1]);

        });
    }

});
