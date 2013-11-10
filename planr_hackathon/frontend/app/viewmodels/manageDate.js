define(['plugins/router', 'durandal/app'], function (router, app) {
    var manageDate = function () {
        //this.displayName = 'Welcome to the Durandal Starter Kit!';
    };


    var eventId = 0;


    function init()
    {
        $(".list-item a").unbind('click');
        $(".list-item a").click(function(e){
            $('body').css("overflow","auto");
        });


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


        $(".menu").unbind('click');
        $(".menu").click(function(e){
            if(!$("#eventSideBar").is(".showing"))
            {
                $("#eventSideBar").show();
                $("#eventSideBar").addClass("showing");
                $("#rightBarOnline").hide();
                $("#rightBarOnline").removeClass("showing");
                $('body').css("overflow","hidden");
            }
            else{
                $("#eventSideBar").hide();
                $('body').css("overflow","auto");
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
                $('body').css("overflow","hidden");
            }
            else{
                $("#rightBarOnline").hide();
                $("#rightBarOnline").removeClass("showing");
                $('body').css("overflow","auto");
            }


        })


        $(document).on('click','.calendar-block',function(){
            $(this).toggleClass('active');
            var dateCalled = $(this).attr('day-value');
            if($(this).hasClass('active'))
            {
                addEntry(dateCalled);
            }
            else
            {
                removeEntry(dateCalled);
            }
        });
        var activeMonth;
        var activeYear;

        $('#month').on('change',function(){
            reCalendar();
        });
        $('#year').on('change',function(){
            reCalendar();
        });
        function daysInMonth(month,year) {
            return new Date(year, month, 0).getDate();
        }
        var dataArray = new Array();
        var data = new Object();
        data.date = '25';
        data.month = '3';
        data.year = '2013';
        data.active = true;
        data.colors = 'blue,orange,red';
        dataArray.push(data);
        var data2 = new Object();
        data2.date = '21';
        data2.month = '3';
        data2.year = '2013';
        data2.active = false;
        data2.colors = 'orange,red';
        dataArray.push(data2);
        var data3 = new Object();
        data3.date = '18';
        data3.month = '3';
        data3.year = '2013';
        data3.active = true;
        data3.colors = '';
        dataArray.push(data3);
        console.log(JSON.stringify(dataArray));
        reCalendar();
        function reCalendar()
        {
            activeYear=$('#year').val();
            activeMonth=$('#month').val();
            var daysTotal = daysInMonth(activeMonth,activeYear);
            $('.calendar').html('');
            for (i=1;i<=daysTotal;i++)
            {
                currLoopDate = new Date(i,activeMonth,activeYear);
                dayIntEq = currLoopDate.getDay();
                currLoopDay='';
                switch(dayIntEq)
                {
                    case 0 : currLoopDay='<span class="day">(SUN)</span>';break;
                    case 1 : currLoopDay='<span class="day">(MON)</span>';break;
                    case 2 : currLoopDay='<span class="day">(TUE)</span>';break;
                    case 3 : currLoopDay='<span class="day">(WED)</span>';break;
                    case 4 : currLoopDay='<span class="day">(THU)</span>';break;
                    case 5 : currLoopDay='<span class="day">(FRI)</span>';break;
                    case 6 : currLoopDay='<span class="day">(SAT)</span>';break;
                }
                var htmlContent;
                flag=0;
                hasColors=0;
                colorVal ='';
                for(j=0;j<dataArray.length;j++)
                {
                    if(i==dataArray[j].date && activeMonth == dataArray[j].month && activeYear == dataArray[j].year)
                    {
                        if(dataArray[j].colors != '')
                        {
                            hasColors=1;
                            colorVal = dataArray[j].colors;
                        }
                        if(dataArray[j].active== true)
                            flag=1;
                        else
                            flag=0;
                        break;
                    }
                }
                if(flag ==1)
                    htmlContent = '<div day-value="'+i+'" class="calendar-block active">';
                else
                    htmlContent = '<div day-value="'+i+'" class="calendar-block">';
                htmlContent +='<div class="row">'+i+'<br>'+currLoopDay+'</div><div class="row others-block">';
                if(hasColors == 1)
                    htmlContent+= checkConstraints(colorVal);
                htmlContent+='</div></div>';
                $('.calendar').append(htmlContent)
            }
        }
        function checkConstraints(str)
        {
            var res = new Array();
            res = str.split(',');
            var smallContent='';
            for(k=0;k<res.length;k++)
            {
                smallContent+= '<div class="bubble '+res[k]+'"></div>';
            }
            console.log(smallContent);
            return smallContent;
        }
        function addEntry(day)
        {
            flag=0;
            for(j=0;j<dataArray.length;j++)
            {
                if(day==dataArray[j].date && activeMonth == dataArray[j].month && activeYear == dataArray[j].year)
                {
                    flag=1;
                    break;
                }
            }
            if(flag==1)
            {
                dataArray[j].active=true;
            }
            else
            {
                var data4 = new Object();
                data4.date = day;
                data4.month = activeMonth;
                data4.year = activeYear;
                data4.colors = '';
                dataArray.push(data4);
                console.log(JSON.stringify(dataArray));
            }

        }
        function removeEntry(day)
        {
            flag=0;
            for(j=0;j<dataArray.length;j++)
            {
                if(day==dataArray[j].date && activeMonth == dataArray[j].month && activeYear == dataArray[j].year)
                {
                    flag=1;
                    break;
                }
            }
            if(flag==1)
            {
                if(dataArray[j].colors == '')
                    dataArray.splice(j,1);
                else
                    dataArray[j].active=false;
                console.log(JSON.stringify(dataArray));
            }
        }

    }

    manageDate.prototype.attached = function (view) {
       init();
    };

    manageDate.prototype.activate = function(context){
        if(context == undefined)
        {
            return router.navigate('error');
        }
        eventId = parseInt(context);

    };



    return manageDate;
});