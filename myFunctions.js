
$(document).ready(function () {

  $('.toggle-btn').on('click', function () {
    var targetId = $(this).data('target');
    $('#' + targetId).toggle(300);
    $(this).toggleClass('active');
  });


  $('#continueBtn').on('click', function () {
    var checked = $('.meal-check:checked');
    if (checked.length === 0) {
      alert('يرجى اختيار وجبة واحدة على الأقل قبل المتابعة!');
      return;
    }
    $('#orderForm').slideDown(400);
    $('html, body').animate(
      { scrollTop: $('#orderForm').offset().top - 20 },
      600
    );
  });


  function validateName(name) {
    if (name === '') return true;
    var nameRegex = /^[A-Za-z]+\s[A-Za-z]+$/;
    return nameRegex.test(name);
  }

  function validateBankAccount(account) {
    var bankRegex = /^\d{6}$/;
    return bankRegex.test(account);
  }


  function validateDate(dateStr) {
    if (dateStr === '') return true;
    var dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateRegex.test(dateStr)) return false;
    var parts = dateStr.split('-');
    var y = parseInt(parts[0]);
    var m = parseInt(parts[1]);
    var d = parseInt(parts[2]);
    var dt = new Date(y, m - 1, d);
    return (
      dt.getFullYear() === y &&
      dt.getMonth() + 1 === m &&
      dt.getDate() === d
    );
  }

  function validateMobile(mobile) {
    if (mobile === '') return true;
    var mobRegex = /^(094|098)\d{7}$/;
    return mobRegex.test(mobile);
  }

  $('#submitBtn').on('click', function () {
    var valid = true;

    var name    = $('#fullName').val().trim();
    var bank    = $('#bankAccount').val().trim();
    var dateVal = $('#orderDate').val().trim();
    var mob     = $('#mobile').val().trim();

    if (!validateName(name)) {
      $('#nameError').show();
      valid = false;
    } else {
      $('#nameError').hide();
    }

    if (!validateBankAccount(bank)) {
      $('#bankError').show();
      valid = false;
    } else {
      $('#bankError').hide();
    }

    if (!validateDate(dateVal)) {
      $('#dateError').show();
      valid = false;
    } else {
      $('#dateError').hide();
    }

    if (!validateMobile(mob)) {
      $('#mobileError').show();
      valid = false;
    } else {
      $('#mobileError').hide();
    }

    if (!valid) return;

    showOrderSummary();
  });

  
  function showOrderSummary() {
    var selectedMeals = [];
    var total = 0;

    $('.meal-check:checked').each(function () {
      var mealName  = $(this).data('name');
      var mealPrice = parseInt($(this).data('price'));
      selectedMeals.push({ name: mealName, price: mealPrice });
      total += mealPrice;
    });

    var tax = total * 0.10;
    var net = total - tax;

    var msg = '==============================\n';
    msg += '         ملخص طلبك\n';
    msg += '==============================\n\n';
    msg += 'الوجبات المختارة:\n';

    for (var i = 0; i < selectedMeals.length; i++) {
      msg += (i + 1) + '. ' + selectedMeals[i].name;
      msg += ' - ' + selectedMeals[i].price.toLocaleString() + ' ل.س\n';
    }

    msg += '\n------------------------------\n';
    msg += 'المجموع الاجمالي : ' + total.toLocaleString() + ' ل.س\n';
    msg += 'الضريبة (10%)    : ' + tax.toLocaleString()   + ' ل.س\n';
    msg += 'المبلغ الصافي    : ' + net.toLocaleString()   + ' ل.س\n';
    msg += '------------------------------\n\n';
    msg += 'شكراً لطلبك! سيتم التواصل معك قريباً.';

    alert(msg);
  }

});
