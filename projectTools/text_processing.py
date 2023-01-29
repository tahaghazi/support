
import re

from django.core.validators import RegexValidator


#class all Regex in projects
class R_Check:

    def r_check_values_with_patterns(self, value='',replace=[' +',' '],patterns=r"^[a-zA-Z]([a-zA-Z 0-9 _])+$", minlenght=3, maxlenght=255):
        
        if not value:
            return False

        value = re.sub(replace[0], replace[1], value)

        check_value = re.match(patterns, value)

        if len(value) < minlenght or len(value) > maxlenght:
            return False

        if check_value:
            return value.strip()
        else:
            return False


    def r_check_values_english_only(self, value='', minlenght=3, maxlenght=10):
    
        if not value:
            return False

        value = re.sub(' +', '_', value)

        check_value = re.match(r"^[a-zA-Z]([a-zA-Z 0-9 _])+$", value)

        if len(value) < minlenght or len(value) > maxlenght:
            return False

        if check_value:
            return value.strip()
        else:
            return False

    def r_check_subject_field(self, value='', minlenght=3, maxlenght=255):

        if not value:
            return False

        value = re.sub(' +', ' ', value)
        check_value = re.match(r'^[a-zA-Z,ء-ي](.)+$', value)

        if len(value) < minlenght or len(value) > maxlenght:
            return False

        if check_value:
            return value.strip()
        else:
            return False


    def r_check_name_english_only(self, value='', minlenght=3, maxlenght=10):

        if not value:
            return False

        value = re.sub(' +', ' ', value)

        check_value = re.match(r"^[a-zA-Z]([a-zA-Z 0-9])+$", value)

        if len(value) < minlenght or len(value) > maxlenght:
            return False

        if check_value:
            return value.strip()
        else:
            return False


    def r_check_nickname_english_only(self, value='', minlenght=3, maxlenght=10):

        if not value:
            return False

        value = re.sub('_+', '_', value)

        check_value = re.match(r"^[a-zA-Z]([a-zA-Z_\.])+([0-9_\.]+)?$", value)

        if len(value) < minlenght or len(value) > maxlenght:
            return False

        if check_value:
            return value.strip()
        else:
            return False

    def r_check_email(self, value=''):

        if not value:
            return False

        value = re.sub('_+', '_', value)

        # regex = '^(\w|\.|\_|\-)+[@](\w|\_|\-|\.)+[.]\w{2,3}$'
        regex = '^[a-zA-Z](\w|\.|\_|\-)+[@](\w|\_|\-|\.)+[.]\w{2,3}$'
        # regex = r"^[a-zA-Z]([0-9a-zA-Z_-\.])+[@]([0-9a-zA-Z_-\.])+[.][a-z]{2,5}$"
        check_value = re.match(regex, value)

        if check_value:
            return value.strip()
        else:
            return False

    def r_check_url(self, value=''):

        if not value:
            return False

        regex = '((https|http)://|www.)[a-zA-Z0-9\.\/\?\:@\-_=#]+\.([a-zA-Z]){2,6}([a-zA-Z0-9\.\&\/\?\:@\-_=#])*'
        check_value = re.match(regex, value)

        if check_value:
            return value.strip()
        else:
            return False

    def r_check_iban(self,iban):
        iban = str(iban).upper()
        regexp = re.compile(
            r"^AL\d{10}[0-9A-Z]{16}$|^AD\d{10}[0-9A-Z]{12}$|^AT\d{18}$|^BH\d{2}[A-Z]{4}[0-9A-Z]{14}$|^BE\d{14}$|^BA\d{18}$|^BG\d{2}[A-Z]{4}\d{6}[0-9A-Z]{8}$|^HR\d{19}$|^CY\d{10}[0-9A-Z]{16}$|^CZ\d{22}$|^DK\d{16}$|^FO\d{16}$|^GL\d{16}$|^DO\d{2}[0-9A-Z]{4}\d{20}$|^EE\d{18}$|^FI\d{16}$|^FR\d{12}[0-9A-Z]{11}\d{2}$|^GE\d{2}[A-Z]{2}\d{16}$|^DE\d{20}$|^GI\d{2}[A-Z]{4}[0-9A-Z]{15}$|^GR\d{9}[0-9A-Z]{16}$|^HU\d{26}$|^IS\d{24}$|^IE\d{2}[A-Z]{4}\d{14}$|^IT\d{2}[A-Z]\d{10}[0-9A-Z]{12}$|^[A-Z]{2}\d{5}[0-9A-Z]{13}$|^KW\d{2}[A-Z]{4}22!$|^LV\d{2}[A-Z]{4}[0-9A-Z]{13}$|^LB\d{6}[0-9A-Z]{20}$|^LI\d{7}[0-9A-Z]{12}$|^LT\d{18}$|^LU\d{5}[0-9A-Z]{13}$|^MK\d{5}[0-9A-Z]{10}\d{2}$|^MT\d{2}[A-Z]{4}\d{5}[0-9A-Z]{18}$|^MR13\d{23}$|^MU\d{2}[A-Z]{4}\d{19}[A-Z]{3}$|^MC\d{12}[0-9A-Z]{11}\d{2}$|^ME\d{20}$|^NL\d{2}[A-Z]{4}\d{10}$|^NO\d{13}$|^PL\d{10}[0-9A-Z]{,16}n$|^PT\d{23}$|^RO\d{2}[A-Z]{4}[0-9A-Z]{16}$|^SM\d{2}[A-Z]\d{10}[0-9A-Z]{12}$|^SA\d{4}[0-9A-Z]{18}$|^RS\d{20}$|^SK\d{22}$|^SI\d{17}$|^ES\d{22}$|^SE\d{22}$|^CH\d{7}[0-9A-Z]{12}$|^TN59\d{20}$|^TR\d{7}[0-9A-Z]{17}$|^AE\d{21}$|^GB\d{2}[A-Z]{4}\d{14}$"
        )
        return bool(regexp.match(iban.replace(" ", "")))




class R_Search:
    pass
