import { useState, useEffect } from 'react';

interface CodeLengths {
    [key: string]: number;
}

const CODE_LENGTHS: CodeLengths = {
    AD: 24, AE: 23, AT: 20, AZ: 28, BA: 20, BE: 16, BG: 22, BH: 22, BR: 29,
    CH: 21, CR: 21, CY: 28, CZ: 24, DE: 22, DK: 18, DO: 28, EE: 20, ES: 24,
    FI: 18, FO: 18, FR: 27, GB: 22, GI: 23, GL: 18, GR: 27, GT: 28, HR: 21,
    HU: 28, IE: 22, IL: 23, IS: 26, IT: 27, JO: 30, KW: 30, KZ: 20, LB: 28,
    LI: 21, LT: 20, LU: 20, LV: 21, MC: 27, MD: 24, ME: 22, MK: 19, MR: 27,
    MT: 31, MU: 30, NL: 18, NO: 15, PK: 24, PL: 28, PS: 29, PT: 25, QA: 29,
    RO: 24, RS: 22, SA: 24, SE: 24, SI: 19, SK: 24, SM: 27, TN: 24, TR: 26,
    AL: 28, BY: 28, EG: 29, GE: 22, IQ: 23, LC: 32, SC: 31, ST: 25, SV: 28,
    TL: 23, UA: 29, VA: 22, VG: 24, XK: 20
};

const useValidIBAN = (iban: string): boolean | number => {
    const [isValid, setIsValid] = useState<boolean | number>(false);

    useEffect(() => {
        const validateIBAN = (input: string): boolean | number => {
            const iban: string = input.toUpperCase().replace(/[^A-Z0-9]/g, '');
            const code = iban.match(/^([A-Z]{2})(\d{2})([A-Z\d]+)$/);
            let digits: string;

            // check syntax and length
            if (!code || iban.length !== CODE_LENGTHS[code[1]]) {
                return false;
            }

            // rearrange country code and check digits, and convert chars to ints
            digits = (code[3] + code[1] + code[2]).replace(/[A-Z]/g, (letter) => {
                return (letter.charCodeAt(0) - 55).toString();
            });

            // final check
            return mod97(digits) === 1;
        };

        const mod97 = (string: string): number => {
            let checksum = string.slice(0, 2);
            let fragment: string;

            for (let offset = 2; offset < string.length; offset += 7) {
                fragment = checksum + string.substring(offset, offset + 7);
                checksum = (parseInt(fragment, 10) % 97).toString();
            }

            return parseInt(checksum, 10);
        };

        setIsValid(validateIBAN(iban));
    }, [iban]);

    return isValid;
};

export default useValidIBAN;
