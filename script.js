
document.getElementById('continueBtn').addEventListener('click', function() {
    const formContainer = document.getElementById('formContainer');
    if (formContainer.style.display === 'none' || formContainer.style.display === '') {
        formContainer.style.display = 'block';
    }
});


function validateFullName(name) {
   
    const regex = /^[A-Za-z]+ [A-Za-z]+$/;
    return regex.test(name.trim());
}

function validateAccountNumber(account) {
    
    const regex = /^\d{6}$/;
    return regex.test(account);
}

function validateDate(date) {
    
    const regex = /^\d{4}-\d{2}-\d{2}$/;
    if (!regex.test(date)) return false;
    
    const dateObj = new Date(date);
    return dateObj instanceof Date && !isNaN(dateObj);
}

function validateMobile(mobile) {
   
    const regex = /^(093|094|095|096|098|099)\d{7}$/;
    return regex.test(mobile);
}

// إزالة رسائل الخطأ
function clearError(inputId, errorId) {
    document.getElementById(inputId).classList.remove('error');
    document.getElementById(errorId).style.display = 'none';
}

// عرض رسالة خطأ
function showError(inputId, errorId) {
    document.getElementById(inputId).classList.add('error');
    document.getElementById(errorId).style.display = 'block';
}


document.getElementById('orderForm').addEventListener('submit', function(event) {
    event.preventDefault(); 
    
    const fullName = document.getElementById('fullName').value;
    const accountNumber = document.getElementById('accountNumber').value;
    const orderDate = document.getElementById('orderDate').value;
    const mobileNumber = document.getElementById('mobileNumber').value;
    
    let isValid = true;
    
    if (!validateFullName(fullName)) {
        showError('fullName', 'nameError');
        isValid = false;
    } else {
        clearError('fullName', 'nameError');
    }
    
    
    if (!validateAccountNumber(accountNumber)) {
        showError('accountNumber', 'accountError');
        isValid = false;
    } else {
        clearError('accountNumber', 'accountError');
    }
 
    if (!validateDate(orderDate)) {
        showError('orderDate', 'dateError');
        isValid = false;
    } else {
        clearError('orderDate', 'dateError');
    }

    if (!validateMobile(mobileNumber)) {
        showError('mobileNumber', 'mobileError');
        isValid = false;
    } else {
        clearError('mobileNumber', 'mobileError');
    }

    if (isValid) {
        const successMsg = document.getElementById('successMsg');
        successMsg.style.display = 'block';
        
   
        console.log('البيانات المرسلة:', {
            fullName: fullName,
            accountNumber: accountNumber,
            orderDate: orderDate,
            mobileNumber: mobileNumber
        });
        
        
        setTimeout(function() {
            successMsg.style.display = 'none';
        }, 3000);
     
    }
});


document.getElementById('fullName').addEventListener('input', function() {
    if (validateFullName(this.value)) {
        clearError('fullName', 'nameError');
    }
});

document.getElementById('accountNumber').addEventListener('input', function() {
    if (validateAccountNumber(this.value)) {
        clearError('accountNumber', 'accountError');
    }
});

document.getElementById('orderDate').addEventListener('change', function() {
    if (validateDate(this.value)) {
        clearError('orderDate', 'dateError');
    }
});

document.getElementById('mobileNumber').addEventListener('input', function() {
    if (validateMobile(this.value)) {
        clearError('mobileNumber', 'mobileError');
    }
});