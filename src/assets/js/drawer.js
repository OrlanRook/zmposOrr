$('input.enterastab, select.enterastab, textarea.enterastab').on('keydown', function (e) {
    if (e.keyCode == 13) {
        var focusable = $('input,a,select,button,textarea').filter(':visible');
        focusable.eq(focusable.index(this) + 1).focus();
        return false;
    }
});