<?php

namespace Appbudget\Models;

use Appbudget\Utils\Database;

use PDO;

class UserModel extends CoreModel {
    
    private $firstName;

    private $lastName;

    private $email;

    private $password;

    const TABLE_NAME = 'user';

    public static function find($email){
        $sql = 'SELECT *
                FROM ' . static::TABLE_NAME .
                ' WHERE email = :email';

        $pdo = Database::getPDO();
        $pdoStatement = $pdo->prepare($sql);
        $pdoStatement->bindValue(':email', $email, PDO::PARAM_STR);
        $pdoStatement->execute();

        $result = $pdoStatement->fetchObject(static::class);
        return $result;
    }

    public static function findById($id){
        $sql = 'SELECT *
                FROM ' . static::TABLE_NAME .
                ' WHERE id = :id';

        $pdo = Database::getPDO();
        $pdoStatement = $pdo->prepare($sql);
        $pdoStatement->bindValue(':id', $id, PDO::PARAM_INT);
        $pdoStatement->execute();

        $result = $pdoStatement->fetchObject(static::class);
        return $result;  
    }
  
    public function insert() {
        $sql = '
            INSERT INTO ' . self::TABLE_NAME . ' (
            `first_name`
            ,`last_name`
            ,`email`
            ,`password`
            )
            VALUES (
            :firstName
            ,:lastName
            ,:email
            ,:password
            )
        ';

        $pdo = Database::getPDO();

        $pdoStatement = $pdo->prepare($sql);
        $pdoStatement->bindParam(':firstName', $this->first_name, PDO::PARAM_STR);
        $pdoStatement->bindParam(':lastName', $this->last_name, PDO::PARAM_STR);
        $pdoStatement->bindParam(':email', $this->email, PDO::PARAM_STR);
        $pdoStatement->bindParam(':password', $this->password, PDO::PARAM_STR);

        $pdoStatement->execute();

        $insertedRow = $pdoStatement->rowCount();

        if($insertedRow < 1 ){
            return false;
        }

        $this->id = $pdo->lastInsertId();
        return true;
    }

    public function update() {
        //toDo
    }

    /**
     * Get the value of email
     */ 
    public function getEmail()
    {
        return $this->email;
    }

    /**
     * Set the value of email
     *
     * @return  self
     */ 
    public function setEmail($email)
    {
        $this->email = $email;

        return $this;
    }

    /**
     * Get the value of password
     */ 
    public function getPassword()
    {
        return $this->password;
    }

    /**
     * Set the value of password
     *
     * @return  self
     */ 
    public function setPassword($password)
    {
        $this->password = $password;

        return $this;
    }


    /**
     * Get the value of firstName
     */ 
    public function getFirstName()
    {
        return $this->firstName;
    }

    /**
     * Set the value of firstName
     *
     * @return  self
     */ 
    public function setFirstName($firstName)
    {
        $this->firstName = $firstName;

        return $this;
    }

    /**
     * Get the value of lastName
     */ 
    public function getLastName()
    {
        return $this->lastName;
    }

    /**
     * Set the value of lastName
     *
     * @return  self
     */ 
    public function setLastName($lastName)
    {
        $this->lastName = $lastName;

        return $this;
    }

}