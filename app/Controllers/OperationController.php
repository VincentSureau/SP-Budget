<?php

namespace Appbudget\Controllers;

use Appbudget\Models\CategoryModel;
use Appbudget\Controllers\CoreController;

class OperationController extends CoreController {

    /**
     * Display home page of the application
     *
     * @return void
     */
    public function add() 
    {
        $categories = CategoryModel::findAll();

        $this->render('operation/add', [
            "categories" => $categories,
        ]);
    }
}