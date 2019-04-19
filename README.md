# fixEncodingJS
Fix double encoding problems with javascript for use in Google BigQuery UDF's



Fix strings that were orginaly encoded in UTF-8 but got interpreted as Windows-1252 and got re-encoded as UTF-8, AKA double encoded strings.
## Example
double encoded string:

``` РЈРїРє-РІРѕС„РµРґС‰Рј ```

Fixed version:

```Упк-вофедщм```



Using translation table from 

https://github.com/nginx/nginx/blob/master/contrib/unicode2nginx/win-utf

And UTF-16 to UTF-8 conversion

https://github.com/google/closure-library/blob/master/closure/goog/crypt/crypt.js

TODO
add recursive call for multilevel encoding fix