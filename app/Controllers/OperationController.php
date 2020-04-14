<?php

namespace Appbudget\Controllers;

use Appbudget\Utils\User;
use Appbudget\Models\CategoryModel;
use Appbudget\Models\OperationModel;
use Appbudget\Models\PaymentMethodModel;
use Appbudget\Controllers\CoreController;

class OperationController extends CoreController {

    /**
     * Display home page of the application
     *
     * @return void
     */
    public function add() 
    {
        $user = User::getConnectedUser();
        if (empty($user)) {
            header("Location: {$this->router->generate("user_login")}");
            exit();
        }

        $operation_type = "expense";
        
        $operation = new OperationModel();
        $operation
            ->setCreatedAt(new \DateTime("now"))
            ->setUpdatedAt(new \DateTime("now"))
            ->setDate(new \DateTime("now"))
            ->setUserId($user->getId())
            ;

        $errorList=[];

        if(!empty($_POST)) {
            $operation_type_selected = \filter_input(INPUT_POST, 'operation_type', FILTER_SANITIZE_STRING);
            if($operation_type_selected == "expense" || $operation_type_selected == "income"){
                $operation_type = $operation_type_selected;
            }

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
            if($amount) {
                $operation->setAmount($amount);
            } else {
                $errorList['amount'] = "Le moyen de paiement n'est pas valide";
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

            if(empty($errorList)) {
                $result = $operation->insert();

                header("Location: {$this->router->generate("main_home")}");
                exit();
            }
        }

        $this->render('operation/add', [
            "categories" => CategoryModel::findByType($operation_type),
            "paymentMethods" => PaymentMethodModel::findAll(),
            "errors" => $errorList,
            "operation" => $operation,
            "operation_type" => $operation_type,
        ]);
    }
}