/**
 * Send notification to the user system
 * 
 * @param string title | title of the notification
 * @param string content | content of the notification
 */
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

/**
 * store offline operation in the local storage
 * 
 * @param object data 
 */
function storeOperation(data) {
    // retrive previous operation in local storage
    var storedOperations = JSON.parse(localStorage.getItem("operations"));

    // if no operation, initialize an empty array
    if (!storedOperations) {
        storedOperations = [];
    }

    // add the operation data in the array
    storedOperations.push(data);

    // store operations in local storage
    localStorage.setItem("operations", JSON.stringify(storedOperations));
}

function handleOperationForm() {
    $operationForm = $("#operationForm");

    // handle dynamic category list depending of operation type
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


        // handle prevent from submitting form if offline
        $operationForm.submit(function (event) {
            if (navigator.onLine !== true) {
                event.preventDefault();
                console.log("offline");

                // get the data from the form
                var data = {
                    amount: $('#amount').val(),
                    date: $('#date').val(),
                    category: $('#category').val(),
                    categoryName: $('#category :selected').text(),
                    paymentMethod: $('#paymentMethod').val(),
                    comment: $('#comment').val()
                }

                // store operation in local storage
                storeOperation(data);

                // send notification to notice the user
                sendNotification("Votre opération a bien été prise en compte", "Elle sera enregistrée lorsque votre connexion internet sera de nouveau active");
            }
        })
    }
}

/**
 * Handle submitting of the operation when user online
 */
function sendAsyncOperations() {
    if (navigator.onLine == true) {
        // retrieve operations from the local storage
        var storedOperations = JSON.parse(localStorage.getItem("operations"));

        if(storedOperations) {
            storedOperations.map(operation => {
                // send operation data with ajax
                $.ajax({
                    url: 'https://vincentsureau.alwaysdata.net/add-operation-ajax',
                    method: 'POST',
                    dataType: 'json',
                    data: operation,
                })
                // if ok, notice the ucer
                .done(function (data) {
                    sendNotification("Opération enregistrée", `L'opération ${operation.categoryName}: ${operation.amount}€ a été enregistrée`)
                })
                // if ajax fail, notice the user
                .fail(function(jqXHR, textStatus, errorThrown){
                    console.log(jqXHR, textStatus, errorThrown);
                    sendNotification("Erreur", `L'opération ${operation.categoryName}: ${operation.amount}€ n'a pas pu être enregistrée`)
                })
            })

            // empty the local storage
            localStorage.removeItem("operations")
        }
    }
}

$(document).ready(function () {
    handleOperationForm();
    sendAsyncOperations();
});