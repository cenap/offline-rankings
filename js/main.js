var values = [];
$(function() {

  $('.editable').editable({
    type: 'text',
    title: 'Değiştir',
    autotext : 'auto',
    display : 'value',
    emptytext : 'Başlık',
    mode : 'inline',
    defaultValue : '',
    success: function(response, newValue) {
      $(this).text(newValue);
      updateValues();
      saveValues();
    }
  });
  controlValues();

  $('.btn-number').click(function(e) {
    e.preventDefault();
    fieldName = $(this).attr('data-field');
    type = $(this).attr('data-type');
    var input = $("input[name='" + fieldName + "']");
    var currentVal = parseInt(input.val());
    if (!isNaN(currentVal)) {
      if (type == 'minus') {
        if (currentVal > input.attr('min')) {
          input.val(currentVal - 1).change();
        }
        if (parseInt(input.val()) == input.attr('min')) {
          $(this).attr('disabled', true);
        }
      } else if (type == 'plus') {
        if (currentVal < input.attr('max')) {
          input.val(currentVal + 1).change();
        }
        if (parseInt(input.val()) == input.attr('max')) {
          $(this).attr('disabled', true);
        }
      }
    } else {
      input.val(0);
    }
  });


  $('.input-number').focusin(function() {
    $(this).data('oldValue', $(this).val());
  });


  $('.input-number').change(function() {
    minValue = parseInt($(this).attr('min'));
    maxValue = parseInt($(this).attr('max'));
    valueCurrent = parseInt($(this).val());
    name = $(this).attr('name');
    if (valueCurrent >= minValue) {
      $(".btn-number[data-type='minus'][data-field='" + name + "']").removeAttr('disabled')
    } else {
      $(this).val($(this).data('oldValue'));
    }
    if (valueCurrent <= maxValue) {
      $(".btn-number[data-type='plus'][data-field='" + name + "']").removeAttr('disabled')
    } else {
      $(this).val($(this).data('oldValue'));
    }
    updateValues();
    saveValues();
  });


  $(".input-number").keydown(function(e) {
    // Allow: backspace, delete, tab, escape, enter and .
    if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 190]) !== -1 ||
      // Allow: Ctrl+A
      (e.keyCode == 65 && e.ctrlKey === true) ||
      // Allow: home, end, left, right
      (e.keyCode >= 35 && e.keyCode <= 39)) {
      // let it happen, don't do anything
      return;
    }
    // Ensure that it is a number and stop the keypress
    if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
      e.preventDefault();
    }
  });

  function controlValues() {
    if (typeof(Storage) !== "undefined") {
      values = JSON.parse(localStorage.getItem("values"));
      if (typeof(values) !== "undefined" && values) {
      } else {
        values = [{"h":"Başlık1","p":10},{"h":"Başlık2","p":10}];
        saveValues();
      }
      for (var i = 0; i < values.length; i++) {
        setLabel (i,values[i].h);
        setPoint (i,values[i].p);
      }
    } else {
        alert("Maalesef cihazınızda çevrimdışı depolama desteklenmiyor!");
    }
  }


});

function updateValues() {
  values[0].h = $("#h0").text();
  values[0].p = $("input[name='quant0']").val();
  values[0].u = Date.now();
  values[1].h = $("#h1").text();
  values[1].p = $("input[name='quant1']").val();
  values[1].u = Date.now();
}

function saveValues() {
  localStorage.setItem("values", JSON.stringify(values));
}

function setLabel(n,v) {
  var input = $("#h" + n);
  //input.text(v);
  input.editable('option','value',v);
  input.editable('option','defaultValue',v);
}

function setPoint(n,v) {
  var input = $("input[name='quant" + n + "']");
  input.val(v);
}
