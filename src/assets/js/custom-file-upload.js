$('#fancy-file-upload').FancyFileUpload({
    params: {
        action: 'fileuploader'
    },
    maxfilesize: -1,
    'edit' :false,
});
$(document).ready(function () {
    $('#image-uploadify').imageuploadify();
})