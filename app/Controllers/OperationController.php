<?php

namespace Appbudget\Controllers;

use Appbudget\Utils\User;
use Appbudget\Models\CategoryModel;
use Appbudget\Models\OperationModel;
use Appbudget\Models\PaymentMethodModel;
use Appbudget\Controllers\CoreController;

class OperationController extends CoreController {

    /**
     * Display new operation form
     *
     * @return void
     */
    public function add() 
    {
        $user = User::getConnectedUser();
        // if (empty($user)) {
        //     header("Location: {$this->router->generate("user_login")}");
        //     exit();
        // }

        // default operation type needed to render category select button
        $operation_type = "expense";
        
        // instantiate  a new operation model with
        // some default values
        $operation = new OperationModel();
        $operation
            ->setCreatedAt(new \DateTime("now"))
            ->setUpdatedAt(new \DateTime("now"))
            ->setDate(new \DateTime("now"))
            ->setUserId($user->getId())
            ;

        // initialize error list
        $errorList=[];

        // if add is set in post, submit button has bin clicked
        // else, javascript onchange="submit()" has been called
        $isSubmitted = \filter_input(INPUT_POST, 'add', FILTER_SANITIZE_STRING) == "add"? true : false;

        // form validation
        if(!empty($_POST)) {
            // $operation_type_selected = \filter_input(INPUT_POST, 'operation_type', FILTER_SANITIZE_STRING);
            // if($operation_type_selected == "expense" || $operation_type_selected == "income"){
            //     $operation_type = $operation_type_selected;
            // }

            $category = \filter_input(INPUT_POST, 'category', FILTER_VALIDATE_INT);
            if($category) {
                $operation->setCategoryId($category);
            } else {
                $errorList['category'] = "La catégorie n'est pas valide";
            }
            
            $paymentMethod = \filter_input(INPUT_POST, 'paymentMethod', FILTER_VALIDATE_INT);
            if($paymentMethod) {
                $operation->setPaymentMethodId($paymentMethod);
            } else {
                $errorList['paymentMethod'] = "Le moyen de paiement n'est pas valide";
            }
            
            $amount = \filter_input(INPUT_POST, 'amount', FILTER_VALIDATE_FLOAT);
            if($amount > 0) {
                $operation->setAmount($amount);
            } else {
                $errorList['amount'] = "Le montant saisi n'est pas valide";
            }

            $date = \DateTime::createFromFormat('Y-m-d', $_POST['date']);
            if($date) {
                $operation->setDate($date);
            } else {
                $errorList['date'] = "La date saisie n'est pas valide";
            }

            $comment = \filter_input(INPUT_POST, 'amount', FILTER_SANITIZE_STRING);
            if($comment){
                $operation->setComment($comment);
            }

            // if no error found, we can save the operation in database
            if(empty($errorList)) {
                $result = $operation->insert();
                
                // header("Location: {$this->router->generate("main_home")}");
                // exit();

                // $operation set to null to reset data because of probleme with PWA redicretion handling
                $operation = new OperationModel();
                $operation  
                    ->setCreatedAt(new \DateTime("now"))
                    ->setUpdatedAt(new \DateTime("now"))
                    ->setDate(new \DateTime("now"))
                    ->setUserId($user->getId())
                ;
            }
        }

        $categoriesExpense = CategoryModel::findByType("expense");
        $categoriesIncome = CategoryModel::findByType("income");

        $this->render('operation/add', [
            "categoriesExpense" => $categoriesExpense,
            "categoriesExpenseJs" => json_encode(array_map(function($category) { return ['id' => $category->getId(), 'name' => $category->getName()]; },$categoriesExpense)),
            "categoriesIncome" => $categoriesIncome,
            "categoriesIncomeJs" => json_encode(array_map(function($category) { return ['id' => $category->getId(), 'name' => $category->getName()]; },$categoriesIncome)),
            "categoriesIncome" => CategoryModel::findByType("expense"),
            // "categories" => CategoryModel::findByType($operation_type),
            "paymentMethods" => PaymentMethodModel::findAll(),
            "errors" => $errorList,
            "operation" => $operation,
            "operation_type" => $operation_type,
            "isSubmitted" => $isSubmitted,
        ]);
    }

    /**
     * Handle ajax add operation
     *
     * @return void
     */
    public function ajaxAdd() {
        $user = User::getConnectedUser();
        
        $operation = new OperationModel();
        $operation
            ->setCreatedAt(new \DateTime("now"))
            ->setUpdatedAt(new \DateTime("now"))
            ->setDate(new \DateTime("now"))
            ->setUserId($user->getId())
            ;

        // initialize error list
        $errorList=[];

        $category = \filter_input(INPUT_POST, 'category', FILTER_VALIDATE_INT);
        if($category) {
            $operation->setCategoryId($category);
        } else {
            $errorList['category'] = "La catégorie n'est pas valide";
        }
        
        $paymentMethod = \filter_input(INPUT_POST, 'paymentMethod', FILTER_VALIDATE_INT);
        if($paymentMethod) {
            $operation->setPaymentMethodId($paymentMethod);
        } else {
            $errorList['paymentMethod'] = "Le moyen de paiement n'est pas valide";
        }
        
        $amount = \filter_input(INPUT_POST, 'amount', FILTER_VALIDATE_FLOAT);
        if($amount > 0) {
            $operation->setAmount($amount);
        } else {
            $errorList['amount'] = "Le montant saisi n'est pas valide";
        }

        $date = \DateTime::createFromFormat('Y-m-d', $_POST['date']);
        if($date) {
            $operation->setDate($date);
        } else {
            $errorList['date'] = "La date saisie n'est pas valide";
        }

        $comment = \filter_input(INPUT_POST, 'amount', FILTER_SANITIZE_STRING);
        if($comment){
            $operation->setComment($comment);
        }

        // if no error found, we can save the operation in database
        if(empty($errorList)) {
            $result = $operation->insert();
            
            // $operation set to null to reset data because of probleme with PWA redicretion handling
            $operation = new OperationModel();
            $operation  
                ->setCreatedAt(new \DateTime("now"))
                ->setUpdatedAt(new \DateTime("now"))
                ->setDate(new \DateTime("now"))
                ->setUserId($user->getId())
            ;

            static::sendJson([
                'message' => "L'opération a bien été enregistrée"
            ]);
        }

        http_response_code(400);
        static::sendJson($errorList);
    }
}