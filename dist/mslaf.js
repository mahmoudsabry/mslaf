/**
 * Laravel ajax forms 
 * @version 1.0.0
 * @author Mahmoud Sabry - 2018
 * @authorEmail mhsabry@yahoo.com
 * @license The MIT License (MIT)
 * @todo Ajax form in laravel
 * @todo Displying error/success validation messages
 */
(function ($) {
    $.fn.mslaf = function (options) {
        var selector = this;
        var requestElements = {};
        var submittedForm = {};
        var pass = false;
        var arrayElements = [];
        var radioElements = [];
        var settings = $.extend({
            // These are the defaults.
            url: '',
            method: 'POST',
            singleAlert: false,
            mainAlertDiv: '',
            errorDivClass: '',
            errorInputClass: '',
            successMessge: 'Successfully done',
            successClass: 'right',
            hidden: {},
            onDone: function (data) {
                console.log('------- Done ---------')
            },
            onFail: function (data) {
                console.log('------- Fail ---------')
            },
            onSubmit: function (e) {
                console.log('------- submit ---------')
            },
            callback: function (error) {
                console.log(error)
            }
        }, options);

        var getRequestElements = function (obj) {
            requestElements = {};
            var Elemants = [];

            Elemants = obj.find('button,textarea,select,input');
            if (Elemants.length > 0)
            {
                for (var i = 0; i < Elemants.length; i++)
                {
                    buildObjKeyVal($(Elemants[i]));
                }
            }
            if (!$.isEmptyObject(settings.hidden))
            {
                for (c = 0; c < Object.keys(settings.hidden).length; c++)
                {
                    requestElements[Object.keys(settings.hidden)[c]] = settings.hidden[Object.keys(settings.hidden)[c]];
                }

            }
            ajaxCall(requestElements);
        }

        var ajaxCall = function (els) {
            arrayElements = Array.from(new Set(arrayElements))
            radioElements = Array.from(new Set(radioElements))
            var action = (settings.url == "") ? submittedForm.attr('action') : settings.url;
            var method = settings.method.toLowerCase();
            if (action == "")
            {
                console.log('Missing form action or set {url:""}')
                return
            }
            $[method](action, els)
                    .done(function (data) {
                        pass = true;
                        submittedForm.find('[type="submit"]').removeAttr('disabled')
                        displayMessage(settings.successMessge);
                        if (settings.onDone && typeof (settings.onDone) === "function") {
                            settings.onDone(data);
                        }
                    })
                    .fail(function (data) {
                        if (data.status == 422)
                        {
                            displayMessage(data.responseJSON);
                        } else {
                            displayMessage('Server error');
                        }
                        submittedForm.find('[type="submit"]').removeAttr('disabled')
                        if (settings.onFail && typeof (settings.onFail) === "function") {
                            settings.onFail(data);
                        }
                    })

        }


        selector.submit(function (e) {
            e.preventDefault();
            $(this).find('[type="submit"]').attr('disabled', 'disabled')
            clearAlert()
            settings.onSubmit();
            submittedForm = $(this);
            getRequestElements($(this));

        });

        var clearAlert = function () {
            $(document).find('[data-ms-alert="1"]').remove();
        }

        var displayMessage = function ($message) {
            if (typeof $message === "string")
            {
                if (settings.mainAlertDiv == "")
                {
                    if (!isExist(submittedForm.prev().data('ms-alert'))) {
                        submittedForm.before("<span data-ms-alert='1'>" + $message + "</span>")
                    } else {
                        submittedForm.prev().text($message)
                    }
                    if (pass) {
                        messageClass(submittedForm.prev(), "successClass")
                    } else {
                        messageClass(submittedForm.prev(), "errorDivClass")
                    }
                } else {
                    if (isExist(settings.mainAlertDiv))
                    {
                        settings.mainAlertDiv.html($message);
                        if (pass) {
                            messageClass(settings.mainAlertDiv, "successClass")
                        } else {
                            messageClass(settings.mainAlertDiv, "errorDivClass")
                        }
                    } else {
                        console.log('Can\'t find main alert div')
                    }
                }

            } else if (typeof $message === "object") {

                if (Object.keys($message).length > 0)
                {
                    for (c = 0; c < Object.keys($message).length; c++)
                    {
                        catchInput = selectElement(Object.keys($message)[c]);
                        if (settings.singleAlert === true)
                        {
                            if (c == 0)
                            {
                                var formErrors = "";
                            }
                            formErrors += $message[Object.keys($message)[c]] + "<br />";
                        } else {

                            if (!isExist(catchInput.next().data('ms-alert')))
                            {
                                catchInput.after("<span data-ms-alert='1'>" + $message[Object.keys($message)[c]] + "</span>");

                            } else {
                                catchInput.next().text($message[Object.keys($message)[c]]);
                            }
                            messageClass(catchInput.next(), "errorDivClass")
                        }
                        messageClass(catchInput, "errorInputClass")
                    }
                    if (settings.singleAlert === true)
                    {
                        if (isExist(settings.mainAlertDiv) && settings.mainAlertDiv != "")
                        {
                            settings.mainAlertDiv.attr('data-ms-alert', '1').html(formErrors);
                        } else {
                            if (!isExist(submittedForm.prev().data('ms-alert')))
                            {
                                submittedForm.before("<span data-ms-alert='1'>" + formErrors + "</span>")
                            } else {
                                submittedForm.prev().html(formErrors)
                            }
                        }
                        messageClass(submittedForm.prev(), "errorDivClass")
                    }
                }
            }

            if (settings.callback && typeof (settings.callback) === "function") {
                settings.callback($message);
            }

        }

        var messageClass = function (obj, divClass) {
            if (settings[divClass] != "")
            {
                obj.addClass(settings[divClass]);
            }
        }


        var selectElement = function (id) {
            if (arrayElements.indexOf(id) != -1)
            {
                return submittedForm.find('[name^=' + id + ']').last()
            } else if (radioElements.indexOf(id) != -1) {
                return (submittedForm.find('[name=' + id + ']').length > 0) ? submittedForm.find('[name=' + id + ']').last() : submittedForm.find('[id=' + id + ']').last()
            } else {

                return (submittedForm.find('[name=' + id + ']').length > 0) ? submittedForm.find('[name=' + id + ']') : submittedForm.find('[id=' + id + ']')
            }
        }

        var buildObjKeyVal = function (flyObj) {
            if (isExist(flyObj.attr('name'))) {
                if (newName = arrayEleToString(flyObj.attr('name')))
                {
                    arrayElements.push(newName)
                    if (!isExist(requestElements[newName]))
                    {
                        requestElements[newName] = [];
                    }
                    if (value = getValue(flyObj, 'name'))
                    {
                        requestElements[newName].push(value);
                    }
                } else {
                    if (value = getValue(flyObj, 'name'))
                    {
                        requestElements[flyObj.attr('name')] = value;
                    }
                }
            } else {
                if (isExist(flyObj.attr('id'))) {
                    if (value = getValue(flyObj, 'id'))
                    {
                        requestElements[flyObj.attr('id')] = value;
                    }
                }
            }

        }

        var getValue = function (flyObj, ele) {
            switch (flyObj.attr('type')) {
                case "checkbox":
                    if (flyObj.is(':checked'))
                    {
                        value = flyObj.val();
                    } else {
                        value = false;
                    }
                    break;
                case "radio":
                    if (flyObj.is(':checked'))
                    {
                        value = flyObj.val();
                    } else {
                        value = false;
                    }
                    radioElements.push(flyObj.attr(ele))
                    break;
                case "select":
                    if (flyObj.is(':selected'))
                    {
                        value = flyObj.val();
                    }
                default:
                    value = flyObj.val();
            }

            return value;
        }
        var isDOMArray = function (obj) {
            if (obj.substring((obj.length - 2), obj.length) === '[]')
            {
                return true;
            }
            return false;
        }

        var arrayEleToString = function (flyObj) {
            if (isDOMArray(flyObj))
            {
                return flyObj.substring(0, flyObj.length - 2)
            }
            return false;
        }

        var isExist = function (flyObj) {
            return (typeof flyObj !== 'undefined');
        }


    };

}(jQuery));
