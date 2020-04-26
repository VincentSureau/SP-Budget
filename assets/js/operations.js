function sendNotification(title, content) {
    if (Notification.permission == 'granted') {
        navigator.serviceWorker.getRegistration().then(reg => {
            const options = {
                body: content,
            };
            reg.showNotification(title, options);
        });
    }
}

function storeOperation(data) {
    var storedOperations = JSON.parse(localStorage.getItem("operations"));

    console.log(storedOperations);
    if (!storedOperations) {
        storedOperations = [];
    }

    storedOperations.push(data);
    localStorage.setItem("operations", JSON.stringify(storedOperations));
}

function handleOperationForm() {
    $operationForm = $("#operationForm");

    if ($operationForm) {
        const $inputsCategory = $('input[name="operation_type"]');
        $inputsCategory.change(function (event) {
            var optionValues = event.target.value == "expense" ? categoriesExpense : categoriesIncome;
            var $selectCategory = $('select[name="category"]');
            $selectCategory.html('<option value="" disabled="" selected="">Choisir une catégorie</option>');
            optionValues.map(optionValue => {
                $selectCategory.append(`<option value=${optionValue.id}>${optionValue.name}</option>`)
            })
            var instance = M.FormSelect.getInstance($selectCategory);
            instance.destroy();
            M.FormSelect.init($selectCategory);
        })


        $operationForm.submit(function (event) {
            if (navigator.onLine !== true) {
                event.preventDefault();
                console.log("offline");

                var data = {
                    amount: $('#amount').val(),
                    date: $('#date').val(),
                    category: $('#category').val(),
                    paymentMethod: $('#paymentMethod').val(),
                    comment: $('#comment').val()
                }

                storeOperation(data);

                sendNotification("Votre opération a bien été prise en compte", "Elle sera enregistrée lorsque votre connexion internet sera de nouveau active");
            }
        })
    }
}

$(document).ready(function () {
    handleOperationForm();
});