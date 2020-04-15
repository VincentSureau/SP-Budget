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
        // acces granted to connected user only
        $user = User::getConnectedUser();
        if (empty($user)) {
            header("Location: {$this->router->generate("user_login")}");
            exit();
        }

        // test if dates are valieds
        if(!empty($_GET['start'])){
            $startDate = \DateTime::createFromFormat('Y-m-d H:i:s', $_GET['start'] . ' 00:00:00');
        }
        if(empty($startDate)){
            $startDate = new \DateTime('first day of this month');
        }
        if(!empty($_GET['end'])){
            $endDate = \DateTime::createFromFormat('Y-m-d H:i:s', $_GET['end'] . ' 23:59:59');
        }
        if(empty($endDate)){
            $endDate = new \DateTime('now');
        }

        // retrieve all categories
        $categories = CategoryModel::findAllStatByUser($user->getId(), $startDate->format("Y-m-d H:i:s"), $endDate->format("Y-m-d H:i:s"));
        // retrieve total operation amount (could be calculated in php)
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
        // acces granted to connected user only
        $user = User::getConnectedUser();
        if (empty($user)) {
            header("Location: {$this->router->generate("user_login")}");
            exit();
        }

        // test if date are valids
        if(!empty($_GET['start'])){
            $startDate = \DateTime::createFromFormat('Y-m-d H:i:s', $_GET['start'] . ' 00:00:00');
        }
        if(empty($startDate)){
            $startDate = new \DateTime('first day of this month');
        }
        if(!empty($_GET['end'])){
            $endDate = \DateTime::createFromFormat('Y-m-d H:i:s', $_GET['end'] . ' 23:59:59');
        }
        if(empty($endDate)){
            $endDate = new \DateTime('now');
        }        

        // array filter only return truthy value so no callback needed in this case ;)
        $queryArgs = array_filter([
            "category" => $_GET["c"] ?? null,
            "amount" => $_GET["a"] ?? null,
            "date" => $_GET["d"] ?? null,
            "startDate" => $startDate->format("Y-m-d H:i:s"),
            "endDate" => $endDate->format("Y-m-d H:i:s"),
        ]);

        // calcul pagination
        $totalItems = OperationModel::countByUser($user->getId(), $queryArgs);
        $page = \filter_input(INPUT_GET, 'p', FILTER_SANITIZE_STRING) ?? "1";

        $queryArgs['limit'] = 5;
        $queryArgs['offset'] = $queryArgs['limit'] * ($page - 1);
        
        $totalPage = intval(ceil($totalItems / $queryArgs['limit']));

        // retrieve operations
        $operations = OperationModel::findByUser($user->getId(), $queryArgs);

        // calcul total amount of operation
        $total = array_reduce($operations, function($carry, $operation) {
            $carry += $operation->getAmount();
            return $carry;
        }, 0);

        $this->render('main/operations', [
            "operations" => $operations,
            "startDate" => $startDate,
            "endDate" => $endDate,
            "total" => $total,
            "order" => $queryArgs,
            "currentPage" => $page,
            "totalPage" => $totalPage,
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