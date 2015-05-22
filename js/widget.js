var adskViewerWidget = (function (env) {
    var baseUrl;
    window.adskViewer = {};
    window.adskViewer.env = env || "";

    switch (window.adskViewer.env.toLowerCase()) {
        case "localdev":
            baseUrl = "http://online-local.autodesk.com:1818/";
            break;
        case "dev":
            baseUrl = "http://360-dev.autodesk.com/";
            break;
        case "staging":
            baseUrl = "https://360-staging.autodesk.com/";
            break;
        default:
            baseUrl = "https://360.autodesk.com/";
    }
    
    var widgetTemplate = baseUrl + "Viewer/WidgetTemplate";

    var init = function (container, onlyDropTarget) {
        if (container) {
            if (onlyDropTarget) {
                $("head").append('<link href="' + baseUrl + 'Content/css/viewer_widget.css" rel="stylesheet" type="text/css" />');
                var dropTemplate = '<iframe width="100%" height="176px" src="' + baseUrl + 'Viewer/WidgetDropTarget"></iframe>';
                $(container).append(dropTemplate);
            } else {
                $(container).load(widgetTemplate, function (response, status, xhr) {
                    if (status === "error") {
                        $(container).append('<span>The server is under heavy load, please try again later.</span>');
                        console.log("Failed to render Autodesk Widget: " + xhr.status + ' ' + xhr.statusText);
                    }
                });
            }
        }
    };

    return {
        Init: init
    };
});
