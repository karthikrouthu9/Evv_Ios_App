	$(document).ready(function(){
					
alert("Jquery ready");
    document.addEventListener("deviceready",onDeviceReady,false);     

});
		function onDeviceReady() {
		alert("Device Ready");	
 		var element = document.getElementById('deviceProperties');
		var device_uuid = device.uuid;
        window.plugins.uniqueDeviceID.get(success, fail);
   
    function success(uuid)
{
    alert(uuid);
    
 	var networkState = navigator.connection.type;
    if (networkState == Connection.NONE)
    {
     
        
     
                window.location='./first_screen.html';
                return true;
    }
    else
{
    	alert("else loop");
    	
    	 
    		is_device_registered(uuid);
   
 function is_device_registered(uuid)
{
	alert("into function");
	             $.ajax({
              url: 'http://183.82.96.212:8080/m_service/m_resources/is_device_registered',
              type: "post",
      		  data: { device_uuid:uuid},
              dataType: "json",
              crossDomain: true,
              
              
			  error: function (jqXHR, textStatus, errorThrown) {
			  	alert("Error func");
				 
             bootbox.dialog({
  message: "Problem with connecting to server. Please try after sometime.",
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
							alert("Suvccess");
							if(data.logindata[0].is_security_question_answered==1 && data.logindata[0].count>=1)
      {
   
      window.location='./log-in.html';
      return false;
      }
      else if(data.logindata[0].is_security_question_answered==0 && data.logindata[0].count>=1)
      {
      window.location='./security_questions.html';
      return false;
      }
      else
      {
      window.location='./registration.html';
      return false;
      }
										  }
            });

  return false;

}
}
};
function fail(uuid)
{
    alert("failure function");
};

			}
					    			
    			
