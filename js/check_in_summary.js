
    $(document).ready(function(){
				

    document.addEventListener("deviceready",onDeviceReady,false);       
});
     

    function onDeviceReady() {
    	
   	var element = document.getElementById('deviceProperties');
	
       var device_uuid = device.uuid;
       var networkState = navigator.connection.type;
    if (networkState == Connection.NONE)
    {
      window.location='./first_screen.html';
               return false;
    }
     else
    {
    	
		var sch_uuid = getURLParameters('sch_uuid');
		
	
   $.ajax({
          url:"http://183.82.96.212:8080/services/session/token",
          type:"get",
          dataType:"text",
           crossDomain: true,
          error:function (jqXHR, textStatus, errorThrown) {
			
          },
          success: function (token) {   
   	var device_uuid = device.uuid;
	var d = document.getElementById("device_uuid");
	var token =token;
	var header = "X-CSRF-TOKEN";
    $(document).ajaxSend(function(e, xhr, options) {
        xhr.setRequestHeader(header, token);
    });
	
            $.ajax({
              url: 'http://183.82.96.212:8080/m_service/m_resources/get_check_in_summary_details',
              type: "POST",
	  		  //data: 'device_uuid='+'8dc6cf319947e729',
      		  data: {sch_uuid:sch_uuid},
              dataType: "json",
              crossDomain: true,
              
			  error: function (jqXHR, textStatus, errorThrown) {
			
	bootbox.dialog({
		  message: "Problem with connecting to server. Please try after sometime",
		  title: "Message",
		  buttons: {
		    success: {
		      label: "OK",
		      className: "btn-danger",
		      callback: function() {
		  
		     }
		    }
		  }
		});
              },
              success: function (data) {
           
 patient_name=data.checkin_data[0].patient_name;
 visit_type=data.checkin_data[0].visit_type;
 scheduled_time=data.checkin_data[0].sch_start_timestamp+'-'+data.checkin_data[0].sch_end_timestamp;
 checked_in_time=data.checkin_data[0].checked_in_time;
 checked_in_duration=data.checkin_data[0].checked_in_duration;
 
 $("#exampleInputpatientname1").html(patient_name);
 $("#exampleInputvisittype1").html(visit_type);
 $("#exampleInputscheduledtime1").html(scheduled_time);
 $("#checked_in_time_temp").html(checked_in_time);
// alert("checked in"+checked_in_duration);
 $("#checked_in_time_dur").html(checked_in_duration);
 $("#checked_in_time_dur").val(checked_in_duration);
 
 var json = data;
 
 var patient_name = json.checkin_data[0].patient_name;
 var visit_type = json.checkin_data[0].visit_type;
 var scheduled_time = json.checkin_data[0].sch_start_timestamp+'-'+json.patientdata[0].sch_end_timestamp;

  //$("#checked_in_time").val(json.checkin_data[0].checked_in_time);
	
 
  	  
}

});
			
		}
		});
		}
		}
		window.onload = function(){date()}, setInterval(function(){date()}, 1000);

function date() {
    var now = new Date(),
        now = now.getHours()+':'+now.getMinutes()+':'+now.getSeconds();
    //$('#time').html(now);
    $('#time1').html(now);
   var  checked_in_time_temp= $('#checked_in_time_dur').val();
    if(checked_in_time_temp!='')
     {
     var d1 = new Date(checked_in_time_temp);
          
  // Do your operations
   
  //End Time
  var d2 = new Date();
  //x=d1.getTime() - d2.getTime();
   x=d2.getTime() - d1.getTime();
  
  //Time difference in milli seconds
 // document.write("Your Operation took  " + (d2.getTime() - d1.getTime()) + " milliseconds");
   checkintimediff=msToTime(x);
   alert(checkintimediff);
   $('#duration_time_temp').html(checkintimediff);
     }
   
}

function msToTime(duration) {
    var milliseconds = parseInt((duration%1000)/100)
        , seconds = parseInt((duration/1000)%60)
        , minutes = parseInt((duration/(1000*60))%60)
        , hours = parseInt((duration/(1000*60*60))%24);


    return hours + ":" + minutes + ":" + seconds ;
}

			function getURLParameters(paramName)
{
    var sURL = window.document.URL.toString();
    if (sURL.indexOf("?") > 0)
    {
        var arrParams = sURL.split("?");
        var arrURLParams = arrParams[1].split("&");
        var arrParamNames = new Array(arrURLParams.length);
        var arrParamValues = new Array(arrURLParams.length);

        var i = 0;
        for (i = 0; i<arrURLParams.length; i++)
        {
            var sParam =  arrURLParams[i].split("=");
            arrParamNames[i] = sParam[0];
            if (sParam[1] != "")
                arrParamValues[i] = unescape(sParam[1]);
            else
                arrParamValues[i] = "No Value";
        }

        for (i=0; i<arrURLParams.length; i++)
        {
            if (arrParamNames[i] == paramName)
            {
                //alert("Parameter:" + arrParamValues[i]);
                return arrParamValues[i];
            }
        }
        return "No Parameters Found";
    }
}
			
				
			
var start = document.getElementById("checked_in_time").value;
var end = document.getElementById("time").value;

function diff(checked_in_time, time) {
    checked_in_time = checked_in_time.split(":");
    time = time.split(":");
    var checked_in_timeDate = new Date(0, 0, 0, start[0], start[1], 0);
    var timeDate = new Date(0, 0, 0, end[0], end[1], 0);
    var diff = timeDate.getTime() - checked_in_timeDate.getTime();
    var hours = Math.floor(diff / 1000 / 60 / 60);
    diff -= hours * 1000 * 60 * 60;
    var minutes = Math.floor(diff / 1000 / 60);
    
    return (hours < 9 ? "0" : "") + hours + ":" + (minutes < 9 ? "0" : "") + minutes;
}

document.getElementById("diff").value = diff(start, end);
								



function exitFromApp()
       {
            navigator.app.exitApp();
       }

function goToCheckOut()
{

  		
		var sch_uuid = getURLParameters('sch_uuid');
	
		window.location.href="check_out.html?sch_uuid="+sch_uuid;
	
        //window.location= "check_out.html?sch_uuid="+sch_uuid+'&visit_uuid='+visit_uuid+'&visit_type_id='+visit_type_id+'&patient_uuid='+patient_uuid+'&visit_date='+obj.visit_date+'&employee_uuid='+obj.employee_uuid+'&business_uuid='+obj.business_uuid+'&user_id='+user_id;
    
}