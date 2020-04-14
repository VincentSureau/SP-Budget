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
            $startDate = \DateTime::createFromFormat('Y-m-d H:i:s', $_GET['startDate'] . ' 00:00:00');
        }
        if(empty($startDate)){
            $startDate = new \DateTime('first day of this month');
        }
        if(!empty($_GET['endDate'])){
            $endDate = \DateTime::createFromFormat('Y-m-d H:i:s', $_GET['endDate'] . ' 23:59:59');
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
            $startDate = \DateTime::createFromFormat('Y-m-d H:i:s', $_GET['startDate'] . ' 00:00:00');
        }
        if(empty($startDate)){
            $startDate = new \DateTime('first day of this month');
        }
        if(!empty($_GET['endDate'])){
            $endDate = \DateTime::createFromFormat('Y-m-d H:i:s', $_GET['endDate'] . ' 23:59:59');
        }
        if(empty($endDate)){
            $endDate = new \DateTime('now');
        }

        // array filter ne garde que les valeur truthy donc pas besoin de callback ;)
        $orderArgs = array_filter([
            "category" => $_GET["category"] ?? null,
            "amount" => $_GET["amount"] ?? null,
            "date" => $_GET["date"] ?? null,
            "startDate" => $startDate->format("Y-m-d H:i:s"),
            "endDate" => $endDate->format("Y-m-d H:i:s"),
        ]);

        $operations = OperationModel::findByUser($user->getId(), $orderArgs);

        $total = array_reduce($operations, function($carry, $operation) {
            $carry += $operation->getAmount();
            return $carry;
        }, 0);

        $this->render('main/operations', [
            "operations" => $operations,
            "startDate" => $startDate,
            "endDate" => $endDate,
            "total" => $total,
            "order" => $orderArgs,
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