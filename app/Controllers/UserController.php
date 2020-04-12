<?php
namespace Appbudget\Controllers;

use Appbudget\Models\UserModel;
use Appbudget\Utils\User;

class UserController extends CoreController {
    
    public function logout() {
        User::disconnect();
		header("Location: {$this->router->generate("main_home")}");
		exit();
    }
	
	public function login() {
		$password = password_hash("Boulon*2019", PASSWORD_DEFAULT);
		
		$errorList = [];
		if(!empty($_POST)){
			$email = (isset($_POST['email'])) ? $_POST['email'] : '';
			$passwordLogin = (isset($_POST['password'])) ? $_POST['password'] : '';
			
			if(empty($errorList)){
				$userModel = UserModel::find($email);
				if(!empty($userModel)){
					$passwordInBdd = $userModel->getPassword();
					if(password_verify($passwordLogin ,$passwordInBdd)){
						User::connect($userModel);
						header("Location: {$this->router->generate("main_home")}");
						exit();
					} else {
						$errorList[]= "L'identifiant ou le mot de passe est incorrect";
					}
				} 
			}
		}

		$this->render('user/login', ['errors' => $errorList]);
	}
}