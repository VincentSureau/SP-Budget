<?php

namespace Appbudget\Controllers;

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
        $operation = new OperationModel();
        $operation
            ->setCreatedAt(new \DateTime("now"))
            ->setUpdatedAt(new \DateTime("now"))
            ->setDate(new \DateTime("now"))
            ;

        var_dump($_POST);
        $errorList=[];

        if(!empty($_POST)) {
            $category = \filter_input(INPUT_POST, 'category', FILTER_VALIDATE_INT);
            if($category) {
                $operation->setCategory($category);
            } else {
                $errorList['category'] = "La catégorie n'est pas valide";
            }
            
            $paymentMethod = \filter_input(INPUT_POST, 'paymentMethod', FILTER_VALIDATE_INT);
            if($paymentMethod) {
                $operation->setPaymentMethod($paymentMethod);
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

            $comment = \filter_input(INPUT_POST, 'amount', FILTER_SANITIZE_FULL_SPECIAL_CHARS);
            if($comment){
                $operation->setComment($comment);
            } else {
                $errorList['comment'] = "Le commentaire saisi n'est pas valide";
            }

            if(empty($errorList)) {
                header("Location: {$this->getBasePath()}");
            }
        }


        $this->render('operation/add', [
            "categories" => CategoryModel::findAll(),
            "paymentMethods" => PaymentMethodModel::findAll(),
            "errors" => $errorList,
            "operation" => $operation,
        ]);
    }
}