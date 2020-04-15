<?php
namespace Appbudget\Controllers;

use Appbudget\Models\UserModel;
use Appbudget\Utils\User;

class UserController extends CoreController {
	
	/**
	 * Unset user session and redirect to home
	 *
	 * @return void
	 */
    public function logout() {
        User::disconnect();
		header("Location: {$this->router->generate("main_home")}");
		exit();
    }
	
	/**
	 * Display login form
	 *
	 * @return void
	 */
	public function login() {

		// connexion details set by default to allow connexion to demo account
		$password = password_hash("Boulon*2019", PASSWORD_DEFAULT);
		
		$errorList = [];
		if(!empty($_POST)){
			$email = (isset($_POST['email'])) ? $_POST['email'] : '';
			$passwordLogin = (isset($_POST['password'])) ? $_POST['password'] : '';
			
			if(empty($errorList)){
				// check if user exists in database
				$userModel = UserModel::find($email);
				if(!empty($userModel)){
					// if user exist, verify password
					$passwordInBdd = $userModel->getPassword();
					if(password_verify($passwordLogin ,$passwordInBdd)){
						User::connect($userModel);
						header("Location: {$this->router->generate("main_home")}");
						exit();
					}
				}
				// we only display on error message to prevent checking of email exists
				$errorList[]= "L'identifiant ou le mot de passe est incorrect";
			}
		}

		$this->render('user/login', ['errors' => $errorList]);
	}
}