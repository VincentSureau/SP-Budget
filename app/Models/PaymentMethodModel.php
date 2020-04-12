<?php

namespace Appbudget\Models;

use PDO;
use Appbudget\Utils\Database;
use Appbudget\Models\CoreModel;

class PaymentMethodModel extends CoreModel {

    protected $id;
    
    protected $name;
        
    const TABLE_NAME = 'payment_method';
    
    public static function find($id){
        $sql = 'SELECT
        `payment_method`.`id`,
        `payment_method`.`name`
        FROM ' . static::TABLE_NAME .
        ' WHERE `payment_method`.`id` = :id
        ';
        
        $pdo = Database::getPDO();
        $pdoStatement = $pdo->prepare($sql);
        $pdoStatement->bindValue(':id', $id, PDO::PARAM_INT);
        $pdoStatement->execute();
        
        $result = $pdoStatement->fetchObject(static::class);
        return $result;  
    }
    
    public static function findAll(){
        $sql = 'SELECT 
        `payment_method`.`id`,
        `payment_method`.`name`
        FROM ' . static::TABLE_NAME .
        ' ORDER BY id ASC';
        $pdo = Database::getPDO();
        $pdoStatement = $pdo->query($sql);
        $result = $pdoStatement->fetchAll(PDO::FETCH_CLASS, static::class);
        return $result;   
    }
    
    public function insert() {
        //toDo
    }
    
    protected function update() {
        // toDo
    }

    /**
     * Get the value of id
     */ 
    public function getId()
    {
        return $this->id;
    }

    /**
     * Set the value of id
     *
     * @return  self
     */ 
    public function setId($id)
    {
        $this->id = $id;

        return $this;
    }

    /**
     * Get the value of name
     */ 
    public function getName()
    {
        return $this->name;
    }

    /**
     * Set the value of name
     *
     * @return  self
     */ 
    public function setName($name)
    {
        $this->name = $name;

        return $this;
    }
}