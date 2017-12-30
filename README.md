# Laravel Ajax forms
Easy way to send traditional form inputs through Ajax and manage alerts/messages which laravel validator generated 
## Installing
* Installing using bower
```
bower install  mahmoudsabry/mslaf
```

* [Download](https://www.yahoo.com)

## How to use
HTML form
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
js
```javascript
$('#ajaxForm').mslaf();
```


