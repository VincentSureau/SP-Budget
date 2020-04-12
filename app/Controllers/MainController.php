<?php

namespace Appbudget\Controllers;

use Appbudget\Utils\User;
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

        $this->render('main/home', []);
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