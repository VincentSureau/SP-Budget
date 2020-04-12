<?php
namespace Appbudget\Utils;
use Appbudget\Models\UserModel;

abstract class User {

    public static function isConnected(){
        if(empty($_SESSION['connected_user'])){
            $connected = false;
        } else {
            $connected = true;
        }
        return $connected;
    }

    public static function getConnectedUser(){
        if(self::isConnected()){
            $userData = $_SESSION['connected_user'];
        } else {
            $userData = [];
        }
        return $userData;
    }

    public static function connect(UserModel $userModel){
        $_SESSION['connected_user'] = $userModel;
        return true;
    }

    public static function disconnect(){
        unset($_SESSION['connected_user']);
        return true;
    }

}