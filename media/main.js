var InputModel = Backbone.Model.extend({
    defaults: {
        label: "Unknown",
        id: "Unknown",
        placeholder: "Загрузите изображение"
    }
});

var InputCollection = Backbone.Collection.extend({
    model: InputModel
});

var WizardView = Backbone.View.extend({
    el: "#wizard",
    encoded: null,
    imageName: null,
    templateInput: null,
    resultTemplates: [],
    collectionInput: null,
    $preloader: null,
    $error: null,
    initialize: function (options) {
        this.collectionInput = options.collectionInput;
        this.templateInput = _.template($("#template-input").html());
        this.$preloader = this.$el.find(".preloader");
        this.$error = this.$el.find(".error400");

        $("#inputs").append(this.templateInput({
            collection: this.collectionInput.toJSON()
        }));

        this.collectionInput.each(function (input) {
            var id = input.get("id");
            var $template = $("#template-input-" + id);

            if ($template.length) {
                this.resultTemplates[id] = _.template($template.html());
            }
        }, this);
    },
    events: {
        "change #input-file": "select",
        "click .result-input, #input-url": "selectAll",
        "click #input-url-button": "loadUrl"
    },
    loadUrl: function (e) {
        var url = $.trim($("#input-url").val());

        if(!url.length) return;
        if(url.length > 8190) return;

        this.$preloader.show();
        var $imgTag = $("#my-image");
        var that = this;

        $.getJSON("/api.php", {url: url}, function(data) {
            if(parseInt(data.error) == 0) {
                $imgTag.title = data.name;
                $imgTag.attr("src", data.data);

                that.imageName = data.name;
                that.encoded = data.data;

                that.render();
            } else {
                that.$error.show();
            }

            that.$preloader.fadeOut("slow");
        })
    },
    selectAll: function (e) {
        $(e.currentTarget).select()
    },
    render: function () {
        if (!this.encoded) return;

        this.collectionInput.each(function (input) {
            var result, id = input.get("id");

            if ("undefined" === typeof this.resultTemplates[id]) {
                result = this.encoded.split(',')[1];
            } else {
                result = this.resultTemplates[id]({
                    code: this.encoded,
                    name: this.imageName
                });
            }

            $("#" + id).val($.trim(result));
        }, this);

        this.$error.hide();
    },
    select: function (event) {
        var selectedFile = event.target.files[0];
        var reader = new FileReader();

        var $imgTag = $("#my-image");
        $imgTag.title = selectedFile.name;
        this.imageName = selectedFile.name;

        var that = this;

        reader.onload = function (event) {
            $imgTag.attr("src", event.target.result);
            that.encoded = event.target.result;
            that.render();
        };

        reader.readAsDataURL(selectedFile);
    }
});

var app = app || {};

$(function () {
    $("footer").css("background-color", $("body > nav").css("background-color"));
    $("footer *").css("color", $(".navbar-default .navbar-nav > li > a").css("color"));

    if ("undefined" === typeof FileReader || !$.isFunction(FileReader)) {
        $("#old-browser").fadeIn("slow");
        return;
    } else {
        $("#wizard").show();
    }

    $(":file").filestyle({buttonText: "", buttonName: "btn-primary"});

    app.models = app.models || {};
    app.collections = app.collections || {};
    app.views = app.views || {};

    app.collections.input = new InputCollection([
        {label: "CSS-код для <code>background: url()</code>", id: "backgroundUrl"},
        {label: "CSS-код для <code>background-image</code>", id: "backgroundImage"},
        {label: "HTML-код для тега <code>img</code>", id: "imgTag"},
        {label: "Код Base64", id: "base64"},
        {label: "Код data: URL", id: "dataUrl"}
    ]);

    app.views.wizard = new WizardView({
        model: app.models.result,
        collectionInput: app.collections.input
    });
});