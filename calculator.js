document.addEventListener("DOMContentLoaded", (event) => {
    radio_default()
    numlock_key_press()
});

function radio_default(){
    document.querySelector('#int_radio').click()
}

function Button_clicked(calculator_String){
    document.querySelector('.calculating_input').value += calculator_String
}

function Button_DEL(){
    let inputField = document.querySelector('.calculating_input');
    inputField.value = inputField.value.slice(0, -1);
}

function Button_Clear(){
    document.querySelector('.calculating_past').value = '';
    document.querySelector('.calculating_result').value = '';
    document.querySelector('.calculating_input').value = '';
}

function Button_Calculate(){
    calculating_input = document.querySelector('.calculating_input').value
    if (calculating_input != ''){
        const selectedRadioValue = document.querySelector('input[name="radio"]:checked').value;
        let result_value = document.querySelector('.calculating_result').value;
        if (calculating_input.includes('Ans')) {
            // Tìm vị trí của 'Ans' trong chuỗi
            let ansIndex = calculating_input.indexOf('Ans');
            
            // Xác định ký tự ngay sau 'Ans'
            let charAfterAns = calculating_input.charAt(ansIndex + 3); // 'Ans' có độ dài là 3
    
            // Nếu ký tự sau 'Ans' là một số nguyên, thêm dấu '*'
            if (charAfterAns.match(/\d/)) { // Kiểm tra nếu ký tự sau 'Ans' là số
                calculating_input = calculating_input.replace('Ans',  result_value + '*');
            } else if (['+', '-', '*', '÷',''].includes(charAfterAns)) { // Nếu là toán tử, thay thế nguyên
                calculating_input = calculating_input.replace('Ans', result_value);
            }
            
            document.querySelector('.calculating_past').value = '';
        }
        document.querySelector('.calculating_past').value = calculating_input
        calculating_past = document.querySelector('.calculating_past').value
        if (calculating_past.includes('Ans = ')) {
            document.querySelector('.calculating_past').value = calculating_past.replace('Ans = ', 'Fomular = ');
        }
        else{
            document.querySelector('.calculating_past').value = 'Fomular = ' + calculating_input
        }
        calculating_input = calculating_input.replace(/÷/g, '/');
        calculating_input = eval(calculating_input)
        if (selectedRadioValue == '1'){
            document.querySelector('.calculating_result').value = 'Ans = ' + parseInt(calculating_input)
        }
        else if (selectedRadioValue == '2'){
            document.querySelector('.calculating_result').value = 'Ans = ' + parseFloat(calculating_input)
        }
        document.querySelector('.calculating_input').value = 'Ans'
    }
    else{
        Button_Clear()
    }
}

function numlock_key_press(){
    document.addEventListener('keydown', function(event) {
        const keyCode = event.code;
        const shiftKey = event.shiftKey;
        const altKey = event.altKey;
        // Kiểm tra xem phím có phải là phím 1 từ Numpad không
        for (let i = 0; i <= 9; i++) {
            if (keyCode === `Numpad${i}`) {
                Button_clicked(i.toString()); // Gọi hàm xử lý với giá trị số
                break; // Thoát khỏi vòng lặp sau khi tìm được phím khớp
            }
            else if (keyCode === `Digit${i}` && !shiftKey){
                Button_clicked(i.toString()); // Gọi hàm xử lý với giá trị số
                break; // Thoát khỏi vòng lặp sau khi tìm được phím khớp
            }
        }
        // Kiểm tra thêm các phím numpad như +, -, *, /
        if (keyCode === 'NumpadAdd') {
            Button_clicked('+');
        }
        else if (keyCode === 'NumpadSubtract') {
            Button_clicked('-');
        }
        else if (keyCode === 'NumpadMultiply') {
            Button_clicked('*');
        }
        else if (keyCode === 'NumpadDivide') {
            Button_clicked('/');
        }
        else if (keyCode === 'NumpadDecimal') {
            Button_clicked('.');
        }

        // Kiểm tra các phím phép tính từ hàng phím thông thường
        if (keyCode === 'Slash') {
            Button_clicked('/');
        } else if (keyCode === 'Minus') {
            Button_clicked('-');
        } else if (keyCode === 'Equal' && shiftKey) {
            Button_clicked('+'); // Phím `+` là Shift + `=`
        } else if (keyCode === 'Digit8' && shiftKey) {
            Button_clicked('*'); // Phím `*` là Shift + `8`
        }
        else if (keyCode === 'Period') {
            Button_clicked('.');
        }

        if (keyCode === 'NumpadEnter' || keyCode === 'Enter') {
            Button_Calculate();
        }
        if (keyCode === 'Backspace') {
            Button_DEL()
        }
        if (altKey && (event.key === 'c' || event.key === 'C')) {
            Button_Clear()
        }
    });
}