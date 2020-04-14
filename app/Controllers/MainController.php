<?php

namespace Appbudget\Controllers;

use Appbudget\Utils\User;
use Appbudget\Models\CategoryModel;
use Appbudget\Models\OperationModel;
use Appbudget\Controllers\CoreController;

class MainController extends CoreController {

    /**
     * Display home page of the application
     *
     * @return void
     */
    public function home() 
    {
        $user = User::getConnectedUser();
        if (empty($user)) {
            header("Location: {$this->router->generate("user_login")}");
            exit();
        }

        if(!empty($_GET['startDate'])){
            $startDate = \DateTime::createFromFormat('Y-m-d', $_GET['startDate']);
        }
        if(empty($startDate)){
            $startDate = new \DateTime('first day of this month');
        }
        if(!empty($_GET['endDate'])){
            $endDate = \DateTime::createFromFormat('Y-m-d', $_GET['endDate']);
        }
        if(empty($endDate)){
            $endDate = new \DateTime('now');
        }

        $categories = CategoryModel::findAllStatByUser($user->getId(), $startDate->format("Y-m-d H:i:s"), $endDate->format("Y-m-d H:i:s"));
        $operation = OperationModel::findTotalStatByUser($user->getId(), $startDate->format("Y-m-d H:i:s"), $endDate->format("Y-m-d H:i:s"));


        $this->render('main/home', [
            "categories" => $categories,
            "operation" => $operation,
            "startDate" => $startDate,
            "endDate" => $endDate,
        ]);
    }

    /**
     * Display Operations page
     *
     * @return void
     */
    public function operations()
    {
        $user = User::getConnectedUser();
        if (empty($user)) {
            header("Location: {$this->router->generate("user_login")}");
            exit();
        }

        if(!empty($_GET['startDate'])){
            $startDate = \DateTime::createFromFormat('Y-m-d', $_GET['startDate']);
        }
        if(empty($startDate)){
            $startDate = new \DateTime('first day of this month');
        }
        if(!empty($_GET['endDate'])){
            $endDate = \DateTime::createFromFormat('Y-m-d', $_GET['endDate']);
        }
        if(empty($endDate)){
            $endDate = new \DateTime('now');
        }

        $operations = OperationModel::findByUser($user->getId(), $startDate->format("Y-m-d H:i:s"), $endDate->format("Y-m-d H:i:s"));

        $total = array_reduce($operations, function($carry, $operation) {
            $carry += $operation->getAmount();
            return $carry;
        }, 0);

        $this->render('main/operations', [
            "operations" => $operations,
            "startDate" => $startDate,
            "endDate" => $endDate,
            "total" => $total,
        ]);
    }

    /**
     * Use to display Not Found page
     *
     * @return void
     */
    public function page404() 
    {
        header("HTTP/1.0 404 Not Found");
        $this->render('main/page404');
    }
}