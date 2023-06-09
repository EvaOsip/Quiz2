(function () {
    const Form = {
        agreeElement: null,
        processElement: null,
        fields: [
            {
                name: 'name',
                id: 'name',
                element: null,
                regex: /^[А-Я][а-я]+\s*$/,
                valid: false,
            },
            {
                name: 'lastName',
                id: 'last-name',
                element: null,
                regex: /^[А-Я][а-я]+\s*$/,
                valid: false,
            },
            {
                name: 'email',
                id: 'email',
                element: null,
                regex: /^[a-z0-9]+[_-]*\.*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/,
                valid: false,
            },
        ],
        init () {
            const that = this;
            this.fields.forEach(item => {
                item.element = document.getElementById(item.id);
                item.element.onchange = function () {
                    that.validateField.call(that, item, this);
                }

            });

            this.processElement = document.getElementById('process');
            this.processElement.onclick = function () {
                that.processForm();
            }

            this.agreeElement = document.getElementById('agree');
            this.agreeElement.onchange = function () {
                that.validateForm();
            }

        },
        //Функция валидации полей
        validateField(field, element) {
            if(!element.value || !element.value.match(field.regex)) {
                element.parentNode.style.borderColor = 'red';
                field.valid = false;
            } else {
                element.parentNode.removeAttribute('style');
                field.valid = true;
            }
            this.validateForm();
        },
        //Функция делает кнопку активной после валидации
        validateForm() {
            const validForm = this.fields.every(item => item.valid);
            const isValid = this.agreeElement.checked && validForm;
            if (isValid) {
                this.processElement.removeAttribute('disabled');
            } else {
                this.processElement.setAttribute('disabled', 'disabled');
            }
            return isValid;
        },
        //Функция нажатия на кнопку отправки данных
        processForm() {
            if (this.validateForm()) {

                let paramString = '';
                this.fields.forEach(item => {
                    paramString += (!paramString ? '?' : '&') + item.name + '=' + item.element.value;
                })

                location.href = 'choice.html' + paramString;
            }
        }

    };

    Form.init();

})();