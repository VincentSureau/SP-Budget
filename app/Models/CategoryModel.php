<?php

namespace Appbudget\Models;

use PDO;
use Appbudget\Utils\Database;
use Appbudget\Models\CoreModel;

class CategoryModel extends CoreModel {

    protected $id;
    
    protected $name;
    
    protected $accountingType;

    protected $accountingTypeId;
        
    const TABLE_NAME = 'category';
    
    public static function find($id){
        $sql = 'SELECT
        `category`.`id`,
        `category`.`name`,
        `accounting_type`.`id` AS accountingTypeId,
        `accounting_type`.`type` AS accountingType
        FROM ' . static::TABLE_NAME .
        ' INNER JOIN `accounting_type` ON `category`.`accounting_type_id` = `accounting_type`.`id` 
        WHERE `category`.`id` = :id
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
        `category`.`id`,
        `category`.`name`,
        `accounting_type`.`id` AS accountingTypeId,
        `accounting_type`.`type` AS accountingType
        FROM ' . static::TABLE_NAME .
        ' INNER JOIN `accounting_type` ON `category`.`accounting_type_id` = `accounting_type`.`id`
        ORDER BY id ASC';
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

    /**
     * Get the value of accountingType
     */ 
    public function getAccountingType()
    {
        return $this->accountingType;
    }

    /**
     * Set the value of accountingType
     *
     * @return  self
     */ 
    public function setAccountingType($accountingType)
    {
        $this->accountingType = $accountingType;

        return $this;
    }

    /**
     * Get the value of accountingTypeId
     */ 
    public function getAccountingTypeId()
    {
        return $this->accountingTypeId;
    }

    /**
     * Set the value of accountingTypeId
     *
     * @return  self
     */ 
    public function setAccountingTypeId($accountingTypeId)
    {
        $this->accountingTypeId = $accountingTypeId;

        return $this;
    }
}