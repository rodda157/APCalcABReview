function getFileNames() {
    var fileNames;
    $.ajax({
        url: "/questions/qList.txt",
        method: "GET",
        success: function(data, err) {
            fileNames = data.split("\n");
        }
    });
    return fileNames;
}