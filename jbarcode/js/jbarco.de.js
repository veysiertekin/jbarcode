function applyKeyCodeToValue(field, keyCode) {
    field = $(field);

    deActive=true;

    var CaretPos = 0;
    var CaretPos2 = 0;
    var Sel;
    var val  = field.val();
    var size = field.val().length;
    var fieldDOM = field.get(0);

    if (document.selection) { // ie icin // for ie
        el = fieldDOM;

        var start = 0, end = 0, normalizedValue, textInputRange, len, endRange;
        var range = document.selection.createRange();

        if (range && range.parentElement() == el) {
            len = el.value.length;

            normalizedValue = el.value.replace(/\r\n/g, "\n");
            textInputRange = el.createTextRange();
            textInputRange.moveToBookmark(range.getBookmark());
            endRange = el.createTextRange();
            endRange.collapse(false);
            if (textInputRange.compareEndPoints("StartToEnd", endRange) > -1) {
                start = end = len;
            } else {
                start = -textInputRange.moveStart("character", -len);
                start += normalizedValue.slice(0, start).split("\n").length - 1;
                if (textInputRange.compareEndPoints("EndToEnd", endRange) > -1) {
                    end = len;
                } else {
                    end = -textInputRange.moveEnd("character", -len);
                    end += normalizedValue.slice(0, end).split("\n").length - 1;
                }
            }
        }

        CaretPosStart = start;
        CaretPosEnd = end;
    } else if (fieldDOM.selectionStart || fieldDOM.selectionStart == '0') {
        CaretPosStart = fieldDOM.selectionStart;
        CaretPosEnd = fieldDOM.selectionEnd;
    }

    var newCaretPos=CaretPosStart+1;

    if (keyCode==8){
        field.val(val.substring(0, CaretPosStart-1<0 ? 0 : CaretPosStart-1) + val.substring(CaretPosEnd, size+1));
        newCaretPos=newCaretPos-2<0?0:newCaretPos-2;
    } else {
        field.val(val.substring(0, CaretPosStart) + String.fromCharCode(keyCode) + val.substring(CaretPosEnd, size+1));
    }
    
    if (document.selection) { // ie icin // for ie
        var range=fieldDOM.createTextRange();
        range.collapse(true);
        range.move('character',newCaretPos);
        range.select();
    } else if (fieldDOM.selectionStart || fieldDOM.selectionStart == '0') {
        fieldDOM.setSelectionRange(newCaretPos, newCaretPos);
    }

    deActive=false;
}
function conditionalKeySimulator(){
    if (activeObject) {
        if (activeObject.is(HTML5_TEXT_INPUT_FIELD_SELECTOR)) {
            applyKeyCodeToValue(activeObject, keyCode);
        }
        activeObject = null;
    }
    if (triggerKey)
        clearTimeout(triggerKey);
}

var keyCode;
var triggerKey;
var activeObject;
var HTML5_TEXT_INPUT_FIELD_SELECTOR = 'input, textarea, select, button, isindex';

$(document).ready(function(){
    _console = "#output";  // last funtion

    deActive = false;
    keyDetect = 0;
    lastKey  = 0;
    nextKey  = 0;
    keyArray = new Array();
    sub1 = 0;
    sub2 = 0;
    isFirstTime = true;
    wrongInput = 0;

    ELAPSED_TIME = 23;
    ELAPSED_TIME2 = 23;

    $("html").keypress(function(event){
        keyCode = event.which;

        if (!(event.ctrlKey || event.altKey) && (((keyCode >= 32) && (keyCode <= 126))
                || keyCode== 13/*Enter*/|| keyCode== 8 /* Backspace */ )) {

            if (deActive || (keyCode == 13 && keyDetect == 0))
                return this;    

            event.preventDefault();

            if (triggerKey)
                clearTimeout(triggerKey);

            var a = $("*:focus").get(0);

            if (a) {
                a = $(a);
                activeObject = a.is(HTML5_TEXT_INPUT_FIELD_SELECTOR) ? a : null ;
            } else {
                activeObject = null;
            }

            lastKey = nextKey;
            nextKey = (new Date()).getTime();

            if (isFirstTime) {
                sub1 = (nextKey - lastKey);
                isFirstTime = false;
            }
            else {
                sub2 = (nextKey - lastKey);
                if (sub1<ELAPSED_TIME && sub2<ELAPSED_TIME) {
                    if (keyDetect == 0) {                        
                        wrongInput = 0;
                        keyDetect = 1;

                        var tmp1 = keyArray.pop();
                        var tmp2 = keyArray.pop();

                        keyArray = new Array();
                        keyArray.push(tmp2);
                        keyArray.push(tmp1);
                    }
                } else {
                    wrongInput +=1;
                    if (wrongInput>2) {
                        keyDetect = 0;

                        var tmp1 = keyArray.pop();
                        keyArray = new Array();
                        keyArray.push(tmp1);
                    }
                }
                sub1 = sub2;
            }

            if (keyCode==13 && keyDetect == 1 && keyArray.length >2) {
                keys = keyArray.toString().replace(/,/g, "" );

                if ($(_console))    $(_console).append(" -&gt; "+ keys + " size:" + keys.length + "<br />");

                keyDetect = 0;
                keyArray = new Array();
                return this;
            }

            keyArray.push(String.fromCharCode(keyCode));

            triggerKey = setTimeout("conditionalKeySimulator()", ELAPSED_TIME2);
        }
        return this;
    });
});