function getStoredItem(item) {
    if (!localStorage.getItem("lpg3746_"+item) && localStorage.getItem("lpg3746_"+item) != "false")
      return false;
    else
      return localStorage.getItem("lpg3746_"+item);
  }
  function setStoredItem(item,value) {
    if (value == null || value == "" || value == undefined)
      return false;
    else
      return localStorage.setItem("lpg3746_"+item,value);
  }
  
  function getField(name,array) {
    for (var i = array.length - 1; i >= 0; i--) {
      if (array[i].name == name)
      {
        return array[i].value;
      }
    }
    return false;
  }
  
  $(document).ready(function() {
  
      $("input[name=phone]").inputmask({
          "mask": "+ 9 (999) 999-9999",
          showMaskOnHover: false,
          "oncomplete": function(){
            var value = $(this).val();
            $(this).val(value.replace(/(\+)(\s|)(8)/g,"$1$1"+7))
          }
      });
  
      $.fancybox.defaults.touch = false;
  
      jQuery.validator.addMethod("checkMask", function(value, element) {
       return /\+ \d{1} \(\d{3}\) \d{3}-\d{4}/g.test(value); 
        });
  
       
  
        
  
        $('#form1').validate({
          rules: {
            phone: {
              checkMask: true
            },
            email: {
              required: true,
              email: true
            }
          }
        });
  
        $('#form2').validate({
          rules: {
            phone: {
              checkMask: true
            },
            email: {
              required: true,
              email: true
            }
          }
        });
  
        $('#form3').validate({
          rules: {
            phone: {
              checkMask: true
            },
            email: {
              required: true,
              email: true
            }
          }
        });

  
  
      // Form Process
      $(document).on("submit","form", function(event){
        event.preventDefault();
        var submitedFrom = $(this)
        var data  = submitedFrom.serializeArray();
        var formData = new FormData();
        var preloader = submitedFrom.find("div.preload__box");
        if (preloader == undefined) { preloader = false;}
  
        setStoredItem('name', getField("name",data));
        setStoredItem('city', getField("city",data));
  
        if (!getField("name",data)&&getStoredItem("name")!="false"&&getStoredItem("name"))
        {
          data.push({name:"name", value:getStoredItem("name")});
        }
  
        if (!getField("city",data)&&getStoredItem("city")!="false"&&getStoredItem("city"))
        {
          data.push({name:"city", value:getStoredItem("city")});
        }
        for (var i = data.length - 1; i >= 0; i--) {
          formData.append(data[i].name,data[i].value);
        }
        return false;
      });
  
      if (document.getElementById("thanksNameModal") != undefined)
      {
        $("#formCaller").trigger("click");
        if (getStoredItem("city") && getStoredItem("city") != "false")
          document.getElementById("city").value = getStoredItem("city").trim();
  
        if (getStoredItem("name") && getStoredItem("name") != "false")
        {
          var thankNameText = $("#thanksNameModal").text();
          $("#thanksNameModal").text(getStoredItem("name").trim()+', '+thankNameText.toLowerCase());
          $("#thanksName").text(getStoredItem("name").trim()+',');
          document.title = ''+getStoredItem("name").trim()+', спасибо! Ваша заявка принята'
        }
        else
        {
          $("#thanksNameModal").text("Спасибо!");
          $("#thanksName").text("Наши");
        }
      }
  
      //Modal buttons
      $("a[data-fancybox]").click(function(){
        var title = $(this).attr("title");
        $("#modalTitle").text(title);
        var btntext = $(this).data("bttitle");
        $("#send-check").text(btntext);
        if (title != undefined)
        {
          $("#modaltitle").text(title)
        }
        
        if (btntext != undefined)
        {
          $("#modalsubmit").text(btntext)
        }
      });
  });