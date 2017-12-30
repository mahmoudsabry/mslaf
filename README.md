# Laravel Ajax forms
Easy way to use traditional form to Ajax and manage alerts/messages
## Installing
* Installing using bower
```
bower install  mahmoudsabry/mslaf
```

* [Download](https://www.yahoo.com) - The web

## How to use
``` html
<form class="ajaxVal" method="post" action="{{url('store')}}">
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
            <!--<input type="submit" value="Submit" />-->
            <br />
            select : 
            <select name="select" multiple="multiple">
                <option>1</option>
                <option>2</option>
                <option>3</option>
            </select>
            <input id="tt" type="submit" value="Submit" />
        </form>
```

