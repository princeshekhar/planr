define(['plugins/router', 'durandal/app'], function (router, app) {
    var manageTasks = function () {
        //this.displayName = 'Welcome to the Durandal Starter Kit!';
    };


    var eventId = 0;


    function loadDateTimePicker(dateObj)
    {
        var months = new Array("January", "February","March","April","May","June","July","August","September","October","November","December");
        var i;
        $(".form-month").append("<option value=\"-1\">Month</option>");
        for(i=1;i<=12;i++)
        {
            $(".form-month").append("<option value=\""+ i + "\">"+months[i-1]+"</option>");
        }
        var startYear = 1920;
        var currentTime = new Date();
        var currentYear = parseInt(currentTime.getFullYear());
        $(".form-year").append("<option value=\"-1\">Year</option>");
        for(i=startYear;i<=currentYear;i++)
        {
            $(".form-year").append("<option value=\""+ i + "\">"+i+"</option>");
        }
        $(".form-date").each(function ()
        {
            if($(this).is(".min18"))
            {
                var targetYear = parseInt(currentTime.getFullYear()) - 18;
                var startYear = 1920;
                $(this).find(".form-year").html("");
                $(".form-year").append("<option value=\"-1\">Year</option>");
                for(i=startYear;i<=targetYear;i++)
                {
                    $(".form-year").append("<option value=\""+ i + "\">"+i+"</option>");
                }
            }
            if($(this).is(".future"))
            {
                var startYear = 1950;
                var targetYear = 2050;
                $(this).find(".form-year").html("");
                $(".form-year").append("<option value=\"-1\">Year</option>");
                for(i=startYear;i<=targetYear;i++)
                {
                    $(".form-year").append("<option value=\""+ i + "\">"+i+"</option>");
                }
            }
            if($(this).is(".ccard"))
            {
                var d = new Date();
                var startYear = d.getFullYear();
                var targetYear = 2030;
                $(this).find(".form-year").html("");
                $(".form-year").append("<option value=\"-1\">Year</option>");
                for(i=startYear;i<=targetYear;i++)
                {
                    $(".form-year").append("<option value=\""+ i + "\">"+i+"</option>");
                }
            }
            if($(this).is(".current-date"))
            {
                $(this).find(".form-year").val(currentTime.getFullYear());
                $(this).find(".form-month").val(currentTime.getMonth()+1);

                var selMonth = $(this).find(".form-month option:selected").val();
                var selYear = $(this).find(".form-year option:selected").val();

                var i,count = daysInMonth(selMonth, selYear);
                $(this).find(".form-day").html("");
                $(this).find(".form-day").append("<option value=\"-1\">Day</option>");
                for(i=0;i<count;i++)
                {
                    $(this).find(".form-day").append("<option value=\""+ (i+1) + "\">"+(i+1)+"</option>");
                }

                $(this).find(".form-day").val(currentTime.getDate());
                return;
            }

            var i,count = 31;
            $(this).find(".form-day").html("");
            $(this).find(".form-day").append("<option value=\"-1\">Day</option>");
            for(i=0;i<count;i++)
            {
                $(this).find(".form-day").append("<option value=\""+ (i+1) + "\">"+(i+1)+"</option>");
            }


        });
    }

    function daysInMonth(month, year)
    {
        return new Date(year, month, 0).getDate();
    }

    function init()
    {

        if(_eventDetailsModel.loaded() == false || (_eventDetailsModel.loaded()==true && (_eventDetailsModel.eventId()!=eventId)))
        {
            titanUI.loadEventDetails(titanLive.connectionId, eventId, function()
            {
                ko.applyBindings(_eventDetailsModel, $(".page-host .row")[0]);
            });
        }
        else{
            ko.applyBindings(_eventDetailsModel, $(".page-host .row")[0]);
        }


        //ko.applyBindings(collaboratorsModel, document.getElementById('collab-area'));


        $(".app-header-test-container").find(".top-icon.search").remove();

        if($(".app-header-test").find("#onlineCount").length==0)
        {
            $(".app-header-test").append('<div id="onlineCount" class="columns small-2 top-icon online"></div>');
        }


        $("#taskCreate").click(function(e){
            var taskObj = new NewTaskRequest();

            taskObj.connectionId = titanLive.connectionId;
            taskObj.eventId = eventId;
            taskObj.description = $("#taskDescription").val();
            taskObj.userId = $("#taskAssignedTo").val();
            taskObj.priority = $("#taskPriority").val();

            taskObj.deadline = $("#taskDeadline .form-month").val() + "-" + $("#taskDeadline .form-day").val() + "-" + $("#taskDeadline .form-year").val();

            alert(JSON.stringify(taskObj));

            titan.createTask(taskObj, function(data){

                if(data.code == 0)
                {
                    addAlert("error","regular","Sorry, an error occurred.");
                }
                else{
                    addAlert("success","regular","New task has been added.");
                }
            });
        });


        $(".menu").unbind('click');
        $(".menu").click(function(e){
            if(!$("#eventSideBar").is(".showing"))
            {
                $("#eventSideBar").show();
                $("#eventSideBar").addClass("showing");
                $("#rightBarOnline").hide();
                $("#rightBarOnline").removeClass("showing");
            }
            else{
                $("#eventSideBar").hide();
                $("#eventSideBar").removeClass("showing");
            }

        });

        $("#onlineCount").unbind('click');
        $("#onlineCount").click(function()
        {
            if(!$("#rightBarOnline").is(".showing"))
            {
                $("#rightBarOnline").show();
                $("#rightBarOnline").addClass("showing");
                $("#eventSideBar").hide();
                $("#eventSideBar").removeClass("showing");
            }
            else{
                $("#rightBarOnline").hide();
                $("#rightBarOnline").removeClass("showing");
            }


        });


        $('#addTaskContent').slideUp(0);

        $('.menu').on('click',function(){
            $('#homeSideBar').trigger('open');
        });
        $('#addNewTaskHeader').click(function(){
            $('#addTaskContent').slideToggle(500);
        });
        $('.priority-set').click(function(){
            if($(this).hasClass('active'))
            {
                $(this).removeClass('active');
            }
            else
            {
                $(document).find('.priority-set.active').removeClass('active');
                $(this).addClass('active');
                if($(this).is('.low-level'))
                    $('#taskPriority').val(0);
                if($(this).is('.warning-level'))
                    $('#taskPriority').val(1);
                if($(this).is('.danger-level'))
                    $('#taskPriority').val(2);
            }
        });
        loadDateTimePicker();
        $(".form-month").change(function()
        {
            if($(this).find("option:selected").val() != "-1" && $(this).parent().find("form-year option:selected").val() != "-1")
            {
                var selDate = $(this).parent().find(".form-day option:selected").val();
                var selMonth = $(this).find("option:selected").val();
                var selYear = $(this).parent().find(".form-year option:selected").val();

                var count = daysInMonth(selMonth,selYear);

                $(this).parent().find(".form-day").html("");
                $(".form-day").append("<option value=\"-1\">Day</option>");
                for(i=0;i<count;i++)
                {
                    $(this).parent().find(".form-day").append("<option value=\""+ (i+1) + "\">"+(i+1)+"</option>");
                }
                $(this).parent().find(".form-day").val(selDate);
            }
        });
        $(".form-year").change(function()
        {
            if($(this).find("option:selected").val() != "-1" && $(this).parent().find(".form-month option:selected").val() != "-1")
            {
                var selDate = $(this).parent().find(".form-day option:selected").val();
                var selMonth = $(this).parent().find(".form-month option:selected").val();
                var selYear = $(this).find("option:selected").val();

                var count = daysInMonth(selMonth,selYear);

                $(this).parent().find(".form-day").html("");
                $(".form-day").append("<option value=\"-1\">Day</option>");
                for(i=0;i<count;i++)
                {
                    $(this).parent().find(".form-day").append("<option value=\""+ (i+1) + "\">"+(i+1)+"</option>");
                }
                if(selDate != "29")
                {
                    $(this).parent().find(".form-day").val(selDate);
                }
            }
        });
        $(".form-date").focusout(function()
        {
            if($(this).is(".required"))
            {
                var selDay = $(this).find(".form-day option:selected").val();
                var selMonth = $(this).find(".form-month option:selected").val();
                var selYear = $(this).find(".form-year option:selected").val();
                if(selDay == "-1" || selMonth == "-1" || selYear == "-1")
                {
                    $(this).addClass("form-error");
                    if($(this).next().prop("tagName") != "P")
                    {
                        $(this).after('<p class="form-error-text">' + $(this).attr("title") + ' has not been filled.</p>');
                    }
                }
                else
                {
                    $(this).removeClass("form-error");
                    if($(this).next().prop("tagName") == "P")
                    {
                        $(this).next().remove();
                    }
                }
            }
        });

    }

    manageTasks.prototype.attached = function (view) {
       init();
    };

    manageTasks.prototype.activate = function(context){
        if(context == undefined)
        {
            return router.navigate('error');
        }
        eventId = parseInt(context);

    };



    return manageTasks;
});