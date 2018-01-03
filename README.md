# Laravel Ajax forms
Easy way to send traditional form inputs through Ajax and handling  alerts/messages which generated from laravel validator
## Installing
```
bower install  mahmoudsabry/mslaf
```

## How to use
* There are 2 ways to handle requests in laravel 

1- Laravel controller

You need to use

```php
use Validator;
use Symfony\Component\HttpFoundation\JsonResponse;
```
controller method which handle requests 
```php
    function handle(Request $request) {
        $validator = Validator::make($request->all(), [
                    // roles
                        ], [
                    //messages
        ]);
        if ($validator->fails()) {
             return new JsonResponse($validator->errors()->getMessages(), 422);
        } else {
            // all requests pass validation rules
        }
 }
```

2- Laravel form requests

2-a Artisan command to create new request

```bash
php artisan make:request Testing
```

2-b Open /app/Http/Requests/Testing

```php
 public function rules() {
        return [
// your Roles
        ];
    }

    protected function formatErrors(Validator $validator) {
        return $validator->errors()->getMessages();
    }

    public function messages() {
        return [
//messages
        ];
    }
```

2-c Controller Method

You need to use

```php
use App\Http\Requests\Testing;
```

Controller method which handle requests

```php
    function store(Testing $request) {
// all requests pass validation rules
        print_r($request->all());
    }
```
* HTML form
``` html
<form id="ajaxForm" action="{{url('store')}}">
{{ csrf_field() }}
Name : 
<input type="text" id="name">
<br />
email : 
<input type="text" name="email">
<br />
Password : 
<input type="password" id="password">
<br />
Confirm password : 
<input type="password" name="password_confirmation">
<br />
text area : 
<textarea name="text"></textarea>
<br />
checkbox : 
<input type="checkbox" name="checkbox[]" value="1">
<input type="checkbox" name="checkbox[]" value="2">
<input type="checkbox" name="checkbox[]" value="3">
<br />
Radio
<input type="radio" name="radio" value="1">
<input type="radio" name="radio" value="2">
<input type="radio" name="radio" value="3">
<br />
select : 
<select name="select" multiple="multiple">
    <option>1</option>
    <option>2</option>
    <option>3</option>
</select>
<input type="submit" value="Submit" />
</form>
```
* JavaScript
```javascript
$('#ajaxForm').mslaf();
```
By default ajax call url get from the form attribute action value, by setting url option it will override the action attribute

```javascript
$('#ajaxForm').mslaf({url: 'http://www.siteurl.com/handle'});

```
By default the form method is POST you can override it :
```javascript
$('#ajaxForm').mslaf({method: 'GET'});

```
By default the error messages generated next to its input field, you can override it and make the error messages display in one span or taget DOM Object :
```javascript
$('#ajaxForm').mslaf({singleAlert: true}); // auto generated span
$('#ajaxForm').mslaf({singleAlert: true, mainAlertDiv: $('#errors')}); // all errors will displayed in a DOM Object its id = errors
```
adding class for all errors :
```javascript
$('#ajaxForm').mslaf({errorDivClass: 'alert alert-danger'}); // for error message
```
```javascript
$('#ajaxForm').mslaf({errorInputClass: 'alert alert-danger'}); // for input fields
```
by default success message is "Successfully done" choose your success message
```javascript
$('#ajaxForm').mslaf({successMessge: 'Done'});
```
adding success class
```javascript
$('#ajaxForm').mslaf({successClass: 'alert alert-success'});
```
For sending extra hidden post fields :
```javascript
$('#ajaxForm').mslaf({hidden: {var1: 'testing', var2:'also testing'}}); 
```
Overriding on ajax call done
```javascript
$('#ajaxForm').mslaf({onDone: function(){alert('done')}}); 
$('#ajaxForm').mslaf({onDone: function(data){console.log(data)}}); // Handle laravel response 
```
Overriding on ajax call failed
```javascript
$('#ajaxForm').mslaf({onFail: function(){alert('fail')}}); 
$('#ajaxForm').mslaf({onFail: function(data){console.log(data)}}); // Handle laravel response for all errors
```
Overriding on form submitted
```javascript
$('#ajaxForm').mslaf({onSubmit: function(){alert('submit')}}); 
```
Overriding on form callback
```javascript
$('#ajaxForm').mslaf({callback: function(){alert('callback')}}); 
```

## Donation
If this project help you reduce time to develop, you can give me a cup of coffee :) 

[![paypal](https://www.paypalobjects.com/en_US/i/btn/btn_donateCC_LG.gif)](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=UJ2FKVC9GPKQW)

 
